import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquareQuote, Zap, User, Bot } from 'lucide-react';

export default function AIConsult() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Retrieve the existing session token
  const token = localStorage.getItem('authorization');

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Calls your backend which handles the Gemini API key securely
      const response = await fetch('/api/ai/consult', {
        method: 'POST',
        headers: {
          'authorization': token
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.reply
        }]);
      } else {
        throw new Error(data.error || 'No response from JAISON');
      }
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `I've lost contact with the orbital station. Please check your connection and try again.${err}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="p-6 h-full flex flex-col max-w-6xl mx-auto relative">
        {/* JAISON Branding Header */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-2">
            JAISON
          </h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">
            AI Story Assist
          </p>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">

          {/* Message History Area */}
          <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar"
          >
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-40">
                  <Zap size={48} className="mb-4" />
                  <p className="font-bold uppercase text-xs tracking-widest text-center">
                    System Online <br />
                    <span className="text-[10px] font-medium">Ready to process requirements</span>
                  </p>
                </div>
            )}

            {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar Icons */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
            ))}

            {/* Thinking State Indicator */}
            {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center">
                    <Bot size={18} className="text-blue-400 animate-pulse" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
            )}
          </div>

          {/* Input Bar Section */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="relative flex items-center">
            <textarea
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Tell me about the task you're planning..."
                className="w-full pl-6 pr-16 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none font-medium transition-all shadow-inner"
            />
              <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-400 shadow-lg shadow-blue-200 disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="mt-3 text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
              Jaison utilizes Gemini neural links to assist in story creation
            </p>
          </div>
        </div>
      </div>
  );
}