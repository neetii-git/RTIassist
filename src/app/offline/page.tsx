"use client";

import React from "react";
import { 
  ArrowLeft, 
  MapTrifold, 
  Envelope, 
  Bank, 
  FileText, 
  ShieldCheck, 
  Info,
  Phone,
  Clock,
  ArrowSquareOut,
  NavigationArrow
} from "@phosphor-icons/react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/components/shared/LanguageProvider";

export default function OfflinePage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
       <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> {t('offline.back')}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-16 md:mb-20">
        <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
          <Badge className="bg-primary/10 text-primary uppercase tracking-widest font-black text-[10px] md:text-xs py-1 px-4">{t('offline.badge')}</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight tracking-tight">{t('offline.title')}</h1>
          <p className="text-muted-foreground text-base md:text-xl leading-relaxed">{t('offline.subtitle')}</p>
        </div>
        <div className="w-full md:w-80 bg-primary/5 rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-primary/10 relative">
          <NavigationArrow className="absolute -right-4 -top-4 w-12 md:w-16 h-12 md:h-16 text-primary/10" />
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{t('offline.coreConcept')}</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic">"{t('offline.coreDesc')}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
        {(t('offline.steps') || []).map((step: any, idx: number) => (
          <Card key={idx} className="p-6 md:p-8 border-border/60 hover:border-primary/30 transition-all group relative overflow-hidden rounded-3xl">
            <div className="absolute -right-2 -top-2 w-12 md:w-16 h-12 md:h-16 bg-primary/5 rounded-full group-hover:scale-150 transition-transform"></div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4 md:mb-6 font-black text-lg">
              {idx + 1}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">{step.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
        <section>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-emerald-500" />
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t('offline.ruralFocus')}</h2>
          </div>
          <div className="space-y-4">
            {(t('offline.ruralItems') || []).map((item: any, idx: number) => (
              <div key={idx} className="p-5 md:p-6 bg-muted/40 rounded-2xl md:rounded-3xl border border-border/50 group hover:bg-card transition-all">
                <h4 className="font-bold text-base md:text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Phone className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t('offline.contacts')}</h2>
          </div>
          <div className="bg-card border border-border rounded-3xl md:rounded-[40px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[300px]">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-5 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase text-muted-foreground">{t('offline.table.officer')}</th>
                    <th className="px-5 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase text-muted-foreground">{t('offline.table.area')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(t('offline.contactRoles') || []).map((role: any, idx: number) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 md:px-6 py-4 md:py-5">
                        <p className="font-bold text-foreground text-sm md:text-base">{role.role}</p>
                        <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase font-medium">{role.level}</p>
                      </td>
                      <td className="px-5 md:px-6 py-4 md:py-5">
                        <p className="text-xs md:text-sm text-muted-foreground">{role.jurisdiction}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-foreground text-background rounded-[32px] md:rounded-[50px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6">
          <div className="inline-flex bg-primary/20 p-3 md:p-4 rounded-2xl md:rounded-full">
            <MapTrifold className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black">{t('offline.noNetTip')}</h2>
          <p className="text-base md:text-lg opacity-80 leading-relaxed italic px-4 md:px-0">{t('offline.noNetDesc')}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
             {(t('offline.badges') || []).map((b: string) => (
                <Badge key={b} className="bg-white/10 text-white border-white/20 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs">
                  {b}
                </Badge>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
