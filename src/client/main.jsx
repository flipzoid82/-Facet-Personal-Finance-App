import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const money = cents => cents == null ? 'Unknown' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
function route() { return location.pathname; }
function App() {
  const [path, setPath] = useState(route());
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const [edit, setEdit] = useState(null);
  const [status, setStatus] = useState('');
  const load = async () => {
    setBusy(true); setError('');
    try { const response = await fetch('/api/snapshot'); if (!response.ok) throw new Error((await response.json()).error); setData(await response.json()); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  };
  useEffect(() => { load(); const pop = () => setPath(route()); addEventListener('popstate', pop); return () => removeEventListener('popstate', pop); }, []);
  const nav = (to, event) => { event?.preventDefault(); history.pushState({}, '', to); setPath(to); setEdit(null); setStatus(''); window.scrollTo(0, 0); };
  const link = (to, label) => <a href={to} onClick={event => nav(to, event)}>{label}</a>;
  const accounts = data?.accounts ?? [];
  const transactions = data?.transactions ?? [];
  const account = path.startsWith('/accounts/') ? accounts.find(x => x.id === decodeURIComponent(path.split('/')[2])) : null;
  const displayed = account ? transactions.filter(x => x.accountId === account.id) : transactions;
  const row = item => <li key={item.id} className="row"><div><strong>{item.merchant ?? 'Unidentified sample merchant'}</strong> · {money(item.amountCents)}<br/><small>{item.date} · {item.pending ? 'Pending · ' : ''}{item.interpretation.category || 'Uncategorized'} · Source: {item.sourceOrigin}</small></div><button onClick={() => { setEdit({ id: item.id, ...item.interpretation }); setStatus(''); }}>Edit interpretation</button></li>;
  const save = async event => {
    event.preventDefault(); setStatus('Saving…');
    try {
      const response = await fetch(`/api/transactions/${encodeURIComponent(edit.id)}/override`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category: edit.category, label: edit.label, notes: edit.notes }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      await load(); setStatus('Saved to demo disk state.'); setEdit(null);
    } catch (failure) { setStatus(`Save failed: ${failure.message}. Previous value was kept.`); }
  };
  return <><header><div className="banner">SYNTHETIC / DEMO — no real accounts connected</div><nav aria-label="Main navigation">{link('/', 'Overview')}{link('/accounts', 'Accounts')}{link('/transactions', 'Transactions')}</nav></header><main>
    {busy && <p role="status">Loading invented sample data…</p>}
    {error && <div role="alert">Demo data unavailable: {error} <button onClick={load}>Retry</button></div>}
    {!busy && !error && data && <>
      {path === '/' && <><h1>Overview</h1><p>Invented account balances total {money(accounts.reduce((sum, x) => sum + (x.balanceCents ?? 0), 0))} across {accounts.length} included sample accounts. This is not spendable cash.</p><p>Source: {data.origin}. Observed at (fixture time): {data.observedAt}. Coverage: {data.coverage}. Current bank freshness is unknown.</p><h2>Sample accounts</h2><ul>{accounts.map(x => <li key={x.id}>{link(`/accounts/${x.id}`, x.name)} — {money(x.balanceCents)}</li>)}</ul><h2>Recent sample activity</h2><ul>{transactions.slice(0, 3).map(row)}</ul>{link('/transactions', 'View all transactions')}</>}
      {path === '/accounts' && <><h1>Accounts</h1><p>{data.coverage}</p><ul>{accounts.map(x => <li key={x.id}>{link(`/accounts/${x.id}`, x.name)} — {money(x.balanceCents)}</li>)}</ul></>}
      {account && <><h1>{account.name}</h1><p>Sample balance: {money(account.balanceCents)}. Source: {data.origin}; fixture time {data.observedAt}.</p><p>{link('/accounts', 'All accounts')} · {link('/transactions', 'All transactions')}</p><h2>Account transactions</h2><ul>{displayed.map(row)}</ul></>}
      {path === '/transactions' && <><h1>Transactions</h1><p>All {transactions.length} invented source rows, including pending and unidentified records.</p><ul>{transactions.map(row)}</ul></>}
      {!['/', '/accounts', '/transactions'].includes(path) && !account && <><h1>Page unavailable</h1><p>{link('/', 'Return to Overview')}</p></>}
    </>}
    {edit && <section className="editor" aria-label="Edit transaction interpretation"><h2>Edit sample interpretation</h2><p>Source transaction: {edit.id}. Original source facts remain unchanged.</p><form onSubmit={save}><label>Category<input value={edit.category} maxLength="80" onChange={e => setEdit({ ...edit, category: e.target.value })}/></label><label>Label<input value={edit.label} maxLength="80" onChange={e => setEdit({ ...edit, label: e.target.value })}/></label><label>Notes<textarea value={edit.notes} maxLength="500" onChange={e => setEdit({ ...edit, notes: e.target.value })}/></label><button type="submit">Save interpretation</button> <button type="button" onClick={() => setEdit(null)}>Cancel</button></form></section>}
    <p role="status" aria-live="polite">{status}</p>
  </main></>;
}
createRoot(document.getElementById('root')).render(<App/>);
