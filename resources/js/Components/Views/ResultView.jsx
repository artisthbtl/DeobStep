import React, { useState, useEffect } from 'react';
import { analyzeForensicEvent } from './DataCommand'; 
import DownloadResult from '../DownloadResult';

const extractPayload = (log) => {
    if (log.output && log.output.value) return log.output.value;
    if (log.value) return log.value;
    if (log.argues && Array.isArray(log.argues)) {
        return log.argues.map(arg => arg.value).join(', ');
    }
    return null;
};

const processGeneralizedLogs = (rawLogString) => {
    if (!rawLogString) return [];
    
    try {
        const logs = JSON.parse(rawLogString);
        
        return logs.map((log, index) => {
            const analysis = analyzeForensicEvent(log);
            const rawType = log.astType || "Unknown";
            const cleanType = rawType.split('.').pop().replace('Ast', '');
            
            let title = cleanType;
            if(log.commandName) title = log.commandName;
            if(log.variablePath) title = `$${log.variablePath}`;

            return {
                id: index,
                timestamp: `Step ${index + 1}`,
                title: title, 
                message: analysis.description,
                type: analysis.level,
                badge: analysis.category,
                code_snippet: extractPayload(log)
            };
        });

    } catch (e) {
        console.error(e);
        return [];
    }
};

export default function ResultView({ fileName, jobId, handleReset, data }) {
    const [displaySteps, setDisplaySteps] = useState([]);

    useEffect(() => {
        if (data) {
            const logsToProcess = data.raw_log || JSON.stringify(data.steps || []);
            setDisplaySteps(processGeneralizedLogs(logsToProcess));
        }
    }, [data]);

    if (!data) return <div className="text-zinc-500 flex h-full items-center justify-center">No analysis data available.</div>;

    return (
        <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Pass all necessary data to the child component */}
            <DownloadResult 
                data={data} 
                jobId={jobId} 
                displaySteps={displaySteps} 
                handleReset={handleReset} 
            />

            <div className="flex-1 grid grid-cols-3 gap-4 min-h-0 p-4">
                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Original Script
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap custom-scrollbar">
                        {data.original_source}
                    </pre>
                </div>

                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Forensic Chain
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-zinc-900/30 custom-scrollbar">
                        <div className="space-y-6">
                            {displaySteps.map((step) => (
                                <div key={step.id} className="relative pl-6 border-l-2 border-zinc-800 hover:border-zinc-600 transition-colors group">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 bg-[#1e1e1e] transition-all group-hover:scale-110 
                                        ${step.type === 'danger' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 
                                          step.type === 'success' ? 'border-green-500' : 
                                          step.type === 'warning' ? 'border-yellow-500' : 
                                          'border-blue-500'}`}>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 mb-1">
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
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                                             step.type === 'danger' ? 'bg-red-950/30 text-red-400 border-red-900' : 
                                             step.type === 'warning' ? 'bg-yellow-950/30 text-yellow-400 border-yellow-900' :
                                             'bg-blue-950/30 text-blue-400 border-blue-900'
                                        }`}>
                                            {step.badge}
                                        </span>
                                    </div>
                                    
                                    <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                                        {step.message}
                                    </p>

                                    {step.code_snippet && (
                                        <div className="relative group/code">
                                            <div className="bg-black/50 border border-zinc-800 rounded p-2 text-[10px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all border-l-2 border-l-zinc-700">
                                                {step.code_snippet}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                    <div className="bg-[#252526] px-4 py-2 border-b border-[#333] text-xs font-bold text-green-400 uppercase tracking-wider">
                        Deobfuscated Result
                    </div>
                    <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-green-400 whitespace-pre-wrap bg-green-950/5 custom-scrollbar">
                        {data.deobfuscated_output}
                    </pre>
                </div>
            </div>
        </div>
    );
}

// import React, { useMemo } from 'react';

// // Keep your logic function here (outside or inside the component)
// const processRawLogs = (rawLogString) => {
//     if (!rawLogString) return [];
//     try {
//         const logs = JSON.parse(rawLogString);
//         const HEURISTICS = {
//             methods: {
//                 'frombase64string': { title: "Base64 Decoding", msg: "Converting encoded data back to a readable payload.", type: "warning" },
//                 'format': { title: "String Reassembly", msg: "Merging fragmented strings using a template mask.", type: "blue" },
//                 'replace': { title: "String Cleaning", msg: "Removing 'noise' characters used to bypass filters.", type: "blue" },
//                 'split': { title: "Array Splitting", msg: "Breaking apart obfuscated data arrays.", type: "info" },
//                 'join': { title: "Array Joining", msg: "Recombining character codes into a functional command.", type: "info" },
//                 'decompress': { title: "Payload Unpacking", msg: "Decompressing a zipped malicious script.", type: "danger" }
//             },
//             commands: {
//                 'invoke-expression': { title: "Dynamic Execution", msg: "Executing a hidden script constructed in memory.", type: "danger" },
//                 'iex': { title: "Dynamic Execution (Alias)", msg: "Using an alias to hide an execution command.", type: "danger" },
//                 'set-alias': { title: "Command Hijacking", msg: "Defining a custom name for a dangerous cmdlet.", type: "warning" },
//                 'new-object': { title: "System Object Creation", msg: "Initializing system components (often Net.WebClient).", type: "warning" }
//             }
//         };

//         return logs.map((log, index) => {
//             let title = "Transformation Step";
//             let message = "Simplifying PowerShell syntax...";
//             let type = "info";
//             let snippet = "";

//             const methodKey = log.method?.toLowerCase();
//             const cmdKey = log.commandName?.toLowerCase();

//             if (methodKey && HEURISTICS.methods[methodKey]) {
//                 const h = HEURISTICS.methods[methodKey];
//                 title = h.title; message = h.msg; type = h.type;
//             } else if (cmdKey && HEURISTICS.commands[cmdKey]) {
//                 const h = HEURISTICS.commands[cmdKey];
//                 title = h.title; message = h.msg; type = h.type;
//             } else if (log.astType === 'BinaryExpressionAst') {
//                 title = "Operation folding"; message = "Simplifying math or string concatenation (+)."; type = "blue";
//             } else if (log.astType === 'ConvertExpressionAst') {
//                 title = "Type Casting"; message = "Converting data (e.g. ASCII codes to Characters)."; type = "warning";
//             } else if (log.astType === 'AssignmentStatementAst') {
//                 title = `Variable Resolution: $${log.variablePath}`; message = "Linking a hidden variable to its actual value."; type = "success";
//             }

//             if (log.output?.value) {
//                 snippet = `Result: "${log.output.value}"`;
//             } else if (log.argues) {
//                 const args = log.argues.map(a => a.value).filter(Boolean).join(' ');
//                 snippet = args ? `Input: ${args}` : "";
//             }

//             return { id: index, timestamp: `Step ${index + 1}`, title, message, type, code_snippet: snippet };
//         });
//     } catch (e) {
//         console.error("Failed to parse raw logs:", e);
//         return [];
//     }
// };

// // --- THIS WAS MISSING: The actual React Component ---
// const ResultView = ({ data, jobId, handleReset }) => {
//     // Process the raw logs from the data prop
//     const processedSteps = useMemo(() => {
//         return data?.raw_logs ? processRawLogs(data.raw_logs) : [];
//     }, [data]);

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-green-500">Analysis Results (Job: {jobId})</h2>
//                 <button 
//                     onClick={handleReset}
//                     className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
//                 >
//                     Analyze New File
//                 </button>
//             </div>

//             {/* Render your processedSteps here */}
//             <div className="grid gap-4">
//                 {processedSteps.map((step) => (
//                     <div key={step.id} className={`p-4 border-l-4 rounded bg-zinc-900 ${
//                         step.type === 'danger' ? 'border-red-500' : 
//                         step.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
//                     }`}>
//                         <h4 className="font-bold">{step.title}</h4>
//                         <p className="text-zinc-400 text-sm">{step.message}</p>
//                         {step.code_snippet && (
//                             <code className="block mt-2 p-2 bg-black rounded text-xs text-green-400">
//                                 {step.code_snippet}
//                             </code>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // --- THIS WAS MISSING: The default export ---
// export default ResultView;