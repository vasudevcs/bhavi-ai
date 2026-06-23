import React from "react";
import { Brain, Sparkles, MessageSquare, Compass, ArrowRight, Activity, TrendingUp, ShieldAlert, Target } from "lucide-react";

interface LandingPageProps {
  onCreateClick: () => void;
  onViewTwinClick?: () => void;
  hasExistingTwin: boolean;
}

export default function LandingPage({ onCreateClick, onViewTwinClick, hasExistingTwin }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden min-h-screen pt-12 pb-24 grid-bg" id="landing-container">
      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full filter blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-50 rounded-full filter blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Top Feature Tagline Pill */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-50 border border-indigo-100/80 text-indigo-600 font-mono tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Predictive Modeling
          </span>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.1] mb-6">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">Digital Twin</span>.
            <br />
            Architect Your Future.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-sans leading-relaxed">
            "Create Your Future Self. Learn From It. Become It."
          </p>
          <p className="mt-3 text-sm text-slate-500 max-w-lg mx-auto">
            Bhavi models your exams, projects, and deadlines to simulate outcomes, calculate failure risks, and build a conversational twin of your optimized future self.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onCreateClick}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-100 transition-all duration-200 w-full sm:w-auto"
              id="cta-create-twin"
            >
              {hasExistingTwin ? "Customize My Twin" : "Create My Twin"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {hasExistingTwin && onViewTwinClick && (
              <button
                onClick={onViewTwinClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-50 transition-all w-full sm:w-auto"
                id="cta-view-twin"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Core Concept Interactive Mockup Card */}
        <div className="max-w-4xl mx-auto mb-20 animate-slide-up">
          <div className="relative bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100/50">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-mono text-slate-400">BHAVI_TWIN_SIMULATOR_v1.0</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-mono">
                System Calibrated
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse-slow" /> Real-time Target Forecast
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-800">
                    Input Your Timeline. Extract the Twin.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By inputting your target deadline, current level of discipline, prep ratings, and available hours, Bhavi generates a personalized trajectory forecast. It represents the optimized final state who successfully navigated that exact road.
                  </p>
                </div>

                {/* Micro preview components */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs">
                        🎓
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-700">AWS DevOps Certificate</div>
                        <span className="text-[10px] text-slate-400">Target: Oct 2026</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-indigo-600">82% Success</div>
                      <span className="text-[10px] text-emerald-500 font-medium">Safe Path</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-semibold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-700">What-If Simulation</div>
                        <span className="text-[10px] text-slate-400">"Study 2 extra hours daily"</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-emerald-600">+14% Shift</div>
                      <span className="text-[10px] text-slate-400">Risk Reduced to 7%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holographic Right Panel */}
              <div className="bg-gradient-to-b from-indigo-50/50 to-slate-50/20 border border-indigo-100/50 rounded-xl p-5 md:p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border border-indigo-200 flex items-center justify-center text-3xl shadow-sm animate-pulse-slow">
                  🤖
                </div>
                <div>
                  <div className="text-xs font-mono text-indigo-500 uppercase font-semibold">MEET BHAVI</div>
                  <h4 className="text-lg font-bold text-slate-800">"I am your future self."</h4>
                </div>
                <div className="bg-white border border-slate-100/80 rounded-lg p-3.5 text-left shadow-sm">
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "Looking back from after the exam, those extra 4 hours we scheduled made the difference. The VPC setup module was your weak spot—let's discuss how we solved it."
                  </p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono font-semibold">
                    Mentorship Mode
                  </span>
                  <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono font-semibold">
                    Interactive Echo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (4 Columns or Bento-Style) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Platform Capabilities</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 font-display mt-2">
              Empowered with Advanced Predictors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1: Future Readiness Engine */}
            <div className="bg-white border border-slate-200/60 hover:border-indigo-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">🔮 Futurist Readiness Matrix</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive real-time, dynamic scores predicting your preparation gaps, consistency factors, and total probability maps for your target goals.
              </p>
            </div>

            {/* Feature 2: What-If Future Simulator */}
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
              <span className="text-3xl">☕</span>
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
    </div>
  );
}
