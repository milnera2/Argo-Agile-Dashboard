import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, BarChart3, ShieldCheck, Ship } from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';

function Layout({ children }) {
  const [activeTask, setActiveTask] = useState(null);
  const [sidebarTasks, setSidebarTasks] = useState([]);
  const [userRole, setUserRole] = useState(""); // Add state for role
  const token = localStorage.getItem('authorization');

  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      try {
        // Fetch Tasks
        const taskRes = await fetch('/api/tasks', { headers: { 'authorization': token } });
        const taskData = await taskRes.json();
        setSidebarTasks(Array.isArray(taskData) ? taskData : []);

        // Fetch User Role
        const userRes = await fetch('/api/user', { headers: { 'authorization': token } });
        const userData = await userRes.json();
        setUserRole(userData.role); // Assuming your API returns { role: 'lead' } or { role: 'user' }
      } catch (err) {
        console.error("Failed to fetch layout data", err);
      }
    };

    fetchInitialData();
  }, [token]);
  useEffect(() => {
    if (!token) return;

    const fetchSidebarTasks = async () => {
      try {
        const response = await fetch('/api/tasks', {
          headers: { 'authorization': token }
        });

        if (response.ok) {
          const data = await response.json();
          // Backend returns an array of task objects
          setSidebarTasks(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch sidebar tasks:", err);
      }
    };

    fetchSidebarTasks();
  }, [token]);

  const handleSave = async (updatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(updatedTask)
      });

      if (response.ok) {
        setSidebarTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        setActiveTask(null);
      }
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'authorization': token }
      });

      if (response.ok) {
        setSidebarTasks(prev => prev.filter(t => t._id !== taskId));
        setActiveTask(null);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Ship size={24} />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-800">ARGO</span>
          </div>

          <nav className="flex-1 p-4 space-y-1 font-bold text-slate-500">
            <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
              <BarChart3 size={20} /> Analytics
            </Link>
            {userRole === 'lead' && (
                <Link to="/lead" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 text-blue-600 bg-blue-50/50 border border-blue-100">
                  <ShieldCheck size={20} /> Team Lead
                </Link>)}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4 px-2 tracking-widest">Tasks</h3>
            <div className="space-y-1 text-sm text-slate-600 max-h-64 overflow-y-auto">
              {sidebarTasks.map(task => (
                  <div
                      key={task._id}
                      onClick={() => setActiveTask(task)}
                      className="p-2 hover:text-blue-600 hover:bg-slate-50 rounded-md cursor-pointer transition-all truncate"
                  >
                    {task.label}
                  </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* This modal pops up when activeTask is set by the sidebar click */}
        <TaskDetailModal
            isOpen={!!activeTask}
            task={activeTask}
            onClose={() => setActiveTask(null)}
            onSave={handleSave}
            onDelete={handleDelete}
        />
      </div>
  );
}

export default Layout;