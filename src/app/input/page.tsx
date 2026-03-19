"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, FileText, Sparkle, ShieldCheck, Clock, MapPin, Crosshair, Camera, X } from "@phosphor-icons/react";
import { VoiceInputButton } from "@/components/shared/VoiceInputButton";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

function InputPageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language: selectedLang, t } = useLanguage();
  
  const [complaint, setComplaint] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedState, setDetectedState] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        // Using a free reverse geocoding API
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        const state = data.principalSubdivision; 
        
        if (state) {
          // Normalize state name for India (e.g., "Tamil Nadu")
          const cleanState = state.replace("State of ", "").replace("Province of ", "");
          setDetectedState(cleanState);
          sessionStorage.setItem('detected_state', cleanState);
        }
      } catch (err) {
        console.error("Location detection failed:", err);
      } finally {
        setIsDetecting(false);
      }
    }, () => {
      setIsDetecting(false);
    });
  };

  // Auth check & Auto-detect on mount
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const savedState = sessionStorage.getItem('detected_state');
    if (!savedState) {
      detectLocation();
    } else {
      setDetectedState(savedState);
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen bg-background flex items-center justify-center font-black">Loading...</div>;
  }

  if (!session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (complaint.length < 5 && !imageUrl) return;
    
    setIsAnalyzing(true);
    // Pass detected state as query param
    const stateParam = detectedState ? `&state=${encodeURIComponent(detectedState)}` : "";
    
    // Use session storage for large base64 image to avoid URL length issues
    if (imageUrl) {
      sessionStorage.setItem('pending_image', imageUrl);
    }

    router.push(`/processing?q=${encodeURIComponent(complaint)}&lang=${selectedLang}${stateParam}${imageUrl ? '&hasImage=true' : ''}`);
  };

  const icons = [<ShieldCheck key="1" />, <Clock key="2" />, <Sparkle key="3" />];

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16 animate-in fade-in duration-500 pt-20 md:pt-24">
      <div className="mb-10 text-center space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          {t('input.title').split('{accent}')[0]}
          <span className="text-primary">{t('input.accent')}</span>
          {t('input.title').split('{accent}')[1]}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
          {t('input.subtitle')}
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
                placeholder={t('input.placeholder')}
                className="w-full min-h-[300px] md:min-h-[400px] p-5 md:p-8 pr-14 md:pr-16 bg-muted/20 border border-border rounded-2xl md:rounded-[32px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none text-lg md:text-2xl leading-relaxed font-medium"
              />
              <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 flex flex-col gap-3">
                <input 
                  type="file" 
                  id="image-upload" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all border-2",
                    imageUrl 
                      ? "bg-primary text-white border-primary" 
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  )}
                  title="Upload Image of Issue"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all border-2",
                    detectedState 
                      ? "bg-emerald-500 text-white border-emerald-400" 
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  )}
                  title={t('input.detectLocation')}
                >
                  {isDetecting ? (
                    <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  ) : detectedState ? (
                    <MapPin className="w-5 h-5" />
                  ) : (
                    <Crosshair className="w-5 h-5" />
                  )}
                </button>
                <VoiceInputButton 
                  onInput={setComplaint}
                  currentText={complaint}
                  className="w-12 h-12 md:w-14 md:h-14 shadow-lg hover:scale-105 transition-transform bg-primary text-white"
                />
              </div>
              
              {imageUrl && (
                <div className="absolute left-6 top-6 z-20 group/preview">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary shadow-xl">
                    <img src={imageUrl} alt="Upload preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImageUrl(null)}
                      className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="mt-2 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-center">
                    Vision AI Active
                  </div>
                </div>
              )}
              {detectedState && (
                <div className="absolute left-6 bottom-6 animate-in slide-in-from-left-4 duration-500">
                  <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t('input.locationSet').replace('{state}', detectedState)}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.isArray(t('input.features')) && t('input.features').map((feature: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 group hover:border-primary/20 transition-colors">
                  {idx === 0 && <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />}
                  {idx === 1 && <Clock className="w-5 h-5 text-primary mt-0.5" />}
                  {idx === 2 && <Sparkle className="w-5 h-5 text-primary mt-0.5" />}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">{feature.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NEW: Specificity Guide */}
            <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('input.specificityTitle')}
              </h4>
              <ul className="space-y-2">
                {Array.isArray(t('input.specificityPoints')) && t('input.specificityPoints').map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground font-medium italic">
                    <span className="text-primary mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 bg-muted/80 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground italic">
              {t('input.minChars')}
            </div>
            <button
              type="submit"
              disabled={complaint.length < 20 || isAnalyzing}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 primary-glow disabled:opacity-50 disabled:cursor-not-allowed group scale-100 hover:scale-105 active:scale-95"
            >
              {isAnalyzing ? t('input.analyzing') : t('input.generate')} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 font-bold tracking-tight">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {t('input.trusted')}
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
