import { useState, useEffect } from 'react';
import { BarChart3, Clock, Target } from 'lucide-react';

export default function Analytics() {
    const [stats, setStats] = useState({
        storyPoints: 0,
        tasksCompleted: 0,
        hoursLogged: 32 // Keeping mock data for hours as requested
    });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('authorization');

    useEffect(() => {
        const fetchAndCalculateStats = async () => {
            if (!token) return;

            try {
                // 1. Fetch the logged-in user to get their email
                const userRes = await fetch('/api/user', {
                    headers: { 'authorization': token }
                });
                const userData = await userRes.json();
                const userEmail = userData.email;

                // 2. Fetch all tasks
                const taskRes = await fetch('/api/tasks', {
                    headers: { 'authorization': token }
                });
                const tasks = await taskRes.json();

                if (Array.isArray(tasks)) {
                    // 3. Filter tasks: User must be an owner AND task must be in 'done' phase
                    const completedTasks = tasks.filter(task => {
                        const isOwner = Array.isArray(task.ownerID)
                            ? task.ownerID.includes(userEmail)
                            : task.ownerID === userEmail;

                        return isOwner && task.phase === 'done';
                    });

                    // 4. Calculate sums
                    const totalPoints = completedTasks.reduce((sum, task) => {
                        return sum + (Number(task.points) || 0);
                    }, 0);

                    setStats(prev => ({
                        ...prev,
                        storyPoints: totalPoints,
                        tasksCompleted: completedTasks.length
                    }));
                }
            } catch (err) {
                console.error("Failed to calculate analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndCalculateStats();
    }, [token]);

    if (loading) {
        return <div className="p-6 animate-pulse text-slate-400 font-bold">Calculating Stats...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <BarChart3 className="text-blue-600" /> My Analytics
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Story Points: Calculated from completed tasks where user is owner */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Story Points</p>
                    <p className="text-3xl font-black text-slate-800 mt-2">{stats.storyPoints}</p>
                </div>

                {/* Hours Logged: Static Mock Data */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours Logged</p>
                    <p className="text-3xl font-black text-slate-800 mt-2">{stats.hoursLogged}</p>
                </div>

                {/* Tasks Completed: Count of 'done' tasks where user is owner */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</p>
                    <p className="text-3xl font-black text-slate-800 mt-2">{stats.tasksCompleted}</p>
                </div>
            </div>

            {/* Activity History Chart */}
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