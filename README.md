# 🧠 Bhavi — AI Digital Twin Platform

> **"Create Your Future Self. Learn From It. Become It."**

Bhavi is an AI-powered Digital Twin platform that models your future self, predicts outcomes before they happen, simulates alternate timelines, and lets you have live conversations with a version of you that already succeeded.

[![Built with Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.0%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Tech: React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tech: Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tech: TailwindCSS 4](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 Project Description

Most productivity tools help you manage today. Bhavi helps you **architect tomorrow**.

By entering your goal, upcoming deadline, current preparation level, and weekly hours, Bhavi's AI engine generates a personalized **Digital Twin** — a simulation of the optimized future version of you that already conquered that goal.

Your Digital Twin:
- **Predicts** readiness scores, focus stability, consistency ratings, and failure risk
- **Simulates** alternate futures using "What-If" scenarios
- **Chats** with you as your successful future self
- **Adapts** its personality (Mentor, Coach, Friend, or Challenger) to match your needs

This is **not** a task manager. This is a **predictive future modeling system** powered by Google Gemini.

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ LandingPage  │  │  Dashboard   │  │ FutureSimu-  │  │
│  │              │  │ + DigitalTwin│  │    lator     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ CreateTwin   │  │ ChatWithBhavi│                     │
│  │    Page      │  │ + DigitalTwin│                     │
│  └──────────────┘  └──────────────┘                     │
│                                                         │
│              React 19 + Vite 6 SPA                      │
│         State: localStorage (persistent)                 │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP (fetch)
                       ▼
┌─────────────────────────────────────────────────────────┐
│               EXPRESS.JS BACKEND (Node)                  │
│                                                         │
│  POST /api/insights   → Twin Score Generation           │
│  POST /api/simulate   → Future Scenario Simulation      │
│  POST /api/chat       → Conversational AI (Twin Chat)   │
│                                                         │
│     Each endpoint: Gemini → Local Fallback              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE GEMINI 2.0 FLASH API                 │
│                                                         │
│  • Structured JSON responses (responseSchema)            │
│  • Personality-aware system instructions                 │
│  • Multi-turn conversation context                       │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Feature List

### Core Features
- 🧠 **AI Digital Twin Creation** — Configure your twin with name, goal, personality, deadline, prep level, and weekly hours
- 📊 **4-Score Readiness Dashboard** — Readiness, Risk, Focus, Consistency — all explained and visualized
- 🌀 **What-If Future Simulator** — Type any scenario and see how it shifts your predicted outcomes with visual bar comparisons
- 💬 **Echo Chat** — Live multi-turn conversation with your future self
- 🎭 **4 Twin Archetypes** — Mentor, Coach, Friend, or Challenger personalities

### Digital Twin Visual
- 🎨 **Animated SVG Face** — Custom personality-colored twin with:
  - 👁️ Random blinking every 3–7 seconds
  - 🌬️ Continuous breathing (scale pulse)
  - 🔄 Rotating orbital halo
  - 😊 Mood-based expression (energized / calm / alert) driven by readiness score
  - ✅ Active status indicator dot when in session

### AI (Gemini 2.0 Flash)
- Structured JSON insights via `responseSchema`
- First-person future-self narrative insights
- Personality-adapted responses (Mentor/Coach/Friend/Challenger)
- Local rule-based fallbacks when API is unavailable

### UX Polish
- 🎯 Persistent state via `localStorage`
- 📱 Fully responsive (mobile → desktop)
- ⚡ Preset scenario quick-launch buttons
- 🧪 Demo data loader for instant walkthrough
- ⌛ Loading states with animated indicators

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript 5 |
| Bundler | Vite 6 |
| Styling | TailwindCSS v4 (via `@tailwindcss/vite`) |
| Icons | Lucide React |
| Backend | Express.js 4 (Node.js) |
| AI | Google Gemini 2.0 Flash (`@google/genai`) |
| Dev Server | tsx (TypeScript execution) |
| Fonts | Outfit, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |

---

## 🚀 Installation Instructions

### Prerequisites
- Node.js 18+ 
- A Google Gemini API key ([get one here](https://aistudio.google.com/apikey))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bhavi.git
cd bhavi

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_key_here

# 4. Start development server
npm run dev
# → App running at http://localhost:3000

# 5. Build for production
npm run build
npm start
```

> **Note:** Bhavi works **without a Gemini API key** using intelligent local fallbacks. All scores and responses are computed locally. Add your key for full AI-powered responses.

---

## 🎮 Demo Instructions

1. **Open** `http://localhost:3000`
2. **Click** "Create My Twin" on the landing page
3. **Try the demo:** Click "Load Realistic Demo Data" to auto-fill the form with Alex Rivera's AWS certification journey
4. **Select a personality** (Coach is recommended for demo)
5. **Click** "Deploy My Future Self" and wait ~1-2 seconds for twin generation
6. **Explore the Dashboard** — see your 4 readiness scores with the animated Digital Twin
7. **Try the Simulator** — click "Dedicated Sprint" preset to see future comparison bars
8. **Chat with your twin** — click a suggested starter or type your own question

---

## 🔭 Future Scope

| Feature | Status | Description |
|---------|--------|-------------|
| Multi-Goal Tracking | Planned | Manage multiple goals/projects with one twin |
| Daily Check-ins | Planned | Morning briefings from your future self |
| Calendar Integration | Planned | Sync with Google Calendar for deadline awareness |
| Progress Journaling | Planned | Daily log that updates twin scores over time |
| Social Twins | Planned | Compare progress with study group members |
| Voice Mode | Planned | Talk to your digital twin via microphone |
| Mobile App | Planned | Native iOS/Android via React Native |
| Export Reports | Planned | PDF readiness report for advisors/mentors |

---

## 📂 Project Structure

```
bhavi/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Hero, feature cards, archetypes
│   │   ├── CreateTwinPage.tsx   # Twin configuration form
│   │   ├── Dashboard.tsx        # Scores, insights, SWOT panel
│   │   ├── FutureSimulator.tsx  # What-If scenario engine
│   │   ├── ChatWithBhavi.tsx    # Conversational twin chat
│   │   └── DigitalTwin.tsx      # Animated SVG twin component
│   ├── App.tsx                  # Root: routing + API handlers
│   ├── types.ts                 # TypeScript interfaces
│   ├── index.css                # Tailwind + custom animations
│   └── main.tsx                 # React entry point
├── server.ts                    # Express + Gemini API endpoints
├── vite.config.ts               # Vite + Tailwind plugin config
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

---

## 🌟 Hackathon Notes

**Category:** AI Tools / Productivity / EdTech  
**Theme:** Personal AI — Create Your Future Self  
**Unique Value Prop:** Bhavi is the only tool that lets you *talk to your future self* to guide your present decisions.

---

*Built with ❤️ using Google Gemini 2.0 Flash — 2026 Hackathon Submission*
