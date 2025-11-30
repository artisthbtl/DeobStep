import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

// Import our new modular components
import Sidebar from '@/Components/Sidebar';
import UploadView from '@/Components/Views/UploadView';
import PollingView from '@/Components/Views/PollingView';
import ResultView from '@/Components/Views/ResultView';
import HistoryView from '@/Components/Views/HistoryView';
import DocsView from '@/Components/Views/DocsView';

// 1. IMPORT THE MOCK DATA
import { MOCK_ANALYSIS_RESULT } from '../mockData';

export default function Home() {
    // === STATE MANAGEMENT ===
    const [viewState, setViewState] = useState('upload'); 
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [jobId, setJobId] = useState(null);

    const handleReset = () => {
        setFile(null);
        setFileName("");
        setViewState('upload');
    };

    // === RENDER HELPER ===
    const renderContent = () => {
        switch (viewState) {
            case 'upload':
                return (
                    <UploadView 
                        file={file} 
                        setFile={setFile} 
                        fileName={fileName} 
                        setFileName={setFileName} 
                        setJobId={setJobId} 
                        setViewState={setViewState} 
                    />
                );
            case 'polling':
                return (
                    <PollingView 
                        jobId={jobId} 
                        setViewState={setViewState} 
                    />
                );
            case 'result':
                return (
                    <ResultView 
                        fileName={fileName} 
                        jobId={jobId} 
                        handleReset={handleReset}
                        // 2. PASS THE MOCK DATA HERE
                        data={MOCK_ANALYSIS_RESULT}
                    />
                );
            case 'history':
                return <HistoryView />;
            case 'docs':
                return <DocsView />;
            default:
                return <UploadView />; // Fallback
        }
    };

    return (
        <>
            <Head title="DeobStep Forensic" />
            
            <div className="flex h-screen bg-zinc-950 text-white font-sans selection:bg-green-500/30">
                
                {/* === SIDEBAR === */}
                <Sidebar viewState={viewState} setViewState={setViewState} />

                {/* === MAIN CONTENT === */}
                <main className="flex-1 overflow-y-auto relative bg-zinc-950">
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>

                    <div className="h-full w-full p-10 md:p-14 relative z-10">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </>
    );
}