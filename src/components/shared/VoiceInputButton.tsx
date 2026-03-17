"use client";

import { Mic, MicOff, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

// Add TypeScript support for the Web Speech API
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
  const { language: globalLang } = useLanguage();
  
  const getRecognitionLang = (lang: string) => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'kn': return 'kn-IN';
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
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = recognitionLanguage;
    }
  }, [recognitionLanguage]);

  const toggleRecording = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    
    if (!isSupported) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      originalTextRef.current = currentText;
      accumulatedTranscriptRef.current = "";
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalSessionTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalSessionTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalSessionTranscript) {
          accumulatedTranscriptRef.current += finalSessionTranscript;
        }

        if (onInput) {
          const display = (originalTextRef.current + " " + accumulatedTranscriptRef.current + interimTranscript).trim();
          onInput(display);
        }
      };

      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleRecording}
      type="button"
      className={cn(
        "p-3 rounded-full flex items-center justify-center transition-all shadow-sm",
        isRecording 
          ? "bg-red-500 text-white hover:bg-red-600 animate-pulse border border-red-600 shadow-red-500/30" 
          : "bg-card text-muted-foreground hover:text-primary hover:bg-primary/5 border border-border hover:border-primary/30",
        className
      )}
      title={isRecording ? "Stop Recording" : "Start Voice Input"}
    >
      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 leading-none" />}
    </button>
  );
}
