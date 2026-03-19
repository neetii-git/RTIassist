"use client";

import { useLanguage } from "./LanguageProvider";
import { Globe } from "@phosphor-icons/react";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ur', name: 'اردو' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-xl border border-border group hover:border-primary/50 transition-all">
      <Globe className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-transparent text-[11px] font-bold text-foreground focus:outline-none cursor-pointer uppercase"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code} className="bg-card text-foreground">{lang.name}</option>
        ))}
      </select>
    </div>
  );
}
