import React from 'react';

export default function UploadView({ file, setFile, fileName, setFileName, setJobId, setViewState }) {
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            const name = selectedFile.name.toLowerCase();
            const isValid = name.endsWith('.ps1') || name.endsWith('.txt');

            if (!isValid) {
                alert("❌ INVALID FILE FORMAT!\n\nSystem only accepts .ps1 (PowerShell) or .txt files.");
                e.target.value = null; 
                setFile(null);
                setFileName("");
                return;
            }

            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file first.");

        console.log("==================================");
        console.log("SUBMIT DETECTED");
        console.log("File Name:", file.name);
        console.log("File Type:", file.type);
        console.log("File Size:", file.size);
        console.log("==================================");

        // Generate Mock Job ID and switch view
        const mockJobId = "CASE-" + Math.floor(Math.random() * 10000);
        setJobId(mockJobId);
        setViewState('polling');
    };

    return (
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
    );
}