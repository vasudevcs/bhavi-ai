import React from "react";
import { TwinProfile, TwinInsights } from "../types";
import { motion } from "motion/react";
import { Award, AlertTriangle, Play, Sparkles, MessageSquare, Flame, CheckCircle2, ChevronRight, Activity, HelpCircle, ArrowUpRight, Info } from "lucide-react";
import DigitalTwin from "./twin/DigitalTwin";

interface DashboardProps {
  profile: TwinProfile;
  insights: TwinInsights;
  onNavigateToSimulator: () => void;
  onNavigateToChat: () => void;
  onReconfigureTwin: () => void;
}

export default function Dashboard({
  profile,
  insights,
  onNavigateToSimulator,
  onNavigateToChat,
  onReconfigureTwin
}: DashboardProps) {

  // Simple clean circular progress or elegant gauge helpers
  const getScoreColor = (score: number, isRisk = false) => {
    if (isRisk) {
      if (score > 60) return "text-rose-600 bg-rose-50 border-rose-100";
      if (score > 35) return "text-amber-600 bg-amber-50 border-amber-100";
      return "text-emerald-600 bg-emerald-50 border-emerald-100";
    } else {
      if (score > 75) return "text-emerald-600 bg-emerald-50 border-emerald-100";
      if (score > 50) return "text-indigo-600 bg-indigo-50 border-indigo-100";
      return "text-rose-600 bg-rose-50 border-rose-100";
    }
  };

  const getProgressStrokeColor = (score: number, isRisk = false) => {
    if (isRisk) {
      if (score > 60) return "stroke-rose-500";
      if (score > 35) return "stroke-amber-500";
      return "stroke-emerald-500";
    } else {
      if (score > 75) return "stroke-emerald-500";
      if (score > 50) return "stroke-indigo-500";
      return "stroke-rose-500";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in" 
      id="dashboard-container"
    >
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Animated Digital Twin Avatar */}
          <div className="hidden md:block">
            <DigitalTwin 
              name={profile.twinName || profile.name} 
              personality={profile.personality} 
              layoutId="main-twin" 
              size="md" 
              isActive={true} 
              moodInput={{ readinessScore: insights.readinessScore, riskScore: insights.riskScore }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-800 font-display">
                {insights.twinName || `${profile.name} (Future Self)`}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                {profile.personality} Archetype
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Optimized Future Model synchronized against goal:{" "}
              <span className="font-semibold text-slate-700">"{profile.goal}"</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={onReconfigureTwin}
            className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-lg transition-all"
            id="btn-reconfigure"
          >
            Adjust Target Inputs
          </button>
        </div>
      </div>

      {/* METRIC CARD PANEL: 4 Grid columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Future Readiness</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-mono font-semibold px-2 py-0.5 rounded">
              High Priority
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-slate-800">
              {insights.readinessScore}%
            </span>
            <span className="text-xs text-slate-400 font-mono">Index</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${insights.readinessScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Your predicted probability of completing targets without compromising quality margins.
          </p>
        </div>

        {/* Metric 2: Risk */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">Failure Risk</span>
            <span className="text-[10px] bg-rose-50 text-rose-600 font-mono font-semibold px-2 py-0.5 rounded">
              Critical Guard
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-slate-800">
              {insights.riskScore}%
            </span>
            <span className="text-xs text-slate-400 font-mono">Factor</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${insights.riskScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
              style={{ width: `${insights.riskScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            The mathematical likelihood of project or exam failure if current discipline defaults continue.
          </p>
        </div>

        {/* Metric 3: Focus Score */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Focus Stability</span>
            <span className="text-[10px] bg-cyan-50 text-cyan-600 font-mono font-semibold px-2 py-0.5 rounded">
              Stamina Index
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-slate-800">
              {insights.focusScore}%
            </span>
            <span className="text-xs text-slate-400 font-mono">Index</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-cyan-500 h-1.5 rounded-full"
              style={{ width: `${insights.focusScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Measures your predicted ability to execute work tasks uninterrupted, aligned to {profile.hours} weekly hours.
          </p>
        </div>

        {/* Metric 4: Consistency */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consistency Rating</span>
            <span className="text-[10px] bg-amber-50 text-amber-600 font-mono font-semibold px-2 py-0.5 rounded font-display">
              Compounding
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-slate-800">
              {insights.consistencyScore}%
            </span>
            <span className="text-xs text-slate-400 font-mono">Rating</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full"
              style={{ width: `${insights.consistencyScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Evaluates habits. The capability of reproducing required study output day-after-day without drops.
          </p>
        </div>
      </div>

      {/* Score Explanation Banner */}
      <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 flex flex-wrap gap-4 items-start">
        <div className="flex items-center gap-1.5 text-xs text-indigo-700">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-semibold">Score Guide:</span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <span><span className="font-semibold text-slate-700">Readiness</span> — Your predicted probability of completing your goal at target quality. Higher is better.</span>
          <span><span className="font-semibold text-slate-700">Risk</span> — Likelihood of failure if current habits continue unchanged. Lower is better.</span>
          <span><span className="font-semibold text-slate-700">Focus</span> — Capacity to work uninterrupted during your {profile.hours}h weekly sessions. Higher is better.</span>
          <span><span className="font-semibold text-slate-700">Consistency</span> — Day-over-day habit reproducibility. Directly compounds readiness over time.</span>
        </div>
      </div>

      {/* CORE GRID: Future Advice (Left) & Profile SWOT (Right) */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left column (Col-Span-2): Advice from Future self */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Main advice cards */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-display">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Conversational Strategy Broadcast
              </h3>
              <span className="text-[10px] font-mono text-slate-400">TARGET TIMELINE DECODER ONLINE</span>
            </div>

            {/* Simulated Chat Dialogue Bubble */}
            <div className="relative bg-gradient-to-r from-indigo-50/50 to-cyan-50/20 border border-indigo-100/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{profile.avatar}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{insights.twinName}</h4>
                  <span className="text-[10px] text-indigo-600 font-mono uppercase tracking-wider font-semibold">
                    Direct advice for {profile.name}
                  </span>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-3.5 pt-2">
                {insights.insights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="flex-none w-5 h-5 rounded-full bg-white text-indigo-600 font-bold text-[10px] flex items-center justify-center border border-indigo-100 shadow-sm mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Hub Calls to other sections */}
            <div className="pt-2 grid sm:grid-cols-2 gap-4">
              <button
                onClick={onNavigateToSimulator}
                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50/40 border border-slate-100 hover:border-indigo-100 rounded-xl text-left transition-all group"
                id="dash-nav-simulator"
              >
                <div>
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest font-mono">Simulation Sandbox</h4>
                  <p className="text-xs text-slate-500 mt-1">Simulate "What-If" decisions & routine adjustments.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={onNavigateToChat}
                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-cyan-50/40 border border-slate-100 hover:border-cyan-100 rounded-xl text-left transition-all group"
                id="dash-nav-chat"
              >
                <div>
                  <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-widest font-mono">Chat With Digital Twin</h4>
                  <p className="text-xs text-slate-500 mt-1">Talk with your future self to brainstorm challenges.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Right column: SWOT and Calibration Parameters */}
        <div className="space-y-6">
          {/* Profile Overview with details */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-indigo-50 pb-2.5 font-display">
              Twin Configuration
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Upcoming Milestone:</span>
                <span className="font-semibold text-slate-800 max-w-[150px] truncate" title={profile.upcomingEvent}>
                  {profile.upcomingEvent}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Target Date:</span>
                <span className="font-mono text-slate-700 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-100">
                  {profile.deadline}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Current Prep Level:</span>
                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                  {profile.prepLevel}%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Weekly Study Commitment:</span>
                <span className="font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded font-semibold">
                  {profile.hours} hrs
                </span>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Cards */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Strengths */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {insights.strengths.map((str, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed bg-emerald-50/30 p-2 rounded-lg border border-emerald-100/50">
                    <span className="text-emerald-500 font-bold">&#8226;</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5 font-display">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Pitfalls / Risks
              </h4>
              <ul className="space-y-2">
                {insights.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed bg-rose-50/30 p-2 rounded-lg border border-rose-100/50">
                    <span className="text-rose-500 font-bold">&#8226;</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
