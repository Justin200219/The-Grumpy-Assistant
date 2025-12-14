import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [resistanceScore, setResistanceScore] = useState(80);
  const [mood, setMood] = useState('Grumpy');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage = { text: data.response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setResistanceScore(data.state.currentResistance);
      setMood(data.state.mood);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: "Error: Could not reach the Grumpy Assistant.", sender: 'system' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#13151b]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <Header resistanceScore={resistanceScore} mood={mood} />

        <main className="relative min-h-0" style={{ height: 'calc(100vh - 5rem)' }}>
          <ChatInterface
            messages={messages}
            loading={loading}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            mood={mood}
            resistanceScore={resistanceScore}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
