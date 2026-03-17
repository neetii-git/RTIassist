import Groq from "groq-sdk";

// Initialize Groq client
// It will automatically use the GROQ_API_KEY environment variable if present.
// We provide a fallback 'MOCK_KEY' to prevent the SDK from throwing an error on initialization if the variable is missing.
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "MOCK_KEY"
});

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
