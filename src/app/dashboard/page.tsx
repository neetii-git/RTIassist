"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, FileText, Download, Plus, Clock, ChevronRight, CheckCircle2, AlertCircle, FileSearch, X, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStateName } from "@/lib/states";
import { exportToPdf } from "@/lib/pdf-utils";

// Types
interface TimelineStep {
  date: string;
  event: string;
  completed: boolean;
}

interface RtiHistoryItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  status: "Completed" | "In Progress" | "Draft";
  timeline: TimelineStep[];
}

// Mock Data
const DASHBOARD_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Application Dashboard",
    subtitle: "Track and manage your generated Right to Information applications.",
    createNew: "Create New RTI",
    searchPlaceholder: "Search by ID or title...",
    completed: "Completed",
    inProgress: "In Progress",
    draft: "Draft",
    details: "Details",
    authority: "Authority",
    id: "ID",
    lastUpdated: "Last Updated",
    draftSnippet: "Draft Snippet",
    tracking: "Application Tracking",
    exportPdf: "Export PDF",
    viewFullDraft: "View Full Draft",
    selectPrompt: "Select an application to view tracking details.",
    dummySnippet: "I wish to seek information regarding the delay in road repair and maintenance in the aforementioned locality. Kindly provide details on sanctioned funds and contractors assigned...",
    exportHeader: "RTI Application Draft"
  },
  hi: {
    title: "आवेदन डैशबोर्ड",
    subtitle: "अपने जनरेट किए गए सूचना का अधिकार आवेदनों को ट्रैक और प्रबंधित करें।",
    createNew: "नया आरटीआई बनाएं",
    searchPlaceholder: "आईडी या शीर्षक से खोजें...",
    completed: "पूर्ण",
    inProgress: "प्रगति में",
    draft: "ड्राफ्ट",
    details: "विवरण",
    authority: "प्राधिकरण",
    id: "आईडी",
    lastUpdated: "अंतिम अपडेट",
    draftSnippet: "ड्राफ्ट स्निपेट",
    tracking: "आवेदन ट्रैकिंग",
    exportPdf: "पीडीएफ निर्यात करें",
    viewFullDraft: "पूरा ड्राफ्ट देखें",
    selectPrompt: "ट्रैकिंग विवरण देखने के लिए एक आवेदन चुनें।",
    dummySnippet: "मैं उपरोक्त क्षेत्र में सड़क मरम्मत और रखरखाव में देरी के संबंध में जानकारी प्राप्त करना चाहता हूं। कृपया स्वीकृत धन और नियुक्त ठेकेदारों का विवरण प्रदान करें...",
    exportHeader: "आरटीआई आवेदन ड्राफ्ट"
  },
  ta: {
    title: "விண்ணப்ப டாஷ்போர்டு",
    subtitle: "உங்களது உருவாக்கப்பட்ட தகவல் அறியும் உரிமை விண்ணப்பங்களைக் கண்காணித்து நிர்வகிக்கவும்.",
    createNew: "புதிய ஆர்டிஐ உருவாக்கு",
    searchPlaceholder: "ID அல்லது தலைப்பு மூலம் தேடுங்கள்...",
    completed: "முடிந்தது",
    inProgress: "செயலில் உள்ளது",
    draft: "வரைவு",
    details: "விவரங்கள்",
    authority: "அதிகாரம்",
    id: "ID",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    draftSnippet: "வரைவு துணுக்கு",
    tracking: "விண்ணப்பக் கண்காணிப்பு",
    exportPdf: "PDF ஏற்றுமதி செய்",
    viewFullDraft: "முழு வரைவையும் காண்க",
    selectPrompt: "கண்காணிப்பு விவரங்களைக் காண ஒரு விண்ணப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    dummySnippet: "மேற்கூறிய பகுதியில் சாலை பழுதுபார்ப்பு மற்றும் பராமரிப்பில் ஏற்பட்டுள்ள தாமதம் குறித்து தகவல் அறிய விரும்புகிறேன். அனுமதிக்கப்பட்ட நிதி மற்றும் ஒதுக்கப்பட்ட ஒப்பந்ததாரர்களின் விவரங்களை வழங்கவும்...",
    exportHeader: "ஆர்டிஐ விண்ணப்ப வரைவு"
  },
  kn: {
    title: "ಅರ್ಜಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    subtitle: "ನಿಮ್ಮ ರಚಿಸಲಾದ ಮಾಹಿತಿ ಹಕ್ಕು ಅರ್ಜಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
    createNew: "ಹೊಸ ಆರ್ ಟಿ ಐ ರಚಿಸಿ",
    searchPlaceholder: "ID ಅಥವಾ ಶೀರ್ಷಿಕೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    draft: "ಕರಡು",
    details: "ವಿವರಗಳು",
    authority: "ಪ್ರಾಧಿಕಾರ",
    id: "ID",
    lastUpdated: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    draftSnippet: "ಕರಡು ತುಣುಕು",
    tracking: "ಅರ್ಜಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    exportPdf: "PDF ರಫ್ತು ಮಾಡಿ",
    viewFullDraft: "ಪೂರ್ಣ ಕರಡು ವೀಕ್ಷಿಸಿ",
    selectPrompt: "ಟ್ರ್ಯಾಕಿಂಗ್ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಅರ್ಜಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    dummySnippet: "ಮೇಲೆ ತಿಳಿಸಲಾದ ಪ್ರದೇಶದಲ್ಲಿ ರಸ್ತೆ ದುರಸ್ತಿ ಮತ್ತು ನಿರ್ವಹಣೆಯಲ್ಲಿನ ವಿಳಂಬಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು ನಾನು ಪಡೆಯಲು ಬಯಸುತ್ತೇನೆ. ಮಂಜೂರಾದ ಹಣ ಮತ್ತು ನಿಯೋಜಿಸಲಾದ ಗುತ್ತಿಗೆದಾರರ ವಿವರಗಳನ್ನು ದಯವಿಟ್ಟು ನೀಡಿ...",
    exportHeader: "ಆರ್ ಟಿ ಐ ಅರ್ಜಿ ಕರಡು"
  },
  te: {
    title: "అప్లికేషన్ డాష్‌బోర్డ్",
    subtitle: "మీరు రూపొందించిన సమాచార హక్కు దరఖాస్తులను ట్రాక్ చేయండి మరియు నిర్వహించండి.",
    createNew: "కొత్త ఆర్‌టిఐని సృష్టించండి",
    searchPlaceholder: "ID లేదా శీర్షిక ద్వారా వెతకండి...",
    completed: "పూర్తయింది",
    inProgress: "ప్రగతిలో ఉంది",
    draft: "డ్రాఫ్ట్",
    details: "వివరాలు",
    authority: "అథారిటీ",
    id: "ID",
    lastUpdated: "చివరిగా అప్‌డేట్ చేయబడింది",
    draftSnippet: "డ్రాఫ్ట్ స్నిప్పెట్",
    tracking: "అప్లికేషన్ ట్రాకింగ్",
    exportPdf: "PDF ఎగుమతి చేయండి",
    viewFullDraft: "పూర్తి డ్రాఫ్ట్‌ను చూడండి",
    selectPrompt: "ట్రాకింగ్ వివరాలను చూడటానికి ఒక అప్లికేషన్‌ను ఎంచుకోండి.",
    dummySnippet: "పైన పేర్కొన్న ప్రాంతంలో రోడ్డు మరమ్మత్తు మరియు నిర్వహణలో జాప్యానికి సంబంధించిన సమాచారాన్ని నేను పొందాలనుకుంటున్నాను. మంజూరైన నిధులు మరియు కేటాయించిన కాంట్రాక్టర్ల వివరాలను దయచేసి అందించండి...",
    exportHeader: "ఆర్‌టిఐ దరఖాస్తు డ్రాఫ్ట్"
  }
};

const getRtiHistory = (lang: string): RtiHistoryItem[] => {
  const data: Record<string, RtiHistoryItem[]> = {
    en: [
      {
        id: "RTI-2023-892",
        title: "Delay in road repair in Block C",
        authority: "Public Works Department",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "Draft Generated", completed: true },
          { date: "Nov 4, 2023", event: "Submitted to Portal", completed: true },
          { date: "Nov 15, 2023", event: "Response Received", completed: true },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "Details of uncollected garbage tenders",
        authority: "Municipal Corporation",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "Draft Generated", completed: true },
          { date: "Oct 18, 2023", event: "Submitted to Portal", completed: true },
          { date: "Waiting", event: "Department Response", completed: false },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "Pending property tax assessment",
        authority: "Revenue Department",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "Draft Generated", completed: true },
          { date: "-", event: "Submission Pending", completed: false },
        ]
      }
    ],
    hi: [
      {
        id: "RTI-2023-892",
        title: "ब्लॉक सी में सड़क मरम्मत में देरी",
        authority: "लोक निर्माण विभाग",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "ड्राफ्ट जनरेट हुआ", completed: true },
          { date: "Nov 4, 2023", event: "पोर्टल पर जमा किया गया", completed: true },
          { date: "Nov 15, 2023", event: "प्रतिक्रिया प्राप्त हुई", completed: true },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "असंग्रहित कचरा निविदाओं का विवरण",
        authority: "नगर निगम",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "ड्राफ्ट जनरेट हुआ", completed: true },
          { date: "Oct 18, 2023", event: "पोर्टल पर जमा किया गया", completed: true },
          { date: "Waiting", event: "विभागीय प्रतिक्रिया", completed: false },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "लंबित संपत्ति कर मूल्यांकन",
        authority: "राजस्व विभाग",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "ड्राफ्ट जनरेट हुआ", completed: true },
          { date: "-", event: "प्रस्तुतीकरण लंबित", completed: false },
        ]
      }
    ],
    ta: [
      {
        id: "RTI-2023-892",
        title: "பிளாக் சி-யில் சாலை பழுதுபார்ப்பதில் தாமதம்",
        authority: "பொதுப்பணித் துறை",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "வரைவு உருவாக்கப்பட்டது", completed: true },
          { date: "Nov 4, 2023", event: "போர்ட்டலில் சமர்ப்பிக்கப்பட்டது", completed: true },
          { date: "Nov 15, 2023", event: "பதில் பெறப்பட்டது", completed: true },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "சேகரிக்கப்படாத குப்பை டெண்டர்களின் விவரங்கள்",
        authority: "மாநகராட்சி",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "வரைவு உருவாக்கப்பட்டது", completed: true },
          { date: "Oct 18, 2023", event: "போர்ட்டலில் சமர்ப்பிக்கப்பட்டது", completed: true },
          { date: "Waiting", event: "துறை பதில்", completed: false },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "நிலுவையில் உள்ள சொத்து வரி மதிப்பீடு",
        authority: "வருவாய் துறை",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "வரைவு உருவாக்கப்பட்டது", completed: true },
          { date: "-", event: "சமர்ப்பிப்பு நிலுவையில் உள்ளது", completed: false },
        ]
      }
    ],
    kn: [
      {
        id: "RTI-2023-892",
        title: "ಬ್ಲಾಕ್ ಸಿ ನಲ್ಲಿ ರಸ್ತೆ ದುರಸ್ತಿ ವಿಳಂಬ",
        authority: "ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "ಕರಡು ರಚಿಸಲಾಗಿದೆ", completed: true },
          { date: "Nov 4, 2023", event: "ಪೋರ್ಟಲ್‌ಗೆ ಸಲ್ಲಿಸಲಾಗಿದೆ", completed: true },
          { date: "Nov 15, 2023", event: "ಪ್ರತಿಕ್ರಿಯೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ", completed: true },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "ಸಂಗ್ರಹಿಸದ ಕಸದ ಟೆಂಡರ್‌ಗಳ ವಿವರಗಳು",
        authority: "ಮಹಾನಗರ ಪಾಲಿಕೆ",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "ಕರಡು ರಚಿಸಲಾಗಿದೆ", completed: true },
          { date: "Oct 18, 2023", event: "ಪೋರ್ಟಲ್‌ಗೆ ಸಲ್ಲಿಸಲಾಗಿದೆ", completed: true },
          { date: "Waiting", event: "ಇಲಾಖೆಯ ಪ್ರತಿಕ್ರಿಯೆ", completed: false },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "ಬಾಕಿ ಉಳಿದಿರುವ ಆಸ್ತಿ ತೆರಿಗೆ ಮೌಲ್ಯಮಾಪನ",
        authority: "ಕಂದಾಯ ಇಲಾಖೆ",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "ಕರಡು ರಚಿಸಲಾಗಿದೆ", completed: true },
          { date: "-", event: "ಸಲ್ಲಿಕೆ ಬಾಕಿ ಇದೆ", completed: false },
        ]
      }
    ],
    te: [
      {
        id: "RTI-2023-892",
        title: "బ్లాక్ సి లో రోడ్డు మరమ్మత్తులో జాప్యం",
        authority: "రోడ్లు మరియు భవనాల శాఖ",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "డ్రాఫ్ట్ రూపొందించబడింది", completed: true },
          { date: "Nov 4, 2023", event: "పోర్టల్‌కు సమర్పించబడింది", completed: true },
          { date: "Nov 15, 2023", event: "ప్రతిస్పందన వచ్చింది", completed: true },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "సేకరించని చెత్త టెండర్ల వివరాలు",
        authority: "మునిసిపల్ కార్పొరేషన్",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "డ్రాఫ్ట్ రూపొందించబడింది", completed: true },
          { date: "Oct 18, 2023", event: "పోర్టల్‌కు సమర్పించబడింది", completed: true },
          { date: "Waiting", event: "డిపార్ట్‌మెంట్ స్పందన", completed: false },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "పెండింగ్‌లో ఉన్న ఆస్తి పన్ను అంచనా",
        authority: "రెవెన్యూ శాఖ",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "డ్రాఫ్ట్ రూపొందించబడింది", completed: true },
          { date: "-", event: "సమర్పణ పెండింగ్‌లో ఉంది", completed: false },
        ]
      }
    ]
  };
  return data[lang] || data['en'];
};

import { useLanguage } from "@/components/shared/LanguageProvider";

export default function DashboardPage() {
  const { language } = useLanguage();
  const [selectedRti, setSelectedRti] = useState<string | null>(null);

  const t = DASHBOARD_TRANSLATIONS[language] || DASHBOARD_TRANSLATIONS.en;
  const rtiHistory = getRtiHistory(language);

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-foreground flex items-center gap-3 tracking-tight">
            <FileSearch className="w-8 h-8 md:w-10 md:h-10 text-primary" /> {t.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-medium">{t.subtitle}</p>
        </div>
        <Link 
          href="/input" 
          className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-primary/90 transition-all primary-glow w-full md:w-auto justify-center shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          {t.createNew}
        </Link>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        <div className="w-full lg:col-span-8 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>

          <div className="grid gap-4">
            {rtiHistory.map((rti) => (
              <Card 
                key={rti.id} 
                onClick={() => {
                  setSelectedRti(rti.id);
                  // On mobile, scroll to details
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
                      <span className="text-[10px] font-black font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/10 tracking-widest uppercase">{rti.id}</span>
                      <div className={cn(
                        "text-[10px] font-black px-3 py-0.5 rounded-lg uppercase tracking-wider",
                        rti.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : 
                        rti.status === "Draft" ? "bg-blue-500/10 text-blue-500" : 
                        "bg-amber-500/10 text-amber-500"
                      )}>
                        {rti.status === "Completed" ? t.completed : rti.status === "Draft" ? t.draft : t.inProgress}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-foreground transition-colors leading-tight">{rti.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/60" /> {rti.date}</span>
                      <span className="hidden sm:inline opacity-30">•</span>
                      <span className="flex items-center gap-1.5"><Badge className="text-[10px] bg-muted/50 text-muted-foreground">{rti.authority}</Badge></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
                   <div className={cn(
                     "p-2 rounded-full transition-all duration-300",
                     selectedRti === rti.id ? "bg-primary text-white rotate-90" : "bg-muted text-muted-foreground/30 group-hover:bg-primary/10 group-hover:text-primary"
                   )}>
                     <ChevronRight className="w-5 h-5" />
                   </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tracking Details Sidebar */}
        <div id="tracking-details" className="w-full lg:col-span-4 lg:sticky lg:top-24 scroll-mt-24">
          <Card className="p-8 border-2 border-border shadow-2xl rounded-[2.5rem] bg-card/50 backdrop-blur-xl relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {selectedRti ? (
              <div className="space-y-8 relative">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t.details}</h3>
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
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t.authority}</span>
                    <span className="font-black text-primary text-right">{rtiHistory.find(r => r.id === selectedRti)?.authority}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t.id}</span>
                    <span className="font-black font-mono text-foreground">{selectedRti}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">{t.lastUpdated}</span>
                    <span className="font-black text-foreground">{rtiHistory.find(r => r.id === selectedRti)?.date}</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 relative">
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">{t.draftSnippet}</h4>
                  <p className="text-sm text-foreground/80 italic font-medium leading-relaxed line-clamp-4">
                    "{t.dummySnippet}"
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    {t.tracking}
                  </h4>
                  <div className="space-y-8 relative ml-3">
                    {/* Progress Line */}
                    <div className="absolute left-[3.5px] top-2 w-[1.5px] h-[calc(100%-16px)] bg-border"></div>
                    
                    {rtiHistory.find(r => r.id === selectedRti)?.timeline.map((step, idx) => (
                      <div key={idx} className="relative pl-8 flex flex-col gap-1">
                        <div className={cn(
                          "absolute left-[-2.5px] top-1.5 w-3.5 h-3.5 rounded-full z-10 border-2 border-card transition-all duration-500",
                          step.completed ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] scale-110" : "bg-muted-foreground/30"
                        )}></div>
                        <span className={cn("text-sm font-black tracking-tight", step.completed ? "text-foreground" : "text-muted-foreground")}>{step.event}</span>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      const rti = rtiHistory.find(r => r.id === selectedRti);
                      if (rti) {
                        const exportContent = `${t.exportHeader}\n\n${t.id}: ${rti.id}\n${t.authority}: ${rti.authority}\n${t.lastUpdated}: ${rti.date}\n\n[Content]\n${t.dummySnippet}`;
                        exportToPdf(exportContent, `${selectedRti}.pdf`);
                      }
                    }}
                    className="w-full py-4 bg-primary text-white text-base font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all primary-glow shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" /> {t.exportPdf}
                  </button>
                  <Link 
                    href="/result"
                    className="w-full py-4 bg-transparent text-foreground text-sm font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-muted transition-all border-2 border-border hover:border-primary/30"
                  >
                    {t.viewFullDraft}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-primary/5 p-6 rounded-[2rem] w-fit mx-auto mb-6 border border-primary/10">
                  <FileText className="w-10 h-10 text-primary/30" />
                </div>
                <p className="text-base text-muted-foreground font-black tracking-tight leading-snug px-4 italic opacity-60">{t.selectPrompt}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
