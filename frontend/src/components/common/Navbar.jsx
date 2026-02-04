import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Define links based on Auth state
  // If Logged Out: Only Home is visible (per your request)
  // If Logged In: All features are visible
  const navLinks = user 
    ? [
        { name: "Home", path: "/" },
        { name: "Symptoms", path: "/symptoms" },
        { name: "About", path: "/about" },
        { name: "Knowledge", path: "/knowledge" },
      ]
    : [
        { name: "Home", path: "/" },
      ];

  return (
    <>
      {/* ===== NAVBAR CONTAINER ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-md shadow-lg shadow-blue-900/5 border border-white/50 rounded-full py-3"
              : "bg-transparent py-2"
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* 1. LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-blue-200 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                A
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight font-serif group-hover:text-blue-700 transition-colors">
                AyurSaaS
              </span>
            </Link>

            {/* 2. DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* 3. BUTTONS (Restricted when logged out) */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                // LOGGED IN VIEW
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-slate-800 hover:scale-105 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // LOGGED OUT VIEW
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* 4. MOBILE HAMBURGER */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-700 p-2 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-2xl font-bold text-slate-800 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="flex flex-col gap-4 mt-8 w-64">
           {user ? (
             <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center border border-slate-200 rounded-xl">Dashboard</Link>
                <button onClick={() => {logout(); setIsMobileMenuOpen(false)}} className="w-full py-3 text-center bg-slate-900 text-white rounded-xl">Logout</button>
             </>
           ) : (
             <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center border border-slate-200 rounded-xl">Sign In</Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30">Get Started</Link>
             </>
           )}
        </div>
      </div>
    </>
  );
}