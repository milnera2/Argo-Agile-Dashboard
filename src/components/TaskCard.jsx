import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Mail, Tag, Star } from 'lucide-react';

export default function TaskCard({ id, label, points, ownerID = [], tags = [] }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}
           className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing mb-4"
      >
        <h3 className="text-lg font-bold text-slate-800">{label}</h3>
        <div className="mt-2 text-xs text-slate-500">
          {ownerID.map((email, i) => <div key={i}>{email}</div>)}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Star size={12} className="text-amber-500" />
          <span className="text-xs font-black">{points} PTS</span>
        </div>
      </div>
  );
}