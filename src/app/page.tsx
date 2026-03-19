"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Robot, MagnifyingGlass, PencilLine, Microphone, DownloadSimple, ChatCircle, ShieldCheck, Quotes, CheckCircle, Globe, WifiSlash } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'te', name: 'తెలుగు' },
];

export default function Home() {
  const { language: selectedLang, setLanguage: setSelectedLang, t, isLoading } = useLanguage();

  const getTitleSize = (lang: string) => {
    switch (lang) {
      case 'ta':
      case 'te':
      case 'kn':
        return "text-2xl md:text-4xl xl:text-5xl"; 
      case 'hi':
        return "text-3xl md:text-5xl xl:text-6xl";
      default:
        return "text-3xl md:text-5xl xl:text-6xl";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 overflow-hidden relative">
      {/* Background Motifs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 border-[40px] border-primary rounded-full" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 border-[40px] border-primary rounded-full" />
      </div>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 max-w-6xl relative z-10"
      >
        <div className="bg-card/30 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-border/50 p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-primary/5 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left space-y-6 order-1">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                {t('hero.badge')}
              </motion.div>
              
               <motion.h1 variants={itemVariants} className={cn("font-black tracking-tighter text-foreground !leading-[1.1] text-balance", getTitleSize(selectedLang))}>
                {t('hero.title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-primary">{t('hero.titleAccent')}</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 tracking-tight font-medium">
                {t('hero.subtitle')}
              </motion.p>
              
              {/* Language Selection */}
              <motion.div variants={itemVariants} className="pt-2">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Choose your preferred language</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code as any)}
                      disabled={isLoading}
                      className={cn(
                        "px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all duration-300 border-2",
                        selectedLang === lang.code 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                          : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
                        isLoading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4">
                <Link 
                  href={`/input?lang=${selectedLang}`} 
                  className="group flex items-center gap-2 bg-primary text-white font-black text-sm px-8 py-4 rounded-[20px] hover:bg-primary/90 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                >
                  <PencilLine className="w-4 h-4" />
                  {t('hero.startDrafting')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href={`/chatbot?lang=${selectedLang}`} 
                  className="flex items-center gap-2 bg-white text-foreground border border-border/60 font-black text-sm px-8 py-4 rounded-[20px] hover:bg-muted/30 transition-all shadow-md hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                >
                  <ChatCircle className="w-4 h-4 text-primary" />
                  Ask AI Helper
                </Link>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex-1 relative z-10 w-full lg:max-w-[450px] order-2"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-[60px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white/40 backdrop-blur-sm border border-white/60 p-4 md:p-6 rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.03)] group-hover:shadow-xl transition-all duration-700">
                  <Image 
                    src="/images/image.png"
                    alt="India Map Visualization"
                    width={500}
                    height={500}
                    className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] dark:brightness-95"
                    priority
                  />
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-border/50 flex items-center gap-1.5 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Covering all 28 States & 8 UTs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="container mx-auto px-4 max-w-6xl mt-24 relative z-10">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">{t('hero.howTitle')}</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight mb-2">Turn grievances into legal documents in 5 clean steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {Array.isArray(t('hero.howSteps')) && t('hero.howSteps').map((step: any, i: number) => (
            <Card key={i} className="flex flex-col items-center text-center p-6 bg-card border-border group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-xl rounded-[2rem]">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary/10 group-hover:rotate-6 transition-all duration-500 font-black text-xl text-primary">
                {i + 1}
              </div>
              <h3 className="text-lg font-black text-foreground mb-3 leading-tight">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Semantic Engine Section */}
      <section className="container mx-auto px-4 max-w-6xl mt-32 relative z-10">
        <div className="bg-primary/5 border border-primary/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rotate-45 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="primary" className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white border-none shadow-lg shadow-primary/20">
                Tech Transparency
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                {t('hero.engineTitle')}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
                {t('hero.engineSubtitle')}
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm">
                  <div className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                    <MagnifyingGlass className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-sm">Semantic Inference</h4>
                    <p className="text-xs text-muted-foreground font-medium">We don't just find keywords; we understand the legal meaning behind your words.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm">
                  <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-sm">Department DB</h4>
                    <p className="text-xs text-muted-foreground font-medium">A curated database of 8,000+ jurisdictions across all 36 States & UTs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 border-primary/20 bg-card/80 backdrop-blur-xl shadow-2xl rounded-[2.5rem] relative z-10 rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Mapping Proof</span>
                    <Badge variant="success">99% Match</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Citizen Input</p>
                      <p className="text-sm font-bold text-foreground leading-relaxed italic bg-muted/50 p-3 rounded-xl border border-border/50">
                        "The street lights in my colony have been broken for 3 weeks, making it unsafe at night."
                      </p>
                    </div>
                    <div className="flex justify-center py-2">
                       <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">AI Mapping Outcome</p>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                        <p className="font-black text-primary text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Municipal Corporation
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                          <strong>Reason:</strong> Street lighting is a local maintenance issue managed by the city's Municipal Corporation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse -z-10 animate-blob"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-6xl mt-40 md:mt-48 mb-10 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(t('hero.features')) && t('hero.features').map((feat: any, i: number) => (
            <Card key={i} className="p-8 border-border/40 hover:border-primary/50 transition-all group hover:shadow-xl hover:shadow-primary/5 rounded-[2rem] bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                {feat.icon === 'Globe' && <Globe className="w-7 h-7" />}
                {feat.icon === 'Mic' && <Microphone className="w-7 h-7" />}
                {feat.icon === 'FileText' && <PencilLine className="w-7 h-7" />}
                {feat.icon === 'WifiOff' && <WifiSlash className="w-7 h-7" />}
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-3">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="w-full py-24 px-4 bg-muted/30 mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <Quotes className="w-12 h-12 text-primary opacity-20" />
          </div>
          <p className="text-2xl sm:text-3xl font-medium text-foreground italic leading-snug mb-8 px-4">
             "The Right to Information is now in the hands of every Indian citizen."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">SC</div>
            <div className="text-left">
              <p className="font-bold text-foreground">Satyendra Chaturvedi</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">RTI Activist & Legal Consultant</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

