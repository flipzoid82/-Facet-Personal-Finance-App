import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import { startBrowserFlow, finishBrowserFlow, retryBrowserFlow } from './browser.mjs';
import { runSyntheticSync, mutationError } from './transactions.mjs';
import { reconcileOtherState } from './non-transactions.mjs';

const fixture = JSON.parse(fs.readFileSync(new URL('./fixtures/nine-day-gap.json', import.meta.url), 'utf8'));
const start = Date.parse(fixture.offlineStart);
const now = Date.parse(fixture.returnAt);
const origin = 'https://facet.example.invalid';
const callback = flow => ({ type: 'callback', mode: flow.mode, sessionId: flow.sessionId,
  origin: flow.expectedOrigin, nonce: flow.nonce });
const page = cursor => fixture.pages[cursor];
const flowOptions = (platform, mode, route = 'domainless') => ({ platform, mode, route,
  sessionId: 'fake-session-1', expectedOrigin: origin, now,
  nonce: `fake-nonce-${platform}-${mode}`, itemId: mode === 'update' ? 'fake-item-1' : null,
  repairReason: mode === 'update' ? 'ITEM_LOGIN_REQUIRED' : null });

test('network guard denies socket creation before any network operation', () => {
  assert.equal(globalThis.__facetSyntheticNetworkDenied, true);
  assert.throws(() => net.connect(443, 'example.invalid'), /FACET_SYNTHETIC_NETWORK_FORBIDDEN/);
  assert.throws(() => fetch('https://example.invalid'), /FACET_SYNTHETIC_NETWORK_FORBIDDEN/);
});

test('four desktop/Android ordinary-browser initial/update cells stay distinct', () => {
  for (const platform of ['desktop-browser', 'android-browser']) {
    for (const mode of ['initial', 'update']) {
      const flow = startBrowserFlow(flowOptions(platform, mode));
      assert.equal(flow.launchSurface, platform === 'desktop-browser' ? 'popup' : 'new-tab');
      const result = finishBrowserFlow(flow, callback(flow), now + 1);
      assert.equal(result.outcome, 'MOCK_CALLBACK_ACCEPTED');
      assert.equal(result.flow.phase, 'COMPLETE');
      assert.equal(result.flow.nextAction, mode === 'update' ? 'RECONCILE_ALL_SOURCES' : 'START_INITIAL_SOURCE_CHECKS');
      assert.equal(flow.providerDisposition, mode === 'update' ? 'UNKNOWN' : 'NOT_TESTED');
      assert.equal(finishBrowserFlow(result.flow, callback(flow), now + 2).outcome, 'REJECTED_NOT_ACTIVE');
    }
  }
  const registered = startBrowserFlow(flowOptions('desktop-browser', 'update', 'registered-redirect'));
  assert.equal(registered.providerDisposition, 'NOT_TESTED');
  assert.equal(startBrowserFlow(flowOptions('android-browser', 'initial', 'registered-redirect')).route, 'registered-redirect');
});

test('update mode distinguishes consent renewal and account reselection', () => {
  for (const [intent, next] of [
    ['consent-renewal', 'RECHECK_CONSENT_AND_SOURCES'],
    ['account-reselection', 'RECHECK_ACCOUNT_COVERAGE_AND_SOURCES'],
  ]) {
    const flow = startBrowserFlow({ ...flowOptions('android-browser', 'update'), repairIntent: intent });
    const result = finishBrowserFlow(flow, callback(flow), now + 1);
    assert.equal(result.flow.nextAction, next);
    assert.equal(result.flow.providerDisposition, 'UNKNOWN');
  }
});

test('original callback reference is consumed once for initial and update modes', () => {
  for (const mode of ['initial', 'update']) {
    const flow = startBrowserFlow(flowOptions('desktop-browser', mode));
    const event = callback(flow);
    assert.equal(finishBrowserFlow(flow, event, now + 1).outcome, 'MOCK_CALLBACK_ACCEPTED');
    assert.equal(finishBrowserFlow(flow, event, now + 2).outcome, 'REJECTED_NOT_ACTIVE');
    assert.equal(finishBrowserFlow({ ...flow }, event, now + 2).outcome, 'REJECTED_NOT_ACTIVE');
  }
});

test('callback security, expiry, cancellation, blocked popup and retry', () => {
  const flow = startBrowserFlow(flowOptions('desktop-browser', 'initial'));
  for (const [change, expected] of [
    [{ mode: 'update' }, 'REJECTED_CROSS_MODE'],
    [{ sessionId: 'other' }, 'REJECTED_SESSION'],
    [{ origin: 'https://evil.example.invalid' }, 'REJECTED_ORIGIN'],
    [{ nonce: 'wrong' }, 'REJECTED_NONCE'],
  ]) {
    const result = finishBrowserFlow(flow, { ...callback(flow), ...change }, now + 1);
    assert.equal(result.outcome, expected);
    assert.equal(result.flow.phase, 'AWAITING_CALLBACK');
  }
  const expiring = startBrowserFlow(flowOptions('desktop-browser', 'initial'));
  const expired = finishBrowserFlow(expiring, callback(expiring), expiring.expiresAt + 1);
  assert.equal(expired.outcome, 'REJECTED_EXPIRED');
  assert.equal(finishBrowserFlow(expiring, callback(expiring), now + 1).outcome, 'REJECTED_NOT_ACTIVE');
  assert.equal(retryBrowserFlow(expired.flow, { now: now + 2 }).generation, 2);
  const canceled = finishBrowserFlow(flow, { type: 'cancel' }, now + 1);
  assert.equal(canceled.outcome, 'USER_EXITED');
  assert.equal(finishBrowserFlow(flow, callback(flow), now + 2).outcome, 'REJECTED_NOT_ACTIVE');
  const retried = retryBrowserFlow(canceled.flow, { now: now + 2, nonce: 'fresh-synthetic-nonce' });
  assert.equal(retried.generation, 2);
  assert.throws(() => retryBrowserFlow(canceled.flow, { now: now + 3 }), /RETRY_NOT_ALLOWED/);
  assert.equal(finishBrowserFlow(retried, callback(flow), now + 3).outcome, 'REJECTED_NONCE');
  const blocked = startBrowserFlow({ ...flowOptions('desktop-browser', 'initial'), popupAllowed: false });
  assert.equal(blocked.phase, 'POPUP_BLOCKED');
  assert.equal(finishBrowserFlow(blocked, callback(blocked), now + 1).outcome, 'REJECTED_NOT_ACTIVE');
  const aborted = startBrowserFlow(flowOptions('desktop-browser', 'initial'));
  assert.equal(finishBrowserFlow(aborted, { type: 'aborted-redirect' }, now + 1).outcome, 'USER_EXITED');
  assert.throws(() => startBrowserFlow({ ...flowOptions('android-browser', 'update'), itemId: null }), /REPAIR_CONTEXT_REQUIRED/);
});

test('nine virtual offline days commit both pages, cursor and corrections atomically', () => {
  assert.equal((now - start) / 86_400_000, 9);
  const original = structuredClone(fixture.before);
  const result = runSyntheticSync(original, page, { fetchedAt: now });
  assert.equal(result.status, 'COMMITTED');
  assert.equal(original.itemId, 'fake-item-1');
  assert.equal(result.pageCount, 2);
  assert.deepEqual(Object.keys(result.snapshot.transactions).sort(), fixture.golden.activeIds);
  assert.equal(result.snapshot.cursor, fixture.golden.cursor);
  assert.equal(result.snapshot.removedHistory['fake-pending-1'].replacementId, fixture.golden.linkedReplacement);
  assert.equal(result.snapshot.userCorrections['fake-posted-3'].category, 'user-rent-related');
  assert.equal(result.snapshot.userCorrections['fake-posted-1'].category, 'user-education');
  assert.ok(result.snapshot.reviewQueue.includes(fixture.golden.unmatchedRemoved));
  assert.equal(result.snapshot.historyComplete, fixture.golden.historyComplete);
  assert.equal(result.snapshot.lastFetchedAt, now);
  assert.equal(result.snapshot.transactionsSourceAt, null);
  assert.equal(result.snapshot.sourceFreshness, 'UNKNOWN');
  assert.deepEqual(original, fixture.before);
  const replay = runSyntheticSync(result.snapshot,
    cursor => cursor === 'cursor-2' ? page('cursor-0') : page(cursor), { fetchedAt: now });
  assert.equal(replay.status, 'COMMITTED');
  assert.deepEqual(replay.snapshot, result.snapshot);
});

test('page failure and crash before commit preserve original cursor and data', () => {
  const failed = runSyntheticSync(fixture.before, cursor => {
    if (cursor === 'cursor-1') throw new Error('FAKE_PAGE_FAILURE');
    return page(cursor);
  }, { fetchedAt: now });
  assert.equal(failed.status, 'BLOCKED');
  assert.equal(failed.reason, 'FAKE_PAGE_FAILURE');
  assert.deepEqual(failed.snapshot, fixture.before);

  const crash = runSyntheticSync(fixture.before, page, { fetchedAt: now,
    afterPage: ({ pageNumber }) => { if (pageNumber === 2) throw new Error('FAKE_CRASH_BEFORE_COMMIT'); },
  });
  assert.equal(crash.status, 'BLOCKED');
  assert.deepEqual(crash.snapshot, fixture.before);
});

test('cross-account pending association remains unmatched for user review', () => {
  const wrongPage = structuredClone(fixture.pages['cursor-0']);
  wrongPage.added[0].accountId = 'fake-savings';
  const result = runSyntheticSync(fixture.before,
    cursor => cursor === 'cursor-0' ? wrongPage : page(cursor), { fetchedAt: now });
  assert.equal(result.status, 'COMMITTED');
  assert.equal(result.snapshot.removedHistory['fake-pending-1'].replacementId, undefined);
  assert.ok(result.snapshot.reviewQueue.includes('fake-pending-1'));
  assert.equal(result.snapshot.userCorrections['fake-posted-3'], undefined);
});

test('cross-page add then remove commits final removal and preserves user correction', () => {
  const original = structuredClone(fixture.before);
  original.userCorrections['fake-transient'] = { category: 'user-set' };
  const pages = {
    'cursor-0': { added: [{ id: 'fake-transient', accountId: 'fake-checking', pending: false }],
      modified: [], removed: [], nextCursor: 'cursor-1', hasMore: true },
    'cursor-1': { added: [], modified: [], removed: ['fake-transient'],
      nextCursor: 'cursor-2', hasMore: false },
  };
  const result = runSyntheticSync(original, cursor => pages[cursor], { fetchedAt: now });
  assert.equal(result.status, 'COMMITTED');
  assert.equal(result.snapshot.transactions['fake-transient'], undefined);
  assert.equal(result.snapshot.removedHistory['fake-transient'].removed, true);
  assert.ok(result.snapshot.reviewQueue.includes('fake-transient'));
  assert.deepEqual(result.snapshot.userCorrections['fake-transient'], { category: 'user-set' });
  assert.equal(result.snapshot.cursor, 'cursor-2');
  assert.deepEqual(original.userCorrections['fake-transient'], { category: 'user-set' });
  const replay = runSyntheticSync(result.snapshot,
    cursor => cursor === 'cursor-2' ? pages['cursor-0'] : pages[cursor], { fetchedAt: now });
  assert.deepEqual(replay.snapshot, result.snapshot);
});

test('cross-page posted add links a pending removal on a later page', () => {
  const pages = {
    'cursor-0': { added: [{ id: 'fake-late-posted', accountId: 'fake-checking',
      pending: false, pendingTransactionId: 'fake-pending-1' }], modified: [], removed: [],
    nextCursor: 'cursor-1', hasMore: true },
    'cursor-1': { added: [], modified: [], removed: ['fake-pending-1'],
      nextCursor: 'cursor-2', hasMore: false },
  };
  const result = runSyntheticSync(fixture.before, cursor => pages[cursor], { fetchedAt: now });
  assert.equal(result.status, 'COMMITTED');
  assert.equal(result.snapshot.removedHistory['fake-pending-1'].replacementId, 'fake-late-posted');
  assert.equal(result.snapshot.userCorrections['fake-late-posted'].category, 'user-rent-related');
  assert.equal(result.snapshot.reviewQueue.includes('fake-pending-1'), false);
});

test('same-page conflicting ID blocks atomic commit when order is unspecified', () => {
  const result = runSyntheticSync(fixture.before, () => ({
    added: [{ id: 'fake-conflict', accountId: 'fake-checking' }],
    modified: [], removed: ['fake-conflict'], nextCursor: 'cursor-1', hasMore: false,
  }), { fetchedAt: now });
  assert.equal(result.status, 'BLOCKED');
  assert.equal(result.reason, 'AMBIGUOUS_SAME_PAGE_ID');
  assert.deepEqual(result.snapshot, fixture.before);
});

test('mutation restarts whole pagination from original cursor and is bounded', () => {
  const recovered = runSyntheticSync(fixture.before, (cursor, restart) => {
    if (cursor === 'cursor-1' && restart === 0) throw mutationError();
    return page(cursor);
  }, { fetchedAt: now });
  assert.equal(recovered.status, 'COMMITTED');
  assert.equal(recovered.restartCount, 1);
  assert.deepEqual(recovered.requestedCursors, ['cursor-0', 'cursor-1', 'cursor-0', 'cursor-1']);
  const blocked = runSyntheticSync(fixture.before, cursor => {
    if (cursor === 'cursor-1') throw mutationError();
    return page(cursor);
  }, { fetchedAt: now, maxRestarts: 2 });
  assert.equal(blocked.status, 'BLOCKED');
  assert.deepEqual(blocked.snapshot, fixture.before);
  assert.deepEqual(blocked.requestedCursors, ['cursor-0', 'cursor-1', 'cursor-0', 'cursor-1', 'cursor-0', 'cursor-1']);
});

test('initial history readiness is independent of empty transaction arrays', () => {
  const empty = () => ({ added: [], modified: [], removed: [], nextCursor: 'cursor-empty',
    hasMore: false, historyStatus: 'NOT_READY' });
  const result = runSyntheticSync(fixture.before, empty, { fetchedAt: now });
  assert.equal(result.status, 'COMMITTED');
  assert.equal(result.snapshot.historyComplete, false);
  assert.equal(result.snapshot.historyStatus, 'NOT_READY');
});

test('non-Transactions status preserves uncertain source age and missed events', () => {
  const other = reconcileOtherState({ previous: fixture.before, now, observations: {
    item: { fetchedAt: now, coverage: 'COMPLETE' },
    accounts: { fetchedAt: now, coverage: 'COMPLETE', accountIds: ['fake-checking'] },
    balances: { 'fake-checking': { fetchedAt: now, coverage: 'COMPLETE' } },
    liabilities: { unsupported: true, fetchedAt: now },
    recurring: { error: 'FAKE_RATE_LIMIT', lastKnown: true, fetchedAt: now },
    historyStatus: 'NOT_READY',
  }});
  assert.equal(other.item.state, 'LAST_KNOWN_STALE');
  assert.equal(other.accounts.state, 'LAST_KNOWN_STALE');
  assert.deepEqual(other.missingAccounts, ['fake-savings']);
  assert.equal(other.balances['fake-checking'].state, 'UNKNOWN');
  assert.equal(other.balanceFields['fake-checking'].current.state, 'UNKNOWN');
  assert.equal(other.balanceFields['fake-checking'].available.state, 'UNKNOWN');
  assert.equal(other.liabilities.state, 'UNKNOWN');
  assert.equal(other.recurring.state, 'LAST_KNOWN_STALE');
  assert.equal(other.recurring.nextAction, 'BACKOFF_AND_RETRY');
  assert.equal(other.history.state, 'UNKNOWN');
  assert.equal(other.missedEvents.state, 'UNKNOWN');
  assert.equal(other.retentionReviewRequired, true);
});

test('update completion cannot make unrelated data fresh; revocation forces review', () => {
  const update = startBrowserFlow(flowOptions('android-browser', 'update'));
  assert.equal(finishBrowserFlow(update, callback(update), now + 1).flow.nextAction, 'RECONCILE_ALL_SOURCES');
  const afterRepair = reconcileOtherState({ previous: fixture.before, now, observations: {
    item: { fetchedAt: now, coverage: 'COMPLETE' },
    accounts: { fetchedAt: now, coverage: 'COMPLETE', accountIds: fixture.before.accountIds },
    balances: { 'fake-checking': { fetchedAt: now, coverage: 'COMPLETE', sourceAt: now - 60_000 } },
    liabilities: { fetchedAt: now, coverage: 'COMPLETE', sourceAt: now - 60_000 },
    historyStatus: 'HISTORICAL_UPDATE_COMPLETE',
  }});
  assert.equal(afterRepair.item.state, 'LAST_KNOWN_STALE');
  assert.equal(afterRepair.balances['fake-checking'].state, 'FRESH');
  assert.equal(afterRepair.liabilities.state, 'FRESH');
  assert.equal(afterRepair.missedEvents.state, 'UNKNOWN');
  const revoked = reconcileOtherState({ previous: fixture.before, now, observations: {
    item: { revoked: true, fetchedAt: now },
    accounts: { coverage: 'COMPLETE', accountIds: fixture.before.accountIds, fetchedAt: now },
    balances: { 'fake-checking': { coverage: 'COMPLETE', sourceAt: now, fetchedAt: now } },
  }});
  assert.equal(revoked.item.state, 'REQUIRES_REPAIR');
  assert.equal(revoked.balances['fake-checking'].state, 'UNKNOWN');
  assert.equal(revoked.retentionReviewRequired, true);
});

test('partial coverage, stale balance, unavailable available amount and liability gaps remain visible', () => {
  const result = reconcileOtherState({ previous: fixture.before, now, observations: {
    item: { fetchedAt: now, consentExpiresAt: now + 86_400_000 },
    accounts: { fetchedAt: now, coverage: 'PARTIAL', accountIds: ['fake-checking', 'fake-new-card'] },
    balances: {
      'fake-checking': { fetchedAt: now, coverage: 'COMPLETE', sourceAt: start,
        current: { fetchedAt: now, coverage: 'COMPLETE', sourceAt: start }, available: null },
    },
    liabilities: { fetchedAt: now, coverage: 'PARTIAL', fields: {
      creditMinimum: { unsupported: true, fetchedAt: now },
      creditDueDate: { fetchedAt: now, coverage: 'COMPLETE', sourceAt: start },
    } },
  }});
  assert.equal(result.accounts.state, 'UNKNOWN');
  assert.deepEqual(result.addedAccounts, ['fake-new-card']);
  assert.equal(result.balanceFields['fake-checking'].current.state, 'LAST_KNOWN_STALE');
  assert.equal(result.balanceFields['fake-checking'].available.reason, 'AVAILABLE_BALANCE_NOT_RETURNED');
  assert.equal(result.liabilityFields.creditMinimum.state, 'UNKNOWN');
  assert.equal(result.liabilityFields.creditDueDate.state, 'LAST_KNOWN_STALE');
  assert.equal(result.liabilityFields.loanBalance.state, 'UNKNOWN');
});

test('available balance requires a returned value independent of parent freshness', () => {
  const inspect = available => {
    const balance = { coverage: 'COMPLETE', sourceAt: now - 60_000, fetchedAt: now,
      current: { coverage: 'COMPLETE', sourceAt: now - 60_000, value: 20 } };
    if (available !== 'OMITTED') balance.available = available;
    return reconcileOtherState({ now, observations: {
      accounts: { coverage: 'COMPLETE', accountIds: ['fake-checking'] },
      balances: { 'fake-checking': balance },
    } }).balanceFields['fake-checking'].available;
  };
  for (const absent of ['OMITTED', undefined, null]) {
    assert.equal(inspect(absent).state, 'UNKNOWN');
    assert.equal(inspect(absent).reason, 'AVAILABLE_BALANCE_NOT_RETURNED');
  }
  const distinct = reconcileOtherState({ now, observations: {
    accounts: { coverage: 'COMPLETE', accountIds: ['fake-checking'] },
    balances: { 'fake-checking': { coverage: 'COMPLETE', sourceAt: now - 60_000,
      current: { coverage: 'COMPLETE', sourceAt: now - 60_000, value: 20 } } },
  } }).balanceFields['fake-checking'];
  assert.equal(distinct.current.state, 'FRESH');
  assert.equal(distinct.available.state, 'UNKNOWN');
  assert.equal(inspect({ unsupported: true }).state, 'UNKNOWN');
  assert.equal(inspect(0).state, 'FRESH');
  assert.equal(inspect({ value: 5, coverage: 'COMPLETE', sourceAt: start }).state, 'LAST_KNOWN_STALE');
  assert.equal(inspect({ value: 5, coverage: 'COMPLETE' }).state, 'UNKNOWN');
  assert.equal(inspect({ value: 5, coverage: 'COMPLETE', sourceAt: now - 60_000 }).state, 'FRESH');
  const repairing = reconcileOtherState({ now, observations: {
    item: { revoked: true },
    accounts: { coverage: 'COMPLETE', accountIds: ['fake-checking'] },
    balances: { 'fake-checking': { available: 5, coverage: 'COMPLETE', sourceAt: now } },
  } });
  assert.equal(repairing.balanceFields['fake-checking'].available.state, 'UNKNOWN');
});

test('cross-family recovery keeps non-Transactions gaps despite completed cursor', () => {
  const sync = runSyntheticSync(fixture.before, page, { fetchedAt: now });
  assert.equal(sync.status, 'COMMITTED');
  const other = reconcileOtherState({ previous: fixture.before, now, observations: {
    item: { fetchedAt: now },
    accounts: { fetchedAt: now, coverage: 'COMPLETE', accountIds: fixture.before.accountIds },
    balances: { 'fake-checking': { fetchedAt: now, coverage: 'COMPLETE' } },
    historyStatus: sync.snapshot.historyStatus,
  }});
  assert.equal(other.history.state, 'FRESH');
  assert.equal(other.balances['fake-checking'].state, 'UNKNOWN');
  assert.equal(other.missedEvents.state, 'UNKNOWN');
  assert.equal(other.item.state, 'LAST_KNOWN_STALE');
});
