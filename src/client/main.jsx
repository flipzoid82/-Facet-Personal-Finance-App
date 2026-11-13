import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { scenarios } from '../shared/scenarios.js';
import './style.css';

const money = cents => cents == null ? 'Unknown' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
const emptyFilters = { account: '', status: '', category: '' };
const initialScenario = () => new URLSearchParams(location.search).get('scenario') ?? 'normal';
function App() {
  const [path, setPath] = useState(location.pathname);
  const [scenario, setScenario] = useState(initialScenario);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const [edit, setEdit] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const heading = useRef(null), categoryInput = useRef(null), opener = useRef(null), retryButton = useRef(null);
  const controller = useRef(null), requestNumber = useRef(0), focusHeading = useRef(false);
  const load = async (selected = scenario, recovered = false) => {
    controller.current?.abort(); controller.current = new AbortController();
    const number = ++requestNumber.current; setBusy(true); setError('');
    try {
      const response = await fetch(`/api/snapshot?scenario=${encodeURIComponent(selected)}${recovered ? '&recovered=1' : ''}`, { signal: controller.current.signal });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      if (number !== requestNumber.current) return false;
      setData(result); return true;
    } catch (failure) {
      if (number === requestNumber.current && failure.name !== 'AbortError') setError(failure.message);
      return false;
    } finally { if (number === requestNumber.current) setBusy(false); }
  };
  useEffect(() => { load(scenario); return () => { ++requestNumber.current; controller.current?.abort(); }; }, [scenario]);
  useEffect(() => {
    const pop = () => { setPath(location.pathname); setScenario(initialScenario()); setEdit(null); focusHeading.current = true; };
    addEventListener('popstate', pop); return () => removeEventListener('popstate', pop);
  }, []);
  useEffect(() => { if (edit) categoryInput.current?.focus(); }, [edit?.id]);
  useEffect(() => { if (!busy && !error && focusHeading.current) { heading.current?.focus(); focusHeading.current = false; } }, [path, busy, error]);
  const urlFor = to => `${to}${scenario === 'normal' ? '' : `?scenario=${encodeURIComponent(scenario)}`}`;
  const nav = (to, event) => {
    if (event && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    event?.preventDefault(); if (saving) return;
    history.pushState({}, '', urlFor(to)); setPath(to); setEdit(null); setStatus(''); focusHeading.current = true;
    if (to === path) heading.current?.focus(); window.scrollTo(0, 0);
  };
  const link = (to, label) => <a href={urlFor(to)} onClick={event => nav(to, event)}>{label}</a>;
  const chooseScenario = selected => {
    setScenario(selected); setEdit(null); setStatus('Scenario selection changed; saved interpretations are preserved.');
    history.replaceState({}, '', `${path}${selected === 'normal' ? '' : `?scenario=${encodeURIComponent(selected)}`}`);
    if (selected === scenario) load(selected);
  };
  const accounts = data?.accounts ?? [], transactions = data?.transactions ?? [];
  const account = path.startsWith('/accounts/') ? accounts.find(x => x.id === path.split('/')[2]) : null;
  const filtered = transactions.filter(x => (!filters.account || x.accountId === filters.account)
    && (!filters.status || (filters.status === 'pending' ? x.pending : !x.pending))
    && (!filters.category || (x.interpretation.category || 'Uncategorized') === filters.category));
  const hasFilters = Object.values(filters).some(Boolean);
  const categories = [...new Set([...transactions.map(x => x.interpretation.category || 'Uncategorized'), ...(filters.category ? [filters.category] : [])])].sort();
  const provenance = coverage => `Source: ${data.origin}. Observed at (fixture time): ${data.observedAt}. ${data.sourceState}. Coverage: ${coverage}. Current bank freshness is unknown.`;
  const closeEditor = () => { setEdit(null); requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus(); else if (heading.current) heading.current.focus(); else retryButton.current?.focus(); }); };
  const row = item => <li key={item.id} className="row" data-source-id={item.id}><div><strong>{item.merchant ?? 'Unidentified sample merchant'}</strong> · {money(item.amountCents)}<br/>
    <small>{item.date} · {item.pending ? 'Pending' : 'Posted'} · {item.interpretation.category || 'Uncategorized'}<br/>ID: {item.id} · {provenance(data.transactionCoverage)}</small></div>
    <button disabled={saving} aria-label={`Edit interpretation: ${item.merchant ?? 'Unidentified sample merchant'} (${item.id})`} onClick={event => { opener.current = event.currentTarget; setEdit({ id: item.id, ...item.interpretation }); setStatus(''); }}>Edit interpretation</button></li>;
  const rows = items => <>{items.length ? <ul className="transactions">{items.map(row)}</ul> : <p role="status">{data.transactionCoverage === 'missing' ? 'Transactions are missing; coverage is unknown, not an empty history.' : hasFilters && path === '/transactions' ? 'No matches for selected filters. No source records were deleted.' : 'No transactions in this sample dataset.'}</p>}</>;
  const save = async event => {
    event.preventDefault(); if (saving) return; setSaving(true); setStatus('Saving…');
    try {
      const response = await fetch(`/api/transactions/${encodeURIComponent(edit.id)}/override`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category: edit.category, label: edit.label, notes: edit.notes }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      const refreshed = await load(scenario, true);
      setStatus(refreshed ? 'Saved to demo disk state.' : 'Write confirmed in demo disk state, but the display could not reload. Retry loading to verify the shown value.'); closeEditor();
    } catch (failure) { setStatus(`Save failed: ${failure.message}. Previous value was kept.`); categoryInput.current?.focus(); }
    finally { setSaving(false); }
  };
  const title = text => <h1 ref={heading} tabIndex="-1">{text}</h1>;
  return <><a className="skip-link" href="#content">Skip to content</a><header><div className="banner">SYNTHETIC / DEMO — no real accounts connected</div><nav aria-label="Main navigation">{link('/', 'Overview')}{link('/accounts', 'Accounts')}{link('/transactions', 'Transactions')}</nav></header><main id="content" tabIndex="-1">
    <section className="scenarios" aria-label="Invented data scenarios"><label>Synthetic scenario<select value={scenario} disabled={saving} onChange={event => chooseScenario(event.target.value)}>
      {!Object.hasOwn(scenarios, scenario) && <option value={scenario}>Unknown scenario</option>}{Object.entries(scenarios).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
    </select></label><button disabled={saving} onClick={() => chooseScenario('normal')}>Reset scenario</button><p>Invented views only. Reset restores the sample view and preserves saved category, label and notes.</p></section>
    {busy && <p role="status">Loading invented sample data…</p>}
    {error && <div role="alert">Demo data unavailable: {error} <button ref={retryButton} onClick={async () => { focusHeading.current = true; await load(scenario, true); }}>Retry</button></div>}
    {!busy && !error && data && <>
      {path === '/' && <>{title('Overview')}<p data-testid="balance-total">{data.balanceCoverage === 'complete' && accounts.every(x => x.balanceCents != null)
        ? `Invented account balances total ${money(accounts.reduce((sum, x) => sum + x.balanceCents, 0))} across ${accounts.length} included sample accounts.`
        : `Complete balance total: Unknown / incomplete. Known sample subtotal ${money(accounts.reduce((sum, x) => sum + (x.balanceCents ?? 0), 0))}; coverage ${data.balanceCoverage}.`} This is not spendable cash.</p>
        <p>{provenance(data.balanceCoverage)}</p><h2>Sample accounts</h2>{!accounts.length && <p>No accounts in this sample dataset.</p>}<ul>{accounts.map(x => <li key={x.id}>{link(`/accounts/${x.id}`, x.name)} — {money(x.balanceCents)}<br/><small>{provenance(x.balanceCents == null ? 'unknown' : data.balanceCoverage)}</small></li>)}</ul>
        <h2>Recent sample activity</h2><p>{transactions.length} available source rows; transaction coverage: {data.transactionCoverage}.</p>{rows(transactions.slice(0, 3))}{link('/transactions', 'View all transactions')}</>}
      {path === '/accounts' && <>{title('Accounts')}<p>{data.coverage}</p>{!accounts.length && <p>No accounts in this sample dataset.</p>}<ul>{accounts.map(x => <li key={x.id}>{link(`/accounts/${x.id}`, x.name)} — {money(x.balanceCents)}<br/><small>{provenance(x.balanceCents == null ? 'unknown' : data.balanceCoverage)}</small></li>)}</ul></>}
      {account && <>{title(account.name)}<p>Sample balance: {money(account.balanceCents)}.</p><p>{provenance(account.balanceCents == null ? 'unknown' : data.balanceCoverage)}</p><p>{link('/accounts', 'All accounts')} · {link('/transactions', 'All transactions')}</p><h2>Account transactions</h2>{rows(transactions.filter(x => x.accountId === account.id))}</>}
      {path === '/transactions' && <>{title('Transactions')}<p>All {transactions.length} available invented source rows, including pending and unidentified records. Coverage: {data.transactionCoverage}.</p>
        <fieldset disabled={saving}><legend>Filter sample transactions</legend>
          <label>Account<select value={filters.account} onChange={e => setFilters({ ...filters, account: e.target.value })}><option value="">All accounts</option>{accounts.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}{filters.account && !accounts.some(x => x.id === filters.account) && <option value={filters.account}>Account unavailable in this scenario</option>}</select></label>
          <label>Status<select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}><option value="">All statuses</option><option value="pending">Pending</option><option value="posted">Posted</option></select></label>
          <label>Category filter<select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}><option value="">All categories</option>{categories.map(x => <option key={x} value={x}>{x}</option>)}</select></label>
          <button onClick={() => setFilters(emptyFilters)}>Clear filters</button>
        </fieldset><p role="status">Showing {filtered.length} of {transactions.length} available source rows. {hasFilters ? 'Selected filters are active.' : 'No filters selected.'}</p>{rows(filtered)}</>}
      {!['/', '/accounts', '/transactions'].includes(path) && !account && <>{title('Page unavailable')}<p>This account or page is unavailable in the selected sample view. {link('/', 'Return to Overview')}</p></>}
    </>}
    {edit && <section className="editor" aria-label="Edit transaction interpretation"><h2>Edit sample interpretation</h2><p>Source transaction: {edit.id}. Original source facts remain unchanged.</p><form onSubmit={save}>
      <label>Category<input ref={categoryInput} value={edit.category} maxLength="80" readOnly={saving} onChange={e => setEdit({ ...edit, category: e.target.value })}/></label>
      <label>Label<input value={edit.label} maxLength="80" readOnly={saving} onChange={e => setEdit({ ...edit, label: e.target.value })}/></label>
      <label>Notes<textarea value={edit.notes} maxLength="500" readOnly={saving} onChange={e => setEdit({ ...edit, notes: e.target.value })}/></label>
      <button type="submit" disabled={saving}>Save interpretation</button> <button type="button" disabled={saving} onClick={closeEditor}>Cancel</button></form></section>}
    <p role={status.startsWith('Save failed') ? 'alert' : 'status'} aria-live={status.startsWith('Save failed') ? 'assertive' : 'polite'}>{status}</p>
  </main></>;
}
createRoot(document.getElementById('root')).render(<App/>);
