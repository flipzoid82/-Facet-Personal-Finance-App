import snapshot from '../../fixtures/snapshot.json' with { type: 'json' };

export const fixture = Object.freeze(snapshot);
export const transactionIds = new Set(snapshot.transactions.map(x => x.id));
export const editableFields = ['category', 'label', 'notes'];
export function validateOverride(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(k => !editableFields.includes(k))) throw new Error('Only category, label and notes may be edited');
  if (!editableFields.every(k => Object.hasOwn(body, k))) throw new Error('Supply category, label and notes');
  for (const [key, limit] of [['category', 80], ['label', 80], ['notes', 500]]) {
    if (typeof body[key] !== 'string' || body[key].length > limit) throw new Error(`${key} must be text of at most ${limit} characters`);
  }
  return { category: body.category, label: body.label, notes: body.notes };
}
export function joinedTransactions(overrides) {
  return snapshot.transactions.map(source => ({ ...source, interpretation: overrides[source.id] ?? { category: source.category ?? '', label: source.label, notes: source.notes }, sourceOrigin: snapshot.origin }));
}
