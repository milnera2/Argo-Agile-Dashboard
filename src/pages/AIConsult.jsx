import { Send, Sparkles, MessageSquareQuote, Zap } from 'lucide-react';

export default function AIConsult() {
  return (
    <div className="p-6 h-full flex flex-col max-w-6xl mx-auto">
      {/* Header - Matching your 'JAISON' Branding */}
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-2">
          JAISON
        </h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">
          AI Story Assist
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Interaction Area (Left 3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap size={120} />
            </div>

            <label className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
              <MessageSquareQuote size={18} className="text-blue-500" /> 
              Tell me about your task!
            </label>
            
            <textarea 
              className="flex-1 w-full p-6 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none text-lg text-slate-700 transition-all"
              placeholder="Example: I need to build a login page for my ARGO dashboard using React and Tailwind..."
            />
            
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
                <Send size={20} /> 
                Generate Story
              </button>
            </div>
          </div>
        </div>

        {/* AI Output Panel (Right 1 Column) */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col border border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 mb-8 font-bold uppercase text-xs tracking-widest">
            <Sparkles size={18} /> AI Suggestion
          </div>
          
          <div className="space-y-8 flex-1">
            <section>
              <h3 className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">Story Title</h3>
              <p className="text-md font-semibold text-slate-100 leading-tight">
                Implement Secure User Authentication Flow
              </p>
            </section>
            
            <section>
              <h3 className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">Classification</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-bold">Frontend</span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold">Auth</span>
              </div>
            </section>

            <section className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-slate-500 text-[10px] font-black uppercase mb-3 tracking-widest">Proposed Description</h3>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "As a developer, I want a robust login interface so that users can safely access their ARGO project data..."
              </p>
            </section>
          </div>

          <button className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">
            Confirm to Board
          </button>
        </div>
      </div>
    </div>
  );
}