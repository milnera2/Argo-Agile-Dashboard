import { Link } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, BarChart3, ShieldCheck, Ship } from 'lucide-react';

function Layout({ children }) {
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

        {/* Task List from Wireframe */}
        <div className="p-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4 px-2">Tasks</h3>
          <div className="space-y-1 text-sm text-slate-600">
            {['Task A', 'Task B', 'Task C', 'Task D'].map(task => (
              <div key={task} className="p-2 hover:text-blue-600 cursor-pointer">{task}</div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;