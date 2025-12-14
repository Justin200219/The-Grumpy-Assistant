import React, { useRef, useEffect } from 'react';
import { Send, Sparkles, User, AlertTriangle } from 'lucide-react';

const ChatInterface = ({ messages, loading, input, setInput, sendMessage, mood, resistanceScore }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getPlaceholder = () => {
        if (mood === 'Grumpy') return "Don't bother me unless it's important...";
        if (mood === 'Furious') return "I AM IGNORING YOU.";
        if (mood === 'Skeptical') return "Convince me to help you...";
        return "Type a message (if you must)...";
    };

    const getButtonColor = () => {
        if (resistanceScore > 70) return 'bg-red-600 hover:bg-red-700';
        if (resistanceScore > 40) return 'bg-yellow-600 hover:bg-yellow-700';
        return 'bg-green-600 hover:bg-green-700';
    };

    return (
        <div className="flex flex-col h-full bg-[#13151b] relative overflow-hidden">
            {/* Background elements (stars/ambiance) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-20"></div>
                <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full opacity-10"></div>
                <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-20 blur-sm"></div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10 min-h-0">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                        <Sparkles className="w-12 h-12 mb-4 text-blue-500/50" />
                        <p className="text-lg">Unit 734 Online</p>
                        <p className="text-sm">Initiate sequence when ready.</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                            : 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                            }`}>
                            {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <span className="text-sm">😒</span>}
                        </div>

                        {/* Message Bubble */}
                        <div className={`max-w-[70%]`}>
                            <div className={`flex items-baseline gap-2 mb-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <span className="text-sm font-semibold text-gray-200">
                                    {msg.sender === 'user' ? 'You' : 'Unit 734'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                ? 'bg-[#2b2d33] text-gray-100 rounded-tr-sm'
                                : 'bg-[#1f2128] text-gray-300 rounded-tl-sm shadow-sm border border-[#2a2d36]'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center animate-pulse">
                            <span className="text-sm">😐</span>
                        </div>
                        <div className="bg-[#1f2128] border border-[#2a2d36] p-4 rounded-2xl rounded-tl-sm text-gray-400 text-sm flex items-center gap-2">
                            <span className="text-xs italic">Sighing...</span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 relative z-20">
                <div className="flex items-center gap-2 max-w-4xl mx-auto">
                    <div className="bg-[#1f2128] border border-[#2a2d36] rounded-xl p-2 shadow-lg flex-none">
                        <AlertTriangle className={`w-5 h-5 ${resistanceScore > 50 ? 'text-red-500' : 'text-yellow-500'} animate-pulse`} />
                    </div>

                    <div className="bg-[#1f2128] border border-[#2a2d36] rounded-xl flex items-center p-2 shadow-lg flex-1 focus-within:ring-1 focus-within:ring-gray-500/50 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={getPlaceholder()}
                            className="flex-1 bg-transparent border-none !text-white caret-white px-4 py-2 focus:outline-none placeholder-gray-500"
                            style={{ color: 'white' }}
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className={`p-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getButtonColor()}`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-600">The Assistant may be unwilling to help. Good luck.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
