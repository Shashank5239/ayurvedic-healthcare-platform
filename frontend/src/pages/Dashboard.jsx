import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [viewMode, setViewMode] = useState("patient"); // 'patient' or 'doctor'

  useEffect(() => {
    // Load history from localStorage
    const savedData = JSON.parse(localStorage.getItem("ayur_history") || "[]");
    setHistory(savedData);
  }, []);

  // Stats Calculation
  const totalAssessments = history.length;
  const latestReport = history[0];
  const dominantDosha = latestReport ? latestReport.doshaImbalance : "N/A";

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ===== DASHBOARD HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif">
              {viewMode === 'patient' ? `Hello, ${user?.name || 'Abhay'}` : 'Clinician Dashboard'}
            </h1>
            <p className="text-slate-500 mt-2">
              {viewMode === 'patient' 
                ? "Here is your wellness journey and recent reports." 
                : "Patient Overview: Abhay Dogra (ID: #AY-8821)"}
            </p>
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
             <button 
                onClick={() => setViewMode('patient')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'patient' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                Patient View
             </button>
             <button 
                onClick={() => setViewMode('doctor')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'doctor' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                Doctor View
             </button>
          </div>
        </div>

        {/* ===== STATS ROW ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reports</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">{totalAssessments}</h3>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Dosha</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">{dominantDosha}</h3>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Checkup</p>
              <h3 className="text-lg font-bold text-slate-800 mt-2">In 7 Days</h3>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">
               <Link to="/symptoms" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-blue-500/30">
                  + New Checkup
               </Link>
           </div>
        </div>

        {/* ===== CONTENT AREA ===== */}
        {history.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[2rem] border border-dashed border-slate-300">
             <p className="text-slate-500 mb-4">No assessments found yet.</p>
             <Link to="/symptoms" className="text-blue-600 font-bold hover:underline">Start your first assessment</Link>
          </div>
        ) : (
          <>
            {/* PATIENT VIEW: FRIENDLY CARDS */}
            {viewMode === 'patient' && (
              <div>
                 <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Recent History</h2>
                 <div className="space-y-4">
                    {history.map((record) => (
                       <div key={record.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
                                {record.doshaImbalance.charAt(0)}
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-800 text-lg">{record.doshaImbalance} Imbalance</h4>
                                <p className="text-slate-500 text-sm">{record.date} • {record.recommendations.length} Symptoms</p>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                             <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                                record.severityLevel === 'severe' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                             }`}>
                                {record.severityLevel}
                             </div>
                             <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                View Details
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* DOCTOR VIEW: CLINICAL TABLE */}
            {viewMode === 'doctor' && (
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">Clinical Records</h2>
                    <button className="text-blue-600 text-sm font-bold hover:underline">Export PDF</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                       <thead className="bg-slate-50 text-slate-400 uppercase text-xs font-bold">
                          <tr>
                             <th className="px-6 py-4">Date</th>
                             <th className="px-6 py-4">Diagnosis (Dosha)</th>
                             <th className="px-6 py-4">Symptoms Reported</th>
                             <th className="px-6 py-4">Severity</th>
                             <th className="px-6 py-4">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {history.map((record) => (
                             <tr key={record.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                                <td className="px-6 py-4 text-blue-700 font-bold">{record.doshaImbalance}</td>
                                <td className="px-6 py-4 max-w-xs truncate">
                                   {record.recommendations.map(r => r.symptom).join(", ")}
                                </td>
                                <td className="px-6 py-4">
                                   <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                      record.severityLevel === 'severe' ? 'bg-rose-500' : 'bg-amber-500'
                                   }`}></span>
                                   {record.severityLevel}
                                </td>
                                <td className="px-6 py-4">
                                   <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">Reviewed</span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}