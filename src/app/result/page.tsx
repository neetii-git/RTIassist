"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StepProgress } from "@/components/shared/StepProgress";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DownloadSimple, Copy, PencilSimple, Check, ArrowLeft, PaperPlaneRight, ArrowSquareOut, Info, Globe } from "@phosphor-icons/react";
import { NATIONAL_RTI_CONFIG, STATES_LIST, isOfflineOnly, getStateName } from "@/lib/states";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { exportToPdf } from "@/lib/pdf-utils";

export default function ResultPage() {
  const { language: selectedLang, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedState, setSelectedState] = useState("Central Government");
  const stateData = NATIONAL_RTI_CONFIG[selectedState];
  const [rtiContent, setRtiContent] = useState("");
  const [confidence, setConfidence] = useState("98%");
  const [pioOffice, setPioOffice] = useState("PIO Office");
  const [reasoning, setReasoning] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalComplaint, setOriginalComplaint] = useState("");
  const [draftLang, setDraftLang] = useState("");
  const [evidenceChecklist, setEvidenceChecklist] = useState<string[]>([]);

  // Initial load
  useEffect(() => {
    const savedResult = sessionStorage.getItem('rti_result');
    const savedState = sessionStorage.getItem('detected_state');
    
    if (savedState) {
      setSelectedState(savedState);
    }

    if (savedResult) {
      try {
        const data = JSON.parse(savedResult);
        if (data.draft) {
          setRtiContent(data.draft);
          setDraftLang(data.language || 'en');
        }
        if (data.confidence) setConfidence(data.confidence);
        if (data.authority?.pio) setPioOffice(data.authority.pio);
        if (data.reasoning) setReasoning(data.reasoning);
        if (data.complaint) setOriginalComplaint(data.complaint);
        if (data.evidenceChecklist) setEvidenceChecklist(data.evidenceChecklist);
      } catch (err) {
        console.error("Failed to parse RTI result from session:", err);
      }
    }
  }, []);

  // Handle dynamic translation when language changes
  useEffect(() => {
    const retranslateDraft = async () => {
      if (!originalComplaint || selectedLang === draftLang || isTranslating) return;

      setIsTranslating(true);
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ complaint: originalComplaint, language: selectedLang, state: selectedState }),
        });

        if (response.ok) {
          const data = await response.json();
          setRtiContent(data.draft);
          setDraftLang(selectedLang);
          if (data.evidenceChecklist) setEvidenceChecklist(data.evidenceChecklist);
          sessionStorage.setItem('rti_result', JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to re-translate draft:", err);
      } finally {
        setIsTranslating(false);
      }
    };

    if (originalComplaint) {
      retranslateDraft();
    } else if (!rtiContent) {
      // ONLY set default if we have literally nothing
      setRtiContent(t('result.defaultDraft'));
    }
  }, [selectedLang, originalComplaint, draftLang, isTranslating, t, selectedState, rtiContent]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rtiContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    await exportToPdf(rtiContent, `RTI_Draft_${selectedState}_${selectedLang}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-20 md:pt-24">
      <StepProgress currentStep={2} className="mb-8 md:mb-12" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Document Content */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{t('result.title')}</h1>
            <div className="flex items-center gap-2">
              <Badge className="px-3 py-1 bg-primary/10 text-primary border-none text-[10px] md:text-xs">{t('result.autoDrafted')}</Badge>
              <Badge variant="default" className="px-3 py-1 uppercase text-[10px] md:text-xs">{selectedLang}</Badge>
            </div>
          </div>
          
          <Card className="p-0 overflow-hidden bg-card border-border shadow-xl rounded-2xl md:rounded-3xl">
            <div className="bg-muted border-b border-border px-4 md:px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t('result.preview')}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-muted-foreground/10 rounded-lg text-muted-foreground transition-colors border border-transparent hover:border-border"
                  title="Edit RTI"
                >
                  <PencilSimple className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-muted-foreground/10 rounded-lg text-muted-foreground transition-colors border border-transparent hover:border-border"
                  title="Copy Text"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-10 relative" id="rti-document-content">
              {isTranslating && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                    <Globe className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-foreground animate-pulse">{t('processing.steps')[3].text}</p>
                </div>
              )}
              {isEditing ? (
                <textarea 
                  value={rtiContent}
                  onChange={(e) => setRtiContent(e.target.value)}
                  className="w-full min-h-[500px] md:min-h-[600px] p-4 bg-muted/30 border border-primary/20 rounded-xl focus:outline-none font-mono text-sm leading-relaxed"
                />
              ) : (
                <pre className="whitespace-pre-wrap font-serif text-foreground text-sm md:text-lg leading-relaxed">{rtiContent}</pre>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full lg:w-96 flex flex-col gap-6 lg:sticky lg:top-24">
          <Card className="p-6 md:p-8 bg-primary/5 border-primary/10 rounded-2xl md:rounded-[32px]">
            <h3 className="font-black text-foreground mb-4 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> {t('result.detectedAuth')}
            </h3>
            <div className="p-4 bg-background rounded-2xl border border-primary/10 mb-6 group hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('result.confidence')}</span>
                <span className="text-xs font-black text-primary">{confidence}</span>
              </div>
              <p className="font-black text-foreground text-lg md:text-xl leading-tight">{pioOffice}</p>
              <div className="mt-5 space-y-2">
                <label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.1em]">Select Portal</label>
                <select 
                   value={selectedState}
                   onChange={(e) => setSelectedState(e.target.value)}
                   className="w-full bg-muted/50 border border-border rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                >
                  {STATES_LIST.map(s => (
                    <option key={s} value={s}>{getStateName(s, selectedLang)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* NEW: AI Mapping Proof Card */}
            {reasoning && (
              <div className="mb-6 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-primary/20 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">{t('result.mappingProof')}</h4>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-wider">Input Insight</p>
                    <p className="text-[10px] text-foreground font-medium italic line-clamp-2 leading-relaxed">"{originalComplaint}"</p>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-[8px] font-black text-primary uppercase tracking-wider mb-1">{t('result.reasoning')}</p>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{reasoning}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={handleDownloadPdf}
                className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 primary-glow group"
              >
                <DownloadSimple className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> {t('result.downloadBtn')}
              </button>
              {isOfflineOnly(selectedState) ? (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2 leading-relaxed">
                    <Info className="w-4 h-4 shrink-0" /> {t('result.ipoWarning')}
                  </p>
                </div>
              ) : (
                <Link 
                  href={stateData.portal} 
                  target="_blank"
                  className="w-full bg-foreground text-background font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all group"
                >
                  <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" /> {t('result.goToPortal').replace("{state}", getStateName(selectedState, selectedLang))} <ArrowSquareOut className="w-4 h-4" />
                </Link>
              )}
            </div>
          </Card>

          <Card className="p-6 border-dashed border-border bg-muted/20 rounded-2xl md:rounded-[32px]">
            <h3 className="font-black text-foreground mb-3 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
               <PaperPlaneRight className="w-4 h-4 text-primary" /> {t('result.directSubmission')}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {t('result.submissionDesc')}
              {stateData.isPartial && <span className="block mt-2 text-amber-500 font-bold text-[10px] uppercase tracking-wider">{t('result.partialWarning')}</span>}
            </p>
            <Link href="/" className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-2 transition-all">
              <ArrowLeft className="w-3 h-3" /> {t('result.startOver')}
            </Link>
          </Card>

          {/* New Section: Evidence Checklist */}
          {evidenceChecklist.length > 0 && (
            <Card className="p-6 md:p-8 bg-emerald-500/5 border-emerald-500/10 rounded-2xl md:rounded-[32px] animate-in slide-in-from-right-4 duration-500">
              <h3 className="font-black text-foreground mb-4 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> {t('result.evidenceChecklist')}
              </h3>
              <ul className="space-y-3">
                {evidenceChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="text-xs text-muted-foreground font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* New Section: Fee Guide */}
          <Card className="p-6 md:p-8 bg-blue-500/5 border-blue-500/10 rounded-2xl md:rounded-[32px] animate-in slide-in-from-right-4 duration-500 delay-100">
            <h3 className="font-black text-foreground mb-4 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" /> {t('result.feeGuide')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-500/10">
                <span className="text-[10px] font-black uppercase text-muted-foreground">{t('result.feeLabel')}</span>
                <Badge variant="success" className="bg-emerald-500 text-white border-none">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isOfflineOnly(selectedState) ? t('result.feeIpo') : t('result.feeOnline')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
