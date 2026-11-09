const FRESH = 'FRESH';
const STALE = 'LAST_KNOWN_STALE';
const UNKNOWN = 'UNKNOWN';
const REPAIR = 'REQUIRES_REPAIR';

function entry(state, reason, observation = {}) {
  return {
    state, reason,
    sourceAt: observation.sourceAt ?? null,
    fetchedAt: observation.fetchedAt ?? null,
    coverage: observation.coverage ?? 'UNKNOWN',
    nextAction: observation.nextAction ?? null,
  };
}

function classifyField(observation, now, maxAgeMs) {
  if (!observation) return entry(UNKNOWN, 'NO_POLL_RESULT');
  if (observation.error) {
    return entry(observation.lastKnown ? STALE : UNKNOWN, observation.error, {
      ...observation, nextAction: 'BACKOFF_AND_RETRY',
    });
  }
  if (observation.unsupported) return entry(UNKNOWN, 'UNSUPPORTED_OR_NOT_CONSENTED', observation);
  if (observation.coverage !== 'COMPLETE') return entry(UNKNOWN, 'PARTIAL_OR_UNKNOWN_COVERAGE', observation);
  if (!Number.isFinite(observation.sourceAt)) return entry(UNKNOWN, 'SOURCE_TIME_UNAVAILABLE', observation);
  if (observation.sourceAt > now) return entry(UNKNOWN, 'SOURCE_TIME_IN_FUTURE', observation);
  if (now - observation.sourceAt > maxAgeMs) return entry(STALE, 'SOURCE_TOO_OLD', observation);
  return entry(FRESH, 'SYNTHETIC_SOURCE_TIME_WITHIN_ORACLE', observation);
}

// Observations represent fake on-launch responses. A successful fetch never implies source freshness.
export function reconcileOtherState({ previous = {}, observations = {}, now, maxAgeMs = 86_400_000 }) {
  if (!Number.isFinite(now)) throw new Error('VIRTUAL_TIME_REQUIRED');
  const item = observations.item;
  let itemStatus;
  if (!item) itemStatus = entry(UNKNOWN, 'ITEM_STATUS_NOT_POLLED');
  else if (item.revoked || item.error === 'ITEM_LOGIN_REQUIRED' ||
    (Number.isFinite(item.consentExpiresAt) && item.consentExpiresAt <= now)) {
    itemStatus = entry(REPAIR, item.revoked ? 'CONSENT_REVOKED' : 'ITEM_OR_CONSENT_REPAIR', {
      ...item, nextAction: 'USER_REAUTH_OR_RETENTION_REVIEW',
    });
  } else if (item.error) itemStatus = entry(UNKNOWN, item.error, { ...item, nextAction: 'BACKOFF_AND_RETRY' });
  else itemStatus = entry(STALE, 'NO_WEBHOOK_GAP_CANNOT_PROVE_CONTINUOUS_CONSENT', item);

  const accountPoll = observations.accounts;
  let accounts;
  if (!accountPoll) accounts = entry(UNKNOWN, 'ACCOUNTS_NOT_POLLED');
  else if (accountPoll.error) accounts = entry(STALE, accountPoll.error, { ...accountPoll, nextAction: 'BACKOFF_AND_RETRY' });
  else if (accountPoll.coverage !== 'COMPLETE') accounts = entry(UNKNOWN, 'ACCOUNT_COVERAGE_PARTIAL', accountPoll);
  else accounts = entry(STALE, 'LISTED_ACCOUNTS_DO_NOT_PROVE_UNSELECTED_NEW_ACCOUNTS', accountPoll);

  const oldIds = new Set(previous.accountIds ?? []);
  const newIds = new Set(accountPoll?.accountIds ?? []);
  const missingAccounts = accountPoll && !accountPoll.error
    ? [...oldIds].filter(id => !newIds.has(id)) : [];
  const addedAccounts = accountPoll && !accountPoll.error
    ? [...newIds].filter(id => !oldIds.has(id)) : [];
  if (missingAccounts.length) accounts.nextAction = 'REVIEW_CLOSED_OR_REVOKED_ACCOUNT_AND_RETENTION';

  const balances = {};
  const balanceFields = {};
  for (const accountId of new Set([...oldIds, ...newIds])) {
    const observed = observations.balances?.[accountId];
    balances[accountId] = classifyField(observed, now, maxAgeMs);
    balanceFields[accountId] = {
      current: classifyField(observed?.current ?? observed, now, maxAgeMs),
      available: observed?.available === null
        ? entry(UNKNOWN, 'AVAILABLE_BALANCE_NOT_RETURNED', observed)
        : classifyField(observed?.available ?? observed, now, maxAgeMs),
    };
  }
  const liabilities = classifyField(observations.liabilities, now, maxAgeMs);
  const liabilityFields = {};
  for (const name of ['creditMinimum', 'creditDueDate', 'loanBalance']) {
    liabilityFields[name] = classifyField(observations.liabilities?.fields?.[name], now, maxAgeMs);
  }
  const recurring = classifyField(observations.recurring, now, maxAgeMs);

  const history = observations.historyStatus === 'HISTORICAL_UPDATE_COMPLETE'
    ? entry(FRESH, 'SYNTHETIC_HISTORY_READY_SIGNAL', { fetchedAt: now, coverage: 'COMPLETE' })
    : entry(UNKNOWN, observations.historyStatus === 'NOT_READY' ? 'INITIAL_HISTORY_NOT_READY' : 'HISTORY_READINESS_UNVERIFIED');
  const missedEvents = entry(UNKNOWN, 'OFFLINE_WEBHOOK_EVENTS_NOT_REPLAYED', {
    nextAction: 'POLL_CURRENT_STATE_AND_REVIEW_UNRECOVERABLE_GAPS',
  });

  if (itemStatus.state === REPAIR) {
    for (const field of [accounts, liabilities, recurring, ...Object.values(balances),
      ...Object.values(balanceFields).flatMap(group => Object.values(group)),
      ...Object.values(liabilityFields)]) {
      if (field.state === FRESH) {
        field.state = UNKNOWN;
        field.reason = 'ITEM_REPAIR_REQUIRED_BEFORE_TRUSTING_SOURCE';
      }
    }
  }

  return { item: itemStatus, accounts, missingAccounts, addedAccounts, balances,
    balanceFields, liabilities, liabilityFields, recurring, history, missedEvents,
    retentionReviewRequired: Boolean(item?.revoked || missingAccounts.length),
  };
}
