import React, { useState } from 'react';

export default function HistoryView() {
    // Moved dummy data here since it belongs to this view
    const [historyList] = useState([
        { id: "CASE-8821", name: "suspicious_payroll.ps1", date: "2 hours ago", status: "Malicious" },
        { id: "CASE-1290", name: "update_win.ps1", date: "5 hours ago", status: "Clean" },
    ]);

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6 text-white">Case History</h2>
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30">
                <table className="w-full text-left">
                    <thead className="bg-zinc-900 text-xs uppercase text-zinc-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Case ID</th>
                            <th className="px-6 py-4">Filename</th>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4 text-right">Verdict</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {historyList.map((item, index) => (
                            <tr key={index} className="hover:bg-zinc-800/50 transition cursor-pointer group">
                                <td className="px-6 py-4 font-mono text-zinc-400 group-hover:text-green-400 transition-colors">{item.id}</td>
                                <td className="px-6 py-4 font-medium text-zinc-200">{item.name}</td>
                                <td className="px-6 py-4 text-zinc-500 text-sm">{item.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        item.status === 'Malicious' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                        item.status === 'Clean' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}