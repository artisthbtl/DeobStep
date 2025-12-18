import React from 'react';

const DownloadResult = ({ data, jobId, displaySteps, handleReset }) => {
    
    const downloadMarkdown = () => {
        if (!data) return;

        const stepsFormatted = displaySteps.map(s => 
            `- [${s.timestamp}] ${s.title}\n  Message: ${s.message}\n  Snippet: ${s.code_snippet || 'N/A'}`
        ).join('\n\n');

        const content = `
# DEOBSTEP FORENSIC REPORT
==================================================
Job ID       : ${jobId || data.jobId || 'UNKNOWN'}
Timestamp    : ${data.timestamp || new Date().toLocaleString()}
Threat Level : ${data.threat_level || 'Unknown'}
Status       : ${data.status || 'Analyzed'}
==================================================

## 1. ORIGINAL ARTIFACT (OBFUSCATED)
\`\`\`powershell
${data.original_source}
\`\`\`

## 2. DEOBFUSCATED OUTPUT (CLEAN)
\`\`\`powershell
${data.deobfuscated_output}
\`\`\`

## 3. DEOBFUSCATION STEPS (CHAIN)
${stepsFormatted}

## 4. ANALYSIS SUMMARY
Generated automatically by DeobStep Engine.
End of Report.`.trim();

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Report_${jobId || 'analysis'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePrintPDF = () => window.print();

    return (
        <>
            <style>{`
                @media print {
                    button, nav, aside, .sidebar-container, .no-print { display: none !important; }
                    body, #app, main, div { background-color: white !important; color: black !important; height: auto !important; overflow: visible !important; }
                    .grid-cols-3 { display: block !important; gap: 0 !important; }
                    .overflow-auto, .custom-scrollbar { overflow: visible !important; height: auto !important; max-height: none !important; }
                    .rounded-xl { border: 1px solid #ccc !important; border-radius: 4px !important; margin-bottom: 20px !important; box-shadow: none !important; break-inside: avoid; }
                    pre { background-color: #f5f5f5 !important; color: #333 !important; white-space: pre-wrap !important; border: 1px solid #ddd; }
                    h2, h4 { color: black !important; }
                }
            `}</style>

            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4 px-4 pt-4 print:border-b-2 print:border-black">
                <div>
                    <h2 className="text-2xl font-bold text-white print:text-black">Analysis Result</h2>
                    <div className="text-zinc-400 text-sm mt-1 print:text-black">
                        ID: <span className="text-green-400 font-mono print:text-black print:font-bold">{jobId || data.jobId}</span> • 
                        {data.timestamp}
                    </div>
                </div>
                
                <div className="flex gap-2 no-print">
                    <button onClick={downloadMarkdown} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-green-400 border border-zinc-700 rounded text-xs transition-colors flex items-center gap-2">
                        <span>⬇ MD</span>
                    </button>
                    <button onClick={handlePrintPDF} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-blue-400 border border-zinc-700 rounded text-xs transition-colors">
                        <span>🖨 PDF</span>
                    </button>
                    <button onClick={handleReset} className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900 rounded text-sm transition-colors">
                        New Analysis
                    </button>
                </div>
            </div>
        </>
    );
};

export default DownloadResult;