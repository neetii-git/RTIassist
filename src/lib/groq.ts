import Groq from "groq-sdk";

// Initialize Groq client
// It will automatically use the GROQ_API_KEY environment variable
export const groq = new Groq();

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
