"use client";

import React from "react";
import { 
  ArrowLeft, 
  Map, 
  Mail, 
  Landmark, 
  FileText, 
  ShieldCheck, 
  Info,
  Phone,
  Clock,
  ExternalLink,
  Navigation
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/components/shared/LanguageProvider";

const OFFLINE_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Offline & Rural RTI Guide",
    subtitle: "A comprehensive guide for citizens in areas with low connectivity and rural landscapes.",
    back: "Back to Dashboard",
    coreConcept: "Disconnected but Empowered",
    coreDesc: "A physical RTI application is more powerful than a digital one in local panchayats. Use this guide to navigate the physical filing process.",
    stepsTitle: "The Physical Filing Process",
    badge: "Deep Rural Inclusion",
    table: { officer: "Officer", area: "Area" },
    badges: ["Universal Filing", "Free Post Delivery"],
    steps: [
      { 
        title: "Drafting", 
        desc: "Write your application on a plain A4 paper in any language. Clearly state it's under RTI Act 2005.",
        icon: <FileText className="w-5 h-5" />
      },
      { 
        title: "Fee Payment", 
        desc: "Buy a ₹10 IPO (Indian Postal Order) or Court Fee Stamp. Mention 'PIO' as the payee.",
        icon: <Landmark className="w-5 h-5" />
      },
      { 
        title: "Submission", 
        desc: "Hand deliver to the Panchayat Secretary or send via Registered Post from the local Post Office.",
        icon: <Mail className="w-5 h-5" />
      }
    ],
    ruralFocus: "Focus: Rural Empowerment",
    ruralItems: [
      { title: "Village Assets", desc: "Request layouts of village roads, lighting contracts, and drain cleaning schedules." },
      { title: "Scholarships", desc: "Check disbursement status for village school children and widow pensions." },
      { title: "Land Records", desc: "Mutation (Dakhil-Kharij) delays can be resolved by asking for 'Certified Status'." }
    ],
    contacts: "Essential Village Contacts",
    contactRoles: [
      { role: "Panchayat Secretary", level: "Gram Panchayat", jurisdiction: "Village development & Housing" },
      { role: "BDO (Block Dev. Officer)", level: "Block Level", jurisdiction: "Schemes like MGNREGA & PDS" },
      { role: "Naib Tehsildar", level: "Circle Level", jurisdiction: "Revenue and Land disputes" }
    ],
    noNetTip: "Pro-Tip: No Internet?",
    noNetDesc: "Your local Post Office is a 'Designated Assistant PIO'. They must take your application for FREE and send it to any central office."
  },
  hi: {
    title: "ऑफ़लाइन और ग्रामीण आरटीआई गाइड",
    subtitle: "कम कनेक्टिविटी वाले क्षेत्रों और ग्रामीण परिदृश्य वाले नागरिकों के लिए एक व्यापक मार्गदर्शिका।",
    back: "डैशबोर्ड पर वापस जाएं",
    coreConcept: "डिस्कनेक्टेड लेकिन सशक्त",
    coreDesc: "स्थानीय पंचायतों में डिजिटल की तुलना में भौतिक आरटीआई आवेदन अधिक शक्तिशाली होता है। भौतिक फाइलिंग प्रक्रिया को नेविगेट करने के लिए इस गाइड का उपयोग करें।",
    stepsTitle: "तैयार और जमा करने की प्रक्रिया",
    badge: "गहरी ग्रामीण पहुंच",
    table: { officer: "अधिकारी", area: "क्षेत्र" },
    badges: ["सार्वभौमिक फाइलिंग", "मुफ्त डाक वितरण"],
    steps: [
      { 
        title: "लेखन", 
        desc: "सादे कागज पर किसी भी भाषा में आवेदन लिखें। स्पष्ट रूप से उल्लेख करें कि यह आरटीआई अधिनियम 2005 के तहत है।",
        icon: <FileText className="w-5 h-5" />
      },
      { 
        title: "शुल्क भुगतान", 
        desc: "डाकघर से ₹10 का आईपीओ (IPO) या कोर्ट फीस स्टाम्प खरीदें। 'PIO' को प्राप्तकर्ता के रूप में उल्लेख करें।",
        icon: <Landmark className="w-5 h-5" />
      },
      { 
        title: "जमा करना", 
        desc: "पंचायत सचिव को स्वयं दें या स्थानीय डाकघर से पंजीकृत डाक (Registered Post) द्वारा भेजें।",
        icon: <Mail className="w-5 h-5" />
      }
    ],
    ruralFocus: "फोकस: ग्रामीण सशक्तिकरण",
    ruralItems: [
      { title: "ग्राम संपत्ति", desc: "गांव की सड़कों के लेआउट, प्रकाश व्यवस्था और नालियों की सफाई के रिकॉर्ड मांगें।" },
      { title: "छात्रवृत्ति", desc: "गांव के स्कूली बच्चों और विधवा पेंशन के वितरण की स्थिति की जांच करें।" },
      { title: "भूमि रिकॉर्ड", desc: "दाखिल-खारिज में देरी को 'प्रमाणित स्थिति' मांगकर हल किया जा सकता है।" }
    ],
    contacts: "आवश्यक ग्राम संपर्क",
    contactRoles: [
      { role: "पंचायत सचिव", level: "ग्राम पंचायत", jurisdiction: "ग्राम विकास और आवास" },
      { role: "BDO (विकास अधिकारी)", level: "ब्लॉक स्तर", jurisdiction: "मनरेगा और राशन जैसी योजनाएं" },
      { role: "नायब तहसीलदार", level: "सर्कल स्तर", jurisdiction: "राजस्व और भूमि विवाद" }
    ],
    noNetTip: "प्रो-टिप: इंटरनेट नहीं है?",
    noNetDesc: "आपका स्थानीय डाकघर एक 'नामित सहायक पीआईओ' है। उन्हें आपका आवेदन मुफ्त में लेना होगा और किसी भी केंद्रीय कार्यालय को भेजना होगा।"
  },
  ta: {
    title: "ஆஃப்லைன் மற்றும் கிராமப்புற RTI வழிகாட்டி",
    subtitle: "குறைந்த இணைய வசதி கொண்ட பகுதிகள் மற்றும் கிராமப்புற குடிமக்களுக்கான விரிவான வழிகாட்டி.",
    back: "டேஷ்போர்டுக்குத் திரும்பு",
    coreConcept: "இணையம் இல்லாவிட்டாலும் அதிகாரம் உண்டு",
    coreDesc: "உள்ளூர் பஞ்சாயத்துகளில் டிஜிட்டல் முறையை விட காகித வழி RTI விண்ணப்பம் அதிக சக்தி வாய்ந்தது. இந்த வழிகாட்டியைப் பயன்படுத்தவும்.",
    stepsTitle: "காகித வழி விண்ணப்பிக்கும் முறை",
    steps: [
      { 
        title: "வரைவு தயாரித்தல்", 
        desc: "ஏதேனும் ஒரு மொழியில் வெற்று A4 காகிதத்தில் உங்கள் விண்ணப்பத்தை எழுதவும். இது RTI சட்டம் 2005-ன் கீழ் உள்ளது என்பதைத் தெளிவாகக் குறிப்பிடவும்.",
        icon: <FileText className="w-5 h-5" />
      },
      { 
        title: "கட்டணம் செலுத்துதல்", 
        desc: "₹10-க்கான IPO (இந்திய தபால் ஆணை) அல்லது நீதிமன்ற கட்டண முத்திரையை வாங்கவும். 'PIO' என்பதை பெறுநராகக் குறிப்பிடவும்.",
        icon: <Landmark className="w-5 h-5" />
      },
      { 
        title: "சமர்ப்பித்தல்", 
        desc: "பஞ்சாயத்து செயலாளரிடம் நேரடியாக வழங்கவும் அல்லது உள்ளூர் தபால் நிலையத்திலிருந்து பதிவு செய்யப்பட்ட தபால் மூலம் அனுப்பவும்.",
        icon: <Mail className="w-5 h-5" />
      }
    ],
    ruralFocus: "கவனம்: கிராமப்புற அதிகாரமளித்தல்",
    ruralItems: [
      { title: "கிராமச் சொத்துக்கள்", desc: "கிராம சாலைகளின் வரைபடங்கள், விளக்கு ஒப்பந்தங்கள் மற்றும் சாக்கடை சுத்தப்படுத்தும் அட்டவணைகளைக் கோரவும்." },
      { title: "உதவித்தொகை", desc: "கிராம பள்ளி குழந்தைகளின் கல்வி உதவித்தொகை மற்றும் விதவை ஓய்வூதிய நிலையைச் சரிபார்க்கவும்." },
      { title: "நில ஆவணங்கள்", desc: "'சான்றளிக்கப்பட்ட நிலை' குறித்துக் கேட்பதன் மூலம் நிலப் பட்டா மாற்றத் தாமதங்களைத் தீர்க்கலாம்." }
    ],
    contacts: "முக்கிய கிராமப்புற தொடர்புகள்",
    contactRoles: [
      { role: "பஞ்சாயத்து செயலாளர்", level: "கிராம பஞ்சாயத்து", jurisdiction: "கிராம வளர்ச்சி மற்றும் வீட்டுவசதி" },
      { role: "BDO (வட்டார வளர்ச்சி அலுவலர்)", level: "வட்டார நிலை", jurisdiction: "MGNREGA மற்றும் ரேஷன் போன்ற திட்டங்கள்" },
      { role: "நாயப் தாசில்தார்", level: "வட்ட நிலை", jurisdiction: "வருவாய் மற்றும் நிலத் தகராறுகள்" }
    ],
    noNetTip: "யோசனை: இணையம் இல்லையா?",
    noNetDesc: "உங்கள் உள்ளூர் தபால் நிலையம் ஒரு 'நியமிக்கப்பட்ட உதவி PIO' ஆகும். அவர்கள் உங்கள் விண்ணப்பத்தை இலவசமாகப் பெற்று எந்த மத்திய அலுவலகத்திற்கும் அனுப்ப வேண்டும்."
  },
  kn: {
    title: "ಆಫ್‌ಲೈನ್ ಮತ್ತು ಗ್ರಾಮೀಣ ಆರ್ ಟಿ ಐ ಮಾರ್ಗದರ್ಶಿ",
    subtitle: "ಕಡಿಮೆ ಸಂಪರ್ಕವಿರುವ ಪ್ರದೇಶಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ನಾಗರಿಕರಿಗಾಗಿ ಸಮಗ್ರ ಮಾರ್ಗದರ್ಶಿ.",
    back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    coreConcept: "ಸಂಪರ್ಕವಿಲ್ಲದಿದ್ದರೂ ಸಬಲೀಕರಣ",
    coreDesc: "ಸ್ಥಾನಿಕ ಪಂಚಾಯಿತಿಗಳಲ್ಲಿ ಡಿಜಿಟಲ್‌ಗಿಂತ ಭೌತಿಕ ಆರ್ ಟಿ ಐ ಅರ್ಜಿ ಹೆಚ್ಚು ಶಕ್ತಿಶಾಲಿಯಾಗಿದೆ. ಈ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಬಳಸಿ.",
    stepsTitle: "ಭೌತಿಕ ಸಲ್ಲಿಕೆ ಪ್ರಕ್ರಿಯೆ",
    steps: [
      { 
        title: "ಕರಡು ಸಿದ್ಧಪಡಿಸುವುದು", 
        desc: "ಬಿಳಿ ಹಾಳೆಯ ಮೇಲೆ ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಜಿ ಬರೆಯಿರಿ. ಇದು ಆರ್ ಟಿ ಐ ಕಾಯ್ದೆ 2005 ರ ಅಡಿಯಲ್ಲಿದೆ ಎಂದು ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಿ.",
        icon: <FileText className="w-5 h-5" />
      },
      { 
        title: "ಶುಲ್ಕ ಪಾವತಿ", 
        desc: "₹10 ರ ಐಪಿಒ (IPO) ಅಥವಾ ಕೋರ್ಟ್ ಫೀ ಸ್ಟಾಂಪ್ ಖರೀದಿಸಿ. ಪೇಯಿಯಾಗಿ 'PIO' ಎಂದು ಉಲ್ಲೇಖಿಸಿ.",
        icon: <Landmark className="w-5 h-5" />
      },
      { 
        title: "ಸಲ್ಲಿಕೆ", 
        desc: "ಪಂಚಾಯತ್ ಕಾರ್ಯದರ್ಶಿಗೆ ನೇರವಾಗಿ ನೀಡಿ ಅಥವಾ ಸ್ಥಳೀಯ ಅಂಚೆ ಕಚೇರಿಯಿಂದ ನೋಂದಾಯಿತ ಅಂಚೆ ಮೂಲಕ ಕಳುಹಿಸಿ.",
        icon: <Mail className="w-5 h-5" />
      }
    ],
    ruralFocus: "ಗಮನ: ಗ್ರಾಮೀಣ ಸಬಲೀಕರಣ",
    ruralItems: [
      { title: "ಗ್ರಾಮದ ಆಸ್ತಿಗಳು", desc: "ಗ್ರಾಮದ ರಸ್ತೆಗಳ ನಕ್ಷೆಗಳು, ದೀಪದ ಗುತ್ತಿಗೆಗಳು ಮತ್ತು ಚರಂಡಿ ಸ್ವಚ್ಛಗೊಳಿಸುವ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ವಿನಂತಿಸಿ." },
      { title: "ಶಿಷ್ಯವೇತನ", desc: "ಶಾಲಾ ಮಕ್ಕಳ ಶಿಷ್ಯವೇತನ ಮತ್ತು ವಿಧವಾ ವೇತನದ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ." },
      { title: "ಭೂ ದಾಖಲೆಗಳು", desc: "ಖಾತೆ ಬದಲಾವಣೆ (ಮ್ಯುಟೇಶನ್) ವಿಳಂಬವನ್ನು 'ದೃಢೀಕೃತ ಸ್ಥಿತಿ' ಕೇಳುವ ಮೂಲಕ ಪರಿಹರಿಸಬಹುದು." }
    ],
    contacts: "ಅಗತ್ಯ ಗ್ರಾಮ ಸಂಪರ್ಕಗಳು",
    contactRoles: [
      { role: "ಪಂಚಾಯತ್ ಕಾರ್ಯದರ್ಶಿ", level: "ಗ್ರಾಮ ಪಂಚಾಯತ್", jurisdiction: "ಗ್ರಾಮಾಭಿವೃದ್ಧಿ ಮತ್ತು ವಸತಿ" },
      { role: "BDO (ಬ್ಲಾಕ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ)", level: "ಬ್ಲಾಕ್ ಮಟ್ಟ", jurisdiction: "ನರೇಗಾ ಮತ್ತು ಪಡಿತರ ಯೋಜನೆಗಳು" },
      { role: "ನಾಯಬ್ ತಹಶೀಲ್ದಾರ್", level: "ವಲಯ ಮಟ್ಟ", jurisdiction: "ಕಂದಾಯ ಮತ್ತು ಭೂ ವಿವಾದಗಳು" }
    ],
    noNetTip: "ಸಲಹೆ: ಇಂಟರ್ನೆಟ್ ಇಲ್ಲವೇ?",
    noNetDesc: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಅಂಚೆ ಕಚೇರಿಯು 'ನಿಯೋಜಿತ ಸಹಾಯಕ PIO' ಆಗಿದೆ. ಅವರು ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ಉಚಿತವಾಗಿ ಪಡೆದು ಯಾವುದೇ ಕೇಂದ್ರ ಕಚೇರಿಗೆ ಕಳುಹಿಸಬೇಕು."
  },
  te: {
    title: "ఆఫ్‌లైన్ & గ్రామీణ ఆర్‌టిఐ గైడ్",
    subtitle: "తక్కువ కనెక్టివిటీ ఉన్న ప్రాంతాలు మరియు గ్రామీణ పౌరుల కోసం సమగ్ర మార్గదర్శిని.",
    back: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    coreConcept: "నెట్ లేకున్నా అధికారం మనదే",
    coreDesc: "స్థానిక పంచాయతీలలో డిజిటల్ కంటే భౌతిక ఆర్‌టిఐ అప్లికేషన్ చాలా శక్తివంతమైనది. ఈ గైడ్‌ను ఉపయోగించండి.",
    stepsTitle: "భౌతిక ఫైలింగ్ ప్రక్రియ",
    steps: [
      { 
        title: "డ్రాఫ్టింగ్", 
        desc: "తెల్ల కాగితంపై ఏదైనా భాషలో అప్లికేషన్ రాయండి. ఇది ఆర్‌టిఐ చట్టం 2005 కింద ఉందని స్పష్టంగా పేర్కొనండి.",
        icon: <FileText className="w-5 h-5" />
      },
      { 
        title: "ఫీజు చెల్లింపు", 
        desc: "₹10 ఐపిఓ (IPO) లేదా కోర్ట్ ఫీ స్టాంప్ కొనండి. 'PIO'ని పేయీగా పేర్కొనండి.",
        icon: <Landmark className="w-5 h-5" />
      },
      { 
        title: "సమర్పణ", 
        desc: "పంచాయతీ సెక్రటరీకి నేరుగా ఇవ్వండి లేదా స్థానిక పోస్ట్ ఆఫీస్ నుండి రిజిస్టర్డ్ పోస్ట్ ద్వారా పంపండి.",
        icon: <Mail className="w-5 h-5" />
      }
    ],
    ruralFocus: "ఫోకస్: గ్రామీణ సాధికారత",
    ruralItems: [
      { title: "గ్రామ ఆస్తులు", desc: "గ్రామ రోడ్ల లేఅవుట్లు, లైటింగ్ కాంట్రాక్టులు మరియు డ్రైన్ క్లీనింగ్ షెడ్యూల్‌ల సమాచారం కోరండి." },
      { title: "స్కాలర్‌షిప్‌లు", desc: "గ్రామ పాఠశాల పిల్లల స్కాలర్‌షిప్‌లు మరియు వితంతు పెన్షన్ల స్థితిని తనిఖీ చేయండి." },
      { title: "భూ రికార్డులు", desc: "మ్యుటేషన్ జాప్యాలను 'సర్టిఫైడ్ స్టేటస్' అడగడం ద్వారా పరిష్కరించుకోవచ్చు." }
    ],
    contacts: "ముఖ్యమైన గ్రామ పరిచయాలు",
    contactRoles: [
      { role: "పంచాయతీ సెక్రటరీ", level: "గ్రామ పంచాయతీ", jurisdiction: "గ్రామ అభివృద్ధి & గృహనిర్మాణం" },
      { role: "BDO (బ్లాక్ డెవలప్‌మెంట్ ఆఫీసర్)", level: "బ్లాక్ స్థాయి", jurisdiction: "ఉపాధి హామీ పథకం & రేషన్" },
      { role: "నాయిబ్ తహశీల్దార్", level: "సర్కిల్ స్థాయి", jurisdiction: "రెవెన్యూ మరియు భూ వివాదాలు" }
    ],
    noNetTip: "చిట్కా: ఇంటర్నెట్ లేదా?",
    noNetDesc: "మీ స్థానిక పోస్ట్ ఆఫీస్ ఒక 'డెసిగ్నేటెడ్ అಸಿస్టెంట్ PIO'. వారు మీ అప్లికేషన్‌ను ఉచితంగా తీసుకుని ఏ కేంద్ర కార్యాలయానికైనా పంపాలి."
  }
};

export default function OfflinePage() {
  const { language } = useLanguage();
  const t = OFFLINE_TRANSLATIONS[language] || OFFLINE_TRANSLATIONS.en;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
       <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-16 md:mb-20">
        <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
          <Badge className="bg-primary/10 text-primary uppercase tracking-widest font-black text-[10px] md:text-xs py-1 px-4">{t.badge}</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground text-base md:text-xl leading-relaxed">{t.subtitle}</p>
        </div>
        <div className="w-full md:w-80 bg-primary/5 rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-primary/10 relative">
          <Navigation className="absolute -right-4 -top-4 w-12 md:w-16 h-12 md:h-16 text-primary/10" />
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{t.coreConcept}</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic">"{t.coreDesc}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
        {t.steps.map((step: any, idx: number) => (
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
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t.ruralFocus}</h2>
          </div>
          <div className="space-y-4">
            {t.ruralItems.map((item: any, idx: number) => (
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
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t.contacts}</h2>
          </div>
          <div className="bg-card border border-border rounded-3xl md:rounded-[40px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[300px]">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-5 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase text-muted-foreground">{t.table.officer}</th>
                    <th className="px-5 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase text-muted-foreground">{t.table.area}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {t.contactRoles.map((role: any, idx: number) => (
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
            <Map className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black">{t.noNetTip}</h2>
          <p className="text-base md:text-lg opacity-80 leading-relaxed italic px-4 md:px-0">{t.noNetDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
             {t.badges.map((b: string) => (
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
