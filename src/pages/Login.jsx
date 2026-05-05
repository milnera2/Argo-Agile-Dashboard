import { useState } from 'react';
import { Ship, ArrowRight, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateAccountModal from '../components/CreateAccountModal'; 

export default function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-12">
          <div className="inline-flex p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8">
            <Ship size={64} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
            ARGO
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            The next generation of project management and sprint development. 
            Built for efficiency. Start your Odyssey.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-bold mt-2 uppercase text-xs tracking-widest">
              Please enter your credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Access System <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-slate-400 font-medium text-sm">
            Don't have an account? <button onClick={() => setIsModalOpen(true)} className="text-blue-600 font-bold hover:underline">Create One</button>
          </p>
        </div>
      </div>

      <CreateAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}