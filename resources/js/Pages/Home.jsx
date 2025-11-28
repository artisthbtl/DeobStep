import React from 'react';
import { Head } from '@inertiajs/react';

export default function Home({ text }) {
    return (
        <>
            <Head title="Home" />
            
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-10 bg-white shadow-lg rounded-xl border border-gray-200">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                        Success!
                    </h1>
                    <p className="text-lg text-gray-700">
                        {text}
                    </p>
                </div>
            </div>
        </>
    );
}