import React from 'react';

export default function ResultView({ fileName, jobId, handleReset, data }) {
    // If no data is passed, show a loading or error state (optional safety)
    if (!data) return <div className="text-white">No data available.</div>;

    return (
        <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        {fileName}
                        <span className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                            {jobId}
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-sm mt-1">Forensic Analysis Report • {data.steps.length} Steps Logged</p>
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
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Original Artifact
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap">
                        {data.original_source}
                    </pre>
                </div>

                {/* PANEL 2: CHAIN OF CUSTODY (Tree View) */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Deobfuscation Chain
                    </div>
                    <div className="flex-1 p-4 overflow-auto space-y-3 bg-zinc-900/50">
                        {data.steps.map((step) => (
                            <div key={step.id} className="p-3 bg-zinc-800/50 rounded border border-zinc-700 hover:border-blue-500/50 transition group">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-blue-400 text-[10px] uppercase">{step.type}</span>
                                    <span className="text-zinc-500 text-[10px]">Layer {step.layer}</span>
                                </div>
                                <code className="block bg-black/30 p-1.5 rounded text-[11px] text-zinc-300 font-mono break-all mb-2 border border-zinc-800">
                                    {step.content}
                                </code>
                                <div className="text-[11px] text-green-500 font-mono pl-2 border-l-2 border-green-500/30">
                                    ➔ {step.result}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PANEL 3: FINAL RESULT */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-green-500 uppercase tracking-wider">
                        Deobfuscated Output
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-green-400 whitespace-pre-wrap bg-green-900/5">
                        {data.deobfuscated_source}
                    </pre>
                </div>

            </div>
        </div>
    );
}