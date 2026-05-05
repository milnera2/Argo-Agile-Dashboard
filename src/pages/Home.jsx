import { useState } from 'react';
import { Plus, Presentation, MoreVertical } from 'lucide-react';
import CreateTaskModal from '../components/CreateTaskModal';

const COLUMNS = [
  { id: 'todo', title: 'Not Started', color: 'bg-slate-400' },
  { id: 'dev', title: 'Development', color: 'bg-argo-primary' },
  { id: 'qa', title: 'Quality Assurance', color: 'bg-amber-500' },
  { id: 'done', title: 'Completed', color: 'bg-emerald-500' }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 bg-argo-bg min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-argo-secondary tracking-tight">Agile Board</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white text-slate-700 px-5 py-2.5 rounded-xl font-bold border border-slate-200 shadow-argo-soft hover:bg-slate-50 transition-all">
            <Presentation size={18} /> Present
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-argo-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-argo-glow hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
          >
            <Plus size={18} /> NEW TASK
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex flex-col min-h-[70vh]">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {col.title}
              </h2>
            </div>
            
            <div className="bg-slate-200/30 rounded-argo p-3 flex-1 border border-slate-200/50 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-argo-soft border border-slate-100 group hover:border-argo-primary transition-all cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black bg-blue-50 text-argo-primary px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Story
                    </span>
                    <button className="text-slate-300 group-hover:text-slate-500 transition-colors">
                      <MoreVertical size={14}/>
                    </button>
                  </div>
                  <h3 className="font-bold text-argo-secondary leading-snug">Draft Project Proposal</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="w-6 h-6 rounded-full bg-argo-secondary border-2 border-white text-[8px] flex items-center justify-center text-white font-bold">
                      AM
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-tighter">OCT 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}