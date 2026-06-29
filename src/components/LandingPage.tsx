import React from "react";
import { Brain, Sparkles, MessageSquare, Compass, ArrowRight, Activity, Target } from "lucide-react";
import DigitalTwin from "./twin/DigitalTwin";
import { motion } from "motion/react";

interface LandingPageProps {
  onCreateClick: () => void;
  onViewTwinClick?: () => void;
  hasExistingTwin: boolean;
}

export default function LandingPage({ onCreateClick, onViewTwinClick, hasExistingTwin }: LandingPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative overflow-hidden min-h-screen pt-12 pb-24 grid-bg" 
      id="landing-container"
    >
      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full filter blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-50 rounded-full filter blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Text Content */}
          <div>
            <div className="flex mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-50 border border-indigo-100/80 text-indigo-600 font-mono tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Predictive Modeling
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.1] mb-6">
              Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">Digital Twin</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-sans leading-relaxed mb-6">
              "Create Your Future Self. Learn From It. Become It."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onCreateClick}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                {hasExistingTwin ? "Customize My Twin" : "Create My Twin"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex items-center justify-center h-full min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-cyan-50 rounded-full blur-3xl opacity-60"></div>
            <DigitalTwin 
              name="Bhavi Assistant" 
              personality="Mentor" 
              layoutId="main-twin" 
              size="lg" 
              isActive={true} 
              moodInput={{ readinessScore: 85, riskScore: 10 }}
            />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Platform Capabilities</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 font-display mt-2">
              Empowered with Advanced Predictors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/60 hover:border-indigo-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">🔮 Futurist Readiness Matrix</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive real-time, dynamic scores predicting your preparation gaps, consistency factors, and total probability maps for your target goals.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 hover:border-indigo-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">🌀 What-If Scenario Sandbox</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Type variables like "study 2 hours more daily" or "delay project by 3 days" to immediately see simulated score fluctuations and timeline trajectory shifts.
              </p>
            </div>

            {/* Feature 3: Live Conversational Twin */}
            <div className="bg-white border border-slate-200/60 hover:border-indigo-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 border border-cyan-100">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">💬 Bi-Directional Echo Chat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Have live chats with your custom-tailored future digital twin. Hear your chosen personality (Mentor/Coach/Friend/Challenger) give direct strategic updates.
              </p>
            </div>
          </div>
        </div>

        {/* Informative Showcase: Twin Personality Cards */}
        <div className="bg-gradient-to-b from-indigo-50/30 to-white/10 border border-slate-100 rounded-2xl p-8 md:p-10 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold font-display text-slate-800">Four Distinct Digital Twin Archetypes</h3>
            <p className="text-sm text-slate-500 mt-2">
              Select the behavioral catalyst that best accelerates your current productivity baseline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-100 rounded-xl p-5 hover:border-indigo-200 transition-all text-center space-y-2.5">
              <span className="text-3xl">☕</span>
              <h4 className="font-bold text-slate-800 font-display">Mentor</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Wise, structured academic and career guidance. Emphasizes framework and deep principles.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-5 hover:border-indigo-200 transition-all text-center space-y-2.5">
              <span className="text-3xl">⏱️</span>
              <h4 className="font-bold text-slate-800 font-display">Coach</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Action-obsessed, highly structured scheduling. Demands daily habit consistency and micro-wins.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-5 hover:border-indigo-200 transition-all text-center space-y-2.5">
              <span className="text-3xl">🍵</span>
              <h4 className="font-bold text-slate-800 font-display">Friend</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Warm, deeply empathetic listening. Focuses on confidence restoration and stress reduction.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-5 hover:border-indigo-200 transition-all text-center space-y-2.5">
              <span className="text-3xl">🔥</span>
              <h4 className="font-bold text-slate-800 font-display">Challenger</h4>
              <p className="text-xs text-slate-500 leading-relaxed">No excuses, brutally honest. Highlights discipline lapses and calls you to push maximum capacities.</p>
            </div>
          </div>
        </div>

        {/* Footer info line */}
        <div className="text-center text-xs text-slate-400 font-mono">
          Bhavi platform © {new Date().getFullYear()} • Secure Sandboxed Neural Emulation v1.0
        </div>
      </div>
    </motion.div>
  );
}
