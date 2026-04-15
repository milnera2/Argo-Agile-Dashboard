import { Plus, Presentation } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'Not Started' },
  { id: 'dev', title: 'DEV' },
  { id: 'qa', title: 'QA' },
  { id: 'done', title: 'DONE' }
];

export default function Home() {
  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header Area from Wireframe */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Agile Board (Team View)</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            <Plus size={20} /> TASK
          </button>
          <button className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300">
            <Presentation size={20} /> Present
          </button>
        </div>
      </div>

      {/* Agile Board Grid */}
      <div className="grid grid-cols-4 gap-4 flex-1">
        {COLUMNS.map((col) => (
          <div key={col.id} className="bg-slate-100/50 rounded-xl border border-slate-200 p-4 flex flex-col">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">
              {col.title}
            </h2>
            
            <div className="space-y-3">
              {/* Placeholder Cards to see how it looks */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-800">Draft Project Proposal</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Story</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-800">Setup React Router</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded">Setup</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}