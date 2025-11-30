import React from 'react';

export default function NavItem({ active, label, icon, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg relative overflow-hidden ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
        >
            {active && <div className="absolute inset-0 bg-zinc-800/50 border-l-2 border-green-500"></div>}
            <span className={`relative z-10 ${active ? 'text-green-400' : 'group-hover:text-green-400 transition-colors'}`}>{icon}</span>
            <span className="relative z-10">{label}</span>
        </button>
    );
}