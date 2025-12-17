// resources/js/Components/Views/ResultView.jsx
import React, { useState, useEffect } from 'react';

// --- Helper Function to Transform AST Logs to UI Steps ---
const processRawLogs = (rawLogString) => {
    if (!rawLogString) return [];
    
    try {
        const logs = JSON.parse(rawLogString);
        
        return logs.map((log, index) => {
            let title = "Unknown Operation";
            let message = "Processing node...";
            let type = "info"; // default, success, warning, danger
            let snippet = "";

            // 1. Handle Method Invocations (e.g., [string]::Format)
            if (log.astType === 'InvokeMemberExpressionAst') {
                title = `Method Call: ${log.method || 'Unknown'}`;
                message = "Executing .NET method to reconstruct string.";
                type = "blue";
                if (log.output && log.output.value) {
                    snippet = `Output: "${log.output.value}"`;
                }
            }
            
            // 2. Handle Variable Assignments (e.g., $kxJoS = ...)
            else if (log.astType === 'AssignmentStatementAst') {
                title = `Variable Assignment: $${log.variablePath}`;
                message = "Storing decoded payload into memory.";
                type = "warning";
                snippet = `Value: ${log.value}`;
            }

            // 3. Handle Command Executions (Invoke-Expression, Write-Host)
            else if (log.astType === 'CommandAst') {
                title = `Command Execution: ${log.commandName}`;
                snippet = `Args: ${log.argues?.map(arg => arg.value).join(' ')}`;

                if (['Invoke-Expression', 'IEX'].includes(log.commandName)) {
                    type = "danger"; // RED FLAG
                    message = "Detected execution of dynamic code (Obfuscation layer peeling).";
                } else {
                    type = "success";
                    message = `Executing standard cmdlet: ${log.commandName}`;
                }
            }

            // 4. Fallback for others (BinaryExpressionAst, etc.)
            else {
                title = log.astType.split('.').pop(); // Get last part of AST name
                message = "AST Node evaluation.";
            }

            return {
                id: index,
                timestamp: `Step ${index + 1}`, // Or calculate time if available
                title,
                message,
                type,
                code_snippet: snippet
            };
        });

    } catch (e) {
        console.error("Failed to parse raw logs:", e);
        return [];
    }
};

export default function ResultView({ fileName, jobId, handleReset, data }) {
    // Local state to hold the steps (either from mock steps or parsed raw logs)
    const [displaySteps, setDisplaySteps] = useState([]);

    useEffect(() => {
        if (data) {
            if (data.raw_log) {
                // Prioritize processing real logs if they exist
                setDisplaySteps(processRawLogs(data.raw_log));
            } else if (data.steps) {
                // Fallback to manual mock steps if no raw_log
                setDisplaySteps(data.steps);
            }
        }
    }, [data]);

    // Safety check
    if (!data) return <div className="text-zinc-500 flex h-full items-center justify-center">No analysis data available.</div>;

    return (
        <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
             {/* ... (HEADER SECTION UNCHANGED) ... */}

            {/* --- 3-PANEL DASHBOARD --- */}
            <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                
                {/* PANEL 1: ORIGINAL SCRIPT (Unchanged) */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                     {/* ... content ... */}
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap custom-scrollbar">
                        {data.original_source}
                    </pre>
                </div>

                {/* PANEL 2: DEOBFUSCATION CHAIN (Updated to use displaySteps) */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Deobfuscation Chain
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-zinc-900/30 custom-scrollbar">
                        <div className="space-y-6">
                            {/* USE displaySteps INSTEAD OF data.steps */}
                            {displaySteps.map((step) => (
                                <div key={step.id} className="relative pl-6 border-l-2 border-zinc-800 hover:border-zinc-600 transition-colors group">
                                    
                                    {/* Dot Indicator Logic */}
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
                                    
                                    <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                                        {step.message}
                                    </p>
                                    
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

                {/* PANEL 3: FINAL RESULT (Unchanged) */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    {/* ... header ... */}
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-green-400 whitespace-pre-wrap bg-green-950/5 custom-scrollbar">
                        {data.deobfuscated_output}
                    </pre>
                </div>
            </div>
        </div>
    );
}