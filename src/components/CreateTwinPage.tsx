import React, { useState } from "react";
import { TwinProfile } from "../types";
import { Sparkles, Brain, ArrowRight, UserCheck, RefreshCw, Star } from "lucide-react";

// List of fun avatar emojis
const AVATARS = [
  { emoji: "🤖", label: "Tech Twin" },
  { emoji: "🚀", label: "High Achiever" },
  { emoji: "🎓", label: "Scholar" },
  { emoji: "⚡", label: "Dynamic Catalyst" },
  { emoji: "🧠", label: "Thinker" },
  { emoji: "🔮", label: "Futurist" },
  { emoji: "🌱", label: "Constant Weaver" },
  { emoji: "🌟", label: "Champion" }
];

const PERSONALITIES: { value: "Mentor" | "Coach" | "Friend" | "Challenger"; name: string; emoji: string; desc: string }[] = [
  {
    value: "Mentor",
    name: "Wisdom Mentor",
    emoji: "📚",
    desc: "Wise, balanced guidance that provides structure, learning advice, and focuses on understanding complex core foundations."
  },
  {
    value: "Coach",
    name: "Habit Coach",
    emoji: "⏱️",
    desc: "High-accountability daily routine builder. Pushes you to split complex materials into tiny daily action units."
  },
  {
    value: "Friend",
    name: "Empathetic Friend",
    emoji: "❤️",
    desc: "Supportive, kind ears to reduce stress. Acknowledges emotional state, guides focus gently, and shields against anxiety."
  },
  {
    value: "Challenger",
    name: "Tough Challenger",
    emoji: "🔥",
    desc: "Brutally honest, zero-excuses accountability. Keeps highlighting the hard truths and pushing past standard thresholds."
  }
];

interface CreateTwinPageProps {
  onSave: (profile: TwinProfile) => void;
  initialProfile?: TwinProfile | null;
}

export default function CreateTwinPage({ onSave, initialProfile }: CreateTwinPageProps) {
  const [name, setName] = useState(initialProfile?.name || "");
  const [goal, setGoal] = useState(initialProfile?.goal || "");
  const [upcomingEvent, setUpcomingEvent] = useState(initialProfile?.upcomingEvent || "");
  const [deadline, setDeadline] = useState(initialProfile?.deadline || "");
  const [prepLevel, setPrepLevel] = useState<number>(initialProfile?.prepLevel || 50);
  const [hours, setHours] = useState<number>(initialProfile?.hours || 10);
  const [personality, setPersonality] = useState<"Mentor" | "Coach" | "Friend" | "Challenger">(
    initialProfile?.personality || "Coach"
  );
  const [avatar, setAvatar] = useState(initialProfile?.avatar || "🤖");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !goal.trim() || !upcomingEvent.trim()) return;

    setIsSubmitting(true);
    // Simulate minor processing delay to make it feel deeply algorithmic & high-fidelity
    setTimeout(() => {
      const suggestedTwinNames: Record<string, string> = {
        Mentor: `Mentor ${name}`,
        Coach: `${name} v2.0`,
        Friend: `Best Self ${name}`,
        Challenger: `Crucible ${name}`
      };

      onSave({
        name,
        goal,
        upcomingEvent,
        deadline: deadline || "Next Month",
        prepLevel,
        hours,
        personality,
        avatar,
        twinName: initialProfile?.twinName || suggestedTwinNames[personality] || `Future ${name}`,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  // Populate realistic sample data instantly for quick demo prototyping capability
  const handleLoadSample = () => {
    setName("Alex Rivera");
    setGoal("Earn AWS Solutions Architect certification with score over 850");
    setUpcomingEvent("AWS SAA-C03 Real Exam");
    setDeadline("2026-10-15");
    setPrepLevel(45);
    setHours(12);
    setPersonality("Coach");
    setAvatar("🚀");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in" id="create-twin-container">
      {/* Page Title & Tagline */}
      <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-semibold flex items-center gap-1">
            <Brain className="w-3.5 h-3.5" /> Neural Cloning Engine
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 font-display">Configure Your Digital Twin</h2>
          <p className="text-sm text-slate-500 mt-1">
            Build the tailored future model to guide your studies, predict outcomes, and simulate daily compromises.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50/80 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium font-mono transition-all"
            id="btn-load-sample"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            Load Realistic Demo Data
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Twin Customization (Avatar & Demographics) */}
        <div className="space-y-6 md:col-span-1">
          {/* Hologram Card Preview */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500" />
            <div className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest">Digital Clone State</div>

            {/* Avatar Selector Circular Grid */}
            <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-5xl mb-4 relative group">
              <span className="relative z-10 animate-pulse-slow">{avatar}</span>
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="font-bold text-lg text-slate-800 mb-1">{name || "Unnamed Clone"}</h3>
            <span className="inline-flex py-1 px-3 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold font-mono tracking-wide">
              {personality || "Coach"} Mode
            </span>

            {/* Avatar Picker list */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-left">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">
                Select Digital Archetype Badge:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av.emoji}
                    type="button"
                    onClick={() => setAvatar(av.emoji)}
                    className={`h-11 rounded-lg border flex items-center justify-center text-2xl transition-all ${
                      avatar === av.emoji
                        ? "bg-indigo-50 border-indigo-400 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200/60"
                    }`}
                    title={av.label}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guidelines info card for strict scope execution */}
          <div className="bg-amber-50/40 border border-amber-200/50 rounded-xl p-4">
            <h4 className="text-xs font-bold text-amber-800 font-display flex items-center gap-1.5 mb-1.5">
              ⚠️ Timeline Realism Disclaimer
            </h4>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Bhavi engines calibrate using genuine statistical forecasts. Input accurate prep scores and real-world hours to achieve the highest predictive clarity from your model.
            </p>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMN: The Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            {/* Context Header */}
            <div>
              <h3 className="text-lg font-bold text-slate-800">1. Vital Calibration Parameters</h3>
              <p className="text-xs text-slate-500">Provide the foundational milestones that configure the target timeline.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Field 1: User Name */}
              <div>
                <label htmlFor="user-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Full Name
                </label>
                <input
                  id="user-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>

              {/* Field 2: Target Goal */}
              <div className="sm:col-span-1">
                <label htmlFor="user-goal" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Target Goal
                </label>
                <input
                  id="user-goal"
                  type="text"
                  required
                  placeholder="e.g. Pass AWS Solutions Architect Exam"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Field 3: Upcoming Event */}
              <div>
                <label htmlFor="upcoming-event" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  The Final Event / Milestone
                </label>
                <input
                  id="upcoming-event"
                  type="text"
                  required
                  placeholder="e.g. Real Exam, Client Pitch Session"
                  value={upcomingEvent}
                  onChange={(e) => setUpcomingEvent(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>

              {/* Field 4: Target Deadline */}
              <div>
                <label htmlFor="deadline-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Specific Target Date / Deadline
                </label>
                <input
                  id="deadline-date"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Preparation Level and Work Hours Sliders */}
            <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="prep-rating-slider" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Preparation Level
                  </label>
                  <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {prepLevel}%
                  </span>
                </div>
                <input
                  id="prep-rating-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={prepLevel}
                  onChange={(e) => setPrepLevel(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Estimate current familiarity with target materials.
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="weekly-hours-slider" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Available Study/Work Hours Weekly
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                    {hours} hrs
                  </span>
                </div>
                <input
                  id="weekly-hours-slider"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Dedicated blocks excluding passive buffers.
                </span>
              </div>
            </div>

            {/* Choose Personality */}
            <div className="pt-4 border-t border-slate-100">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800">2. Behavioral Blueprint (Personality Engine)</h3>
                <p className="text-xs text-slate-500">Pick the adaptive paradigm for conversational prompts and simulations.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {PERSONALITIES.map((pers) => (
                  <button
                    key={pers.value}
                    type="button"
                    onClick={() => setPersonality(pers.value)}
                    className={`p-4 border rounded-xl text-left transition-all flex gap-3.5 items-start ${
                      personality === pers.value
                        ? "border-indigo-500 bg-indigo-50/35 ring-1 ring-indigo-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <span className="text-2xl mt-0.5" role="img" aria-label={pers.name}>
                      {pers.emoji}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-display">{pers.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">{pers.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Control */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !goal.trim() || !upcomingEvent.trim()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-xl shadow-md transition-all text-sm cursor-pointer"
                id="btn-submit-twin"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Synchronizing Neural Mapping...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Deploy My Future Self
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
