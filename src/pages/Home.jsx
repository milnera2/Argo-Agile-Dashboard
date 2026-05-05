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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const token = localStorage.getItem('authorization');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
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
    fetchData();
  }, [token, navigate]);

  const updateTaskPhase = async (taskId, newPhase) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT', // Matches your router.js
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`
        },
        body: JSON.stringify({ phase: newPhase }) // Matches your TaskModel field
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
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Agile Board</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold">NEW TASK</button>
        </div>

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
  );
}