import React from 'react';
import NavItem from './NavItem';

export default function Sidebar({ viewState, setViewState }) {
    return (
        <aside className="w-64 flex flex-col border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
            <div className="p-8 pb-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white leading-none">DeobStep</h1>
                        <span className="text-xs text-zinc-500 font-mono">Forensic Console</span>
                    </div>
                </div>
            </div>

            <nav className="px-4 space-y-2 flex-1">
                <NavItem 
                    label="New Analysis" 
                    active={viewState === 'upload' || viewState === 'polling' || viewState === 'result'}
                    onClick={() => setViewState('upload')}
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
                <NavItem 
                    label="Documentation" 
                    active={viewState === 'docs'}
                    onClick={() => setViewState('docs')}
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
            </nav>
        </aside>
    );
}