"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StepProgress } from "@/components/shared/StepProgress";
import { Robot, MagnifyingGlass, PencilLine, CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language: selectedLang, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const processingStepsData = t('processing.steps') || [];
  const icons = [Robot, MagnifyingGlass, PencilLine, CheckCircle];

  useEffect(() => {
    const processRTI = async () => {
      const complaint = searchParams.get('q');
      const detectedState = searchParams.get('state');
      const lang = selectedLang;

      if (!complaint) {
        router.push('/');
        return;
      }

      try {
        const interval = setInterval(() => {
          setActiveStep((prev) => (prev < 3 ? prev + 1 : prev));
        }, 1500);

        const hasImage = searchParams.get('hasImage');
        let imageUrl = null;
        if (hasImage === 'true') {
          imageUrl = sessionStorage.getItem('pending_image');
          // Clean up to save memory
          sessionStorage.removeItem('pending_image');
        }

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            complaint, 
            language: lang, 
            state: detectedState,
            imageUrl: imageUrl 
          }),
        });

        const data = await response.json();
        
        clearInterval(interval);
        setActiveStep(3);

        setTimeout(() => {
          if (response.ok) {
            sessionStorage.setItem('rti_result', JSON.stringify(data));
            router.push("/result");
          } else {
            alert(t('processing.apiError').replace("{error}", data.details || data.error));
            router.push("/");
          }
        }, 800);

      } catch (err) {
        console.error(err);
        alert(t('processing.error'));
        router.push("/");
      }
    };

    processRTI();
  }, [router, searchParams, t]);

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12 md:py-24 flex flex-col items-center justify-center min-h-[70vh] pt-20 md:pt-32">
      <StepProgress currentStep={1} className="mb-12 md:mb-16 w-full max-w-2xl px-2" />

      <div className="relative w-28 h-28 md:w-32 md:h-32 mb-10 md:mb-12">
        <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary animate-spin opacity-70" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-primary/50 animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        <div className="absolute inset-4 rounded-full border-t border-r border-primary/30 animate-spin opacity-30" style={{ animationDuration: '1.5s' }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <Robot className="w-10 h-10 md:w-12 md:h-12" />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {processingStepsData.map((step: any, index: number) => {
          const Icon = icons[index] || Robot;
          const isPast = index < activeStep;
          const isActive = index === activeStep;
          const isFuture = index > activeStep;

          return (
            <div 
              key={index} 
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
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="container mx-auto px-4 text-center py-20 animate-pulse text-muted-foreground">{t('processing.fallback')}</div>}>
      <ProcessingContent />
    </Suspense>
  );
}
