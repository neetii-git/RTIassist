"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  LayoutDashboard,
  Search,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Scale
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { cn } from "@/lib/utils";

const NAV_TRANSLATIONS: Record<string, any> = {
  en: { dashboard: "Dashboard", authorities: "Authorities", chatbot: "AI Support", help: "Help" },
  hi: { dashboard: "डैशबोर्ड", authorities: "प्राधिकरण", chatbot: "एआई सहायता", help: "सहायता" },
  ta: { dashboard: "டாஷ்போர்டு", authorities: "அதிகாரிகள்", chatbot: "AI ஆதரவு", help: "உதவி" },
  kn: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", authorities: "ಅಧಿಕಾರಗಳು", chatbot: "AI ಬೆಂಬಲ", help: "ಸಹಾಯ" },
  te: { dashboard: "డాష్‌బోర్డ్", authorities: "అధికారులు", chatbot: "AI మద్దతు", help: "సహాయం" }
};

export function Navbar() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const t = NAV_TRANSLATIONS[language] || NAV_TRANSLATIONS.en;

  const NavContent = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <div className={cn("flex items-center gap-1", className)}>
      <Link 
        href="/dashboard" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>{t.dashboard}</span>
      </Link>
      <Link 
        href="/authorities" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <Search className="w-4 h-4" />
        <span>{t.authorities}</span>
      </Link>
      <Link 
        href="/chatbot" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <MessageSquare className="w-4 h-4" />
        <span>{t.chatbot}</span>
      </Link>
      <Link 
        href="/help" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <HelpCircle className="w-4 h-4" />
        <span>{t.help}</span>
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            RTI<span className="text-primary">Assist</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
          <NavContent />
          <div className="h-4 w-px bg-border mx-2" />
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Link 
              href="/input" 
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-[0_4px_12px_rgba(249,115,22,0.3)] text-sm"
            >
              New RTI
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300",
        !isOpen && "hidden"
      )}>
        <NavContent className="flex-col items-stretch gap-1" onClick={() => setIsOpen(false)} />
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-sm font-medium text-muted-foreground">Language</span>
            <LanguageSelector />
          </div>
          <Link 
            href="/input" 
            onClick={() => setIsOpen(false)}
            className="block w-full bg-primary text-white text-center py-3 rounded-xl font-bold hover:bg-primary/90 transition-all primary-glow"
          >
            Create New RTI
          </Link>
        </div>
      </div>
    </nav>
  );
}
