"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Search, FileSignature, Mic, FileDown, MessageSquare, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/shared/LanguageProvider";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'te', name: 'తెలుగు' },
];

const TRANSLATIONS: Record<string, any> = {
  en: {
    heroTag: "Bharat RTI Assistant",
    title: "Democratizing Information for every Indian",
    description: "The next-generation RTI engine. Generate legally compliant applications and get instant support in 5+ Indian languages.",
    chooseLang: "Choose your language",
    fileRti: "File New RTI",
    askBot: "Ask Bharat Bot",
    covering: "Covering all 28 States & 8 UTs",
    howTitle: "Simplified for You",
    howDesc: "Turn grievances into legal documents in 3 clean steps.",
    step1: "1. Describe",
    step1Desc: "Share your grievance using voice or text in your native language.",
    step2: "2. Detect",
    step2Desc: "AI instantly maps your issue to the correct government department.",
    step3: "3. Draft",
    step3Desc: "Receive a formally structured RTI document ready for submission.",
    feat1: "AI Precision",
    feat1Desc: "Legal-grade AI drafting.",
    feat2: "Smart Search",
    feat2Desc: "40k+ Departments indexed.",
    feat3: "Voice First",
    feat3Desc: "Continuous speech recog.",
    feat4: "Easy Export",
    feat4Desc: "PDF & TXT formats ready.",
    highlightWord: "Information"
  },
  hi: {
    heroTag: "भारत आरटीआई सहायक",
    title: "हर भारतीय के लिए सूचना का लोकतंत्रीकरण",
    description: "अगली पीढ़ी का आरटीआई इंजन। कानूनी रूप से अनुपालन करने वाले आवेदन उत्पन्न करें और 5+ भारतीय भाषाओं में तुरंत सहायता प्राप्त करें।",
    chooseLang: "अपनी भाषा चुनें",
    fileRti: "नई आरटीआई फाइल करें",
    askBot: "भारत बॉट से पूछें",
    covering: "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों को कवर करना",
    howTitle: "आपके लिए सरल",
    howDesc: "शिकायतों को 3 स्पष्ट चरणों में कानूनी दस्तावेजों में बदलें।",
    step1: "1. वर्णन करें",
    step1Desc: "अपनी मातृभाषा में आवाज या पाठ का उपयोग करके अपनी शिकायत साझा करें।",
    step2: "2. पहचानें",
    step2Desc: "AI तुरंत आपकी समस्या को सही सरकारी विभाग से जोड़ता है।",
    step3: "3. प्रारूप",
    step3Desc: "नियत कानूनी प्रारूप में आरटीआई दस्तावेज प्राप्त करें।",
    feat1: "एआई परिशुद्धता",
    feat1Desc: "कानूनी स्तर का ड्राफ्टिंग।",
    feat2: "स्मार्ट खोज",
    feat2Desc: "40,000+ विभाग इंडेक्स किए गए।",
    feat3: "वॉयस फर्स्ट",
    feat3Desc: "निरंतर भाषण पहचान।",
    feat4: "आसान निर्यात",
    feat4Desc: "पीडीएफ और टेक्स्ट तैयार।",
    highlightWord: "सूचना"
  },
  ta: {
    heroTag: "பாரத் ஆர்டிஐ உதவியாளர்",
    title: "ஒவ்வொரு இந்தியருக்கும் தகவல்களை மக்களாக்குதல்",
    description: "அடுத்த தலைமுறை ஆர்டிஐ எஞ்சின். சட்டப்படி இணக்கமான விண்ணப்பங்களை உருவாக்கி, 5+ இந்திய மொழிகளில் உடனடி ஆதரவைப் பெறுங்கள்.",
    chooseLang: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    fileRti: "புதிய ஆர்டிஐ தாக்கல் செய்யுங்கள்",
    askBot: "பாரத் பாட்டிடம் கேளுங்கள்",
    covering: "அனைத்து 28 மாநிலங்கள் மற்றும் 8 யூனியன் பிரதேசங்களை உள்ளடக்கியது",
    howTitle: "உங்களுக்காக எளிமைப்படுத்தப்பட்டது",
    howDesc: "குறைகளை 3 படிகளில் சட்ட ஆவணங்களாக மாற்றவும்.",
    step1: "1. விவரிக்கவும்",
    step1Desc: "உங்கள் தாய்மொழியில் குரல் அல்லது உரையைப் பயன்படுத்தி உங்கள் குறையைப் பகிரவும்.",
    step2: "2. கண்டறியவும்",
    step2Desc: "AI உடனடி உங்கள் சிக்கலைச் சரியான அரசுத் துறையுடன் இணைக்கிறது.",
    step3: "3. வரைவு",
    step3Desc: "சமர்ப்பிக்கத் தயாராக உள்ள முறையான சட்ட ஆவணத்தைப் பெறுங்கள்.",
    feat1: "AI துல்லியம்",
    feat1Desc: "சட்ட அளவிலான வரைவு.",
    feat2: "ஸ்மார்ட் தேடல்",
    feat2Desc: "40,000+ துறைகள்.",
    feat3: "குரல் முதல்",
    feat3Desc: "தொடர்ச்சியான பேச்சு அங்கீகாரம்.",
    feat4: "எளிதான ஏற்றுமதி",
    feat4Desc: "PDF & TXT தயார்.",
    highlightWord: "தகவல்களை"
  },
  kn: {
    heroTag: "ಭಾರತ್ ಆರ್ ಟಿ ಐ ಸಹಾಯಕ",
    title: "ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯನಿಗೂ ಮಾಹಿತಿಯ ಪ್ರಜಾಪ್ರಭುತ್ವೀಕರಣ",
    description: "ಮುಂದಿನ ಪೀಳಿಗೆಯ ಆರ್ ಟಿ ಐ ಇಂಜಿನ್. ಕಾನೂನುಬದ್ಧವಾಗಿ ಅಪ್ಲಿಕೇಶನ್ ಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು 5+ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ತಕ್ಷಣದ ಬೆಂಬಲ ಪಡೆಯಿರಿ.",
    chooseLang: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    fileRti: "ಹೊಸ ಆರ್ ಟಿ ಐ ಸಲ್ಲಿಸಿ",
    askBot: "ಭಾರತ್ ಬೋಟ್ ಕೇಳಿ",
    covering: "ಎಲ್ಲಾ 28 ರಾಜ್ಯಗಳು ಮತ್ತು 8 ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳನ್ನು ಒಳಗೊಂಡಿದೆ",
    howTitle: "ನಿಮಗಾಗಿ ಸರಳೀಕರಿಸಲಾಗಿದೆ",
    howDesc: "ದೂರುಗಳನ್ನು 3 ಹಂತಗಳಲ್ಲಿ ಕಾನೂನು ದಾಖಲೆಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ.",
    step1: "1. ವಿವರಿಸಿ",
    step1Desc: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿ ಅಥವಾ ಪಠ್ಯವನ್ನು ಬಳಸಿ ನಿಮ್ಮ ದೂರನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    step2: "2. ಪತ್ತೆಹಚ್ಚಿ",
    step2Desc: "AI ತಕ್ಷಣವೇ ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಸರಿಯಾದ ಸರ್ಕಾರಿ ಇಲಾಖೆಗೆ ನಕ್ಷೆ ಮಾಡುತ್ತದೆ.",
    step3: "3. ಕರಡು",
    step3Desc: "ಸಲ್ಲಿಸಲು ಸಿದ್ಧವಾಗಿರುವ ಔಪಚಾರಿಕ ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಸ್ವೀಕರಿಸಿ.",
    feat1: "AI ನಿಖರತೆ",
    feat1Desc: "ಕಾನೂನು ಮಟ್ಟದ ಕರಡು ತಯಾರಿಕೆ.",
    feat2: "ಸ್ಮಾರ್ಟ್ ಹುಡುಕಾಟ",
    feat2Desc: "40,000+ ಇಲಾಖೆಗಳು.",
    feat3: "ಧ್ವನಿ ಮೊದಲು",
    feat3Desc: "ನಿರಂತರ ಭಾಷಣ ಗುರುತಿಸುವಿಕೆ.",
    feat4: "ಸುಲಭ ರಫ್ತು",
    feat4Desc: "PDF ಮತ್ತು TXT ಸಿದ್ಧವಾಗಿದೆ.",
    highlightWord: "ಮಾಹಿತಿಯ"
  },
  te: {
    heroTag: "భారత్ ఆర్‌టిఐ అసిస్టెంట్",
    title: "ప్రతి భారతీయుడికి సమాచార ప్రజాస్వామ్యీకరణ",
    description: "తదుపరి తరం ఆర్‌టిఐ ఇంజిన్. చట్టబద్ధంగా దరఖాస్తులను రూపొందించండి మరియు 5+ భారతీయ భాషలలో తక్షణ మద్దతు పొందండి.",
    chooseLang: "మీ భాషను ఎంచుకోండి",
    fileRti: "కొత్త ఆర్‌టిఐ ఫైల్ చేయండి",
    askBot: "భారత్ బాట్‌ను అడగండి",
    covering: "అన్ని 28 రాష్ట్రాలు & 8 కేంద్రపాలిత ప్రాంతాలను కవర్ చేస్తుంది",
    howTitle: "మీ కోసం సరళీకరించబడింది",
    howDesc: "ఫిర్యాదులను 3 దశల్లో చట్టపరమైన పత్రాలుగా మార్చండి.",
    step1: "1. వివరించండి",
    step1Desc: "మీ మాతృభాషలో వాయిస్ లేదా టెక్స్ట్ ఉపయోగించి మీ ఫిర్యాదును పంచుకోండి.",
    step2: "2. గుర్తించండి",
    step2Desc: "AI తక్షణమే మీ సమస్యను సరైన ప్రభుత్వ విభాగానికి మ్యాప్ చేస్తుంది.",
    step3: "3. డ్రాఫ్ట్",
    step3Desc: "సమర్పించడానికి సిద్ధంగా ఉన్న అధికారిక చట్టపరమైన పత్రాన్ని పొందండి.",
    feat1: "AI ఖచ్చితత్వం",
    feat1Desc: "చట్టపరమైన స్థాయి డ్రాఫ్టింగ్.",
    feat2: "స్మార్ట్ సెర్చ్",
    feat2Desc: "40,000+ విభాగాలు.",
    feat3: "వాయిస్ ఫస్ట్",
    feat3Desc: "నిరంతర ప్రసంగ గుర్తింపు.",
    feat4: "సులభమైన ఎగుమతి",
    feat4Desc: "PDF & TXT సిద్ధంగా ఉంది.",
    highlightWord: "సమాచార"
  }
};

export default function Home() {
  const { language: selectedLang, setLanguage: setSelectedLang } = useLanguage();

  const getTitleSize = (lang: string) => {
    switch (lang) {
      case 'ta':
      case 'te':
      case 'kn':
        return "text-3xl md:text-4xl xl:text-5xl"; // Slightly smaller for Dravidian scripts
      case 'hi':
        return "text-4xl md:text-5xl xl:text-6xl";
      default:
        return "text-4xl md:text-5xl xl:text-6xl";
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

  const t = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 overflow-hidden relative">
      {/* Background Motifs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 border-[40px] border-primary rounded-full" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 border-[40px] border-primary rounded-full" />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 max-w-6xl relative z-10"
      >
        <div className="bg-card/30 backdrop-blur-md rounded-[3rem] border border-border/50 p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-primary/5 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.heroTag}
              </motion.div>
              
               <motion.h1 variants={itemVariants} className={cn("font-black tracking-tighter text-foreground !leading-[1.1] text-balance", getTitleSize(selectedLang))}>
                {t.title.split(t.highlightWord).map((part: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-primary">{t.highlightWord}</span>
                    )}
                  </span>
                ))}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground max-w-xl tracking-tight font-medium">
                {t.description}
              </motion.p>
              
              {/* Language Selection */}
              <motion.div variants={itemVariants} className="pt-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">{t.chooseLang}</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code as any)}
                      className={cn(
                        "px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 border-2",
                        selectedLang === lang.code 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                          : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
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
                  className="group flex items-center gap-3 bg-primary text-white font-black text-base px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all primary-glow hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden relative shadow-xl shadow-primary/20"
                >
                  <FileSignature className="w-5 h-5" />
                  {t.fileRti} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href={`/chatbot?lang=${selectedLang}`} 
                  className="flex items-center gap-3 bg-card text-foreground border border-border font-bold text-base px-8 py-4 rounded-2xl hover:bg-muted transition-all shadow-lg hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <MessageSquare className="w-5 h-5 text-primary" />
                  {t.askBot}
                </Link>
              </motion.div>
            </div>

            {/* Right: India Map Image */}
            <motion.div 
              variants={itemVariants}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative p-2 bg-background/50 backdrop-blur-sm rounded-[2.5rem] border border-border shadow-2xl">
                <Image
                  src="/images/image.png"
                  alt="Map of India"
                  width={420}
                  height={500}
                  className="rounded-[2rem] object-contain drop-shadow-2xl dark:brightness-95 dark:contrast-105"
                  priority
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border px-6 py-2 rounded-full shadow-lg text-[10px] font-bold text-foreground whitespace-nowrap">
                  🇮🇳 {t.covering}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="container mx-auto px-4 max-w-6xl mt-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">{t.howTitle}</h2>
          <p className="text-muted-foreground text-xl font-medium">{t.howDesc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: Mic, title: t.step1, desc: t.step1Desc },
            { icon: Search, title: t.step2, desc: t.step2Desc },
            { icon: FileSignature, title: t.step3, desc: t.step3Desc }
          ].map((step, i) => (
            <Card key={i} className="flex flex-col items-center text-center p-10 bg-card border-border group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-xl">
              <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary/10 group-hover:rotate-6 transition-all duration-500">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 max-w-6xl mt-32 mb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Bot, title: t.feat1, desc: t.feat1Desc },
            { icon: Search, title: t.feat2, desc: t.feat2Desc },
            { icon: Mic, title: t.feat3, desc: t.feat3Desc },
            { icon: FileDown, title: t.feat4, desc: t.feat4Desc }
          ].map((feat, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-[1.5rem] shadow-sm flex flex-col gap-4 hover:border-primary/30 transition-colors">
              <div className="p-2 bg-primary/10 w-fit rounded-lg">
                <feat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-black text-foreground text-base mb-1">{feat.title}</h4>
                <p className="text-xs text-muted-foreground font-medium">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
