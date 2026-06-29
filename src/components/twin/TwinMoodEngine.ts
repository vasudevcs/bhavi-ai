export type TwinMood = 
  | "idle" 
  | "smiling" 
  | "concerned" 
  | "thinking" 
  | "celebrating" 
  | "alert";

export interface MoodInput {
  readinessScore?: number;
  riskScore?: number;
  isGenerating?: boolean;
  isSuccessEvent?: boolean;
  isHovered?: boolean;
}

export function determineMood(input: MoodInput): TwinMood {
  if (input.isGenerating) return "thinking";
  if (input.isSuccessEvent) return "celebrating";
  if (input.isHovered) return "alert";
  
  if (input.readinessScore !== undefined && input.riskScore !== undefined) {
    if (input.readinessScore > 75) return "smiling";
    if (input.riskScore > 60) return "concerned";
    if (input.readinessScore > 40) return "idle";
    return "alert";
  }

  return "idle";
}

// Define the facial feature paths for morphing based on mood
export const MOUTH_PATHS: Record<TwinMood, string> = {
  idle: "M 35 60 Q 50 65 65 60", // Neutral slight curve
  smiling: "M 32 58 Q 50 75 68 58", // Big smile
  concerned: "M 35 65 Q 50 55 65 65", // Frown
  thinking: "M 40 60 Q 50 58 60 60", // Small tight mouth
  celebrating: "M 30 55 Q 50 80 70 55", // Huge smile/open
  alert: "M 38 62 Q 50 64 62 62", // Flat wide
};

export const EYE_SCALE_Y: Record<TwinMood, number> = {
  idle: 1,
  smiling: 0.8,
  concerned: 1.1,
  thinking: 0.6,
  celebrating: 0.9,
  alert: 1.2,
};
