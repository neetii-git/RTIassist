"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, FileText, Download, Plus, Clock, ChevronRight, CheckCircle2, AlertCircle, FileSearch } from "lucide-react";
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
    <div className="container mx-auto px-4 max-w-5xl py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <FileSearch className="w-8 h-8 text-primary" /> {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Link 
          href="/input" 
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-all glowing-btn"
        >
          <Plus className="w-5 h-5" />
          {t.createNew}
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
          </div>

          <div className="grid gap-4">
            {rtiHistory.map((rti) => (
              <Card 
                key={rti.id} 
                onClick={() => setSelectedRti(rti.id)}
                className={cn(
                  "cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4",
                  selectedRti === rti.id ? "border-primary/50 bg-primary/5 shadow-md" : "hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl border shrink-0 transition-colors",
                    selectedRti === rti.id ? "bg-primary/10 border-primary/20" : "bg-muted border-border"
                  )}>
                    <FileText className={cn("w-6 h-6", selectedRti === rti.id ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-wider bg-muted-foreground/10 px-1.5 py-0.5 rounded">{rti.id}</span>
                      <Badge variant={rti.status === "Completed" ? "success" : rti.status === "Draft" ? "default" : "warning"} className="text-[10px] px-2 py-0">
                        {rti.status === "Completed" ? t.completed : rti.status === "Draft" ? t.draft : t.inProgress}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{rti.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {rti.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{rti.authority}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
                   <ChevronRight className={cn("w-5 h-5 transition-transform", selectedRti === rti.id ? "text-primary translate-x-1" : "text-muted-foreground/30")} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tracking Details Sidebar */}
        <div className="w-full lg:w-80">
          <Card className="sticky top-24 p-6 overflow-hidden">
            {selectedRti ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{t.details}</h3>
                    <p className="text-lg font-bold text-foreground leading-tight">
                      {rtiHistory.find(r => r.id === selectedRti)?.title}
                    </p>
                  </div>
                  <button onClick={() => setSelectedRti(null)} className="text-muted-foreground hover:text-foreground">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.authority}:</span>
                    <span className="font-semibold text-primary">{rtiHistory.find(r => r.id === selectedRti)?.authority}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.id}:</span>
                    <span className="font-mono text-foreground">{selectedRti}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.lastUpdated}:</span>
                    <span className="text-foreground">{rtiHistory.find(r => r.id === selectedRti)?.date}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-4 border border-border">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">{t.draftSnippet}</h4>
                  <p className="text-xs text-muted-foreground italic line-clamp-4">
                    "{t.dummySnippet}"
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.tracking}</h4>
                  <div className="space-y-6 relative ml-2">
                    {/* Progress Line */}
                    <div className="absolute left-0 top-2 w-[1px] h-full bg-border"></div>
                    
                    {rtiHistory.find(r => r.id === selectedRti)?.timeline.map((step, idx) => (
                      <div key={idx} className="relative pl-6 flex flex-col">
                        <div className={cn(
                          "absolute left-[-4px] top-1.5 w-2 h-2 rounded-full z-10",
                          step.completed ? "bg-primary primary-glow" : "bg-muted-foreground/30"
                        )}></div>
                        <span className={cn("text-sm font-bold", step.completed ? "text-foreground" : "text-muted-foreground")}>{step.event}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      const rti = rtiHistory.find(r => r.id === selectedRti);
                      if (rti) {
                        const exportContent = `${t.exportHeader}\n\n${t.id}: ${rti.id}\n${t.authority}: ${rti.authority}\n${t.lastUpdated}: ${rti.date}\n\n[Content]\n${t.dummySnippet}`;
                        exportToPdf(exportContent, `${selectedRti}.pdf`);
                      }
                    }}
                    className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" /> {t.exportPdf}
                  </button>
                  <Link 
                    href="/result"
                    className="w-full py-3 bg-card text-foreground text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-colors border border-border"
                  >
                    {t.viewFullDraft}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-muted p-4 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{t.selectPrompt}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
