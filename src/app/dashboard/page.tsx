"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MagnifyingGlass, FileText, DownloadSimple, Plus, Clock, CaretRight, CheckCircle, WarningCircle, X, Quotes } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { getStateName } from "@/lib/states";
import { exportToPdf } from "@/lib/pdf-utils";
import { DashboardSkeleton } from "@/components/ui/Skeleton";

interface RtiHistoryItem {
  id: string;
  title: string;
  authorityName: string;
  createdAt: string;
  status: "Completed" | "In Progress" | "Draft";
  draft: string;
  evidenceChecklist?: string; // JSON string
}

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rtiHistory, setRtiHistory] = useState<RtiHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRti, setSelectedRti] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      const fetchHistory = async () => {
        try {
          const res = await fetch("/api/rti");
          if (!res.ok) throw new Error("Fetch failed");
          const data = await res.json();
          setRtiHistory(data);
        } catch (err) {
          console.error("Dashboard load failed:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }
  }, [status, router]);

  if (status === "loading") return <div className="min-h-screen bg-background flex items-center justify-center font-black">Loading...</div>;
  if (!session) return null;

  const getDaysRemaining = (inputDate: string) => {
    const start = new Date(inputDate);
    const deadline = new Date(start);
    deadline.setDate(start.getDate() + 30);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12 animate-in fade-in duration-500 pt-20 md:pt-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-foreground flex items-center gap-3 tracking-tight">
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-primary" /> {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-medium">{t('dashboard.subtitle')}</p>
        </div>
        <Link 
          href="/input" 
          className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-primary/90 transition-all primary-glow w-full md:w-auto justify-center shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          {t('dashboard.createNew')}
        </Link>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        <div className="w-full lg:col-span-8 space-y-6">
          <div className="relative group">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t('dashboard.searchPlaceholder')} 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>

            <div className="grid gap-4">
              {isLoading ? (
                <DashboardSkeleton />
              ) : rtiHistory.length > 0 ? (
                rtiHistory.map((rti) => (
                  <Card 
                    key={rti.id} 
                    onClick={() => {
                      setSelectedRti(rti.id);
                      if (window.innerWidth < 1024) {
                        document.getElementById('tracking-details')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      "cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 border-2 transition-all duration-300",
                      selectedRti === rti.id 
                        ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/5 ring-4 ring-primary/5 scale-[1.01]" 
                        : "border-transparent hover:border-primary/20 hover:shadow-lg bg-card"
                    )}
                  >
                    <div className="flex items-start gap-5">
                      <div className={cn(
                        "p-4 rounded-2xl border-2 shrink-0 transition-all duration-300",
                        selectedRti === rti.id 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 rotate-3" 
                          : "bg-muted border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
                      )}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/10 tracking-widest uppercase">{rti.id.slice(-8)}</span>
                          <div className={cn(
                            "text-[10px] font-black px-3 py-0.5 rounded-lg uppercase tracking-wider",
                            rti.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : 
                            rti.status === "Draft" ? "bg-blue-500/10 text-blue-500" : 
                            "bg-amber-500/10 text-amber-500"
                          )}>
                            {rti.status === "Completed" ? t('dashboard.completed') : rti.status === "Draft" ? t('dashboard.draft') : t('dashboard.inProgress')}
                          </div>
                          {rti.status !== "Completed" && rti.status !== "Draft" && (
                            <div className={cn(
                              "text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1.5 border animate-pulse",
                              getDaysRemaining(rti.createdAt) > 5 ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-red-500/10 text-red-500 border-red-500/30"
                            )}>
                              <Clock className="w-2.5 h-2.5" />
                              {getDaysRemaining(rti.createdAt) > 0 
                                ? t('dashboard.daysRemaining').replace("{days}", String(getDaysRemaining(rti.createdAt))) 
                                : t('dashboard.overdue')}
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-foreground transition-colors leading-tight">{rti.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/60" /> {new Date(rti.createdAt).toLocaleDateString()}</span>
                          <span className="hidden sm:inline opacity-30">•</span>
                          <span className="flex items-center gap-1.5"><Badge className="text-[10px] bg-muted/50 text-muted-foreground font-bold">{rti.authorityName}</Badge></span>
                        </div>
                      </div>
                    </div>
                    <CaretRight className={cn("w-5 h-5 transition-transform", selectedRti === rti.id && "rotate-90 text-primary")} />
                  </Card>
                ))
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-border rounded-[2.5rem] bg-muted/20">
                   <p className="text-muted-foreground font-black italic opacity-60">No applications found.</p>
                </div>
              )}
            </div>
        </div>

        {/* Tracking Details Sidebar */}
        <div id="tracking-details" className="w-full lg:col-span-4 lg:sticky lg:top-24 scroll-mt-24">
          <Card className="p-8 border-2 border-border shadow-2xl rounded-[2.5rem] bg-card/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {selectedRti ? (
              <div className="space-y-8 relative">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('dashboard.details')}</h3>
                    <p className="text-xl font-black text-foreground leading-tight">
                      {rtiHistory.find(r => r.id === selectedRti)?.title}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedRti(null)} 
                    className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t('dashboard.authority')}</span>
                    <span className="font-black text-primary text-right">{rtiHistory.find(r => r.id === selectedRti)?.authorityName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t('dashboard.id')}</span>
                    <span className="font-black font-mono text-foreground text-[10px]">{selectedRti.slice(-12)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t('dashboard.lastUpdated')}</span>
                    <span className="font-black text-foreground">{new Date(rtiHistory.find(r => r.id === selectedRti)?.createdAt || "").toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 relative">
                  <Quotes className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">{t('dashboard.draftSnippet')}</h4>
                  <p className="text-sm text-foreground/80 italic font-medium leading-relaxed line-clamp-4">
                    "{rtiHistory.find(r => r.id === selectedRti)?.draft.slice(0, 150)}..."
                  </p>
                </div>

                <div>
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      {t('dashboard.tracking')}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-foreground">Application Filed</span>
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{new Date(rtiHistory.find(r => r.id === selectedRti)?.createdAt || "").toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 opacity-50">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-foreground">Under Review</span>
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Awaiting response</span>
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="pt-6 border-t border-border flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      const rti = rtiHistory.find(r => r.id === selectedRti);
                      if (rti) {
                        const exportContent = `${t('dashboard.exportHeader')}\n\n${t('dashboard.id')}: ${rti.id}\n${t('dashboard.authority')}: ${rti.authorityName}\n${t('dashboard.lastUpdated')}: ${new Date(rti.createdAt).toLocaleDateString()}\n\n[Content]\n${rti.draft}`;
                        exportToPdf(exportContent, `${selectedRti.slice(-8)}.pdf`);
                      }
                    }}
                    className="w-full py-4 bg-primary text-white text-base font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all primary-glow shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <DownloadSimple className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> {t('dashboard.exportPdf')}
                  </button>
                  <Link 
                    href="/result"
                    className="w-full py-4 bg-transparent text-foreground text-sm font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-muted transition-all border-2 border-border hover:border-primary/30"
                  >
                    {t('dashboard.viewFullDraft')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-primary/5 p-6 rounded-[2rem] w-fit mx-auto mb-6 border border-primary/10">
                  <FileText className="w-10 h-10 text-primary/30" />
                </div>
                <p className="text-base text-muted-foreground font-black tracking-tight leading-snug px-4 italic opacity-60">{t('dashboard.selectPrompt')}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
