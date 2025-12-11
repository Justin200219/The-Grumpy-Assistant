import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

const Header = ({ resistanceScore, mood }) => {
    // Determine metric color
    const getMetricColor = (score) => {
        if (score <= 40) return 'text-green-500';
        if (score <= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <header className="h-20 bg-[#13151b] border-b border-[#2a2d36] flex items-center justify-between px-8">
            <div>
                <h2 className="text-white text-lg font-semibold">Resistance Metrics Overview</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>Current Mood: <span className={`font-medium ${getMetricColor(resistanceScore)}`}>{mood}</span></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        Resistance Level: {resistanceScore}%
                        <RotateCcw className="w-3 h-3 cursor-pointer hover:text-white" />
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-[#1f2128] rounded-lg px-4 py-2.5 border border-transparent focus-within:border-blue-500/30 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-gray-200 text-sm focus:outline-none w-full placeholder-gray-500"
                />
            </div>
        </header>
    );
};

export default Header;
