import { useState, useEffect } from 'react';
import { X, Hash, AlignLeft, Tag, Mail, Star } from 'lucide-react';

/**
 * TaskDetailModal for ARGO
 * Features: Multi-owner parsing, inline delete confirmation, 
 * and consistent field mapping with CreateTaskModal.
 */
export default function TaskDetailModal({ 
  isOpen, 
  onClose, 
  task, 
  onSave, 
  onDelete,
  currentUser 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Sync state when a new task is selected
  useEffect(() => {
    setEditedTask(task);
    setIsEditing(false);
    setShowConfirmDelete(false);
  }, [task]);

  if (!isOpen || !task) return null;

  /** 
   * MULTI-OWNER PARSING
   * Converts comma-separated string into an array for verification and UI chips.
   */
  const ownerEmails = task.owners 
    ? task.owners.split(',').map(email => email.trim().toLowerCase()) 
    : [];

  /** 
   * VERIFICATION LOGIC (Soft-gated for frontend testing)
   * Future: ownerEmails.includes(currentUser?.email?.toLowerCase()) || currentUser?.role === 'lead'
   */
  const canModify = true; 

  const stageLabels = {
    todo: 'Not Started',
    dev: 'Development',
    qa: 'Quality Assurance',
    done: 'Completed'
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header: Title & Action Group */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Task Details</h2>
          
          <div className="flex items-center gap-2">
            {canModify && !isEditing && (
              <div className="flex items-center gap-2">
                {showConfirmDelete ? (
                  <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-in slide-in-from-right-2 duration-200">
                    <button 
                      onClick={() => onDelete(task.id)} 
                      className="text-[10px] font-black text-red-600 uppercase hover:text-red-800"
                    >
                      Confirm
                    </button>
                    <span className="text-red-200">|</span>
                    <button 
                      onClick={() => setShowConfirmDelete(false)} 
                      className="text-[10px] font-black text-slate-400 uppercase hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowConfirmDelete(true)} 
                    className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    DELETE
                  </button>
                )}
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  EDIT
                </button>
              </div>
            )}
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Title</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-300"><Hash size={16} /></div>
              {isEditing ? (
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                />
              ) : (
                <p className="w-full pl-10 pr-4 py-3 font-bold text-slate-800 text-lg leading-snug">{task.title}</p>
              )}
            </div>
          </div>

          {/* Multi-Owner Display */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Owners</label>
            <div className="relative flex items-start">
              <div className="absolute left-4 top-3.5 text-slate-300"><Mail size={16} /></div>
              {isEditing ? (
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none transition-all"
                  value={editedTask.owners}
                  onChange={(e) => setEditedTask({...editedTask, owners: e.target.value})}
                  placeholder="Comma separated emails..."
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 flex flex-wrap gap-2">
                  {ownerEmails.length > 0 ? ownerEmails.map((email, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                      {email}
                    </span>
                  )) : (
                    <p className="text-slate-400 italic text-sm">No owners assigned</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
            <div className="relative">
              <div className="absolute top-3.5 left-4 text-slate-300"><AlignLeft size={16} /></div>
              {isEditing ? (
                <textarea 
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none transition-all resize-none"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                />
              ) : (
                <p className="w-full pl-10 pr-4 py-3 font-medium text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {task.description || 'No description provided.'}
                </p>
              )}
            </div>
          </div>

          {/* Points & Stage Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Points</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-300"><Star size={16} /></div>
                {isEditing ? (
                  <input 
                    type="number"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-blue-600 outline-none transition-all"
                    value={editedTask.points}
                    onChange={(e) => setEditedTask({...editedTask, points: e.target.value})}
                  />
                ) : (
                  <p className="w-full pl-10 pr-4 py-3 font-bold text-slate-700">{task.points || 0} PTS</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Stage</label>
              {isEditing ? (
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  value={editedTask.stage}
                  onChange={(e) => setEditedTask({...editedTask, stage: e.target.value})}
                >
                  <option value="todo">Not Started</option>
                  <option value="dev">Development</option>
                  <option value="qa">Quality Assurance</option>
                  <option value="done">Completed</option>
                </select>
              ) : (
                <div className="px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl font-black text-blue-600 text-[11px] uppercase tracking-wider text-center">
                  {stageLabels[task.stage] || task.stage}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tags</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-300"><Tag size={16} /></div>
              {isEditing ? (
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none transition-all"
                  value={editedTask.tags}
                  onChange={(e) => setEditedTask({...editedTask, tags: e.target.value})}
                  placeholder="Backend, Frontend, etc..."
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 flex flex-wrap gap-2">
                  {task.tags ? task.tags.split(',').map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest border border-slate-200">
                      {tag.trim()}
                    </span>
                  )) : <span className="text-slate-300 italic text-xs">No tags</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Footer (Editing Mode) */}
        {isEditing && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-400 hover:bg-white transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-[2] py-3.5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}