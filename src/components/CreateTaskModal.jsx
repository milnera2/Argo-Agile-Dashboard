import { useState } from 'react';
import { X, Plus, Hash, AlignLeft, Tag, Mail, Star } from 'lucide-react';

export default function CreateTaskModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    points: 0,
    phase: 'todo',
    ownerID: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submissionData = {
        ...formData,
        ownerID: formData.ownerID.split(',').map(email => email.trim()).filter(e => e !== ""),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t !== "")
      };

      const token = localStorage.getItem('authorization');

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setFormData({
          label: '',
          description: '',
          points: 0,
          phase: 'todo',
          ownerID: '',
          tags: ''
        });
        onClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        ></div>

        <div className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Create New Task</h2>
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <form id="create-task-form" onSubmit={handleSubmit} className="space-y-5">

              {/* Task Title maps to 'label' in Model */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Task Title
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <Hash size={16} />
                  </div>
                  <input
                      name="label"
                      type="text"
                      required
                      value={formData.label}
                      onChange={handleInputChange}
                      placeholder="e.g., Build Feature"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Owners (Comma separated emails)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={16} />
                  </div>
                  <input
                      name="ownerID"
                      type="text"
                      value={formData.ownerID}
                      onChange={handleInputChange}
                      placeholder="name@example.com, othername@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Description
                </label>
                <div className="relative group">
                  <div className="absolute top-3.5 left-4 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <AlignLeft size={16} />
                  </div>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Outline the technical requirements..."
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Points */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Story Points
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                      <Star size={16} />
                    </div>
                    <input
                        name="points"
                        type="number"
                        min="0"
                        value={formData.points}
                        onChange={handleInputChange}
                        placeholder="3"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Phase */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Initial Stage
                  </label>
                  <select
                      name="phase"
                      value={formData.phase}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-4 focus:ring-blue-600/10 outline-none font-medium cursor-pointer"
                  >
                    <option value="todo">Not Started</option>
                    <option value="dev">Development</option>
                    <option value="qa">Quality Assurance</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Tags (Comma separated)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <Tag size={16} />
                  </div>
                  <input
                      name="tags"
                      type="text"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Backend, Frontend, API"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                  />
                </div>
              </div>

            </form>
          </div>

          <div className="p-6 border-t border-slate-100 bg-white flex gap-3 shrink-0">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
                type="submit"
                form="create-task-form"
                disabled={isLoading}
                className={`flex-[2] py-3.5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-[0.98]'
                }`}
            >
              <Plus size={18} /> {isLoading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </div>
      </div>
  );
}