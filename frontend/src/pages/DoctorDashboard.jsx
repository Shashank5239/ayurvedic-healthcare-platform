import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();

  // Mock Patient Data
  const patients = [
    { id: 'AY-101', name: 'Rahul Sharma', age: 24, diagnosis: 'Pitta', severity: 'High', lastVisit: 'Today', status: 'Pending Review' },
    { id: 'AY-102', name: 'Sneha Patel', age: 29, diagnosis: 'Vata', severity: 'Moderate', lastVisit: 'Yesterday', status: 'Prescribed' },
    { id: 'AY-103', name: 'Vikram Singh', age: 35, diagnosis: 'Kapha', severity: 'Low', lastVisit: '2 Days ago', status: 'Follow-up' },
    { id: 'AY-104', name: 'Priya Reddy', age: 27, diagnosis: 'Vata/Pitta', severity: 'Severe', lastVisit: 'Today', status: 'Pending Review' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
               Clinician Portal
            </div>
            <h1 className="text-4xl font-bold text-slate-900 font-serif">
              Welcome, {user?.name}
            </h1>
            <p className="text-slate-500 mt-1">
              You have <span className="text-blue-600 font-bold">2 critical cases</span> pending review today.
            </p>
          </div>
          <div className="flex gap-3">
             <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50">
                View Schedule
             </button>
             <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800">
                + Add Patient
             </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'Total Patients', val: '142', color: 'text-slate-800' },
             { label: 'Pending Reviews', val: '5', color: 'text-amber-600' },
             { label: 'Critical Cases', val: '12', color: 'text-rose-600' },
             { label: 'Recovered', val: '89%', color: 'text-emerald-600' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <h3 className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.val}</h3>
             </div>
           ))}
        </div>

        {/* MAIN CONTENT: PATIENT LIST */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 font-serif">Patient Queue</h2>
              <div className="flex gap-2">
                 <input type="text" placeholder="Search ID or Name..." className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                 <thead className="bg-slate-50 text-slate-400 uppercase text-xs font-bold">
                    <tr>
                       <th className="px-8 py-4">Patient Details</th>
                       <th className="px-8 py-4">Diagnosis</th>
                       <th className="px-8 py-4">Severity</th>
                       <th className="px-8 py-4">Status</th>
                       <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {patients.map((p) => (
                       <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-8 py-4">
                             <div className="font-bold text-slate-900 text-base">{p.name}</div>
                             <div className="text-xs text-slate-400">ID: {p.id} • Age: {p.age}</div>
                          </td>
                          <td className="px-8 py-4 font-semibold text-blue-700">{p.diagnosis}</td>
                          <td className="px-8 py-4">
                             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                p.severity === 'Severe' ? 'bg-rose-100 text-rose-700' :
                                p.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                                'bg-emerald-100 text-emerald-700'
                             }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                   p.severity === 'Severe' ? 'bg-rose-500' :
                                   p.severity === 'High' ? 'bg-amber-500' :
                                   'bg-emerald-500'
                                }`}></span>
                                {p.severity}
                             </span>
                          </td>
                          <td className="px-8 py-4">
                             <div className="flex items-center gap-2">
                                {p.status === 'Pending Review' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                                <span className="font-medium text-slate-700">{p.status}</span>
                             </div>
                             <div className="text-xs text-slate-400 mt-0.5">Updated: {p.lastVisit}</div>
                          </td>
                          <td className="px-8 py-4 text-right">
                             <button className="text-blue-600 font-bold text-sm hover:underline hover:text-blue-800 transition-colors">
                                Open Record
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}