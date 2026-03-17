"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StepProgress } from "@/components/shared/StepProgress";
import { Bot, Search, FileSignature, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

const processingSteps = [
  { id: 1, text: "Understanding complaint...", icon: Bot },
  { id: 2, text: "Identifying government authority...", icon: Search },
  { id: 3, text: "Formatting legal structure...", icon: FileSignature },
  { id: 4, text: "Drafting RTI application...", icon: CheckCircle2 },
];

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language: selectedLang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const processRTI = async () => {
      const complaint = searchParams.get('q');
      const lang = selectedLang;

      if (!complaint) {
        router.push('/');
        return;
      }

      try {
        // Step 1: Start animation
        const interval = setInterval(() => {
          setActiveStep((prev) => (prev < 3 ? prev + 1 : prev));
        }, 1500);

        // Step 2: Make actual API call to Groq
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ complaint, language: lang }),
        });

        const data = await response.json();
        
        clearInterval(interval);
        setActiveStep(3); // Jump to final step

        // Small delay so user sees final checkmark
        setTimeout(() => {
          if (response.ok) {
            // Store real AI data for the Result page
            sessionStorage.setItem('rti_result', JSON.stringify(data));
            router.push("/result");
          } else {
            alert("Error: " + data.error);
            router.push("/");
          }
        }, 800);

      } catch (err) {
        console.error(err);
        alert("Failed to process request. Check API keys.");
        router.push("/");
      }
    };

    processRTI();
  }, [router, searchParams]);

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <StepProgress currentStep={1} className="mb-16 w-full max-w-2xl" />

      <div className="relative w-32 h-32 mb-12">
        <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary animate-spin opacity-70" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-primary/50 animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        <div className="absolute inset-4 rounded-full border-t border-r border-primary/30 animate-spin opacity-30" style={{ animationDuration: '1.5s' }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <Bot className="w-12 h-12" />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {processingSteps.map((step, index) => {
          const Icon = step.icon;
          const isPast = index < activeStep;
          const isActive = index === activeStep;
          const isFuture = index > activeStep;

          return (
            <div 
              key={step.id} 
              className={cn(
                "flex items-center gap-4 transition-all duration-500",
                isPast && "text-muted-foreground",
                isActive && "text-primary scale-105 font-medium ml-2",
                isFuture && "text-muted-foreground/30"
              )}
            >
              <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                {isActive ? (
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-lg">{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 text-center py-20 animate-pulse text-muted-foreground">Loading AI Engine...</div>}>
      <ProcessingContent />
    </Suspense>
  );
}
