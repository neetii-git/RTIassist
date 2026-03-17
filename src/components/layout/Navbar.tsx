"use client";

import Link from "next/link";
import { FileText, Database, MessageSquare, HelpCircle, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useLanguage } from "@/components/shared/LanguageProvider";

const LANGUAGES = [
  { code: 'en', name: 'EN' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'te', name: 'తెలుగు' },
];

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            RTI<span className="text-primary">Assist</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Dashboard
          </Link>
          <Link href="/authorities" className="text-muted-foreground hover:text-foreground transition-colors items-center gap-1.5 hidden sm:flex">
            <Database className="w-4 h-4" />
            Authorities
          </Link>
          <Link href="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">AI Support</span>
          </Link>
          <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Help</span>
          </Link>
          
          <div className="h-6 w-[1px] bg-border mx-1" />
          
          <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-lg border border-border group">
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

          <ThemeToggle />
          
          <Link 
            href="/input" 
            className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark transition-all primary-glow whitespace-nowrap"
          >
            New RTI
          </Link>
        </div>
      </div>
    </nav>
  );
}
