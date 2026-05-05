import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Mail, Tag, Star } from 'lucide-react';

export default function TaskCard({ id, title, points, owners = [], tags = [] }) {
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
      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-600 transition-all cursor-grab active:cursor-grabbing touch-none select-none mb-4"
    >
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 leading-tight">
          {title}
        </h3>
      </div>

      {/* Owners Section */}
      {owners.length > 0 && (
        <div className="space-y-1.5 mb-4">
          {owners.map((email, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-500">
              <Mail size={12} className="text-slate-400" />
              <span className="text-xs font-medium truncate">{email}</span>
            </div>
          ))}
        </div>
      )}

      {/* Star Points Section */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">
            {points || 0} PTS
          </span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-400 px-2.5 py-1 rounded-md border border-slate-200/30"
            >
              <Tag size={10} className="opacity-50" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}