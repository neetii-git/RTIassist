"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Send, Bot, MessageSquare } from "lucide-react";
import { VoiceInputButton } from "@/components/shared/VoiceInputButton";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const getGreeting = (lang: string) => {
  switch (lang) {
    case 'hi': return "नमस्ते! मैं एआई भारत सपोर्ट बोट हूँ। मैं सूचना के अधिकार (RTI) से संबंधित आपके सवालों के जवाब दे सकता हूँ। आप क्या जानना चाहते हैं?";
    case 'ta': return "வணக்கம்! நான் AI பாரத் ஆதரவு பாட். தகவல் அறியும் உரிமை (RTI) தொடர்பான உங்கள் கேள்விகளுக்கு நான் பதிலளிக்க முடியும். நீங்கள் என்ன தெரிந்து கொள்ள வேண்டும்?";
    case 'kn': return "ನಮಸ್ಕಾರ! ನಾನು ಎಐ ಭಾರತ್ ಸಪೋರ್ಟ್ ಬೋಟ್. ಮಾಹಿತಿ ಹಕ್ಕು (RTI) ಗೆ ಸಂಬಂಧಿಸಿದ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಾನು ಉತ್ತರಿಸಬಲ್ಲೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?";
    case 'te': return "నమస్కారం! నేను AI భారత్ సపోర్ట్ బాట్. సమాచార హక్కు (RTI) కి సంబంధించిన మీ ప్రశ్నలకు నేను సమాధానం చెప్పగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?";
    case 'mr': return "नमस्कार! मी AI भारत सपोर्ट बॉट आहे. मी माहितीच्या अधिकाराशी (RTI) संबंधित तुमच्या प्रश्नांची उत्तरे देऊ शकतो. तुम्हाला काय जाणून घ्यायचे आहे?";
    case 'en': 
    default: return "Hello! I am the AI Bharat Support Bot. I can answer your questions regarding the Right to Information (RTI). What would you like to know?";
  }
};

const getPlaceholder = (lang: string) => {
  switch (lang) {
    case 'hi': return "टाइप करें या बोलें...";
    case 'ta': return "தட்டச்சு செய்யவும் அல்லது பேசவும்...";
    case 'kn': return "ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ...";
    case 'te': return "టైప్ చేయండి లేదా మాట్లాడండి...";
    case 'mr': return "टाइप करा किंवा बोला...";
    case 'en': 
    default: return "Type or speak your question...";
  }
};

function ChatbotContent() {
  const router = useRouter();
  const { language: selectedLang } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on mount
  useEffect(() => {
    setMessages([{ role: "assistant", content: getGreeting(selectedLang) }]);
  }, [selectedLang]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          language: selectedLang,
          mode: 'support' // Signal that this is a support chat, not RTI intake
        })
      });

      if (!response.ok) throw new Error("Chat request failed");
      
      const data = await response.json();
      
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16 animate-in fade-in duration-500 min-h-[calc(100vh-80px)] flex flex-col pt-20 md:pt-24">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="bg-primary/10 p-3 md:p-4 rounded-2xl md:rounded-3xl mb-4 md:mb-6 border border-primary/20">
          <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-2 tracking-tight">Bharat AI Support</h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-lg">Your multilingual guide to the Right to Information Act.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm shadow-xl border border-border">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex max-w-[90%] md:max-w-[85%] animate-in slide-in-from-bottom-2 duration-300", 
                msg.role === "user" ? "ml-auto justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "p-4 md:p-5 rounded-2xl md:rounded-[24px] text-sm md:text-base leading-relaxed shadow-sm",
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-sm md:rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-sm md:rounded-tl-none border border-border prose prose-sm dark:prose-invert max-w-none break-words"
                )}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex max-w-[80%] justify-start animate-in fade-in">
              <div className="p-4 rounded-2xl bg-muted text-muted-foreground rounded-tl-sm border border-border flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-6 bg-background/80 backdrop-blur-md border-t border-border">
          <div className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder(selectedLang)}
              className="flex-1 max-h-32 min-h-[52px] md:min-h-[64px] p-3 md:p-5 pr-24 md:pr-32 bg-muted/20 border border-border rounded-xl md:rounded-3xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none shadow-sm text-sm md:text-base"
              rows={1}
            />
            
            <div className="absolute right-2 bottom-1.5 md:right-4 md:bottom-2.5 flex items-center gap-1 md:gap-2">
              <VoiceInputButton 
                onInput={(text) => setInputValue(text)}
                currentText={inputValue}
                language={selectedLang === 'en' ? 'en-US' : `${selectedLang}-IN`}
                className="w-9 h-9 md:w-11 md:h-11 p-2 shadow-none border-none hover:bg-muted shrink-0 text-primary"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-primary text-white rounded-lg md:rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 primary-glow"
              >
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5" />
              </button>
            </div>
          </div>
          <p className="text-center text-[9px] md:text-[11px] text-muted-foreground mt-2 md:mt-3 font-medium uppercase tracking-widest opacity-60">AI Assistance • Secure & Private</p>
        </div>
      </Card>
    </div>
  );
}

export default function ChatbotPage() {
  return (
    <React.Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading AI Support...</div>}>
      <ChatbotContent />
    </React.Suspense>
  )
}
