import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/common/Navbar";

// Pages
import Landing from "./pages/Landing";
import SymptomInput from "./pages/SymptomInput";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import KnowledgeBase from "./pages/KnowledgeBase"; // <--- NOW IMPORTING THE REAL FILE

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Authentication Page */}
          <Route path="/login" element={<Login />} />
          
          {/* Main App Features */}
          <Route path="/symptoms" element={<SymptomInput />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Informational Pages */}
          <Route path="/about" element={<About />} />
          
          {/* Connected Real Knowledge Base Page */}
          <Route path="/knowledge" element={<KnowledgeBase />} />

          {/* Fallback */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;