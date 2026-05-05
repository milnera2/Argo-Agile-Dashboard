import { useState } from 'react';
import { Plus, Presentation } from 'lucide-react';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
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
  
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Draft Project Proposal', stage: 'todo', date: 'OCT 2023', points: '2' },
    { id: '2', title: 'Build Frontend Feature', stage: 'dev', date: 'MAY 2026', points: '3' },
    { id: '3', title: 'Ship API', stage: 'dev', date: 'MAY 2026', points: '5' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, 
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, 
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Agile Board</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white text-slate-700 px-5 py-2.5 rounded-xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
            <Presentation size={18} /> Present
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
          >
            <Plus size={18} /> NEW TASK
          </button>
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
    </div>
  );
}