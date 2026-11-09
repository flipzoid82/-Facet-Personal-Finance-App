import { randomBytes } from 'node:crypto';

const PLATFORMS = new Set(['desktop-browser', 'android-browser']);
const MODES = new Set(['initial', 'update']);

export function startBrowserFlow({
  platform, mode, sessionId, expectedOrigin, now, ttlMs = 300_000,
  nonce = randomBytes(16).toString('hex'), popupAllowed = true,
  itemId = null, repairReason = null, repairIntent = 'login-repair',
  route = 'domainless', generation = 1,
}) {
  if (!PLATFORMS.has(platform) || !MODES.has(mode)) throw new Error('INVALID_FLOW_KIND');
  if (!sessionId || !expectedOrigin || !Number.isFinite(now) || !nonce || ttlMs <= 0) {
    throw new Error('INVALID_FLOW_INPUT');
  }
  if (mode === 'update' && (!itemId || !repairReason)) throw new Error('REPAIR_CONTEXT_REQUIRED');
  if (mode === 'update' && !['login-repair', 'consent-renewal', 'account-reselection'].includes(repairIntent)) {
    throw new Error('INVALID_REPAIR_INTENT');
  }
  if (!['domainless', 'registered-redirect'].includes(route)) throw new Error('INVALID_ROUTE');

  return Object.freeze({
    platform, mode, sessionId, expectedOrigin, nonce, expiresAt: now + ttlMs,
    phase: popupAllowed ? 'AWAITING_CALLBACK' : 'POPUP_BLOCKED',
    launchSurface: platform === 'desktop-browser' ? 'popup' : 'new-tab',
    route, generation, itemId, repairReason, repairIntent: mode === 'update' ? repairIntent : null,
    providerDisposition: mode === 'update' && route === 'domainless' ? 'UNKNOWN' : 'NOT_TESTED',
  });
}

export function finishBrowserFlow(flow, event, now) {
  if (flow.phase !== 'AWAITING_CALLBACK') return { flow, outcome: 'REJECTED_NOT_ACTIVE' };
  if (!Number.isFinite(now) || now > flow.expiresAt) {
    return { flow: Object.freeze({ ...flow, phase: 'EXPIRED' }), outcome: 'REJECTED_EXPIRED' };
  }
  if (event.type === 'cancel' || event.type === 'aborted-redirect') {
    return { flow: Object.freeze({ ...flow, phase: 'EXITED' }), outcome: 'USER_EXITED' };
  }
  if (event.type !== 'callback') return { flow, outcome: 'REJECTED_EVENT' };
  if (event.mode !== flow.mode) return { flow, outcome: 'REJECTED_CROSS_MODE' };
  if (event.sessionId !== flow.sessionId) return { flow, outcome: 'REJECTED_SESSION' };
  if (event.origin !== flow.expectedOrigin) return { flow, outcome: 'REJECTED_ORIGIN' };
  if (event.nonce !== flow.nonce) return { flow, outcome: 'REJECTED_NONCE' };

  return {
    flow: Object.freeze({
      ...flow, phase: 'COMPLETE', nonce: null, completedAt: now,
      nextAction: flow.mode === 'initial' ? 'START_INITIAL_SOURCE_CHECKS'
        : flow.repairIntent === 'consent-renewal' ? 'RECHECK_CONSENT_AND_SOURCES'
          : flow.repairIntent === 'account-reselection' ? 'RECHECK_ACCOUNT_COVERAGE_AND_SOURCES'
            : 'RECONCILE_ALL_SOURCES',
    }),
    outcome: 'MOCK_CALLBACK_ACCEPTED',
  };
}

export function retryBrowserFlow(flow, { now, nonce = randomBytes(16).toString('hex'), ttlMs = 300_000 }) {
  if (!['POPUP_BLOCKED', 'EXITED', 'EXPIRED'].includes(flow.phase)) throw new Error('RETRY_NOT_ALLOWED');
  return startBrowserFlow({ ...flow, now, nonce, ttlMs, generation: flow.generation + 1, popupAllowed: true });
}
