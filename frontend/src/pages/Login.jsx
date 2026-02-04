import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user came from a specific page (like "Generate Report")
  const comingFromReport = location.state?.from === '/results';
  const alertMessage = location.state?.message;

  // Mock Form Data
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@example.com",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== UPDATED LOGIN LOGIC =====
  const handleInstantLogin = (e) => {
    e.preventDefault();
    
    // 1. Perform Login
    login({ name: formData.name || "Test User", email: formData.email });
    
    // 2. Conditional Redirect based on your request
    if (comingFromReport) {
        // If they came from "Generate Report", go to Dashboard
        navigate("/dashboard");
    } else {
        // If simply logging in, go to Home Page
        navigate("/");
    }
  };

  const handleSignupRedirect = (e) => {
     e.preventDefault();
     setIsFlipped(false); 
  };

  const SocialButtons = ({ theme = "light" }) => (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button type="button" onClick={handleInstantLogin} className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl transition-colors font-medium text-sm ${
        theme === "dark" ? "border-slate-600 hover:bg-slate-700 text-white" : "border-slate-200 hover:bg-slate-50 text-slate-700"
      }`}>
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </button>
      <button type="button" onClick={handleInstantLogin} className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl transition-colors font-medium text-sm ${
        theme === "dark" ? "border-slate-600 hover:bg-slate-700 text-white" : "border-slate-200 hover:bg-slate-50 text-slate-700"
      }`}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.7.79 3.49 1.92-3.03 1.8-2.55 6.35.62 7.61-.6 1.39-1.37 2.72-2.7 3.5zm-5.17-15.04c.3-.08 2.35-.44 3.12 1.35-1.8.7-3.66-.45-3.12-1.35z"/></svg>
        Apple
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900 perspective-1000 py-10">
      
      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-70" />
      </div>

      {/* ===== LOGO HEADER ===== */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
         <Link to="/" className="group flex items-center gap-2 bg-white/50 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-white/60 hover:scale-105 transition-transform duration-300">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs shadow-md">A</div>
            <span className="font-bold text-slate-700 tracking-tight font-serif group-hover:text-blue-600 transition-colors">AyurSaaS</span>
         </Link>
      </div>

      {/* ===== 3D FLIP CONTAINER ===== */}
      <div className="w-full max-w-md px-4 perspective group">
        
        <div 
            className={`grid grid-cols-1 grid-rows-1 transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          
          {/* ==============================
              FRONT SIDE (SIGN IN)
          ============================== */}
          <div className="col-start-1 row-start-1 backface-hidden z-10">
             <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="text-center mb-6">
                  {/* === ALERT MESSAGE (If Redirected) === */}
                  {alertMessage ? (
                     <div className="mb-4 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in-down">
                        ✨ {alertMessage}
                     </div>
                  ) : (
                     <h2 className="text-3xl font-bold text-slate-800 mb-2 font-serif">Welcome Back</h2>
                  )}
                  <p className="text-slate-500 text-sm">Testing Mode: Click Sign In to enter.</p>
                </div>

                <form onSubmit={handleInstantLogin} className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Email</label>
                      <input type="email" name="email" placeholder="test@example.com"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                      <input type="password" name="password" placeholder="Any password works"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                   </div>

                   <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                      Sign In (Instant)
                   </button>
                </form>

                <div className="mt-6 flex items-center gap-3">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Or</span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <SocialButtons theme="light" />

                <div className="mt-6 text-center border-t border-slate-100 pt-6">
                   <p className="text-slate-500 text-sm">
                      Don't have an account? 
                      <button onClick={() => setIsFlipped(true)} className="font-bold text-blue-600 ml-1 hover:underline">
                         Create one
                      </button>
                   </p>
                </div>
             </div>
          </div>

          {/* ==============================
              BACK SIDE (SIGN UP)
          ============================== */}
          <div className="col-start-1 row-start-1 backface-hidden rotate-y-180 z-10">
             <div className="bg-gradient-to-b from-blue-50/95 to-white/95 backdrop-blur-xl border border-blue-200 shadow-2xl rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

                <div className="text-center mb-6 relative z-10">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2 font-serif">Join AyurSaaS</h2>
                  <p className="text-slate-500 text-sm">Testing Mode enabled.</p>
                </div>

                <form onSubmit={handleSignupRedirect} className="space-y-3 relative z-10">
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Full Name</label>
                      <input type="text" name="name" placeholder="Abhay Dogra"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Email</label>
                      <input type="email" name="email" placeholder="name@example.com"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Password</label>
                      <input type="password" name="password" placeholder="••••••••"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                   </div>

                   <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 mt-2">
                      Create Account
                   </button>
                </form>

                <SocialButtons theme="light" />

                <div className="mt-6 text-center border-t border-blue-100 pt-6 relative z-10">
                   <p className="text-slate-500 text-sm">
                      Already have an account? 
                      <button onClick={() => setIsFlipped(false)} className="font-bold text-blue-600 ml-1 hover:text-blue-800 transition-colors">
                         Sign In
                      </button>
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}