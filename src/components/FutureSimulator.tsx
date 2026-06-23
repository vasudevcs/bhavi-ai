import React, { useState } from "react";
import { TwinProfile, TwinMetrics, SimulatorOutcome } from "../types";
import { Compass, Sparkles, Sliders, RefreshCw, Layers, TrendingUp, AlertCircle, ArrowUpRight, Check } from "lucide-react";

interface FutureSimulatorProps {
  profile: TwinProfile;
  currentMetrics: TwinMetrics;
  onSimulate: (scenarioText: string) => Promise<SimulatorOutcome>;
}

// Preset scenario cards described in requirements
const PRESET_SCENARIOS = [
  {
    title: "Dedicated Sprint",
    text: "Study 2 extra hours daily, focusing on active recall & quiz simulation.",
    emoji: "⚡",
    tag: "High Effort"
  },
  {
    title: "Deadline Drift",
    text: "Delay assignment or modular study target by 3 days due to stress.",
    emoji: "⚠️",
    tag: "Procrastination"
  },
  {
    title: "Cognitive Reboot",
    text: "Sleep earlier every day and maintain absolute hydration.",
    emoji: "💤",
    tag: "Wellness"
  }
];

export default function FutureSimulator({ profile, currentMetrics, onSimulate }: FutureSimulatorProps) {
  const [customScenario, setCustomScenario] = useState("");
  const [activePresetText, setActivePresetText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulatorOutcome | null>(null);

  const handleSimulatePreset = async (scenarioText: string) => {
    setActivePresetText(scenarioText);
    setIsSimulating(true);
    try {
      const outcome = await onSimulate(scenarioText);
      setResult(outcome);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customScenario.trim()) return;

    setActivePresetText("");
    setIsSimulating(true);
    try {
      const outcome = await onSimulate(customScenario);
      setResult(outcome);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="simulator-container">
      
      {/* Title block */}
      <div className="border-b border-slate-100 pb-6">
        <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-semibold flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> What-If Sandbox Array
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 font-display">Timeline Quantum Simulator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Test lifestyle pivots, procrastination tradeoffs, or intensity shifts to immediately calculate how they compound.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Input form & Presets */}
        <div className="md:col-span-1.2 space-y-6">
          
          {/* Custom prompt */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" /> Specify Scenario
            </h3>
            
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label htmlFor="custom-scenario-input" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase font-mono">
                  Custom Decision Query
                </label>
                <textarea
                  id="custom-scenario-input"
                  rows={3}
                  value={customScenario}
                  onChange={(e) => setCustomScenario(e.target.value)}
                  placeholder="e.g. Skip study blocks on weekends and cram everything during Monday morning."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 bg-slate-50/50 focus:bg-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSimulating || !customScenario.trim()}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-simulate-custom"
              >
                {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Inject Custom Scenario"}
              </button>
            </form>
          </div>

          {/* Preset Buttons */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
              🤖 Quick-Sim presets
            </h3>
            
            <div className="space-y-3">
              {PRESET_SCENARIOS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSimulatePreset(preset.text)}
                  disabled={isSimulating}
                  className={`w-full p-3.5 border rounded-xl text-left transition-all ${
                    activePresetText === preset.text
                      ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
                      : "border-slate-150 hover:border-slate-250 bg-slate-50/50 hover:bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-800">{preset.title}</span>
                    <span className="text-[9px] font-mono font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                      {preset.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {preset.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Comparison dashboard (Col-Span-1.8) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Timeline Output display */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider font-display">
                Forecast Divergence metrics
              </h3>
              <span className="text-xs text-slate-400 font-mono">BHAVI_SIMULATION_ARRAY</span>
            </div>

            {result ? (
              <div className="space-y-8 animate-fade-in" id="simulation-result">
                
                {/* Visual Delta card */}
                <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4 items-center">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Delta Alignment Shift</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-4xl font-extrabold font-display ${result.improvementPercentage >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {result.improvementPercentage > 0 ? `+${result.improvementPercentage}%` : `${result.improvementPercentage}%`}
                      </span>
                      <span className="text-xs text-slate-500 font-medium font-sans">
                        {result.improvementPercentage >= 0 ? "Compounding Uplift" : "Degradation Risk"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-150/75 rounded-lg">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Twin Feedback ({profile.personality})</span>
                    <p className="text-xs text-slate-600 italic leading-relaxed mt-1">
                      "{result.comment}"
                    </p>
                  </div>
                </div>

                {/* Score Comparison Bars */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    Side-By-Side Trajectory Delta
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Readiness */}
                    <div className="border border-slate-100 rounded-lg p-3.5 space-y-2">
                      <span className="text-xs font-bold text-slate-500 block">Future Readiness Alignment</span>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-400">Current Future:</span>
                          <span className="font-bold text-slate-700">{currentMetrics.readinessScore}%</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-emerald-600 font-bold">Alternative Future:</span>
                          <span className="font-bold text-emerald-600">{result.newMetrics.readinessScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk */}
                    <div className="border border-slate-100 rounded-lg p-3.5 space-y-2">
                      <span className="text-xs font-bold text-slate-500 block">Failure Risk Propensity</span>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-400">Current Future:</span>
                          <span className="font-bold text-slate-700">{currentMetrics.riskScore}%</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-rose-600 font-bold">Alternative Future:</span>
                          <span className="font-bold text-rose-600">{result.newMetrics.riskScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative Timeline Forecast narrative description */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Predicted Alternative Outcome Forecast
                  </h4>
                  <div className="bg-white border border-indigo-50/50 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
                    {result.alternativeFuture}
                  </div>
                </div>

                {/* Reset button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setResult(null);
                      setCustomScenario("");
                      setActivePresetText("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 font-mono"
                    id="btn-simulation-reset"
                  >
                    Clear Simulation Output
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-100 animate-pulse-slow">
                  🌐
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 font-display">Awaiting Simulation Parameters</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    Choose one of the quick quick-sim presets on the left or type your customized scenario variables to calculate outcome deltas.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Helper details card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">How Bhavi works out predictions:</span>
            Every pivot coordinates with your available weekly work hours ({profile.hours} hrs) and current preparation benchmark ({profile.prepLevel}%). Harmful scenarios trigger bottleneck constraints, dramatically raising failure risk, while compounding study sessions release neural multipliers.
          </div>

        </div>

      </div>
    </div>
  );
}
