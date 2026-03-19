import Groq from "groq-sdk";

const isBuildTime = process.env.NODE_ENV === "production" && !process.env.GROQ_API_KEY;

const realGroq = !isBuildTime ? new Groq({
  apiKey: process.env.GROQ_API_KEY || "MOCK_KEY"
}) : null;

// Build-safe export
export const groq = realGroq || {
  chat: {
    completions: {
      create: async () => ({ choices: [{ message: { content: "Build mock" } }] })
    }
  }
} as any;

export type MultilingualConfig = {
  language: string;
  name: string;
};

export const SUPPORTED_LANGUAGES: Record<string, MultilingualConfig> = {
  "en": { language: "English", name: "English" },
  "hi": { language: "Hindi", name: "Hindi (हिन्दी)" },
  "kn": { language: "Kannada", name: "Kannada (ಕನ್ನಡ)" },
  "mr": { language: "Marathi", name: "Marathi (मराठी)" },
  "ta": { language: "Tamil", name: "Tamil (தமிழ்)" },
  "bn": { language: "Bengali", name: "Bengali (বাংলা)" },
};
