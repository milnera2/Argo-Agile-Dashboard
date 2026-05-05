import { useState, useEffect } from 'react';
import { BarChart3, ChevronRight, ListTodo, CheckCircle2 } from 'lucide-react';

export default function Analytics() {
    const [tasks, setTasks] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authorization');

    useEffect(() => {
        const fetchUserAndTasks = async () => {
            if (!token) return;
            try {
                const userRes = await fetch('/api/user', {
                    headers: { 'authorization': token }
                });
                const userData = await userRes.json();
                const currentUserEmail = userData.email;
                setUserEmail(currentUserEmail);

                const taskRes = await fetch('/api/tasks', {
                    headers: { 'authorization': token }
                });
                const allTasks = await taskRes.json();

                if (Array.isArray(allTasks)) {
                    const myTasks = allTasks.filter(task => {
                        const isOwner = Array.isArray(task.ownerID)
                            ? task.ownerID.includes(currentUserEmail)
                            : task.ownerID === currentUserEmail;
                        return isOwner;
                    });
                    setTasks(myTasks);
                }
            } catch (err) {
                console.error("Failed to fetch personal analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndTasks();
    }, [token]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.phase === 'done').length;
    const openTasks = tasks.filter(t => t.phase !== 'done');
    const totalPoints = tasks.reduce((acc, t) => acc + (Number(t.points) || 0), 0);

    const completionPercentage = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    if (loading) return <div className="p-6 text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Syncing Your Metrics...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <BarChart3 className="text-blue-600" /> My Analytics
                </h1>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Personal View: {userEmail}
        </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'My Points', value: totalPoints, icon: <BarChart3 size={16} /> },
                    { label: 'My Tasks', value: totalTasks, icon: <ListTodo size={16} /> },
                    { label: 'Completed', value: completedTasks, icon: <CheckCircle2 size={16} /> }
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                            {stat.icon}
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <ListTodo size={18} className="text-blue-600" /> My Remaining Tasks
                        </h2>
                        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase">
              {openTasks.length} Open
            </span>
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                        {openTasks.length > 0 ? openTasks.map((task) => (
                            <div key={task._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 transition-all duration-200">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-600">{task.label}</span>
                                    <span className="text-[10px] font-bold text-blue-500 uppercase mt-1">{task.phase}</span>
                                </div>
                                <ChevronRight size={18} className="text-slate-300" />
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-40 italic">
                                <p className="text-sm font-medium">You have no open tasks.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <h2 className="font-bold text-slate-700 w-full mb-4 text-center lg:text-left">Progress Rate</h2>
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
                            <span className="text-slate-600">{completedTasks} Done</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-slate-200 rounded-full" />
                            <span className="text-slate-400">{openTasks.length} Open</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}