import React from 'react';

export default function Md({ text, className = "" }) {
  if (!text) return null;
  const lines = text.split('\n');
  const out = []; let i = 0;
  const fmt = (s) => {
    const p = []; let r = s, k = 0;
    while (r) {
      const m = r.match(/\*\*(.+?)\*\*/);
      if (m) {
        const idx = r.indexOf(m[0]);
        if (idx > 0) p.push(<span key={k++}>{r.slice(0, idx)}</span>);
        p.push(<strong key={k++} className="font-semibold text-gray-900">{m[1]}</strong>);
        r = r.slice(idx + m[0].length);
      } else { p.push(<span key={k++}>{r}</span>); break; }
    }
    return p;
  };
  while (i < lines.length) {
    const l = lines[i];
    if (l.startsWith('### ')) out.push(<h3 key={i} className="text-sm font-bold text-gray-900 mt-4 mb-1.5">{fmt(l.slice(4))}</h3>);
    else if (l.startsWith('## ')) out.push(<h2 key={i} className="text-base font-extrabold text-gray-900 mt-5 mb-2">{fmt(l.slice(3))}</h2>);
    else if (l.startsWith('# ')) out.push(<h1 key={i} className="text-lg font-extrabold text-gray-900 mt-5 mb-2 pb-2 border-b border-gray-200">{fmt(l.slice(2))}</h1>);
    else if (l.startsWith('- ') || l.startsWith('* ')) {
      const items = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(<li key={i} className="text-sm text-gray-700 leading-relaxed ml-4">{fmt(lines[i].slice(2))}</li>); i++;
      }
      out.push(<ul key={`u${i}`} className="list-disc space-y-1 my-1.5">{items}</ul>); continue;
    } else if (/^\d+[\.\)]\s/.test(l)) {
      const items = [];
      while (i < lines.length && /^\d+[\.\)]\s/.test(lines[i])) {
        items.push(<li key={i} className="text-sm text-gray-700 leading-relaxed ml-4">{fmt(lines[i].replace(/^\d+[\.\)]\s/, ''))}</li>); i++;
      }
      out.push(<ol key={`o${i}`} className="list-decimal space-y-1 my-1.5">{items}</ol>); continue;
    } else if (l.startsWith('---')) out.push(<hr key={i} className="my-3 border-gray-200" />);
    else if (!l.trim()) out.push(<div key={i} className="h-1.5" />);
    else out.push(<p key={i} className="text-sm text-gray-700 leading-relaxed my-1">{fmt(l)}</p>);
    i++;
  }
  return <div className={className}>{out}</div>;
}