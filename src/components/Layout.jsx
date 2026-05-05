import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, BarChart3, ShieldCheck, Ship } from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';

function Layout({ children }) {
  // 1. Manage state for which sidebar task is being viewed
  const [activeTask, setActiveTask] = useState(null);

  // 2. Define the specific tasks for the layout
  // These are independent of the 'Home' board tasks
  const sidebarTasks = [
    { id: 'A', title: 'Task A', stage: 'todo', date: 'MAY 2026', points: '3', owners: 'aaron@milner.fyi', description: 'Core layout infrastructure task A.' },
    { id: 'B', title: 'Task B', stage: 'dev', date: 'MAY 2026', points: '5', owners: 'aaron@milner.fyi', description: 'Development sprint task B.' },
    { id: 'C', title: 'Task C', stage: 'qa', date: 'MAY 2026', points: '2', owners: 'aaron@milner.fyi', description: 'Quality assurance review for task C.' },
    { id: 'D', title: 'Task D', stage: 'done', date: 'MAY 2026', points: '8', owners: 'aaron@milner.fyi', description: 'Finalized deployment for task D.' }
  ];

  const handleSave = (updated) => {
    console.log('Task Updated:', updated);
    setActiveTask(null);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Wireframe Style */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-2 font-bold text-blue-600">
          <Ship size={24} />
          <span>ARGO</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
            <LayoutDashboard size={20} /> Agile Board
          </Link>
          <Link to="/ai-consult" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
            <BrainCircuit size={20} /> AI Story Assist
          </Link>
          <Link to="/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
            <BarChart3 size={20} /> Analytics
          </Link>
          <Link to="/lead" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
            <ShieldCheck size={20} /> Team Lead
          </Link>
        </nav>

        {/* Task List - Only these items trigger the modal */}
        <div className="p-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4 px-2">Tasks</h3>
          <div className="space-y-1 text-sm text-slate-600">
            {sidebarTasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => setActiveTask(task)}
                className="p-2 hover:text-blue-600 hover:bg-slate-50 rounded-md cursor-pointer transition-all"
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Persistent Detail Modal for Layout Tasks */}
      <TaskDetailModal 
        isOpen={!!activeTask} 
        task={activeTask} 
        onClose={() => setActiveTask(null)}
        onSave={handleSave}
        onDelete={(id) => {
          console.log('Delete logic for sidebar task:', id);
          setActiveTask(null);
        }}
      />
    </div>
  );
}

export default Layout;