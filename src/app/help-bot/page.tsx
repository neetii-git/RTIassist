"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Robot, PaperPlaneRight, User, Sparkle, ArrowLeft, ChatCircleText } from "@phosphor-icons/react";
import Link from "next/link";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function HelpBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your RTI Legal Assistant. How can I help you today? You can ask about fees, timelines, or how to file an appeal." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.reply || "I'm sorry, I encountered an error." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "Failed to connect to the knowledge base." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20 pb-10 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Expert System Active</span>
        </div>
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 primary-glow">
          <Robot className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2">RTI Knowledge Bot</h1>
        <p className="text-muted-foreground font-medium">Instant legal guidance powered by RAG and Vector Search</p>
      </div>

      <Card className="flex-1 flex flex-col bg-card/50 backdrop-blur-xl border-border/50 overflow-hidden shadow-2xl min-h-[500px]">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/10' : 'bg-primary primary-glow'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-primary" /> : <Robot className="w-5 h-5 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-muted/50 border border-border/50 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center animate-pulse shadow-lg shadow-primary/20">
                  <Sparkle className="w-5 h-5 text-white" />
                </div>
                <div className="p-4 bg-muted/50 border border-border/50 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-background/50 border-t border-border/50">
          <div className="relative">
            <Input 
              placeholder="Ask about RTI laws, timelines, or procedures..."
              className="pr-24 py-7 bg-card border-border/50 focus:border-primary/50 text-base rounded-2xl shadow-inner shadow-black/5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 h-[44px] px-6 bg-primary text-white font-black rounded-xl primary-glow shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <PaperPlaneRight className="w-4 h-4 mr-2" />
              Ask
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button onClick={() => setInput("How much is the RTI fee?")} className="text-xs font-black text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ChatCircleText className="w-3 h-3" /> "How much is the fee?"
            </button>
            <button onClick={() => setInput("What is the timeline for response?")} className="text-xs font-black text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ChatCircleText className="w-3 h-3" /> "What is the timeline?"
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
