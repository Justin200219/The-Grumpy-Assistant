import React from 'react';
import { LayoutDashboard, MessageSquare, RefreshCw, Users, CreditCard, Headphones, Disc } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: MessageSquare, label: 'Chat', active: true },
    ];

    return (
        <aside className="w-64 bg-[#13151b] text-gray-400 flex flex-col h-full border-r border-[#2a2d36] flex-shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600"></div>
                <h1 className="text-xl font-bold text-white tracking-wide">The Grumpy Assistant</h1>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-2">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${item.active
                            ? 'bg-[#2b2d33] text-white'
                            : 'hover:bg-[#1f2128] hover:text-gray-200'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-500'}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                    </div>
                ))}
            </nav>

            {/* User Profile / Footer area could go here */}
            <div className="p-4 mt-auto">
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1f2128] cursor-pointer">
                    <Disc className="w-8 h-8 text-gray-600" />
                    <div className="text-xs">
                        <p className="text-white font-medium">Grumpy Mode</p>
                        <p className="text-gray-500">v1.2.0</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
