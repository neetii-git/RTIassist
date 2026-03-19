import { en } from "@/locales/en";

const CACHE_PREFIX = "rti-lang-";

export async function fetchTranslation(targetLanguage: string) {
  if (targetLanguage === 'en') return en;

  // 1. Check LocalStorage Cache
  const cacheKey = `${CACHE_PREFIX}${targetLanguage}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  // 2. Fetch from AI API
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lexicon: en, targetLanguage })
    });

    if (!response.ok) throw new Error("Translation failed");

    const translated = await response.json();
    
    // 3. Cache the result
    localStorage.setItem(cacheKey, JSON.stringify(translated));
    
    return translated;
  } catch (error) {
    console.error("AI Translation Error, falling back to English:", error);
    return en; // Fallback to English on error
  }
}

/**
 * Access a nested key in an object using dot notation (e.g., "hero.title")
 */
export function getTranslationValue(obj: any, path: string) {
  const value = path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  return value;
}
