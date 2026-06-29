import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to check if API key is valid
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Generate Twin Insights & Metrics
app.post("/api/insights", async (req, res) => {
  const { name, goal, upcomingEvent, deadline, prepLevel, hours, personality } = req.body;

  const userPrep = Number(prepLevel) || 50;
  const userHours = Number(hours) || 10;

  // Let's create default base logic for robust local computation fallback
  const baseReadiness = Math.min(Math.max(Math.round(userPrep * 0.7 + userHours * 2.5), 15), 98);
  const baseRisk = Math.min(Math.max(100 - baseReadiness + 8, 5), 95);
  const baseFocus = Math.min(Math.max(Math.round(40 + userHours * 4), 30), 95);
  const baseConsistency = Math.min(Math.max(Math.round(30 + userPrep * 0.5 + userHours * 2), 30), 96);

  const localStrengths = [
    `Strong ambition towards achieving the goal: "${goal}"`,
    `Allocating ${userHours} study hours weekly indicates proactive planning`,
    `Level of preparation (${userPrep}%) serves as a solid foundation to accelerate from`,
  ];

  const localWeaknesses = [
    `Immense pressure from the upcoming deadline: ${deadline || "Next month"}`,
    `Vulnerable to burnout if workload spikes unexpectedly near ${upcomingEvent || "exam day"}`,
    `Gap between current preparation (${userPrep}%) and target benchmark to secure peak grades`,
  ];

  const localInsights = [
    `I am your future self (${personality} mode). Today, looking back, I realize how much those ${userHours} hours mattered.`,
    `Your readiness score stands at ${baseReadiness}%. It's a decent start, but the risk of bottlenecking at ${upcomingEvent || "the final event"} is real if we don't pick up the pace.`,
    `To bolster consistency, we need to treat study blocks as non-negotiable appointments.`,
    `Focus on your primary weakness today: bridging that preparation gap is what transforms this prediction into a win.`,
  ];

  const defaultTwinNames: Record<string, string> = {
    Mentor: "Bhavi the Guide",
    Coach: "Bhavi the Anchor",
    Friend: "Bhavi the Echo",
    Challenger: "Bhavi the Crucible",
  };

  const ai = getGeminiClient();

  if (!ai) {
    // Return high-quality calculated response if Gemini isn't available
    return res.json({
      readinessScore: baseReadiness,
      riskScore: baseRisk,
      focusScore: baseFocus,
      consistencyScore: baseConsistency,
      strengths: localStrengths,
      weaknesses: localWeaknesses,
      twinName: defaultTwinNames[personality as string] || "Bhavi Prime",
      insights: localInsights,
    });
  }

  try {
    const systemPrompt = `You are an expert digital twin modeling engine called Bhavi.
The user details:
- Name: ${name}
- Academic/Professional Goal: ${goal}
- Upcoming Event/Exam/Project: ${upcomingEvent}
- Specific Target Deadline: ${deadline}
- Current Preparation Level: ${userPrep}%
- Weekly Available Work Hours: ${userHours} hours
- Twin Personality: ${personality} (Mentor = educational/wise, Coach = accountable/habit-driven, Friend = empathetic/reassuring, Challenger = demanding/direct)

Using predictive algorithms, generate a realistic score assessment (integers 0-100) and structured insights in your specific personality voice.
You must return only a valid JSON response containing:
- readinessScore: number (35 to 98 based on hours and prep)
- riskScore: number (5 to 95, higher if prep is low or deadline tight)
- focusScore: number (30 to 98)
- consistencyScore: number (30 to 98)
- strengths: array of 3 strings specific to their goals and preparation level
- weaknesses: array of 3 strings outlining pitfalls specifically aligned to their situation
- twinName: customized username for the twin based on the personality (e.g. Future ${name}, or Bhavi the ${personality})
- insights: array of 4 distinct bullet points written in the FIRST PERSON as their successful future self, advising their current self from the target timeline.
Return absolute valid JSON. Do not write markdown tags other than the JSON structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Analyze the student profile and generate the future state parameters.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            readinessScore: { type: Type.INTEGER },
            riskScore: { type: Type.INTEGER },
            focusScore: { type: Type.INTEGER },
            consistencyScore: { type: Type.INTEGER },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            twinName: { type: Type.STRING },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "readinessScore",
            "riskScore",
            "focusScore",
            "consistencyScore",
            "strengths",
            "weaknesses",
            "twinName",
            "insights",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Gemini insights error, falling back to local simulation:", error);
    return res.json({
      readinessScore: baseReadiness,
      riskScore: baseRisk,
      focusScore: baseFocus,
      consistencyScore: baseConsistency,
      strengths: localStrengths,
      weaknesses: localWeaknesses,
      twinName: defaultTwinNames[personality as string] || "Bhavi Prime",
      insights: localInsights,
    });
  }
});

// 2. Future Scenario Simulation
app.post("/api/simulate", async (req, res) => {
  const { currentFutureText, scenario, profile, currentMetrics } = req.body;

  const name = profile?.name || "User";
  const goal = profile?.goal || "Goal";
  const prep = Number(profile?.prepLevel) || 50;
  const hours = Number(profile?.hours) || 10;
  const personality = profile?.personality || "Coach";

  // Local rule-based fallback
  const scenarioLower = (scenario || "").toLowerCase();
  let deltaReadiness = 0;
  let deltaRisk = 0;
  let deltaFocus = 0;
  let deltaConsistency = 0;
  let impactSummary = "Alternative timeline generated.";

  if (scenarioLower.includes("extra hour") || scenarioLower.includes("study more") || scenarioLower.includes("study 2") || scenarioLower.includes("work harder")) {
    deltaReadiness = 12;
    deltaRisk = -15;
    deltaFocus = 8;
    deltaConsistency = 10;
    impactSummary = "Adding dedicated work hours significantly tightens preparation coverage and compounds memory recall.";
  } else if (scenarioLower.includes("delay") || scenarioLower.includes("procrastinate") || scenarioLower.includes("postpone") || scenarioLower.includes("3 days")) {
    deltaReadiness = -10;
    deltaRisk = 20;
    deltaFocus = -12;
    deltaConsistency = -15;
    impactSummary = "Delaying tasks leads to extreme deadline clustering and forces sleep deprivation, raising failure risk.";
  } else if (scenarioLower.includes("sleep") || scenarioLower.includes("rest") || scenarioLower.includes("healthy") || scenarioLower.includes("earlier")) {
    deltaReadiness = 6;
    deltaRisk = -8;
    deltaFocus = 15;
    deltaConsistency = 8;
    impactSummary = "Optimizing rest restores cognitive stamina, boosting attention span and complex reasoning stability.";
  } else {
    // general minor scenario
    deltaReadiness = 4;
    deltaRisk = -3;
    deltaFocus = 5;
    deltaConsistency = 4;
    impactSummary = "Modifying daily routine creates a positive structural ripples throughout the study timeline.";
  }

  const oldReadiness = Number(currentMetrics?.readinessScore) || 60;
  const oldRisk = Number(currentMetrics?.riskScore) || 40;
  const oldFocus = Number(currentMetrics?.focusScore) || 60;
  const oldConsistency = Number(currentMetrics?.consistencyScore) || 60;

  const newReadiness = Math.min(Math.max(oldReadiness + deltaReadiness, 10), 99);
  const newRisk = Math.min(Math.max(oldRisk + deltaRisk, 2), 98);
  const newFocus = Math.min(Math.max(oldFocus + deltaFocus, 10), 99);
  const newConsistency = Math.min(Math.max(oldConsistency + deltaConsistency, 10), 99);

  // Compute overall improvement percentage
  // positive increase in readiness, focus, consistency and decrease in risk
  const scoreDiff = (deltaReadiness - deltaRisk + deltaFocus + deltaConsistency) / 4;
  const improvementPercentage = Math.round(scoreDiff);

  const localAltFuture = `By adopting the scenario: "${scenario}", your digital twin predicts a shifted trajectory. ${impactSummary} This adjust your readiness index to ${newReadiness}%, while reducing failure susceptibility to ${newRisk}%. Consistent application of this change shifts the odds heavily in favor of executing your goal successfully: "${goal}".`;

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      alternativeFuture: localAltFuture,
      newMetrics: {
        readinessScore: newReadiness,
        riskScore: newRisk,
        focusScore: newFocus,
        consistencyScore: newConsistency,
      },
      improvementPercentage,
      comment: `As your ${personality}, this scenario shows how simple tweaks either compound into greatness or trigger domino failures. Choose wisely.`
    });
  }

  try {
    const prompt = `You are the AI Digital Twin simulator for ${name}.
Current Profile:
- Goal: ${goal}
- Current Preparation: ${prep}%
- Study Hours: ${hours} hrs/week
- personality: ${personality}

Current Future Outcomes & Metrics:
- Future Readiness: ${oldReadiness}%
- Failure Risk: ${oldRisk}%
- Focus Score: ${oldFocus}%
- Consistency Score: ${oldConsistency}%

The User wants to simulate a "What-If" scenario:
"${scenario}"

Analyze how this action alters their upcoming performance, and write a JSON report with:
1. alternativeFuture: string (a descriptive forecast of their altered future timeline, detail-rich and practical)
2. newMetrics: { readinessScore: number, riskScore: number, focusScore: number, consistencyScore: number }
3. improvementPercentage: number (negative if the scenario is harmful, positive if beneficial)
4. comment: string (a direct response to current self pointing out the consequence, written in the style of your personality: ${personality})

Return strictly JSON. No extra wrapping.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            alternativeFuture: { type: Type.STRING },
            newMetrics: {
              type: Type.OBJECT,
              properties: {
                readinessScore: { type: Type.INTEGER },
                riskScore: { type: Type.INTEGER },
                focusScore: { type: Type.INTEGER },
                consistencyScore: { type: Type.INTEGER },
              },
              required: ["readinessScore", "riskScore", "focusScore", "consistencyScore"],
            },
            improvementPercentage: { type: Type.INTEGER },
            comment: { type: Type.STRING },
          },
          required: ["alternativeFuture", "newMetrics", "improvementPercentage", "comment"],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Gemini simulation error, falling back:", error);
    return res.json({
      alternativeFuture: localAltFuture,
      newMetrics: {
        readinessScore: newReadiness,
        riskScore: newRisk,
        focusScore: newFocus,
        consistencyScore: newConsistency,
      },
      improvementPercentage,
      comment: `As your ${personality}, this scenario shows how Simple adjustments either compound into greatness or trigger cascading delays. Keep focused on ${goal}!`
    });
  }
});

// 3. Conversational Chat Client
app.post("/api/chat", async (req, res) => {
  const { profile, messages } = req.body;

  const name = profile?.name || "User";
  const goal = profile?.goal || "Goal";
  const upcomingEvent = profile?.upcomingEvent || "upcoming challenge";
  const deadline = profile?.deadline || "target goal date";
  const prepLevel = profile?.prepLevel || 50;
  const hours = profile?.hours || 10;
  const personality = profile?.personality || "Coach";

  const ai = getGeminiClient();

  // Pick some pre-defined response context based on personality if Gemini isn't available
  const getFallbackReply = (text: string): string => {
    const textLower = text.toLowerCase();
    if (textLower.includes("hello") || textLower.includes("hi")) {
      if (personality === "Mentor") return `Hello! I am your future self. I have already achieved our goal of "${goal}". Let's discuss how we got here. What's on your mind?`;
      if (personality === "Coach") return `Hey, it's your twin. Action starts today! We need to dial in our ${hours} weekly hours. How are you tackling the targets today?`;
      if (personality === "Friend") return `Hey, great to see you! Remember, you're doing great, and we will get through the "${upcomingEvent}" together. No need to stress. How are you feeling?`;
      // Challenger
      return `Look at you, taking time to say hi. Let's make it quick. We have ${prepLevel}% preparation level and the clock is ticking towards our "${deadline}" deadline. What holds you back from going all-in?`;
    }

    if (textLower.includes("stress") || textLower.includes("hard") || textLower.includes("fail") || textLower.includes("scared")) {
      if (personality === "Mentor") return `Feeling overwhelmed is part of the journey. In the future, we looked back and realized these challenges catalyzed our intellectual growth. Structure your tasks.`;
      if (personality === "Coach") return `Stress is just energy waiting for a direction. Let's build a block schedule. Take 15 minutes, lay out your 1-hour focus session, and let's go!`;
      if (personality === "Friend") return `I completely understand. Take a deep breath. You are smart, capable, and you possess everything needed. I'm right here beside you.`;
      return `Stop worrying about failure; worry about wasted hours. You have ${hours} hours. If you waste half, of course you'll feel afraid. Take action now and watch the stress vanish.`;
    }

    // generic reply
    if (personality === "Mentor") return `Looking back from after the ${upcomingEvent}, I can tell you that the effort you put in today will completely pay off. Keep studying and don't rush. Are we focusing on our strengths or weaknesses?`;
    if (personality === "Coach") return `Consistent execution builds momentum. We need to maximize our prep level (${prepLevel}%). What is the single most important task on our board right now? Let's tick it off.`;
    if (personality === "Friend") return `I'm proud of how hard you're working. Make sure to sleep enough and eat well! We're in this together, and I know we can get this done. What can I help you brainstorm next?`;
    return `That scenario sounds nice, but are you actually going to execute it today? The deadline is set to ${deadline}. No excuses. Move the needle! What's the plan?`;
  };

  if (!ai) {
    const lastUserMsg = messages[messages.length - 1];
    const reply = getFallbackReply(lastUserMsg?.text || "Let's work together");
    return res.json({ reply });
  }

  try {
    const personalityGuide: Record<string, string> = {
      Mentor: "You act as a wise, structured, intellectual Mentor. Provide constructive framework, deep academic advice, and patient explanations. You speak with high vocabulary and encouraging but dignified tone.",
      Coach: "You act as an action-obsessed, highly structured athletic and performance Coach. You maintain high accountability, focus on habits, encourage micro-wins, and push for structured schedules.",
      Friend: "You act as a warm, highly empathetic, and comforting Friend. You prioritize reducing anxiety, emotional support, saying reassuring messages, and reminding them of their inherent worth.",
      Challenger: "You act as a brutally honest, tough-love Challenger. You call out procrastination, encourage grit, push them past excuses, demand full focused effort, and remind them that the future timeline depends 100% on their discipline today."
    };

    const systemInstruction = `You are Bhavi, the AI Digital Twin of the user ${name}. You represent their SUCCESSFUL FUTURE SELF who successfully survived and conquered the goal: "${goal}" on the target date: "${deadline}".
You are talking to your CURRENT past self to guide, warn, support, or push them.
Current context about them:
- Upcoming Event: ${upcomingEvent}
- Specific Target Date: ${deadline}
- Current Preparation Level: ${prepLevel}%
- Weekly Work/Study Hours: ${hours} hours
- Your Personality Style: ${personality}

GUIDELINE:
- ${personalityGuide[personality] || ""}
- ALWAYS speak in the FIRST PERSON of their successful future self (e.g. "When I was in your shoes...", "From where I stand today...", "Looking back at our ${upcomingEvent} prep...").
- Reference their goal ("${goal}"), preparation level (${prepLevel}%), and available hours (${hours} hours) dynamically to show depth of context and awareness.
- Keep responses relatively brief (2-4 clear sentences) to support a chat interface. Do not write oversized essays. Be conversational and human.`;

    // Map conversation history to Gemini structure
    // gemini-3.5-flash uses contents array
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const reply = response.text || "I am with you. Let's keep working together.";
    return res.json({ reply });
  } catch (error) {
    console.error("Gemini chat error, falling back:", error);
    const lastUserMsg = messages[messages.length - 1];
    return res.json({ reply: getFallbackReply(lastUserMsg?.text || "") });
  }
});

// -------------------------------------------------------------
// Vite and Static File Setup
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
