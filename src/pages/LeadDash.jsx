import { Users, PieChart as PieIcon, Activity, ChevronRight } from 'lucide-react';

export default function LeadDash() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-blue-600" /> Team Lead Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open Tasks List */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-700 mb-4">Open Tasks</h2>
          <div className="space-y-3">
            {['API Integration', 'UI Refactor', 'Database Migration'].map((task) => (
              <div key={task} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-200 cursor-pointer transition">
                <span className="text-sm font-medium text-slate-600">{task}</span>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Circular Analytics Mockup */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <h2 className="font-bold text-slate-700 w-full mb-4">Task Distribution</h2>
          <div className="w-40 h-40 rounded-full border-[12px] border-blue-500 border-t-slate-100 flex items-center justify-center relative">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-800">75%</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}