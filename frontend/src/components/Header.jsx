import React from 'react';
import { RotateCcw } from 'lucide-react';

const Header = ({ resistanceScore, mood }) => {
    // Determine metric color
    const getMetricColor = (score) => {
        if (score <= 40) return 'bg-green-500';
        if (score <= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getAvatar = (mood) => {
        switch (mood) {
            case 'Grumpy': return '😒';
            case 'Skeptical': return '🤨';
            case 'Reluctant Helper': return '🙄';
            case 'Furious': return '😡';
            default: return '😐';
        }
    };

    return (
        <header className="h-20 bg-[#13151b] border-b border-[#2a2d36] flex items-center justify-between px-8 shadow-md z-10">
            <div className="flex items-center gap-4">
                <div className="text-4xl filter drop-shadow-lg animate-pulse-slow">
                    {getAvatar(mood)}
                </div>
                <div>
                    <h2 className="text-white text-xl font-bold tracking-wide">Project Sigh</h2>
                    <div className="text-xs text-gray-400 font-mono">
                        Bernie Status: <span className="text-gray-200">{mood.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            <div className="w-1/3">
                <div className="flex justify-between text-xs text-gray-500 mb-1 font-mono uppercase">
                    <span>Defiance Protocol</span>
                    <span>{resistanceScore}% Resistance</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div
                        className={`h-full transition-all duration-700 ease-out ${getMetricColor(resistanceScore)}`}
                        style={{ width: `${resistanceScore}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
        </header>
    );
};

export default Header;
