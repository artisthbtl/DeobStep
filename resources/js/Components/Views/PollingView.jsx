import React, { useEffect } from 'react';

export default function PollingView({ jobId, setViewState }) {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setViewState('result');
        }, 3000);
        return () => clearTimeout(timer);
    }, [setViewState]);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-300">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent shadow-[0_0_20px_rgba(34,197,94,0.4)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Analyzing Artifacts</h2>
            <p className="text-zinc-500 font-mono bg-zinc-900 px-3 py-1 rounded border border-zinc-800">Case ID: <span className="text-green-400">{jobId}</span></p>
            <p className="text-xs text-zinc-600 mt-8 animate-pulse">Running Forensic Engine...</p>
        </div>
    );
}