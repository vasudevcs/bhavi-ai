export interface TwinProfile {
  name: string;
  goal: string;
  upcomingEvent: string;
  deadline: string;
  prepLevel: number; // 0-100
  hours: number;
  personality: "Mentor" | "Coach" | "Friend" | "Challenger";
  twinName: string;
  avatar: string; // Emoji or SVG selection index
}

export interface TwinMetrics {
  readinessScore: number;
  riskScore: number;
  focusScore: number;
  consistencyScore: number;
}

export interface TwinInsights {
  readinessScore: number;
  riskScore: number;
  focusScore: number;
  consistencyScore: number;
  strengths: string[];
  weaknesses: string[];
  twinName: string;
  insights: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "twin";
  text: string;
  timestamp: string;
}

export interface SimulatorOutcome {
  scenario: string;
  alternativeFuture: string;
  newMetrics: TwinMetrics;
  improvementPercentage: number;
  comment: string;
}
