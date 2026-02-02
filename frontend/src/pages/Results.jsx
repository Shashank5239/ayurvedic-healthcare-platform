import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Results = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('recommendations') || '{}');
    setRecommendations(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Generating your Ayurvedic recommendations...</p>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Results</h1>
          <p className="text-gray-600 mb-8">Please complete the symptom assessment first.</p>
          <Link to="/symptoms">
            <Button>Start Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            🧘 Your Ayurvedic Wellness Plan
          </h1>
          
          {/* DISCLAIMER */}
          <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-bold text-lg text-yellow-800 mb-2">{recommendations.disclaimer}</h3>
                <p className="text-yellow-700">This is general wellness guidance based on Ayurvedic principles.</p>
              </div>
            </div>
          </div>

          {/* DOSHA ANALYSIS */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl mb-8 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
              Detected Imbalance: <span className="ml-2">{recommendations.doshaImbalance}</span>
            </h2>
            <p className="text-lg text-emerald-700">
              Severity: <span className="font-bold text-2xl capitalize">{recommendations.severityLevel}</span>
            </p>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.recommendations.map((rec, index) => (
              <div key={index} className="card group hover:shadow-2xl transition-all">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg capitalize">{rec.symptom.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 capitalize mb-2">{rec.symptom.replace('_', ' ')}</h3>
                    <p className="text-sm text-gray-600 mb-4">Dosha: <span className="font-semibold text-emerald-600">{recommendations.doshaImbalance}</span></p>
                  </div>
                </div>

                {rec.home && (
                  <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      🏠 Home Remedy
                    </h4>
                    <p className="text-green-700 text-sm">{rec.home}</p>
                  </div>
                )}

                {rec.med && (
                  <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      💊 Certified Medicine
                    </h4>
                    <p className="text-blue-700 text-sm">{rec.med} <span className="text-xs">(Consult practitioner)</span></p>
                  </div>
                )}

                {rec.action && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      🚨 {rec.action}
                    </h4>
                    <p className="text-red-700 text-sm">{rec.reason}</p>
                  </div>
                )}

                <p className="text-sm text-gray-600 italic mb-4">
                  <strong>Why:</strong> {rec.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <Link to="/symptoms">
              <Button className="w-full md:w-auto">New Assessment</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full md:w-auto">Save to Health Journey</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
