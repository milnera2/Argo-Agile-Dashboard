import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function DroppableColumn({ col, tasks }) {
  const { setNodeRef } = useDroppable({ id: col.id });

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          {col.title}
        </h2>
      </div>
      
      <div 
        ref={setNodeRef}
        className="bg-slate-200/30 rounded-3xl p-3 flex-1 border border-slate-200/50 backdrop-blur-sm"
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                id={task.id}
                title={task.title}
                date={task.date}
                points={task.points}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}