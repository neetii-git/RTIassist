"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, FileText, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { VoiceInputButton } from "@/components/shared/VoiceInputButton";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

function InputPageContent() {
  const router = useRouter();
  const { language: selectedLang } = useLanguage();
  
  const [complaint, setComplaint] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (complaint.length < 20) return;
    
    setIsAnalyzing(true);
    // Simulate/Direct to processing
    router.push(`/processing?q=${encodeURIComponent(complaint)}&lang=${selectedLang}`);
  };

  const placeholders: Record<string, string> = {
    hi: "अपनी समस्या विस्तार से बताएं (जैसे: मेरे इलाके में सड़क मरम्मत में देरी क्यों हो रही है?)",
    ta: "உங்கள் பிரச்சனையை விரிவாக விவரிக்கவும் (எ.கா: என் பகுதியில் சாலை பழுதுபார்ப்பு ஏன் தாமதமாகிறது?)",
    kn: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ವಿವರಿಸಿ (ಉದಾ: ನನ್ನ ಪ್ರದೇಶದಲ್ಲಿ ರಸ್ತೆ ದುರಸ್ತಿ ಏಕೆ ವಿಳಂಬವಾಗಿದೆ?)",
    te: "మీ సమస్యను వివరంగా వివరించండి (ఉదా: మా ప్రాంతంలో రోడ్డు మరమ్మత్తు ఎందుకు ఆలస్యమవుతోంది?)",
    en: "Describe your issue in detail (e.g., Why is the road repair delayed in my locality despite sanctions?)"
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16 animate-in fade-in duration-500 pt-20 md:pt-24">
      <div className="mb-10 text-center space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Craft Your <span className="text-primary">RTI Draft</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
          Provide the details of your grievance. Our AI will identify the legal sections and departments for you.
        </p>
      </div>

      <Card className="p-1 bg-card border-border shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <FileText className="w-32 h-32" />
        </div>
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="p-6 md:p-8 space-y-6">
            <div className="relative group">
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder={placeholders[selectedLang] || placeholders.en}
                className="w-full min-h-[300px] md:min-h-[400px] p-5 md:p-8 pr-14 md:pr-16 bg-muted/20 border border-border rounded-2xl md:rounded-[32px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none text-lg md:text-2xl leading-relaxed font-medium"
              />
              <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 flex flex-col gap-3">
                <VoiceInputButton 
                  onInput={setComplaint}
                  currentText={complaint}
                  language={selectedLang === 'en' ? 'en-US' : `${selectedLang}-IN`}
                  className="w-12 h-12 md:w-14 md:h-14 shadow-lg hover:scale-105 transition-transform bg-primary text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 group hover:border-primary/20 transition-colors">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Verified Data</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Cross-checked with RTI guidelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 group hover:border-primary/20 transition-colors">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Quick Draft</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Finished in under 60 seconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 group hover:border-primary/20 transition-colors">
                <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Auto-Detection</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">AI finds the correct PIO details.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/80 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground italic">
              Minimum 20 characters required to analyze.
            </div>
            <button
              type="submit"
              disabled={complaint.length < 20 || isAnalyzing}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 primary-glow disabled:opacity-50 disabled:cursor-not-allowed group scale-100 hover:scale-105 active:scale-95"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze & Generate"} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Trusted by 5,000+ citizens nationwide
        </p>
      </div>
    </div>
  );
}

export default function InputPage() {
  return (
    <React.Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Initializing Drafting Engine...</div>}>
      <InputPageContent />
    </React.Suspense>
  )
}
