import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, FileText, ClipboardList, Loader2, Send, Plus, FileDown, X, Copy, Check, CheckCircle } from '../../../icons';
import Md from '../../../components/Md';
import { callRex } from '../api/rexClient';
import { parseResponse } from '../lib/parseRexResponse';

export default function CreateJobWithRex({ addJob, go }) {
  const [msgs, setMsgs] = useState([{
    role:'assistant',
    content:"Hi! I'm Rex, your AI hiring assistant 🤖\n\nI'll help you create a professional job description and a full assessment plan. Let's start!\n\n**What role are you hiring for?** Give me the job title and a quick sentence about what this person would do."
  }]);
  const [apiH, setApiH] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [jd, setJd] = useState(null);
  const [assess, setAssess] = useState(null);
  const [panel, setPanel] = useState(null); // 'jd' | 'assess' | null
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim(); setInput(''); setErr(null);
    setMsgs(p => [...p, { role:'user', content:txt }]);
    const newH = [...apiH, { role:'user', content:txt }];
    setApiH(newH); setLoading(true);

    const res = await callRex(newH);
    if (res.ok) {
      const { display, jd: newJd, assessment: newAs } = parseResponse(res.text);
      if (newJd) { setJd(newJd); setPanel('jd'); }
      if (newAs) { setAssess(newAs); if (!newJd) setPanel('assess'); }
      setMsgs(p => [...p, { role:'assistant', content:display, hasJd:!!newJd, hasAs:!!newAs }]);
      setApiH(p => [...p, { role:'assistant', content:res.text }]);
    } else {
      setErr(res.error);
      setMsgs(p => [...p, { role:'assistant', content:"Hmm, I had trouble connecting. Could you try again?", isErr:true }]);
    }
    setLoading(false);
  };

  const publish = () => {
    if (!jd) return;
    const tm = jd.match(/^#\s+(.+)/m);
    const title = tm ? tm[1].trim() : "New Role";
    const sm = jd.match(/(?:Must Have|Required|Requirements)[:\s]*\n([\s\S]*?)(?:\n\n|\n##|\n#)/i);
    let skills = ["To be defined"];
    if (sm) skills = sm[1].split('\n').map(s=>s.replace(/^[-*•]\s*/,'').trim()).filter(s=>s.length>2&&s.length<40).slice(0,5);
    addJob({
      id: Date.now(),
      title,
      level: "Mid Level",
      location: "Remote",
      mode: "Remote",
      date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      status: "Published",
      skills,
      applicants: 0,
      shortlisted: 0,
      description: jd,
      assessment: assess,
      candidates: []
    });
    setCreated(true);
  };

  const dl = (type) => {
    const c = type === 'jd' ? jd : assess;
    const blob = new Blob([c], { type: 'text/markdown' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = u; a.download = type === 'jd' ? 'Job_Description.md' : 'Assessment_Plan.md';
    a.click(); URL.revokeObjectURL(u);
  };

  const cp = (type) => {
    navigator.clipboard.writeText(type === 'jd' ? jd : assess);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] anim">
      {/* CHAT */}
      <div className={`flex flex-col transition-all duration-300 ${panel ? 'w-[55%]' : 'w-full'}`}>
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">Create Job with Rex</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-gray-500">AI Hiring Assistant · Powered by Claude</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {jd && <button onClick={() => setPanel('jd')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${panel === 'jd' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><FileText size={13}/>Job Description</button>}
            {assess && <button onClick={() => setPanel('assess')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${panel === 'assess' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><ClipboardList size={13}/>Assessment</button>}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {msgs.map((m,i)=>(
            <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'} anim`}>
              {m.role==='assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-sm">
                  <Sparkles size={13} className="text-white"/>
                </div>
              )}
              <div className={`max-w-lg px-4 py-3.5 rounded-2xl text-sm leading-relaxed ${
                m.role==='user'
                  ? 'bg-gray-900 text-white rounded-tr-sm'
                  : m.isErr
                    ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-sm shadow-sm'
              }`}>
                <Md text={m.content}/>
                {(m.hasJd || m.hasAs) && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                    {m.hasJd && <button onClick={() => setPanel('jd')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-100"><FileText size={12}/>View Job Description →</button>}
                    {m.hasAs && <button onClick={() => setPanel('assess')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100"><ClipboardList size={12}/>View Assessment Plan →</button>}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3 anim">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm"><Sparkles size={13} className="text-white"/></div>
              <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-red-500"/><span className="text-xs text-gray-500">Rex is thinking...</span>
              </div>
            </div>
          )}
          {err && <div className="flex justify-center"><div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-xs text-red-600 flex items-center gap-2">⚠️ {err}</div></div>}
          <div ref={endRef}/>
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          {created && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-sm text-green-700">
              <CheckCircle size={16}/> Job published!
              <button onClick={() => go('jobs-active')} className="ml-auto font-semibold underline hover:no-underline">View Active Jobs →</button>
            </div>
          )}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
              placeholder={loading ? "Rex is typing..." : "Type your message... (Enter to send)"}
              disabled={loading}
              className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50"
            />
            <button onClick={send} disabled={loading || !input.trim()} className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-700 hover:to-red-600">
              {loading ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENT PANEL */}
      {panel && (
        <div className="w-[45%] border-l border-gray-200 bg-gray-50/80 flex flex-col" style={{animation:'slideIn .3s ease-out'}}>
          <div className="px-5 py-3 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {panel==='jd' ? <FileText size={17} className="text-red-600"/> : <ClipboardList size={17} className="text-blue-600"/>}
              <h2 className="text-sm font-bold text-gray-900">{panel==='jd'?'Job Description':'Assessment Plan'}</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => { const _ = cp(panel); }} className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200">
                {copied ? <Check size={12} className="text-green-600"/> : <Copy size={12}/>} {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={() => dl(panel)} className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800"><FileDown size={12}/>Download</button>
              {jd && !created && panel === 'jd' && (
                <button onClick={publish} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white" style={{background:'linear-gradient(135deg,#dc2626,#ef4444)'}}>
                  <Plus size={12}/>Publish Job
                </button>
              )}
              <button onClick={() => setPanel(null)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={15} className="text-gray-400"/></button>
            </div>
          </div>

          {jd && assess && (
            <div className="px-5 py-2 bg-white border-b border-gray-100 flex gap-2">
              <button onClick={() => setPanel('jd')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${panel==='jd'?'bg-red-100 text-red-700':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>📄 Job Description</button>
              <button onClick={() => setPanel('assess')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${panel==='assess'?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>📋 Assessment Plan</button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <Md text={panel==='jd' ? jd : assess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
