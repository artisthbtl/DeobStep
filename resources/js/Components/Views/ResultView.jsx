import React from 'react';

export default function ResultView({ fileName, jobId, handleReset, data }) {
    // Safety check jika data belum siap
    if (!data) return <div className="text-zinc-500 flex h-full items-center justify-center">No analysis data available.</div>;

    return (
        <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        {fileName || "Unknown File"}
                        <span className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                            {jobId || "NO-ID"}
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        Forensic Analysis Report • {data.steps ? data.steps.length : 0} Steps Logged
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleReset} className="px-4 py-2 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white rounded-lg text-sm transition">
                        New Analysis
                    </button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-green-900/40 transition">
                        Download Report
                    </button>
                </div>
            </div>

            {/* --- 3-PANEL DASHBOARD --- */}
            <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                
                {/* PANEL 1: ORIGINAL SCRIPT */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-zinc-400 uppercase tracking-wider flex justify-between items-center">
                        <span>Original Artifact</span>
                        <span className="text-[10px] bg-zinc-700 px-1.5 rounded text-white">READ ONLY</span>
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap custom-scrollbar">
                        {data.original_source}
                    </pre>
                </div>

                {/* PANEL 2: DEOBFUSCATION CHAIN (Updated to match new mockData) */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Deobfuscation Chain
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-zinc-900/30 custom-scrollbar">
                        <div className="space-y-6">
                            {data.steps && data.steps.map((step) => (
                                <div key={step.id} className="relative pl-6 border-l-2 border-zinc-800 hover:border-zinc-600 transition-colors group">
                                    
                                    {/* Dot Indicator (Warna berubah sesuai tipe log) */}
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 bg-[#1e1e1e] transition-all group-hover:scale-110 
                                        ${step.type === 'danger' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 
                                          step.type === 'success' ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                                          step.type === 'warning' ? 'border-yellow-500' : 
                                          'border-blue-500'}`}>
                                    </div>

                                    {/* Header Step */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 rounded border border-zinc-800">
                                            {step.timestamp}
                                        </span>
                                        <h4 className={`text-sm font-bold truncate ${
                                            step.type === 'danger' ? 'text-red-400' : 
                                            step.type === 'success' ? 'text-green-400' : 
                                            step.type === 'warning' ? 'text-yellow-400' : 'text-blue-300'
                                        }`}>
                                            {step.title}
                                        </h4>
                                    </div>
                                    
                                    {/* Message */}
                                    <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                                        {step.message}
                                    </p>
                                    
                                    {/* Code Snippet Box (Jika ada) */}
                                    {step.code_snippet && (
                                        <div className="relative group/code">
                                            <div className="bg-black/50 border border-zinc-800 rounded p-2 text-[10px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all">
                                                {step.code_snippet}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PANEL 3: FINAL RESULT */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-green-500 uppercase tracking-wider flex justify-between items-center">
                        <span>Deobfuscated Output</span>
                        <span className="text-[10px] bg-green-900/30 text-green-400 px-1.5 rounded border border-green-500/20">FINAL</span>
                    </div>
                    {/* Menggunakan deobfuscated_output agar sesuai dengan mockData baru */}
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-green-400 whitespace-pre-wrap bg-green-950/5 custom-scrollbar">
                        {data.deobfuscated_output}
                    </pre>
                </div>
    
            </div>
        </div>
    );
}