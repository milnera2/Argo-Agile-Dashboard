import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function DroppableColumn({ col, tasks }) {
    const { setNodeRef } = useDroppable({ id: col.id });
    const taskIds = tasks.map(t => t._id); // Use MongoDB _id

    return (
        <div className="flex flex-col min-h-[70vh]">
            <h2 className="text-sm font-bold text-slate-400 mb-4">{col.title}</h2>
            <div ref={setNodeRef} className="bg-slate-200/30 rounded-3xl p-3 flex-1 border border-slate-200">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                id={task._id}
                                label={task.label}
                                points={task.points}
                                ownerID={task.ownerID}
                                tags={task.tags}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}