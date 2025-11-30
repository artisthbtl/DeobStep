// resources/js/Components/Views/HistoryView.jsx
import React from 'react';

// Terima props data dan fungsi klik dari Home
export default function HistoryView({ historyData, onSelectJob }) {
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-green-500">📜</span> Investigation History
            </h1>

            <div className="grid gap-4">
                {/* Looping Data History */}
                {historyData.map((job) => (
                    <div 
                        key={job.id}
                        // Saat diklik, panggil onSelectJob
                        onClick={() => onSelectJob(job.id)}
                        className="group flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-green-500/50 hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-zinc-800 text-green-400 group-hover:bg-green-900/20 group-hover:text-green-300 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
                                    {job.id}
                                </h3>
                                <p className="text-sm text-zinc-400 flex items-center gap-2">
                                    {job.filename} 
                                    <span className="w-1 h-1 rounded-full bg-zinc-600"></span> 
                                    {job.date}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${
                                job.status === 'Dangerous' ? 'bg-red-900/20 border-red-800 text-red-400' :
                                job.status === 'Safe' ? 'bg-green-900/20 border-green-800 text-green-400' :
                                'bg-zinc-800 border-zinc-700 text-zinc-400'
                            }`}>
                                {job.status}
                            </span>
                            <svg className="w-5 h-5 text-zinc-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}