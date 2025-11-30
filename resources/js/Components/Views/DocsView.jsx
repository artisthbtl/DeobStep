import React from 'react';

export default function DocsView() {
    return (
        <div className="max-w-3xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-green-400">
            <h1 className="text-3xl font-bold mb-6">Documentation</h1>
            <p className="text-lg text-zinc-400 mb-8">
                DeobStep helps security researchers analyze obfuscated scripts safely.
            </p>
            
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl mb-8">
                <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
                <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                    <li>Prepare your <code className="text-green-400 bg-zinc-950 px-1 py-0.5 rounded">.ps1</code> file.</li>
                    <li>Upload using the dashboard.</li>
                    <li>Wait for the engine to sanitize and analyze the code.</li>
                    <li>Download the report in MD or PDF format.</li>
                </ol>
            </div>
        </div>
    );
}