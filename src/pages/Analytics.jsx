import { BarChart3, ChevronRight, PieChart as PieIcon, ListTodo, CheckCircle2 } from 'lucide-react';

export default function Analytics({ tasks = [] }) {
  // Logic to calculate stats from your task array
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.stage === 'done').length;
  const openTasks = tasks.filter(t => t.stage !== 'done');
  const totalPoints = tasks.reduce((acc, t) => acc + parseInt(t.points || 0), 0);
  
  // Calculate percentage for the circle graph
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Dynamic Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none flex items-center gap-4">
          <BarChart3 size={48} className="text-blue-600" /> ANALYTICS
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 ml-1">
          Performance Metrics & Progress
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Points', value: totalPoints, icon: <BarChart3 size={16} /> },
          { label: 'Total Tasks', value: totalTasks, icon: <ListTodo size={16} /> },
          { label: 'Tasks Completed', value: completedTasks, icon: <CheckCircle2 size={16} /> }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              {stat.icon}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Open Tasks List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ListTodo size={18} className="text-blue-600" /> Remaining Tasks
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
              {openTasks.length} OPEN
            </span>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {openTasks.length > 0 ? openTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 hover:bg-white cursor-pointer transition-all duration-200">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">{task.title}</span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase mt-1">{task.stage}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-40 italic">
                <p className="text-sm font-medium">All tasks cleared!</p>
              </div>
            )}
          </div>
        </div>

        {/* Circular Completion Graph */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
          
          <h2 className="text-sm font-black text-white uppercase tracking-wider w-full mb-8 flex items-center gap-2">
            <PieIcon size={18} className="text-blue-400" /> Completion Rate
          </h2>

          <div className="relative flex items-center justify-center">
            {/* SVG Circle Graph */}
            <svg className="w-56 h-56 transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={628}
                strokeDashoffset={628 - (628 * completionPercentage) / 100}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="absolute text-center">
              <span className="text-5xl font-black text-white tracking-tighter">
                {completionPercentage}%
              </span>
              <p className="text-[10px] text-blue-400 uppercase font-black tracking-[0.2em] mt-1">
                Fulfilled
              </p>
            </div>
          </div>
          
          <p className="mt-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {completedTasks} / {totalTasks} Tasks Finished
          </p>
        </div>
      </div>
    </div>
  );
}