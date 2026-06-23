import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import CreateTwinPage from "./components/CreateTwinPage";
import Dashboard from "./components/Dashboard";
import FutureSimulator from "./components/FutureSimulator";
import ChatWithBhavi from "./components/ChatWithBhavi";
import { TwinProfile, TwinInsights, TwinMetrics, ChatMessage, SimulatorOutcome } from "./types";
import { Sparkles, Brain, Compass, MessageSquare, Target, LogOut, ArrowRight, Activity, Plus } from "lucide-react";

export default function App() {
  const [page, setPage] = useState<"landing" | "create" | "dashboard" | "simulator" | "chat">("landing");
  
  // Persistent Storage using localStorage for delightful local persistence
  const [profile, setProfile] = useState<TwinProfile | null>(() => {
    const saved = localStorage.getItem("bhavi_twin_profile");
    return saved ? JSON.parse(saved) : null;
  });

  const [insights, setInsights] = useState<TwinInsights | null>(() => {
    const saved = localStorage.getItem("bhavi_twin_insights");
    return saved ? JSON.parse(saved) : null;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  // Initialize welcome message when profile is loaded or changed
  useEffect(() => {
    if (profile) {
      const defaultTwinName = insights?.twinName || `${profile.name} (Future Self)`;
      const greeting = getInitialGreeting(profile.personality, profile.name, profile.goal);
      setMessages([
        {
          id: "sys-welcome",
          sender: "twin",
          text: greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [profile, insights?.twinName]);

  const getInitialGreeting = (personality: string, name: string, goal: string): string => {
    switch (personality) {
      case "Mentor":
        return `Welcome, ${name}. I am your authorized digital twin representing your future self from after successfully completing: "${goal}". I am standing at the target date in absolute victory. Let us discuss the academic structure of your milestones. What is on your mind today?`;
      case "Coach":
        return `Hey, it's ${name}. Welcome to the high-accountability loop! I successfully passed "${goal}" because we didn't skip the work blocks. Today, I'm here to push your daily routine. No excuses, let's discuss our progress. How are you taking action?`;
      case "Friend":
        return `Hey! It's so incredible to connect with you. It's me—your future self. I know things feel heavy with "${goal}" right now, but I want to promise you that we succeeded! You can absolutely do this. Don't stress too much today. How can I support you right now?`;
      case "Challenger":
        return `There you are. I am the future version of ${name}, and look: I only exist because we didn't quit on the final curve toward "${goal}". If you slack of today, this timeline crumbles. Enough talking—what blocker are you ready to conquer right now?`;
      default:
        return `Hello, I am your future self. Together, we conquered "${goal}". Let's discuss our planning trajectory.`;
    }
  };

  // 1. Core Workflow: Save & Configure Twin
  const handleSaveTwinProfile = async (newProfile: TwinProfile) => {
    setProfile(newProfile);
    localStorage.setItem("bhavi_twin_profile", JSON.stringify(newProfile));

    try {
      // Fetch insights from Express backend (which proxies to Gemini or falls back elegantly)
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile)
      });
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
        localStorage.setItem("bhavi_twin_insights", JSON.stringify(data));
      } else {
        throw new Error("Failed to load digital twin insights");
      }
    } catch (error) {
      console.error(error);
      // Fail gracefully: generate high-fidelity dummy calculations instantly so application is fully functional
      const baseReadiness = Math.min(Math.max(Math.round(newProfile.prepLevel * 0.7 + newProfile.hours * 2.5), 15), 98);
      const calculatedInsights: TwinInsights = {
        readinessScore: baseReadiness,
        riskScore: Math.min(Math.max(100 - baseReadiness + 8, 5), 95),
        focusScore: Math.min(Math.max(Math.round(40 + newProfile.hours * 4), 30), 95),
        consistencyScore: Math.min(Math.max(Math.round(30 + newProfile.prepLevel * 0.5 + newProfile.hours * 2), 30), 96),
        strengths: [
          `Strong intrinsic commitment to pass: "${newProfile.goal}"`,
          `High energy allocation of ${newProfile.hours} weekly work hours`,
          `Base preparation coefficient of ${newProfile.prepLevel}% provides starting kinetic momentum`
        ],
        weaknesses: [
          `Vulnerable to key deadline congestion by "${newProfile.deadline}"`,
          `Unchecked cognitive fatigue from packing intense blocks around ${newProfile.upcomingEvent}`,
          `Significant preparation gap of ${100 - newProfile.prepLevel}% requires micro-targets`
        ],
        twinName: `Future ${newProfile.name}`,
        insights: [
          `I am your future self guiding you. Looking back from after the "${newProfile.upcomingEvent}", every dedicated hour was crucial.`,
          `Your readiness rating starts at ${baseReadiness}%. It's solid, but we must tighten milestones to prevent bottlenecking.`,
          `Focus on reducing memory decay—set aside 15 minutes each day for active recall review.`,
          `Today, tackle the single hardest study segment on your list. Action dissolves stress.`
        ]
      };
      setInsights(calculatedInsights);
      localStorage.setItem("bhavi_twin_insights", JSON.stringify(calculatedInsights));
    }
    // Redirect to main dashboard
    setPage("dashboard");
  };

  // 2. Simulator Functionality
  const handleSimulateScenario = async (scenarioText: string): Promise<SimulatorOutcome> => {
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenarioText,
          profile,
          currentMetrics: insights ? {
            readinessScore: insights.readinessScore,
            riskScore: insights.riskScore,
            focusScore: insights.focusScore,
            consistencyScore: insights.consistencyScore,
          } : { readinessScore: 50, riskScore: 50, focusScore: 50, consistencyScore: 50 }
        })
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Simulation server returned non-200");
      }
    } catch (e) {
      console.error("Simulation fallback calculation:", e);
      // Fallback calculation helper
      const deltaReadiness = scenarioText.toLowerCase().includes("extra") || scenarioText.toLowerCase().includes("more") ? 10 : -8;
      const baseMetrics = insights || { readinessScore: 60, riskScore: 40, focusScore: 60, consistencyScore: 60 };
      const newReadiness = Math.min(Math.max(baseMetrics.readinessScore + deltaReadiness, 15), 98);
      const newRisk = Math.min(Math.max(baseMetrics.riskScore - deltaReadiness, 5), 95);

      return {
        scenario: scenarioText,
        alternativeFuture: `Executing the strategy: "${scenarioText}" triggers a structural timeline shift. Future readiness is recalibrated to ${newReadiness}% and failure risk drops to ${newRisk}%, stabilizing milestones leading into "${profile?.upcomingEvent}".`,
        newMetrics: {
          readinessScore: newReadiness,
          riskScore: newRisk,
          focusScore: Math.min(Math.max(baseMetrics.focusScore + (deltaReadiness / 2), 10), 99),
          consistencyScore: Math.min(Math.max(baseMetrics.consistencyScore + (deltaReadiness / 2), 10), 99),
        },
        improvementPercentage: deltaReadiness,
        comment: `As your future ${profile?.personality} self, making these proactive choices cements our victory early.`
      };
    }
  };

  // 3. Chat Handler
  const handleSendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsGeneratingResponse(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          messages: newMessages.map(m => ({ role: m.sender === "user" ? "user" : "model", text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const responseMsg: ChatMessage = {
          id: `twin-${Date.now()}`,
          sender: "twin",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, responseMsg]);
      } else {
        throw new Error("Chat server failed to generate response");
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setTimeout(() => {
        const responseMsg: ChatMessage = {
          id: `twin-${Date.now()}`,
          sender: "twin",
          text: `I'm fully tuned to your frequency. When I encountered "${text}" during my past timeline, I reminded myself that consistent action on our goal "${profile?.goal}" is the only medicine. Focus on your immediate study block today and let's conquer this.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, responseMsg]);
      }, 700);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  // Reset or Wipe Session
  const handleWipeSession = () => {
    if (confirm("Are you sure you want to disconnect your current digital twin twin? This resets your workspace parameters.")) {
      localStorage.clear();
      setProfile(null);
      setInsights(null);
      setMessages([]);
      setPage("landing");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col font-sans">
      
      {/* Brand Navigation Bar */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-sm relative" id="main-navigation">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <button
            onClick={() => setPage("landing")}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-all">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight font-display text-slate-900 flex items-center gap-1.5">
                Bhavi <span className="text-[10px] uppercase font-mono tracking-widest font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">Digital Twin</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono">Create. Learn. Become.</p>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 bg-slate-50 border border-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPage("landing")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                page === "landing" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Learn More
            </button>

            <button
              onClick={() => setPage("create")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                page === "create" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {profile ? "Reconfigure" : "Create Twin"}
            </button>

            {profile && insights && (
              <>
                <button
                  onClick={() => setPage("dashboard")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    page === "dashboard" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => setPage("simulator")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    page === "simulator" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Future Simulator
                </button>

                <button
                  onClick={() => setPage("chat")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    page === "chat" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Echo Chat
                </button>
              </>
            )}
          </div>

          {/* User Profile avatar circular control */}
          <div className="flex items-center gap-3">
            {profile ? (
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setPage("dashboard")}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-lg cursor-pointer transition-all"
                  title="Go to Twin Profile"
                >
                  {profile.avatar}
                </div>
                <button
                  onClick={handleWipeSession}
                  className="p-1 px-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 rounded text-[10px] font-mono text-slate-400 group transition-all"
                  title="Disconnect Digital Twin"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPage("create")}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold font-mono rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Initialize Twin
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* MAIN MAIN STAGE SCREEN ROUTER */}
      <main className="flex-1">
        {page === "landing" && (
          <LandingPage
            onCreateClick={() => setPage("create")}
            onViewTwinClick={() => setPage("dashboard")}
            hasExistingTwin={!!profile}
          />
        )}

        {page === "create" && (
          <CreateTwinPage
            onSave={handleSaveTwinProfile}
            initialProfile={profile}
          />
        )}

        {page === "dashboard" && profile && insights && (
          <Dashboard
            profile={profile}
            insights={insights}
            onNavigateToSimulator={() => setPage("simulator")}
            onNavigateToChat={() => setPage("chat")}
            onReconfigureTwin={() => setPage("create")}
          />
        )}

        {page === "simulator" && profile && insights && (
          <FutureSimulator
            profile={profile}
            currentMetrics={{
              readinessScore: insights.readinessScore,
              riskScore: insights.riskScore,
              focusScore: insights.focusScore,
              consistencyScore: insights.consistencyScore,
            }}
            onSimulate={handleSimulateScenario}
          />
        )}

        {page === "chat" && profile && (
          <ChatWithBhavi
            profile={profile}
            messages={messages}
            onSendMessage={handleSendChatMessage}
            isGeneratingResponse={isGeneratingResponse}
          />
        )}
      </main>

      {/* Small Ambient footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-400 font-mono relative z-10">
        Bhavi System • "Create Your Future Self. Learn From It. Become It." • Calibrated for local time: 2026
      </footer>

    </div>
  );
}
