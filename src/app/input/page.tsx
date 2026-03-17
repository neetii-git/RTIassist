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
    <div className="container mx-auto px-4 max-w-4xl py-12 animate-in fade-in duration-500 pt-20">
      <div className="mb-10 text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Craft Your <span className="text-primary">RTI Draft</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Provide the details of your grievance. Our AI will identify the legal sections and departments for you.
        </p>
      </div>

      <Card className="p-1 bg-card border-border shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <FileText className="w-32 h-32" />
        </div>
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="p-8 space-y-6">
            <div className="relative group">
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder={placeholders[selectedLang] || placeholders.en}
                className="w-full min-h-[300px] p-6 pr-16 bg-muted/30 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-xl leading-relaxed font-medium"
              />
              <div className="absolute right-6 bottom-6 flex flex-col gap-3">
                <VoiceInputButton 
                  onInput={setComplaint}
                  currentText={complaint}
                  language={selectedLang === 'en' ? 'en-US' : `${selectedLang}-IN`}
                  className="w-14 h-14 shadow-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Verified Data</h4>
                  <p className="text-[11px] text-muted-foreground">Cross-checked with RTI guidelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Quick Draft</h4>
                  <p className="text-[11px] text-muted-foreground">Finished in under 60 seconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Auto-Detection</h4>
                  <p className="text-[11px] text-muted-foreground">AI finds the correct PIO details.</p>
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
