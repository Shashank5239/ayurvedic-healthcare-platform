import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { symptomsAPI } from '../utils/api';
import Button from '../components/common/Button';

const SymptomInput = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    symptoms: [], 
    lifestyle: '',
    age: '',
    gender: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const symptomsList = [
    { id: 'headache', label: 'Headache' },
    { id: 'indigestion', label: 'Indigestion' },
    { id: 'joint_pain', label: 'Joint Pain' },
    { id: 'cold_cough', label: 'Cold/Cough' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'anxiety', label: 'Anxiety' }
  ];

  const updateSymptomSeverity = (symptomId, severity) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.map(s => 
        s.name === symptomId ? { ...s, severity } : s
      ).filter(s => s.severity > 0)
    }));
  };

  const addSymptom = (symptomId) => {
    if (!formData.symptoms.find(s => s.name === symptomId)) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, { name: symptomId, severity: 1 }]
      }));
    }
  };

  const submitSymptoms = async () => {
    const mockRecommendations = [
    {
      symptom: 'headache',
      doshaImbalance: 'Pitta/Vata',
      severityLevel: formData.symptoms[0]?.severity > 2 ? 'severe' : 'moderate',
      recommendations: formData.symptoms.map(symptom => {
        const remedies = {
          headache: {
            home: "Ginger tea 2x daily; rest in dark room",
            med: "Brahmi Vati",
            reason: "Balances Pitta heat, calms Vata"
          },
          indigestion: {
            home: "Ajwain water after meals",
            med: "Triphala Churna", 
            reason: "Stimulates Agni (digestive fire)"
          },
          'joint_pain': {
            home: "Warm sesame oil massage",
            med: "Maharasnadi Kwath",
            reason: "Pacifies Vata dryness"
          }
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

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  localStorage.setItem('recommendations', JSON.stringify(mockRecommendations[0]));
  navigate('/results');
};

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-2xl mx-auto">
        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Symptom Assessment
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-green-600 h-2 rounded-full transition-all" 
                 style={{ width: `${step * 25}%` }}></div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">Step 1: Select Symptoms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {symptomsList.map(symptom => (
                  <label key={symptom.id} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-600 rounded"
                      onChange={(e) => e.target.checked && addSymptom(symptom.id)}
                    />
                    <span className="ml-3 text-lg font-medium">{symptom.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && formData.symptoms.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">Step 2: Set Severity</h3>
              {formData.symptoms.map(symptom => (
                <div key={symptom.name} className="mb-6 p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-xl mb-4 capitalize">{symptom.name.replace('_', ' ')}</h4>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3].map(severity => (
                      <button
                        key={severity}
                        onClick={() => updateSymptomSeverity(symptom.name, severity)}
                        className={`w-24 py-2 px-4 rounded-lg font-semibold transition-all ${
                          symptom.severity === severity
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {['Mild', 'Moderate', 'Severe'][severity - 1]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">Step 3: Personal Details</h3>
              <div className="space-y-6">
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                <select
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Lifestyle (diet, sleep, stress, exercise...)"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 h-32"
                  value={formData.lifestyle}
                  onChange={(e) => setFormData({...formData, lifestyle: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t">
            {step > 1 && (
              <Button 
                onClick={() => setStep(step - 1)}
                variant="secondary"
              >
                Previous
              </Button>
            )}
            <Button 
              onClick={step === 3 ? submitSymptoms : () => setStep(step + 1)}
              disabled={step === 1 && formData.symptoms.length === 0}
            >
              {step === 3 ? 'Get Recommendations' : 'Next Step'}
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">
          {step === 1 && formData.symptoms.length === 0 && (
            <p>Select at least one symptom to continue</p>
          )}
          {step === 2 && formData.symptoms.length === 0 && (
            <p>No symptoms selected. <button onClick={() => setStep(1)} className="text-green-600 font-medium underline">Go back</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;
