import {
  Users,
  ChevronRight,
  PieChart as PieIcon,
  ListTodo,
  Plus,
  Mail
} from "lucide-react";
import { useState } from "react";

export default function LeadDash({ tasks = [], onPromote }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.stage === "done").length;
  const openTasks = tasks.filter(t => t.stage !== "done");

  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handlePromote = async () => {
    const res = await onPromote(email);

    if (res.success) {
      setMessage({ type: "success", text: "User promoted to Team Lead" });
    } else {
      setMessage({ type: "error", text: res.message });
    }

    setEmail("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none flex items-center gap-4">
          <Users size={48} className="text-blue-600" /> LEAD DASHBOARD
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 ml-1">
          Team Oversight & Management
        </p>
      </div>

      {/* ADD TEAM LEAD */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-3 text-blue-600">
          <Plus size={16} />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Add Team Lead
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition">
              <Mail size={16} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none font-medium"
            />
          </div>

          <button
            onClick={handlePromote}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Add
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 text-xs font-bold px-3 py-2 rounded-xl ${
              message.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* MAIN GRID  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TASK LIST */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ListTodo size={18} className="text-blue-600" /> Team Open Tasks
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
              {openTasks.length} OPEN
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {openTasks.length > 0 ? (
              openTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 hover:bg-white cursor-pointer transition-all duration-200"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      {task.title}
                    </span>
                    <span className="text-[10px] font-bold text-blue-500 uppercase mt-1">
                      {task.stage}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-40 italic">
                <p className="text-sm font-medium">All tasks cleared!</p>
              </div>
            )}
          </div>
        </div>

        {/* GRAPH */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>

          <h2 className="text-sm font-black text-white uppercase tracking-wider w-full mb-8 flex items-center gap-2">
            <PieIcon size={18} className="text-blue-400" /> Team Completion
          </h2>

          <div className="relative flex items-center justify-center">
            <svg className="w-56 h-56 transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={628}
                strokeDashoffset={628 - (628 * completionPercentage) / 100}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute text-center">
              <span className="text-5xl font-black text-white tracking-tighter">
                {completionPercentage}%
              </span>
              <p className="text-[10px] text-blue-400 uppercase font-black tracking-[0.2em] mt-1">
                Fulfilled
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {completedTasks} / {totalTasks} Tasks Finished
          </p>
        </div>
      </div>
    </div>
  );
}