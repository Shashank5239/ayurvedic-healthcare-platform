import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      {/* Subtle Floating Particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="min-h-screen pt-28 relative">
        {/* Hero - Clean & Bold */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-32">
            {/* Luxury Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-amber-800 font-semibold tracking-wide uppercase text-sm">Ancient Healing • Modern Science</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-slate-900 mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
              AYURVEDA
              <br />
              <span className="block text-6xl md:text-7xl">REDEFINED</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              Personalized dosha analysis with authentic ancient remedies. 
              <br />
              <span className="font-semibold text-amber-700">Your path to perfect harmony begins here.</span>
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link to="/symptoms" className="premium-btn inline-flex items-center group">
                <span>Begin Assessment</span>
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/login" className="glass-btn group hover:scale-105">
                Dashboard Access
              </Link>
            </div>
          </div>

          {/* Luxury Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🧬', title: 'Precise Dosha Analysis', desc: 'AI-powered assessment reveals your unique constitution', color: 'from-emerald-500 to-teal-500' },
              { icon: '🌿', title: 'Authentic Remedies', desc: '5000+ year old formulations, personally curated', color: 'from-amber-500 to-orange-500' },
              { icon: '📈', title: 'Health Journey Tracking', desc: 'Monitor progress, celebrate milestones, achieve balance', color: 'from-indigo-500 to-purple-500' }
            ].map((feature, i) => (
              <div key={i} className="feature-card group hover:scale-[1.02] transition-all duration-500" style={{animationDelay: `${i * 100}ms`}}>
                <div className={`w-20 h-20 ${feature.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-6 transition-transform duration-500 text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center group-hover:text-slate-800 transition-colors">{feature.title}</h3>
                <p className="text-slate-600 text-center leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
