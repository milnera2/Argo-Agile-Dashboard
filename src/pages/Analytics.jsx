import { BarChart3, Clock, Target } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <BarChart3 className="text-blue-600" /> My Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['Story Points', 'Hours Logged', 'Tasks Completed'].map((stat, i) => (
          <div key={stat} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat}</p>
            <p className="text-3xl font-black text-slate-800 mt-2">{[14, 32, 8][i]}</p>
          </div>
        ))}
      </div>
      
      {/* Mock Bar Chart */}
      <div className="mt-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-slate-500 font-bold uppercase text-xs mb-6">Activity History</h2>
        <div className="flex items-end gap-2 h-32">
          {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="bg-blue-500 w-full rounded-t-sm opacity-80 hover:opacity-100 transition"></div>
          ))}
        </div>
      </div>
    </div>
  );
}