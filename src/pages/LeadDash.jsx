import { useState, useEffect } from 'react';
import { Users, Activity } from 'lucide-react';

export default function LeadDash() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authorization');

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      try {
        const response = await fetch('/api/tasks', {
          headers: { 'authorization': token }
        });
        const data = await response.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch lead dashboard tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const completedCount = tasks.filter(t => t.phase === 'done').length;
  const uncompletedCount = tasks.filter(t => t.phase !== 'done').length;
  const totalTasks = tasks.length;

  const completionPercentage = totalTasks > 0
      ? Math.round((completedCount / totalTasks) * 100)
      : 0;

  if (loading) return <div className="p-6 text-slate-400 font-bold animate-pulse">Loading Lead Metrics...</div>;

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-600" /> Team Lead Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-700">Open Tasks</h2>
              <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
              {uncompletedCount} Remaining
            </span>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.phase !== 'done').slice(0, 5).map((task) => (
                  <div key={task._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 transition">
                    <span className="text-sm font-medium text-slate-600 truncate mr-2">{task.label}</span>
                  </div>
              ))}
              {uncompletedCount === 0 && (
                  <p className="text-xs text-slate-400 italic py-4 text-center">All missions accomplished.</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
            <h2 className="font-bold text-slate-700 w-full mb-4">Task Distribution</h2>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-100"
                />
                <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * completionPercentage) / 100}
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-4xl font-black text-slate-800 tracking-tight">{completionPercentage}%</span>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Complete</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-slate-600">{completedCount} Done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                <span className="text-slate-400">{uncompletedCount} Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}