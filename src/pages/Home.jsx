import { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import CreateTaskModal from '../components/CreateTaskModal';
import DroppableColumn from '../components/DroppableColumn';

const COLUMNS = [
  { id: 'todo', title: 'Not Started', color: 'bg-slate-400' },
  { id: 'dev', title: 'Development', color: 'bg-blue-600' }, 
  { id: 'qa', title: 'Quality Assurance', color: 'bg-amber-500' },
  { id: 'done', title: 'Completed', color: 'bg-emerald-500' }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Simulated logged-in user
  const userEmail = "aaron@milner.fyi"; 
  const userInitial = userEmail.charAt(0).toUpperCase();

  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Draft Project Proposal', 
      stage: 'todo', 
      points: '2', 
      owners: ['aaron@milner.fyi'], 
      tags: ['tagitem', 'frontend'] 
    },
    { 
      id: '2', 
      title: 'Build Frontend Feature', 
      stage: 'dev', 
      points: '3', 
      owners: ['name@example.com'], 
      tags: ['tagitem'] 
    },
    { 
      id: '3', 
      title: 'Ship API', 
      stage: 'dev', 
      points: '5', 
      owners: ['aaron@milner.fyi', 'name@example.com'], 
      tags: ['tagitem', 'backend'] 
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((prevTasks) => {
      const activeTask = prevTasks.find((t) => t.id === activeId);
      const overColumn = COLUMNS.find(col => col.id === overId);
      const overTask = prevTasks.find(t => t.id === overId);
      
      const newStage = overColumn ? overColumn.id : (overTask ? overTask.stage : activeTask.stage);

      if (activeTask.stage !== newStage) {
        return prevTasks.map((t) =>
          t.id === activeId ? { ...t, stage: newStage } : t
        );
      }

      const oldIndex = prevTasks.findIndex((t) => t.id === activeId);
      const newIndex = prevTasks.findIndex((t) => t.id === overId);
      return arrayMove(prevTasks, oldIndex, newIndex);
    });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Agile Board</h1>
        
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
          >
            <Plus size={18} /> NEW TASK
          </button>

          {/* Profile Circle Section */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-11 h-11 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm hover:bg-slate-700 transition-colors"
            >
              {userInitial}
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{userEmail}</p>
                </div>
                <button 
                  className="w-full flex items-center justify-between gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                  onClick={() => console.log("Logout clicked")}
                >
                  Logout
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map((col) => (
            <DroppableColumn 
              key={col.id} 
              col={col} 
              tasks={tasks.filter(t => t.stage === col.id)} 
            />
          ))}
        </div>
      </DndContext>

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Click outside to close profile */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </div>
  );
}