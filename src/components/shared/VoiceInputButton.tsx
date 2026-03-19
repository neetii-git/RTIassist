"use client";

import { Microphone, MicrophoneSlash } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function VoiceInputButton({ 
  onInput, 
  currentText = "",
  className, 
  language: propLanguage 
}: { 
  onInput?: (text: string) => void; 
  currentText?: string; 
  className?: string; 
  language?: string 
}) {
  const { language: globalLang, t } = useLanguage();
  
  const getRecognitionLang = (lang: string) => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'bn': return 'bn-IN';
      case 'te': return 'te-IN';
      case 'mr': return 'mr-IN';
      case 'ta': return 'ta-IN';
      case 'ur': return 'ur-PK';
      case 'gu': return 'gu-IN';
      case 'kn': return 'kn-IN';
      case 'or': return 'or-IN';
      case 'ml': return 'ml-IN';
      case 'pa': return 'pa-IN';
      default: return 'en-US';
    }
  };

  const recognitionLanguage = propLanguage || getRecognitionLang(globalLang);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const originalTextRef = useRef<string>("");
  const accumulatedTranscriptRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          alert(t('common.micDenied'));
        } else if (event.error === 'no-speech') {
          // Ignore
        } else {
          alert(t('common.speechError').replace("{error}", event.error));
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            accumulatedTranscriptRef.current += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const sessionTranscript = accumulatedTranscriptRef.current + interimTranscript;

        if (onInput) {
          const combinedText = originalTextRef.current 
            ? `${originalTextRef.current.trim()} ${sessionTranscript}` 
            : sessionTranscript;
          onInput(combinedText);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [t]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = recognitionLanguage;
    }
  }, [recognitionLanguage]);

  const toggleRecording = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isSupported) {
      alert(t('common.voiceNetError'));
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      originalTextRef.current = currentText;
      accumulatedTranscriptRef.current = "";
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <div className="relative">
      {isRecording && (
        <div className="absolute inset-0 -m-1 rounded-full bg-red-500/20 animate-ping pointer-events-none" />
      )}
      <button
        onClick={toggleRecording}
        type="button"
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all",
          isRecording 
            ? "bg-red-500 text-white hover:bg-red-600 border-2 border-red-400 shadow-red-500/40 shadow-xl" 
            : "bg-white dark:bg-card text-muted-foreground hover:text-primary hover:bg-primary/5 border-2 border-border hover:border-primary/40 shadow-xl",
          className
        )}
        title={isRecording ? t('common.voiceStop') : t('common.voiceStart')}
      >
        {isRecording ? (
          <MicrophoneSlash size={20} weight="bold" />
        ) : (
          <Microphone size={20} weight="bold" />
        )}
      </button>
    </div>
  );
}
