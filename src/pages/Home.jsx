import { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls user dropdown
  const [tasks, setTasks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const token = localStorage.getItem('authorization');

  const fetchData = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/tasks', {
        headers: { 'authorization': `${token}` }
      });
      const data = await response.json();

      const userRes = await fetch('/api/user', {
        headers: { 'authorization': `${token}` }
      });
      const userData = await userRes.json();

      setTasks(Array.isArray(data) ? data : []);
      setUserEmail(userData.email || "User");
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetchData();

    // Listen for global refresh signals from the Layout sidebar/modal
    const handleGlobalRefresh = () => fetchData();
    window.addEventListener('taskUpdated', handleGlobalRefresh);

    return () => {
      window.removeEventListener('taskUpdated', handleGlobalRefresh);
    };
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST', // or 'GET' depending on your backend
        headers: {
          'authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn("Server-side logout failed, but clearing local session anyway.");
      }
    } catch (err) {
      console.error("API Logout error:", err);
    } finally {
      localStorage.removeItem('authorization');


      navigate('/');
    }
  };

  const updateTaskPhase = async (taskId, newPhase) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`
        },
        body: JSON.stringify({ phase: newPhase })
      });
    } catch (err) {
      console.error("Failed to update database", err);
    }
  };

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
      const activeTask = prevTasks.find((t) => t._id === activeId);
      if (!activeTask) return prevTasks;

      const overColumn = COLUMNS.find(col => col.id === overId);
      const overTask = prevTasks.find(t => t._id === overId);
      const newPhase = overColumn ? overColumn.id : (overTask ? overTask.phase : activeTask.phase);

      if (activeTask.phase !== newPhase) {
        updateTaskPhase(activeId, newPhase);
        return prevTasks.map((t) =>
            t._id === activeId ? { ...t, phase: newPhase } : t
        );
      }

      const oldIndex = prevTasks.findIndex((t) => t._id === activeId);
      const newIndex = prevTasks.findIndex((t) => t._id === overId);
      return arrayMove(prevTasks, oldIndex, newIndex);
    });
  };

  return (
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Agile Board</h1>

            </div>

            <div className="flex items-center gap-4">
              <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                NEW TASK
              </button>

              {/* User Profile Icon & Dropdown */}
              <div className="relative">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-12 h-12 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center hover:border-blue-600 transition-all shadow-sm"
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in duration-200">
                      <div className="mb-4 px-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{userEmail}</p>
                      </div>
                      <button
                          className="w-full flex items-center justify-between gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                          onClick={handleLogout}
                      >
                        Logout <LogOut size={16} />
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {COLUMNS.map((col) => (
                  <DroppableColumn
                      key={col.id}
                      col={col}
                      tasks={tasks.filter(t => t.phase === col.id)}
                  />
              ))}
            </div>
          </DndContext>

          <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
  );
}