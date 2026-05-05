import { Ship, ArrowRight, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token (verify if your API uses 'access_token' or 'token')
        localStorage.setItem('authorization', data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Connection to server failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex h-screen bg-white">
        {/* Left Side: Branding (Shortened for brevity) */}
        <div className="hidden lg:flex w-1/2 bg-argo-secondary relative items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center px-12 text-white">
            <Ship size={64} className="mx-auto mb-8" />
            <h1 className="text-5xl font-black tracking-tighter mb-4">ARGO</h1>
            <p className="text-slate-400 text-lg">The next generation of project management.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-argo-secondary tracking-tight">Welcome Back</h2>
              {error && <p className="text-red-500 font-bold mt-2 text-sm">{error}</p>}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-argo outline-none transition-all"
                      placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                      type="password"
                      name="password" // Added name
                      value={formData.password} // Added value
                      onChange={handleInputChange} // Added onChange
                      required
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-argo outline-none transition-all"
                      placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-argo-secondary text-white py-4 rounded-argo font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50' : 'hover:bg-argo-primary'}`}
              >
                {isLoading ? 'Processing...' : 'Access System'} <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}