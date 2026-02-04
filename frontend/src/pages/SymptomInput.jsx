import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SymptomInput = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    symptoms: [], 
    lifestyle: '',
    age: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth(); // We need to check this on submit

  const symptomsList = [
    { id: 'headache', label: 'Headache', icon: '⚡' },
    { id: 'indigestion', label: 'Indigestion', icon: '🔥' },
    { id: 'joint_pain', label: 'Joint Pain', icon: '🦴' },
    { id: 'cold_cough', label: 'Cold / Cough', icon: '🤧' },
    { id: 'fatigue', label: 'Fatigue', icon: '🔋' },
    { id: 'anxiety', label: 'Anxiety', icon: '😰' },
    { id: 'insomnia', label: 'Insomnia', icon: '🌙' },
    { id: 'skin_rash', label: 'Skin Rash', icon: '🌵' }
  ];

  const isSelected = (id) => formData.symptoms.find(s => s.name === id);

  const toggleSymptom = (symptomId) => {
    if (isSelected(symptomId)) {
      setFormData(prev => ({
        ...prev,
        symptoms: prev.symptoms.filter(s => s.name !== symptomId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, { name: symptomId, severity: 1 }]
      }));
    }
  };

  const updateSymptomSeverity = (symptomId, severity) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.map(s => 
        s.name === symptomId ? { ...s, severity } : s
      )
    }));
  };

  const submitSymptoms = async () => {
    setIsLoading(true);
    
    // 1. Generate Recommendations (Mock)
    const mockRecommendations = [
      {
        symptom: 'headache',
        doshaImbalance: 'Pitta/Vata',
        severityLevel: formData.symptoms[0]?.severity > 2 ? 'severe' : 'moderate',
        recommendations: formData.symptoms.map(symptom => {
          const remedies = {
            headache: { home: "Ginger tea 2x daily; rest in dark room", med: "Brahmi Vati", reason: "Balances Pitta heat, calms Vata" },
            indigestion: { home: "Ajwain water after meals", med: "Triphala Churna", reason: "Stimulates Agni (digestive fire)" },
            'joint_pain': { home: "Warm sesame oil massage", med: "Maharasnadi Kwath", reason: "Pacifies Vata dryness" },
            'cold_cough': { home: "Turmeric milk before bed", med: "Sitopaladi Churna", reason: "Reduces Kapha congestion" },
            'anxiety': { home: "Deep breathing & warm milk", med: "Ashwagandha", reason: "Calms Vata nervous energy" }
          };
          return {
            symptom: symptom.name,
            ...remedies[symptom.name] || remedies.headache,
            explanation: remedies[symptom.name]?.reason || "Balances dosha imbalance"
          };
        }),
        disclaimer: "⚠️ NOT medical advice. Consult certified practitioner."
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 2. Save Data Locally (so it persists across the redirect)
    localStorage.setItem('recommendations', JSON.stringify(mockRecommendations[0]));
    setIsLoading(false);

    // 3. CHECK AUTH
    if (user) {
        // User is logged in -> Go straight to results
        navigate('/results');
    } else {
        // User is Guest -> Redirect to Login with a specific message
        navigate('/login', { 
            state: { 
                from: '/results', // Tell Login page to send us here after success
                message: "Please sign in or create an account to view your full health report." 
            } 
        });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 font-sans text-slate-900 bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
         <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px] opacity-50" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[80px] opacity-50" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-[2rem] overflow-hidden">
          
          {/* Header */}
          <div className="bg-white border-b border-slate-100 p-8 pb-0">
            <h1 className="text-3xl font-bold text-slate-800 text-center font-serif mb-2">
              Health Assessment
            </h1>
            <p className="text-slate-500 text-center mb-8 text-sm">
              Please answer accurately for the best Ayurvedic analysis.
            </p>

            {/* Stepper */}
            <div className="flex items-center justify-between relative px-4 mb-8">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
               <div 
                  className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500"
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
               ></div>

               {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex flex-col items-center gap-2 bg-white px-2 ${step >= s ? 'text-blue-600' : 'text-slate-400'}`}>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                        step >= s ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border-slate-200'
                     }`}>
                        {step > s ? '✓' : s}
                     </div>
                     <span className="text-xs font-semibold uppercase tracking-wider">
                        {s === 1 ? 'Symptoms' : s === 2 ? 'Severity' : 'Details'}
                     </span>
                  </div>
               ))}
            </div>
          </div>

          <div className="p-8">
            {/* STEP 1: SYMPTOMS */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                   What are you experiencing?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {symptomsList.map(symptom => {
                    const active = isSelected(symptom.id);
                    return (
                      <div 
                        key={symptom.id} 
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center aspect-square ${
                           active 
                           ? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/10 transform scale-105' 
                           : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-3xl">{symptom.icon}</span>
                        <span className={`font-medium text-sm ${active ? 'text-blue-700' : 'text-slate-600'}`}>
                           {symptom.label}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                           active ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                        }`}>
                           {active && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: SEVERITY */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                   How severe is it?
                </h3>
                <div className="space-y-4">
                  {formData.symptoms.map(symptom => {
                     const label = symptomsList.find(s => s.id === symptom.name)?.label || symptom.name;
                     return (
                        <div key={symptom.name} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <span className="font-bold text-slate-700 text-lg flex items-center gap-2">
                                 {symptomsList.find(s => s.id === symptom.name)?.icon} {label}
                              </span>
                              <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                                 {[1, 2, 3].map(level => (
                                    <button
                                       key={level}
                                       onClick={() => updateSymptomSeverity(symptom.name, level)}
                                       className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                                          symptom.severity === level 
                                          ? level === 1 ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                                          : level === 2 ? 'bg-amber-100 text-amber-700 shadow-sm' 
                                          : 'bg-rose-100 text-rose-700 shadow-sm'
                                          : 'text-slate-500 hover:bg-slate-50'
                                       }`}
                                    >
                                       {level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Severe'}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                   About You
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age</label>
                      <input
                        type="number"
                        placeholder="e.g. 28"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                      <select
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lifestyle Factors</label>
                      <textarea
                        placeholder="Describe your diet, sleep patterns, stress levels, or daily activity..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none h-32 resize-none"
                        value={formData.lifestyle}
                        onChange={(e) => setFormData({...formData, lifestyle: e.target.value})}
                      />
                   </div>
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 mt-10 pt-8 border-t border-slate-100">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Back
                </button>
              ) : (
                 <div className="hidden sm:block"></div>
              )}
              
              <button 
                onClick={step === 3 ? submitSymptoms : () => setStep(step + 1)}
                disabled={(step === 1 && formData.symptoms.length === 0) || isLoading}
                className="flex-1 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Analyzing...
                  </>
                ) : (
                   step === 3 ? 'Generate Health Report' : 'Next Step'
                )}
              </button>
            </div>
            
            {/* Validation Message */}
            {step === 1 && formData.symptoms.length === 0 && (
               <p className="text-center mt-4 text-xs text-amber-600 font-medium bg-amber-50 py-2 rounded-lg">
                  Please select at least one symptom to continue
               </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;