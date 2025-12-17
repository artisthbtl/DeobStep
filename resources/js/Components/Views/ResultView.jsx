import React, { useState, useEffect } from 'react';

const processRawLogs = (rawLogInput) => {
    if (!rawLogInput) return [];
    try {
        const logs = typeof rawLogInput === 'string' ? JSON.parse(rawLogInput) : rawLogInput;
        return logs.map((log, index) => {
            let title = "Unknown Operation";
            let message = "Processing node...";
            let type = "info"; 
            let snippet = "";

            if (log.astType === 'InvokeMemberExpressionAst') {
                title = `Method Call: ${log.method || 'Unknown'}`;
                message = "Executing .NET method to reconstruct string.";
                type = "blue";
                if (log.output && log.output.value) snippet = `Output: "${log.output.value}"`;
            } else if (log.astType === 'AssignmentStatementAst') {
                title = `Variable Assignment: $${log.variablePath}`;
                message = "Storing decoded payload into memory.";
                type = "warning";
                snippet = `Value: ${log.value}`;
            } else if (log.astType === 'CommandAst') {
                title = `Command Execution: ${log.commandName}`;
                snippet = `Args: ${log.argues?.map(arg => arg.value).join(' ')}`;
                if (['Invoke-Expression', 'IEX'].includes(log.commandName)) {
                    type = "danger";
                    message = "Detected execution of dynamic code.";
                } else {
                    type = "success";
                    message = `Executing standard cmdlet: ${log.commandName}`;
                }
            } else {
                title = log.astType ? log.astType.split('.').pop() : 'Node';
                message = "AST Node evaluation.";
            }

            return {
                id: index,
                timestamp: `Step ${index + 1}`,
                title, message, type, code_snippet: snippet
            };
        });
    } catch (e) {
        console.error("Failed to parse raw logs:", e);
        return [];
    }
};

export default function ResultView({ fileName, jobId, handleReset, data }) {
    const [displaySteps, setDisplaySteps] = useState([]);

    useEffect(() => {
        if (data) {
            if (data.raw_log) setDisplaySteps(processRawLogs(data.raw_log));
            else if (data.steps) setDisplaySteps(data.steps);
        }
    }, [data]);

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
End of Report.
        `.trim();

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

    const handlePrintPDF = () => {
        window.print();
    };

    if (!data) return <div className="text-zinc-500 flex h-full items-center justify-center">No analysis data available.</div>;

    return (
        <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            
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

            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4 print:border-b-2 print:border-black">
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

            <div className="flex-1 grid grid-cols-3 gap-4 min-h-0 print:block">
                
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg print:bg-white print:border-gray-300 print:mb-8">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-red-400 uppercase tracking-wider flex justify-between items-center print:bg-gray-100 print:text-black print:border-gray-300">
                        <span>Original Artifact</span>
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap custom-scrollbar print:text-black print:overflow-visible">
                        {data.original_source}
                    </pre>
                </div>

                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg print:bg-white print:border-gray-300 print:mb-8">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-blue-400 uppercase tracking-wider print:bg-gray-100 print:text-black print:border-gray-300">
                        Deobfuscation Chain (Steps)
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-zinc-900/30 custom-scrollbar print:bg-white print:overflow-visible">
                        <div className="space-y-6">
                            {displaySteps.map((step) => (
                                <div key={step.id} className="relative pl-6 border-l-2 border-zinc-800 print:border-gray-300 group pb-4 break-inside-avoid">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 bg-[#1e1e1e] print:bg-white
                                        ${step.type === 'danger' ? 'border-red-500 print:border-red-600' : 
                                          step.type === 'success' ? 'border-green-500 print:border-green-600' : 
                                          step.type === 'warning' ? 'border-yellow-500 print:border-yellow-600' : 
                                          'border-blue-500 print:border-blue-600'}`}>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 rounded border border-zinc-800 print:bg-gray-100 print:text-black print:border-gray-300">
                                            {step.timestamp}
                                        </span>
                                        <h4 className="text-sm font-bold text-white print:text-black">
                                            {step.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-zinc-400 mb-2 print:text-gray-700">
                                        {step.message}
                                    </p>
                                    {step.code_snippet && (
                                        <div className="bg-black/50 border border-zinc-800 rounded p-2 text-[10px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all print:bg-gray-50 print:text-black print:border-gray-300">
                                            {step.code_snippet}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg print:bg-white print:border-gray-300">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-green-400 uppercase tracking-wider flex justify-between items-center print:bg-gray-100 print:text-black print:border-gray-300">
                        <span>Deobfuscated Output</span>
                        <span className="bg-green-900/50 text-green-200 px-1.5 rounded text-[10px] print:bg-green-100 print:text-green-800 print:border print:border-green-300">FINAL</span>
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-green-400 whitespace-pre-wrap bg-green-950/5 custom-scrollbar print:bg-white print:text-black print:overflow-visible">
                        {data.deobfuscated_output}
                    </pre>
                </div>
            </div>
        </div>
    );
}