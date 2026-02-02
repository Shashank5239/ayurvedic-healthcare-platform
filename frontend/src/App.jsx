import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SymptomInput from './pages/SymptomInput';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Login from './pages/Login';


  // Replace Navbar component in App.jsx
function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar-glass fixed w-full z-50 top-6 left-1/2 transform -translate-x-1/2 px-8 py-6 shadow-2xl max-w-6xl mx-auto rounded-3xl backdrop-blur-xl">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-all">
          🕉️ AyurvedaCare
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/symptoms" className="premium-btn text-base px-8 py-4 !leading-none">
            Start Journey
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="glass-btn px-6 py-3 rounded-xl font-semibold">
                Dashboard
              </Link>
              <button onClick={logout} className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="glass-btn px-8 py-3 rounded-xl font-semibold hover:shadow-xl">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}


function Layout({ children }) {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/symptoms" element={<SymptomInput />} />
      <Route path="/results" element={<Results />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/knowledge" element={<KnowledgeBase />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppContent />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
