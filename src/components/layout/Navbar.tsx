"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FileText,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  Question,
  List,
  X,
  SignOut,
  User,
  CaretDown,
} from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { cn } from "@/lib/utils";

const NAV_TRANSLATIONS: Record<string, any> = {
  en: { dashboard: "Dashboard", authorities: "Authorities", chatbot: "AI Support", help: "Help", login: "Login", logout: "Sign Out" },
  hi: { dashboard: "डैशबोर्ड", authorities: "प्राधिकरण", chatbot: "एआई सहायता", help: "सहायता", login: "लॉगिन", logout: "लॉग आउट" },
  ta: { dashboard: "டாஷ்போர்டு", authorities: "அதிகாரிகள்", chatbot: "AI ஆதரவு", help: "உதவி", login: "உள்நுழைய", logout: "வெளியேறு" },
  kn: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", authorities: "ಅಧಿಕಾರಗಳು", chatbot: "AI ಬೆಂಬಲ", help: "ಸಹಾಯ", login: "ಲಾಗಿನ್", logout: "ಸೈನ್ ಔಟ್" },
  te: { dashboard: "డాష్‌బోర్డ్", authorities: "అధికారులు", chatbot: "AI మద్దతు", help: "సహాయం", login: "లాగిన్", logout: "సైన్ అవుట్" }
};

export function Navbar() {
  const { language } = useLanguage();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const t = NAV_TRANSLATIONS[language] || NAV_TRANSLATIONS.en;

  const NavContent = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <div className={cn("flex items-center gap-1", className)}>
      <Link 
        href="/dashboard" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <SquaresFour size={18} weight="bold" />
        <span>{t.dashboard}</span>
      </Link>
      <Link 
        href="/authorities" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <MagnifyingGlass size={18} weight="bold" />
        <span>{t.authorities}</span>
      </Link>
      <Link 
        href="/chatbot" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <ChatCircle size={18} weight="bold" />
        <span>{t.chatbot}</span>
      </Link>
      <Link 
        href="/help" 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/50"
      >
        <Question size={18} weight="bold" />
        <span>{t.help}</span>
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <FileText size={24} weight="bold" className="text-primary" />
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

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {(session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()}
                  </div>
                  <CaretDown size={14} weight="bold" className="text-muted-foreground" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl p-2 z-50">
                    <p className="px-3 py-2 text-xs font-bold text-muted-foreground truncate">{session.user?.email}</p>
                    <div className="border-t border-border my-1" />
                    <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                      <SquaresFour size={16} />
                      {t.dashboard}
                    </Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: "/" })} 
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive transition-colors w-full"
                    >
                      <SignOut size={16} />
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-muted/50">
                {t.login}
              </Link>
            )}

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
            {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
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

          {session ? (
            <div className="px-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {(session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{session.user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-destructive/30 text-destructive font-bold hover:bg-destructive/10 transition-colors"
              >
                <SignOut size={18} />
                {t.logout}
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 rounded-xl border border-border text-foreground font-bold hover:bg-muted transition-colors"
            >
              {t.login}
            </Link>
          )}

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
