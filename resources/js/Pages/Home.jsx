import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import UploadView from '@/Components/Views/UploadView';
import PollingView from '@/Components/Views/PollingView';
import ResultView from '@/Components/Views/ResultView';
import DocsView from '@/Components/Views/DocsView';
import { MOCK_ANALYSIS_RESULT, MOCK_HISTORY } from '@/mockData';

export default function Home() {
    const [viewState, setViewState] = useState('upload'); 
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [jobId, setJobId] = useState(null);
    
    const [historyList, setHistoryList] = useState(() => {
        const savedHistory = localStorage.getItem('deobstep_history');
        return savedHistory ? JSON.parse(savedHistory) : MOCK_HISTORY;
    });

    useEffect(() => {
        localStorage.setItem('deobstep_history', JSON.stringify(historyList));
    }, [historyList]);

    const handleNewJob = (newId, newFileName) => {
        const newEntry = {
            id: newId,
            filename: newFileName,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing...'
        };
        
        setHistoryList([newEntry, ...historyList]);
        setJobId(newId);
        setViewState('polling');
    };

    const handleSelectJobFromHistory = (selectedId) => {
        setJobId(selectedId);
        setViewState('result');
    };

    const handleReset = () => {
        setFile(null);
        setFileName("");
        setJobId(null);
        setViewState('upload');
    };

    const renderContent = () => {
        switch (viewState) {
            case 'upload':
                return (
                    <UploadView 
                        file={file} 
                        setFile={setFile} 
                        fileName={fileName} 
                        setFileName={setFileName}
                        onStartAnalysis={handleNewJob} 
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
                        data={MOCK_ANALYSIS_RESULT} 
                        jobId={jobId} 
                        handleReset={handleReset} 
                    />
                );
            case 'docs':
                return <DocsView />;
            default:
                return <UploadView />;
        }
    };

    return (
        <div className="flex h-screen bg-black text-white font-sans selection:bg-green-900 selection:text-white">
            <Sidebar viewState={viewState} setViewState={setViewState} />
            <main className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative z-10 h-full p-8 overflow-y-auto custom-scrollbar">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}