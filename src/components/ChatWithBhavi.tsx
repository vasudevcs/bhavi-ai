import React, { useState, useRef, useEffect } from "react";
import { TwinProfile, ChatMessage } from "../types";
import { MessageSquare, Send, Bot, RefreshCw, Sparkles } from "lucide-react";

interface ChatWithBhaviProps {
  profile: TwinProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isGeneratingResponse: boolean;
}

export default function ChatWithBhavi({
  profile,
  messages,
  onSendMessage,
  isGeneratingResponse
}: ChatWithBhaviProps) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested conversational starter chips
  const SUGGESTIONS = [
    `How did we successfully pass/reach our goal: "${profile.goal}"?`,
    "I'm feeling overwhelmed today. What's our first action?",
    `Is studying ${profile.hours} hours weekly really enough?`,
    "What was our biggest setback during the study timeline?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGeneratingResponse]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isGeneratingResponse) return;
    onSendMessage(textToSend.trim());
    setInputText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in" id="chat-container">
      
      {/* Page Title & Status */}
      <div className="border-b border-slate-100 pb-5 mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-600 uppercase tracking-widest font-semibold flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> Synchronous Echo Chat
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 font-display">Chat With Bhavi</h2>
          <p className="text-sm text-slate-500 mt-1">
            Have a live conversation with your future self post-deadline to extract strategies and confidence.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-cyan-50 border border-cyan-100 rounded-lg py-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-mono text-cyan-700 font-semibold uppercase tracking-wider">
            {profile.personality} Channel Active
          </span>
        </div>
      </div>

      {/* CHAT WINDOW BOX */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-md overflow-hidden flex flex-col h-[520px]">
        
        {/* Chat Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-sm">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <h4 className="font-bold text-sm text-slate-800">
                  {profile.twinName || `${profile.name} (Future Self)`}
                </h4>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-mono font-medium px-2 py-0.2 rounded border border-indigo-100">
                  {profile.personality}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide">
                TIMELINE ORIGIN: SUCCESSFUL POST-{profile.deadline.toUpperCase()} MODEL
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono hidden md:block">
            LATENCY: ~120ms
          </div>
        </div>

        {/* Message Container Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/20"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border flex-shrink-0 bg-white shadow-sm ${isUser ? "border-indigo-100" : "border-slate-100"}`}>
                  {isUser ? "👋" : profile.avatar}
                </div>

                {/* Bubble content */}
                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm shadow-slate-50/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-[9px] text-slate-400 font-mono ${isUser ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isGeneratingResponse && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm border border-slate-150">
                {profile.avatar}
              </div>
              <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 self-start shadow-sm">
                <RefreshCw className="w-4 h-4 text-cyan-600 animate-spin" />
                <span className="text-[11px] text-slate-500 font-medium font-mono animate-pulse">
                  Twin is thinking...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Suggested starters inside Chat box */}
        {messages.length <= 1 && (
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-3">
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-semibold">
              🤔 Quantum Calibration Starters
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(s)}
                  disabled={isGeneratingResponse}
                  className="text-left bg-white border border-slate-200 hover:border-indigo-300 text-[11px] text-indigo-700 font-medium px-3 py-1.5 rounded-lg transition-all shadow-sm max-w-full truncate block"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form Bar */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              id="chat-input"
              type="text"
              required
              disabled={isGeneratingResponse}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask your ${profile.personality} self anything...`}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isGeneratingResponse}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl p-3 flex-shrink-0 shadow-sm hover:shadow-md transition-all cursor-pointer"
              id="btn-chat-send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Information Tip block */}
      <div className="bg-cyan-50/40 border border-cyan-150 rounded-xl p-4 flex gap-3 items-start">
        <Bot className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-cyan-800 leading-relaxed">
          <strong>Conversative Co-simulation:</strong> Talking directly with Bhavi simulates retrospective behavioral alignment. Your digital twin answers according to your set weekly available study blocks ({profile.hours} hrs) and goals. Feel free to explain current stress levels, procrastination challenges, or review goals together.
        </p>
      </div>

    </div>
  );
}
