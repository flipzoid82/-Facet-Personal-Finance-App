const MUTATION = 'TRANSACTIONS_SYNC_MUTATION_DURING_PAGINATION';

function clone(value) { return structuredClone(value); }

function applyCompleteBatch(original, pages, fetchedAt) {
  const next = clone(original);
  next.transactions ??= {};
  next.removedHistory ??= {};
  next.userCorrections ??= {};
  next.reviewQueue ??= [];
  const removedIds = [];
  // The public Sync contract orders pages, but does not define ordering between
  // conflicting operations for the same ID within one page. Block that case.
  for (const page of pages) {
    const removed = page.removed ?? [];
    const upserts = [...(page.added ?? []), ...(page.modified ?? [])];
    const ids = [...removed, ...upserts.map(tx => tx?.id)];
    if (ids.some(id => !id || ids.filter(other => other === id).length !== 1)) {
      throw new Error('AMBIGUOUS_SAME_PAGE_ID');
    }
    for (const id of removed) {
      removedIds.push(id);
      const prior = next.transactions[id];
      if (prior) {
        next.removedHistory[id] = { ...prior, removed: true };
        delete next.transactions[id];
      }
    }
    for (const tx of upserts) {
      if (!tx.accountId) throw new Error('INVALID_SYNTHETIC_TRANSACTION');
      next.transactions[tx.id] = clone(tx);
      delete next.removedHistory[tx.id];
    }
  }
  // Resolve pending replacements from the final ordered state, including a
  // posted add on an earlier page and its pending removal on a later page.
  for (const tx of Object.values(next.transactions)) {
    const pendingId = tx.pendingTransactionId;
    const pending = pendingId && next.removedHistory[pendingId];
    if (pending) {
      if (pending.pending && pending.accountId === tx.accountId &&
        (!pending.replacementId || pending.replacementId === tx.id)) {
        pending.replacementId = tx.id;
        if (next.userCorrections[pendingId] && !next.userCorrections[tx.id]) {
          next.userCorrections[tx.id] = clone(next.userCorrections[pendingId]);
        }
      } else if (!next.reviewQueue.includes(pendingId)) {
        next.reviewQueue.push(pendingId);
      }
    }
  }
  for (const id of removedIds) {
    if (!next.transactions[id] && !next.removedHistory[id]?.replacementId &&
      !next.reviewQueue.includes(id)) next.reviewQueue.push(id);
  }
  next.reviewQueue = next.reviewQueue.filter(id => !next.transactions[id]);
  next.cursor = pages.at(-1).nextCursor;
  next.lastFetchedAt = fetchedAt;
  next.transactionsSourceAt = pages.at(-1).sourceAt ?? null;
  next.sourceFreshness = next.transactionsSourceAt == null ? 'UNKNOWN' : 'SYNTHETIC_SOURCE_TIME_REPORTED';
  next.historyStatus = pages.at(-1).historyStatus ?? original.historyStatus ?? 'UNKNOWN';
  next.historyComplete = next.historyStatus === 'HISTORICAL_UPDATE_COMPLETE';
  return next;
}

// fetchPage is an in-memory fixture function. This module has no provider or network adapter.
export function runSyntheticSync(original, fetchPage, {
  fetchedAt, maxRestarts = 2, maxPages = 20, afterPage = () => {},
} = {}) {
  if (!Number.isFinite(fetchedAt)) throw new Error('VIRTUAL_TIME_REQUIRED');
  const startCursor = original.cursor;
  let restartCount = 0;
  const requestedCursors = [];

  while (restartCount <= maxRestarts) {
    const pages = [];
    let cursor = startCursor;
    let shouldRestart = false;
    const seen = new Set();
    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
      if (seen.has(cursor)) return { status: 'BLOCKED', snapshot: clone(original), reason: 'CURSOR_LOOP', requestedCursors };
      seen.add(cursor);
      requestedCursors.push(cursor);
      let page;
      try {
        page = fetchPage(cursor, restartCount);
        if (!page || !page.nextCursor || typeof page.hasMore !== 'boolean') throw new Error('INVALID_PAGE');
        pages.push(clone(page));
        afterPage({ pageNumber, restartCount, cursor });
      } catch (error) {
        if (error.code === MUTATION && restartCount < maxRestarts) {
          restartCount++;
          shouldRestart = true;
          break;
        }
        return {
          status: 'BLOCKED', snapshot: clone(original), reason: error.code ?? error.message,
          requestedCursors, restartCount,
        };
      }
      if (!page.hasMore) {
        try {
          return {
            status: 'COMMITTED', snapshot: applyCompleteBatch(original, pages, fetchedAt),
            pageCount: pages.length, requestedCursors, restartCount,
          };
        } catch (error) {
          return { status: 'BLOCKED', snapshot: clone(original), reason: error.message, requestedCursors, restartCount };
        }
      }
      cursor = page.nextCursor;
    }
    if (!shouldRestart) return { status: 'BLOCKED', snapshot: clone(original), reason: 'PAGE_LIMIT', requestedCursors, restartCount };
  }
  return { status: 'BLOCKED', snapshot: clone(original), reason: 'MUTATION_RETRY_LIMIT', requestedCursors, restartCount };
}

export function mutationError() {
  return Object.assign(new Error(MUTATION), { code: MUTATION });
}
