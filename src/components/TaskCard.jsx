import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical, Star } from 'lucide-react';

export default function TaskCard({ id, title, date, points }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 group hover:border-blue-600 transition-all cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-800 leading-snug pr-4">
          {title}
        </h3>
        <button className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0">
          <MoreVertical size={14}/>
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black text-slate-600 tracking-tight">
            {points || 0} PTS
          </span>
        </div>
        
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          {date}
        </span>
      </div>
    </div>
  );
}