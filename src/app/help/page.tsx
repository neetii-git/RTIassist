"use client";

import React from "react";
import { 
  Question, 
  BookOpen, 
  ChatCircle, 
  FileText, 
  ShieldCheck, 
  Lightning, 
  ArrowRight,
  Info,
  Globe,
  Envelope,
  MapTrifold,
  Bank,
  Copy,
  Check,
  UserCheck,
  Clock
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";

export default function HelpPage() {
  const { language, t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl pt-20 md:pt-24">
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex bg-primary/10 p-3 md:p-4 rounded-2xl md:rounded-3xl mb-4 md:mb-6 border border-primary/20">
          <Question className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3 md:mb-4 tracking-tight leading-tight">{t('help.title')}</h1>
        <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">{t('help.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
        <section>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t('help.guideTitle')}</h2>
          </div>
          <div className="space-y-6">
            {Array.isArray(t('help.guideSteps')) && t('help.guideSteps').map((step: any, idx: number) => (
              <div key={idx} className="flex gap-4 md:gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-base md:text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform shrink-0">
                    {idx + 1}
                  </div>
                  {idx < t('help.guideSteps').length - 1 && <div className="w-0.5 h-full bg-border my-2"></div>}
                </div>
                <div className="pt-0 md:pt-1 pb-4">
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 md:space-y-8">
          <div className="bg-primary/5 p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-primary/10 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg md:text-xl font-black text-foreground">{t('help.purityLabel')}</h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">{t('help.purityDesc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 md:p-6 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 group hover:border-emerald-500 transition-all cursor-default">
              <Lightning className="w-6 h-6 text-emerald-500 mb-2 md:mb-3 group-hover:animate-pulse" />
              <h4 className="font-bold text-foreground text-sm md:text-base">AI Intelligence</h4>
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Advanced AI Analysis</p>
            </Card>
            <Card className="p-5 md:p-6 border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 group hover:border-blue-500 transition-all cursor-default">
              <Globe className="w-6 h-6 text-blue-500 mb-2 md:mb-3 group-hover:animate-spin-slow" />
              <h4 className="font-bold text-foreground text-sm md:text-base">Multilingual</h4>
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Indian Languages</p>
            </Card>
          </div>
        </section>
      </div>

      <section className="mt-16 md:mt-24">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Info className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-black text-foreground">{t('help.appealsTitle')}</h2>
        </div>
        <p className="text-base text-muted-foreground mb-6 md:mb-8">{t('help.appealsSubtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {Array.isArray(t('help.appealsSteps')) && t('help.appealsSteps').map((step: any, idx: number) => (
            <Card key={idx} className="p-6 md:p-8 border-primary/10 bg-primary/5 rounded-3xl md:rounded-[40px] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <Badge className="px-3 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs">{step.type}</Badge>
                <span className="text-[10px] md:text-xs font-bold text-primary flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {step.time}
                </span>
              </div>
              <h4 className="text-lg md:text-xl font-black text-foreground mb-1 md:mb-2">{step.to}</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="text-center mb-10 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors uppercase tracking-[0.2em] font-black text-[10px] py-1 px-4">Rural Support</Badge>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 md:mb-4">{t('help.ruralTitle')}</h2>
          <p className="text-sm md:text-base text-muted-foreground px-4">{t('help.ruralSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="p-6 md:p-8 border-orange-100 dark:border-orange-950/30 bg-orange-50/20 dark:bg-orange-950/10 relative overflow-hidden group rounded-3xl md:rounded-[40px]">
            <Envelope className="absolute -right-4 -top-4 w-20 md:w-24 h-20 md:h-24 text-orange-500/10 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg md:text-xl font-bold text-orange-700 dark:text-orange-400 mb-5 md:mb-6 flex items-center gap-2">
              <Envelope className="w-5 h-5 text-orange-500" /> {t('help.offlineGuideTitle')}
            </h3>
            <div className="space-y-5 md:space-y-6">
              {Array.isArray(t('help.offlineSteps')) && t('help.offlineSteps').map((step: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <p className="text-sm font-bold text-foreground">{step.q}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.a}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8 lg:col-span-2 border-border/60 bg-card/40 rounded-3xl md:rounded-[40px]">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-5 md:mb-6 flex items-center gap-2">
              <Bank className="w-5 h-5 text-primary" /> {t('help.ruralTemplatesTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.isArray(t('help.templates')) && t('help.templates').map((tpl: any, idx: number) => (
                <div key={idx} className="p-5 bg-muted/40 rounded-2xl border border-border group hover:border-primary transition-all flex flex-col justify-between">
                  <div>
                    <MapTrifold className="w-5 h-5 text-primary/40 mb-3 group-hover:text-primary transition-colors" />
                    <h4 className="font-bold text-foreground mb-2 text-sm">{tpl.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{tpl.desc}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(tpl.content);
                      const btn = document.getElementById(`copy-tpl-${idx}`);
                      if (btn) btn.innerText = t('help.copied');
                      setTimeout(() => { if (btn) btn.innerText = t('help.copyBtn'); }, 2000);
                    }}
                    id={`copy-tpl-${idx}`}
                    className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold rounded-lg transition-all flex items-center justify-center text-center gap-1.5"
                  >
                    <Copy className="w-3 h-3" /> {t('help.copyBtn')}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-black text-foreground">{t('help.contactsTitle')}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{t('help.contactsSubtitle')}</p>
            <div className="space-y-4">
              {Array.isArray(t('help.contacts')) && t('help.contacts').map((contact: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border/40 group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground flex flex-wrap items-center gap-2 text-sm md:text-base">
                      {contact.role} 
                      <Badge className="text-[8px] md:text-[9px] py-0 px-2 uppercase tracking-wide bg-primary/10 text-primary border-none">{contact.level}</Badge>
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground truncate md:whitespace-normal">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-primary/10 flex flex-col justify-center items-center text-center space-y-4 md:space-y-6">
             <div className="bg-white dark:bg-primary/20 p-5 md:p-6 rounded-full shadow-xl md:shadow-2xl shadow-primary/20">
                <Envelope className="w-10 h-10 md:w-12 md:h-12 text-primary" />
             </div>
             <div>
                <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">Post Office Advantage</h4>
                <p className="text-xs md:text-sm text-muted-foreground max-w-sm whitespace-pre-wrap leading-relaxed">Did you know? Every Post Office acts as an Assistant PIO. They are legally bound to receive and forward your RTI application to any central department for free.</p>
             </div>
             <Badge className="px-6 py-2 bg-primary text-white font-black text-[10px] uppercase tracking-widest border-none">Universal Access</Badge>
          </div>
        </div>
      </section>

      <div className="mt-16 md:mt-24 p-8 md:p-12 bg-foreground text-background rounded-[32px] md:rounded-[50px] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
        <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 leading-tight">Ready to file your first RTI?</h2>
        <Link href="/input" className="inline-flex items-center gap-2 md:gap-3 bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg primary-glow hover:scale-105 transition-all">
          Start Now <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
      </div>
    </div>
  );
}
