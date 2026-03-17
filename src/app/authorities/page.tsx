"use client";

import React, { useState, useMemo } from "react";
import { 
  Building2, 
  Search, 
  ExternalLink, 
  MapPin, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  NATIONAL_RTI_CONFIG, 
  STATES_LIST, 
  isOnline, 
  isOfflineOnly,
  getStateName 
} from "@/lib/states";
import IndiaMap from "@/components/shared/IndiaMap";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/components/shared/LanguageProvider";

const authoritiesEn = [
  { id: 1, name: "Public Works Department (PWD)", category: "Infrastructure", jurisdiction: "State Government", description: "Roads, bridges, public buildings, and highway maintenance.", pio: "Assistant Executive Engineer (Admin)" },
  { id: 2, name: "Municipal Corporation", category: "Civic", jurisdiction: "Local Government", description: "Urban planning, sanitation, water supply, and local taxes.", pio: "Public Information Officer, City Zone" },
  { id: 3, name: "Revenue Department", category: "Governance", jurisdiction: "State Government", description: "Land records, taxation, disaster management, and certificates.", pio: "Tehsildar / Deputy Collector" },
  { id: 4, name: "Health & Family Welfare", category: "Public Service", jurisdiction: "State Government", description: "Government hospitals, medical colleges, and health schemes.", pio: "Chief Medical Officer" },
  { id: 5, name: "Education Department", category: "Public Service", jurisdiction: "State Government", description: "State schools, colleges, scholarship schemes, and literacy.", pio: "District Education Officer" },
  { id: 6, name: "Police Department", category: "Law & Order", jurisdiction: "State Government", description: "FIR status, police recruitment, and law enforcement activities.", pio: "Superintendent of Police (Admin)" },
  { id: 7, name: "Food & Civil Supplies", category: "Public Service", jurisdiction: "State Government", description: "Ration cards, PDS shops, and distribution of food grains.", pio: "District Supply Officer" },
  { id: 8, name: "Electricity Board / DISCOM", category: "Utilities", jurisdiction: "State Government", description: "Power supply, metering, billing disputes, and new connections.", pio: "Executive Engineer (Commercial)" },
];

const getAuthorities = (lang: string) => {
  const data: Record<string, typeof authoritiesEn> = {
    en: authoritiesEn,
    hi: [
      { id: 1, name: "लोक निर्माण विभाग (PWD)", category: "बुनियादी ढांचा", jurisdiction: "राज्य सरकार", description: "सड़कें, पुल, सार्वजनिक भवन और राजमार्ग रखरखाव।", pio: "सहायक कार्यकारी अभियंता (प्रशासन)" },
      { id: 2, name: "नगर निगम", category: "नागरिक", jurisdiction: "स्थानीय सरकार", description: "शहरी नियोजन, स्वच्छता, जल आपूर्ति और स्थानीय कर।", pio: "लोक सूचना अधिकारी, सिटी ज़ोन" },
      { id: 3, name: "राजस्व विभाग", category: "शासन", jurisdiction: "राज्य सरकार", description: "भूमि रिकॉर्ड, कराधान, आपदा प्रबंधन और प्रमाण पत्र।", pio: "तहसीलदार / उप कलेक्टर" },
      { id: 4, name: "स्वास्थ्य एवं परिवार कल्याण", category: "सार्वजनिक सेवा", jurisdiction: "राज्य सरकार", description: "सरकारी अस्पताल, मेडिकल कॉलेज और स्वास्थ्य योजनाएं।", pio: "मुख्य चिकित्सा अधिकारी" },
      { id: 5, name: "शिक्षा विभाग", category: "सार्वजनिक सेवा", jurisdiction: "राज्य सरकार", description: "राज्य के स्कूल, कॉलेज, छात्रवृत्ति योजनाएं और साक्षरता।", pio: "जिला शिक्षा अधिकारी" },
      { id: 6, name: "पुलिस विभाग", category: "कानून और व्यवस्था", jurisdiction: "राज्य सरकार", description: "एफआईआर स्थिति, पुलिस भर्ती और कानून प्रवर्तन गतिविधियां।", pio: "पुलिस अधीक्षक (प्रशासन)" },
      { id: 7, name: "खाद्य एवं नागरिक आपूर्ति", category: "सार्वजनिक सेवा", jurisdiction: "राज्य सरकार", description: "राशन कार्ड, पीडीएस दुकानें और खाद्यान्न का वितरण।", pio: "जिला आपूर्ति अधिकारी" },
      { id: 8, name: "बिजली बोर्ड / डिस्कॉम", category: "उपयोगिताएं", jurisdiction: "राज्य सरकार", description: "बिजली आपूर्ति, मीटरिंग, बिलिंग विवाद और नए कनेक्शन।", pio: "अधिशासी अभियंता (वाणिज्य)" },
    ],
    ta: [
      { id: 1, name: "பொதுப்பணித்துறை (PWD)", category: "உள்கட்டமைப்பு", jurisdiction: "மாநில அரசு", description: "சாலைகள், பாலங்கள், பொதுக் கட்டடங்கள் மற்றும் நெடுஞ்சாலை பராமரிப்பு.", pio: "உதவி நிர்வாகப் பொறியாளர் (நிர்வாகம்)" },
      { id: 2, name: "மாநகராட்சி", category: "குடிமை", jurisdiction: "உள்ளூர் அரசாங்கம்", description: "நகரத் திட்டமிடல், சுகாதாரம், குடிநீர் வழங்கல் மற்றும் உள்ளூர் வரிகள்.", pio: "பொது தகவல் அலுவலர், நகர மண்டலம்" },
      { id: 3, name: "வருவாய்த்துறை", category: "ஆட்சி", jurisdiction: "மாநில அரசு", description: "நிலப் பதிவேடுகள், வரி விதிப்பு, பேரிடர் மேலாண்மை மற்றும் சான்றிதழ்கள்.", pio: "வட்டாட்சியர் / துணை ஆட்சியர்" },
      { id: 4, name: "சுகாதாரம் மற்றும் குடும்ப நலன்", category: "பொதுச் சேவை", jurisdiction: "மாநில அரசு", description: "அரசு மருத்துவமனைகள், மருத்துவக் கல்லூரிகள் மற்றும் சுகாதாரத் திட்டங்கள்.", pio: "தலைமை மருத்துவ அதிகாரி" },
      { id: 5, name: "கல்வித் துறை", category: "பொதுச் சேவை", jurisdiction: "மாநில அரசு", description: "மாநிலப் பள்ளிகள், கல்லூரிகள், உதவித்தொகை திட்டங்கள் மற்றும் கல்வியறிவு.", pio: "மாவட்ட கல்வி அலுவலர்" },
      { id: 6, name: "காவல்துறை", category: "சட்டம் & ஒழுங்கு", jurisdiction: "மாநில அரசு", description: "எஃப்ஐஆர் நிலை, காவலர் ஆட்சேர்ப்பு மற்றும் சட்ட அமலாக்க நடவடிக்கைகள்.", pio: "காவல்துறை கண்காணிப்பாளர் (நிர்வாகம்)" },
      { id: 7, name: "உணவு மற்றும் நுகர்வோர் பாதுகாப்பு", category: "பொதுச் சேவை", jurisdiction: "மாநில அரசு", description: "ரேஷன் கார்டுகள், பொது விநியோகத் திட்டக் கடைகள் மற்றும் உணவு தானியங்கள் விநியோகம்.", pio: "மாவட்ட வழங்கல் அலுவலர்" },
      { id: 8, name: "மின்சார வாரியம் / டிஸ்காம்", category: "பயன்பாடுகள்", jurisdiction: "மாநில அரசு", description: "மின்சாரம் வழங்கல், மீட்டரிங், பில்லிங் சர்ச்சைகள் மற்றும் புதிய இணைப்புகள்.", pio: "நிர்வாகப் பொறியாளர் (வணிகம்)" },
    ],
    kn: [
      { id: 1, name: "ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ (PWD)", category: "ಮೂಲಸೌಕರ್ಯ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ರಸ್ತೆಗಳು, ಸೇತುವೆಗಳು, ಸಾರ್ವಜನಿಕ ಕಟ್ಟಡಗಳು ಮತ್ತು ಹೆದ್ದಾರಿ ನಿರ್ವಹಣೆ.", pio: "ಸಹಾಯಕ ಕಾರ್ಯನಿರ್ವಾಹಕ ಇಂಜಿನಿಯರ್ (ಆಡಳಿತ)" },
      { id: 2, name: "ಮಹಾನಗರ ಪಾಲಿಕೆ", category: "ನಾಗರಿಕ", jurisdiction: "ಸ್ಥಳೀಯ ಸರ್ಕಾರ", description: "ನಗರ ಯೋಜನೆ, ನೈರ್ಮಲ್ಯ, ನೀರು ಸರಬರಾಜು ಮತ್ತು ಸ್ಥಳೀಯ ತೆರಿಗೆಗಳು.", pio: "ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ, ನಗರ ವಲಯ" },
      { id: 3, name: "ಕಂದಾಯ ಇಲಾಖೆ", category: "ಆಡಳಿತ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ಭೂ ದಾಖಲೆಗಳು, ತೆರಿಗೆ, ವಿಪತ್ತು ನಿರ್ವಹಣೆ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳು.", pio: "ತಹಶೀಲ್ದಾರ್ / ಉಪ ಜಿಲ್ಲಾಧಿಕಾರಿ" },
      { id: 4, name: "ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ", category: "ಸಾರ್ವಜನಿಕ ಸೇವೆ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳು, ವೈದ್ಯಕೀಯ ಕಾಲೇಜುಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಯೋಜನೆಗಳು.", pio: "ಮುಖ್ಯ ವೈದ್ಯಕೀಯ ಅಧಿಕಾರಿ" },
      { id: 5, name: "ಶಿಕ್ಷಣ ಇಲಾಖೆ", category: "ಸಾರ್ವಜನಿಕ ಸೇವೆ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ರಾಜ್ಯ ಶಾಲೆಗಳು, ಕಾಲೇಜುಗಳು, ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳು ಮತ್ತು ಸಾಕ್ಷರತೆ.", pio: "ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿ" },
      { id: 6, name: "ಪೊಲೀಸ್ ಇಲಾಖೆ", category: "ಕಾನೂನು ಮತ್ತು ಸುವ್ಯವಸ್ಥೆ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ಎಫ್‌ಐಆರ್ ಸ್ಥಿತಿ, ಪೊಲೀಸ್ ನೇಮಕಾತಿ ಮತ್ತು ಕಾನೂನು ಜಾರಿ ಚಟುವಟಿಕೆಗಳು.", pio: "ಪೊಲೀಸ್ ಅಧೀಕ್ಷಕರು (ಆಡಳಿತ)" },
      { id: 7, name: "ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು", category: "ಸಾರ್ವಜನಿಕ ಸೇವೆ", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ರೇಷನ್ ಕಾರ್ಡ್‌ಗಳು, ಪಿಡಿಎಸ್ ಅಂಗಡಿಗಳು ಮತ್ತು ಆಹಾರ ಧಾನ್ಯಗಳ ವಿತರಣೆ.", pio: "ಜಿಲ್ಲಾ ಸರಬರಾಜು ಅಧಿಕಾರಿ" },
      { id: 8, name: "ವಿದ್ಯುತ್ ಮಂಡಳಿ / ಡಿಸ್ಕಾಂ", category: "ಸೌಲಭ್ಯಗಳು", jurisdiction: "ರಾಜ್ಯ ಸರ್ಕಾರ", description: "ವಿದ್ಯುತ್ ಪೂರೈಕೆ, ಮೀಟರಿಂಗ್, ಬಿಲ್ಲಿಂಗ್ ವಿವಾದಗಳು ಮತ್ತು ಹೊಸ ಸಂಪರ್ಕಗಳು.", pio: "ಕಾರ್ಯನಿರ್ವಾಹಕ ಇಂಜಿನಿಯರ್ (ವಾಣಿಜ್ಯ)" },
    ],
    te: [
      { id: 1, name: "ప్రజాపనుల శాఖ (PWD)", category: "మౌలిక సదుపాయాలు", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "రోడ్లు, వంతెనలు, ప్రభుత్వ భవనాలు మరియు రహదారుల నిర్వహణ.", pio: "అసిస్టెంట్ ఎగ్జిక్యూటివ్ ఇంజనీర్ (అడ్మిన్)" },
      { id: 2, name: "మున్సిపల్ కార్పొరేషన్", category: "పౌర", jurisdiction: "స్థానిక ప్రభుత్వం", description: "పట్టణ ప్రణాళిక, పారిశుధ్యం, నీటి సరఫరా మరియు స్థానిక పన్నులు.", pio: "పబ్లిక్ ఇన్ఫర్మేషన్ ఆఫీసర్, సిటీ జోన్" },
      { id: 3, name: "రెవెన్యూ శాఖ", category: "పాలన", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "భూమి రికార్డులు, పన్నులు, విపత్తు నిర్వహణ మరియు ధృవీకరణ పత్రాలు.", pio: "తహశీల్దార్ / డిప్యూటీ కలెక్టర్" },
      { id: 4, name: "ఆరోగ్య & కుటుంబ సంక్షేమ శాఖ", category: "ప్రజా సేవ", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "ప్రభుత్వ ఆసుపత్రులు, వైద్య కళాశాలలు మరియు ఆరోగ్య పథకాలు.", pio: "చీఫ్ మెడికల్ ఆఫీసర్" },
      { id: 5, name: "విద్యా శాఖ", category: "ప్రజా సేవ", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "రాష్ట్ర పాఠశాలలు, కళాశాలలు, స్కాలర్‌షిప్ పథకాలు మరియు అక్షరాస్యత.", pio: "జిల్లా విద్యాధికారి" },
      { id: 6, name: "పోలీసు శాఖ", category: "శాంతి భద్రతలు", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "FIR స్థితి, పోలీసు రిక్రూట్‌మెంట్ మరియు చట్ట అమలు కార్యకలాపాలు.", pio: "పోలీసు సూపరింటెండెంట్ (పరిపాలన)" },
      { id: 7, name: "ఆహారం & పౌర సరఫరాలు", category: "ప్రజా సేవ", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "రేషన్ కార్డులు, PDS దుకాణాలు మరియు ఆహార ధాన్యాల పంపిణీ.", pio: "జిల్లా సరఫరా అధికారి" },
      { id: 8, name: "విద్యుత్ బోర్డు / DISCOM", category: "సౌకర్యాలు", jurisdiction: "రాష్ట్ర ప్రభుత్వం", description: "విద్యుత్ సరఫరా, మీటరింగ్, బిల్లింగ్ వివాదాలు మరియు కొత్త కనెక్షన్లు.", pio: "ఎగ్జిక్యూటివ్ ఇంజనీర్ (వాణిజ్యం)" },
    ],
  };
  return data[lang] || data['en'];
};

const AUTHORITIES_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Authority Knowledge Base",
    subtitle: "Search departments and file RTIs to the right authority — across all 36 States & UTs.",
    selectedRegion: "Selected Region",
    fee: "Fee",
    searchPlaceholder: "Search by department name or category...",
    visitWebsite: "Visit Website",
    visitPortal: "Portal",
    viewGuidelines: "View Guidelines",
    noDepts: "No departments found",
    trySearch: "Try searching with a different keyword.",
    modalTitle: "RTI Filing Guidelines",
    filingInstructions: "Fee Structure",
    appFee: "Application Fee",
    pageRate: "Per Page (A4)",
    mediaCost: "CD/DVD Cost",
    inspectRate: "Inspection Fee",
    estTotal: "Est. Max Cost",
    notes: "Notes",
    pio: "Public Information Officer",
    responseTime: "Response Time",
    workingDays: "Working Days",
    firstAppeal: "First Appeal",
    withinDays: "Within 30 Days",
    bplExempt: "* BPL card holders are exempt from paying the application fee across all states.",
    recommendedSubjects: "Recommended RTI Subjects",
    subjects: ["Project Status", "Budget Utilization", "Tenders & Contracts", "Recruitment Rules", "Staff Attendance", "Audit Reports"],
    proceedPortal: "Proceed to State Portal",
    accessPortal: "Access State Portal"
  },
  hi: {
    title: "प्राधिकरण ज्ञान केंद्र",
    subtitle: "विभागों की खोज करें और सही प्राधिकरण को आरटीआई फाइल करें — सभी 36 राज्यों और केंद्र शासित प्रदेशों में।",
    selectedRegion: "चयनित क्षेत्र",
    fee: "शुल्क",
    searchPlaceholder: "विभाग के नाम या श्रेणी से खोजें...",
    visitWebsite: "वेबसाइट देखें",
    visitPortal: "पोर्टल",
    viewGuidelines: "दिशा-निर्देश देखें",
    noDepts: "कोई विभाग नहीं मिला",
    trySearch: "किसी अन्य कीवर्ड के साथ खोजने का प्रयास करें।",
    modalTitle: "आरटीआई फाइलिंग दिशा-निर्देश",
    filingInstructions: "शुल्क संरचना",
    appFee: "आवेदन शुल्क",
    pageRate: "प्रति पृष्ठ (A4)",
    mediaCost: "CD/DVD लागत",
    inspectRate: "निरीक्षण शुल्क",
    estTotal: "अनुमानित अधिकतम लागत",
    notes: "विशेष नोट",
    pio: "लोक सूचना अधिकारी",
    responseTime: "जवाब देने का समय",
    workingDays: "कार्य दिवस",
    firstAppeal: "प्रथम अपील",
    withinDays: "30 दिनों के भीतर",
    bplExempt: "* बीपीएल कार्ड धारकों को सभी राज्यों में आवेदन शुल्क देने से छूट दी गई है।",
    recommendedSubjects: "अनुशंसित आरटीआई विषय",
    subjects: ["परियोजना स्थिति", "बजట్ उपयोग", "निविदा एवं अनुबंध", "भर्ती नियम", "कर्मचारी उपस्थिति", "लेखा परीक्षा रिपोर्ट"],
    proceedPortal: "राज्य पोर्टल पर आगे बढ़ें",
    accessPortal: "राज्य पोर्टल तक पहुंचें"
  },
  ta: {
    title: "அதிகார அறிவுத் தளம்",
    subtitle: "துறைகளைத் தேடி சரியான அதிகாரியிடம் ஆர்டிஐ தாக்கல் செய்யுங்கள் — அனைத்து 36 மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களிலும்.",
    selectedRegion: "தேர்ந்தெடுக்கப்பட்ட பகுதி",
    fee: "கட்டணம்",
    searchPlaceholder: "துறை பெயர் அல்லது வகை மூலம் தேடுங்கள்...",
    visitWebsite: "இணையதளத்தைப் பார்வையிடவும்",
    visitPortal: "போர்டல்",
    viewGuidelines: "வழிகாட்டுதல்களைக் காண்க",
    noDepts: "துறைகள் எதுவும் கிடைக்கவில்லை",
    trySearch: "வேறு முக்கிய சொல்லைக் கொண்டு தேட முயற்சிக்கவும்.",
    modalTitle: "ஆர்டிஐ தாக்கல் வழிகாட்டுதல்கள்",
    filingInstructions: "கட்டண அமைப்பு",
    appFee: "விண்ணப்பக் கட்டணம்",
    pageRate: "பக்கத்திற்கு (A4)",
    mediaCost: "CD/DVD செலவு",
    inspectRate: "ஆய்வுக் கட்டணம்",
    estTotal: "மதிப்பிடப்பட்ட அதிகபட்ச செலவு",
    notes: "குறிப்புகள்",
    pio: "பொது தகவல் அலுவலர்",
    responseTime: "பதிலளிக்கும் நேரம்",
    workingDays: "வேலை நாட்கள்",
    firstAppeal: "முதல் மேல்முறையீடு",
    withinDays: "30 நாட்களுக்குள்",
    bplExempt: "* பிபிஎல் கார்டு வைத்திருப்பவர்களுக்கு அனைத்து மாநிலங்களிலும் விண்ணப்பக் கட்டணம் செலுத்துவதிலிருந்து விலக்கு அளிக்கப்பட்டுள்ளது.",
    recommendedSubjects: "பரிந்துரைக்கப்பட்ட ஆர்டிஐ தலைப்புகள்",
    subjects: ["திட்ட நிலை", "பட்ஜெட் பயன்பாடு", "டெண்டர்கள் & ஒப்பந்தங்கள்", "ஆட்சேர்ப்பு விதிகள்", "ஊழியர் வருகை", "தணிக்கை அறிக்கைகள்"],
    proceedPortal: "மாநில போர்டலுக்குச் செல்லவும்",
    accessPortal: "மாநில போர்டலை அணுகவும்"
  },
  kn: {
    title: "ಪ್ರಾಧಿಕಾರ ಜ್ಞಾನ ಕೇಂದ್ರ",
    subtitle: "ಇಲಾಖೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಸರಿಯಾದ ಪ್ರಾಧಿಕಾರಕ್ಕೆ ಆರ್ ಟಿ ಐ ಸಲ್ಲಿಸಿ — ಎಲ್ಲಾ 36 ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ.",
    selectedRegion: "ಆಯ್ದ ಪ್ರದೇಶ",
    fee: "ಶುಲ್ಕ",
    searchPlaceholder: "ಇಲಾಖೆಯ ಹೆಸರು ಅಥವಾ ವರ್ಗದ ಮೂಲಕ ಹುಡುಕಿ...",
    visitWebsite: "ವೆಬ್ ಸೈಟ್ ಭೇಟಿ ನೀಡಿ",
    visitPortal: "ಪೋರ್ಟಲ್",
    viewGuidelines: "ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    noDepts: "ಯಾವುದೇ ಇಲಾಖೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    trySearch: "ಬೇರೆ ಕೀವರ್ಡ್ ನೊಂದಿಗೆ ಹುಡುಕಲು ಪ್ರಯತ್ನಿಸಿ.",
    modalTitle: "ಆರ್ ಟಿ ಐ ಸಲ್ಲಿಕೆ ಮಾರ್ಗಸೂಚಿಗಳು",
    filingInstructions: "ಶುಲ್ಕ ರಚನೆ",
    appFee: "ಅರ್ಜಿ ಶುಲ್ಕ",
    pageRate: "ಪ್ರತಿ ಪುಟಕ್ಕೆ (A4)",
    mediaCost: "CD/DVD ವೆಚ್ಚ",
    inspectRate: "ಪರಿಶೀಲನೆ ಶುಲ್ಕ",
    estTotal: "ಅಂದಾಜು ಗರಿಷ್ಠ ವೆಚ್ಚ",
    notes: "ಟಿಪ್ಪಣಿಗಳು",
    pio: "ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ",
    responseTime: "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
    workingDays: "ಕೆಲಸದ ದಿನಗಳು",
    firstAppeal: "ಮೊದಲ ಮೇಲ್ಮನವಿ",
    withinDays: "30 ದಿನಗಳೊಳಗೆ",
    bplExempt: "* ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರಿಗೆ ಎಲ್ಲಾ ರಾಜ್ಯಗಳಲ್ಲಿ ಅರ್ಜಿ ಶುಲ್ಕ ಪಾವತಿಸುವುದರಿಂದ ವಿನಾಯಿತಿ ಇದೆ.",
    recommendedSubjects: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಆರ್ ಟಿ ಐ ವಿಷಯಗಳು",
    subjects: ["ಯೋಜನೆ ಸ್ಥಿತಿ", "ಬಜೆಟ್ ಬಳಕೆ", "ಟೆಂಡರ್‌ಗಳು & ಒಪ್ಪಂದಗಳು", "ನೇಮಕಾತಿ ನಿಯಮಗಳು", "ಸಿಬ್ಬಂದಿ ಹಾಜರಾತಿ", "ಲೆಕ್ಕಪರಿಶೋಧನೆ ವರದಿಗಳು"],
    proceedPortal: "ರಾಜ್ಯ ಪೋರ್ಟಲ್ ಗೆ ಮುಂದುವರಿಯಿರಿ",
    accessPortal: "ರಾಜ್ಯ ಪೋರ್ಟಲ್ ಪ್ರವೇಶಿಸಿ"
  },
  te: {
    title: "అథారిటీ నాలెడ్జ్ బేస్",
    subtitle: "శాఖల కోసం వెతకండి మరియు సరైన అధికారికి ఆర్‌టిఐ ఫైల్ చేయండి — అన్ని 36 రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలలో.",
    selectedRegion: "ఎంచుకున్న ప్రాంతం",
    fee: "రుసుము",
    searchPlaceholder: "శాఖ పేరు లేదా వర్గం ద్వారా వెతకండి...",
    visitWebsite: "వెబ్‌సైట్‌ను సందర్శించండి",
    visitPortal: "పోర్టల్",
    viewGuidelines: "మార్గదర్శకాలను చూడండి",
    noDepts: "శాఖలు ఏవీ కనుగొనబడలేదు",
    trySearch: "వేరే కీవర్డ్‌తో వెతకడానికి ప్రయత్నించండి.",
    modalTitle: "ఆర్‌టిఐ ఫైలింగ్ మార్గదర్శకాలు",
    filingInstructions: "ఫీజు నిర్మాణం",
    appFee: "దరఖాస్తు రుసుము",
    pageRate: "ప్రతి పేజీకి (A4)",
    mediaCost: "CD/DVD ఖర్చు",
    inspectRate: "తనిఖీ రుసుము",
    estTotal: "అంచనా గరిష్ట ఖర్చు",
    notes: "గమనికలు",
    pio: "పబ్లిక్ ఇన్ఫర్మేషన్ ఆఫీసర్",
    responseTime: "ప్రతిస్పందన సమయం",
    workingDays: "పని దినాలు",
    firstAppeal: "మొదటి అప్పీల్",
    withinDays: "30 రోజుల్లోపు",
    bplExempt: "* బిపిఎల్ కార్డ్ హోల్డర్లకు అన్ని రాష్ట్రాల్లో దరఖాస్తు రుసుము చెల్లించడం నుండి మినహాయింపు ఉంది.",
    recommendedSubjects: "సిఫార్సు చేయబడిన ఆర్‌టిఐ అంశాలు",
    subjects: ["ప్రాజెక్ట్ స్థితి", "బడ్జెట్ వినియోగం", "టెండర్లు & ఒప్పందాలు", "రిక్రూట్‌మెంట్ నియమాలు", "సిబ్బంది హాజరు", "ఆడిట్ నివేదికలు"],
    proceedPortal: "రాష్ట్ర పోర్టల్‌కు వెళ్లండి",
    accessPortal: "రాష్ట్ర పోర్టల్‌ను యాక్సెస్ చేయండి"
  }
};

export default function AuthoritiesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuth, setSelectedAuth] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState("Central Government");

  const authorities = useMemo(() => getAuthorities(language), [language]);
  const t = AUTHORITIES_TRANSLATIONS[language] || AUTHORITIES_TRANSLATIONS.en;
  const stateData = NATIONAL_RTI_CONFIG[selectedState];

  const filteredAuthorities = authorities.filter(auth =>
    auth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedData = selectedAuth ? authorities.find(a => a.id === selectedAuth) : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight drop-shadow-sm">{t.title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {/* Left Column: Map & Region Selection */}
        <div className="w-full xl:w-[450px] space-y-8 shrink-0">
          <div className="bg-card p-6 rounded-3xl border border-border shadow-xl space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">{t.selectedRegion}</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/10 p-2 rounded-xl border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 bg-muted/30 border border-border rounded-2xl font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:bg-muted/50 appearance-none cursor-pointer"
                >
                  {STATES_LIST.map(s => <option key={s} value={s} className="bg-card text-foreground">{getStateName(s, language)}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.visitPortal}</p>
                <Badge variant={isOnline(stateData.mode) ? "success" : "default"} className="text-xs px-3 py-1 flex items-center gap-1.5 w-fit">
                  {isOnline(stateData.mode) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                  {stateData.mode}
                </Badge>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.appFee}</p>
                <p className="text-sm font-bold text-foreground">₹{stateData.generalFee}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">{t.pageRate}</p>
                <p className="text-xs font-bold text-foreground">₹{stateData.pageRate}/pg</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">{t.mediaCost}</p>
                <p className="text-xs font-bold text-foreground">₹{stateData.mediaCost}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">{t.inspectRate}</p>
                <p className="text-xs font-bold text-foreground">₹{stateData.inspectRate}/hr</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.estTotal}</p>
                <p className="text-lg font-black text-primary">₹{stateData.maxCost}</p>
              </div>
              <Badge variant="primary" className="h-fit">Verified 2024</Badge>
            </div>
          </div>
          
          <IndiaMap 
            key={language}
            selectedState={selectedState} 
            onStateClick={(stateName) => setSelectedState(stateName)} 
          />
        </div>

        {/* Middle Column: Search & Departments */}
        <div className="flex-1 w-full min-w-0">
          <div className="mb-8 relative max-w-2xl mx-auto xl:mx-0">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredAuthorities.length > 0 ? (
              filteredAuthorities.map((auth) => (
                <Card 
                  key={auth.id} 
                  hover 
                  className={cn(
                    "p-6 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group", 
                    selectedAuth === auth.id ? "border-primary ring-4 ring-primary/5 bg-primary/[0.01]" : "border-border/60"
                  )}
                >
                  <div className="flex flex-col justify-between gap-5 h-full">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                          <Building2 className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <Badge variant="default" className="text-[10px] uppercase tracking-wider font-bold">{auth.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{auth.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{auth.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-5 border-t border-border/50">
                      <a href={stateData.portal} target="_blank" rel="noreferrer"
                        className="w-full py-3 bg-foreground text-background text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]">
                        {isOfflineOnly(stateData.mode) ? t.visitWebsite : `${selectedState} ${t.visitPortal}`} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button 
                        onClick={() => setSelectedAuth(auth.id)}
                        className={cn(
                          "w-full py-3 text-xs font-bold rounded-xl transition-all border flex items-center justify-center gap-2 active:scale-[0.98]",
                          selectedAuth === auth.id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-card border-border text-foreground hover:bg-muted"
                        )}>
                        {t.viewGuidelines} <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-card/30 rounded-3xl border-2 border-dashed border-border/40">
                <div className="inline-flex bg-muted p-5 rounded-3xl mb-4"><Search className="w-10 h-10 text-muted-foreground/20" /></div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.noDepts}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">{t.trySearch}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guidelines Modal */}
      <Modal 
        isOpen={selectedAuth !== null} 
        onClose={() => setSelectedAuth(null)}
        title={t.modalTitle}
      >
        {selectedData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 p-1">
            <div className="relative">
              <div className="absolute -left-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
              <p className="text-2xl font-black text-foreground leading-tight tracking-tight">{selectedData.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="primary" className="text-primary border-primary/20 bg-primary/5">{getStateName(selectedState, language)}</Badge>
                <div className="h-1 w-1 bg-muted-foreground/30 rounded-full"></div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{selectedData.jurisdiction}</span>
              </div>
            </div>

            <div className={cn(
              "p-6 rounded-3xl border shadow-sm space-y-3", 
              isOnline(stateData.mode) ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50" : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50"
            )}>
              <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                style={{ color: isOnline(stateData.mode) ? "#10b981" : "#f59e0b" }}>
                {isOnline(stateData.mode) ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {stateData.mode}
              </h4>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                {isOfflineOnly(stateData.mode) 
                  ? `This state requires a physical application with a Court Fee Stamp, IPO, or Demand Draft of ₹${stateData.generalFee}. Check state specific notes below.`
                  : `This state supports convenient online filing with a base fee of ₹${stateData.generalFee}. Instant acknowledgment is generated.`}
              </p>
              <a href={stateData.portal} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                <Globe className="w-3.5 h-3.5" /> {t.accessPortal} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-muted/40 p-8 rounded-3xl border border-border/60 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest">{t.filingInstructions}</h4>
                <Badge variant="default" className="text-[10px] font-bold">Standard Rates</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.appFee}</p>
                  <p className="text-lg font-black text-foreground">₹{stateData.generalFee}<span className="text-[10px] font-bold text-muted-foreground lowercase ml-0.5">/-</span></p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.pageRate}</p>
                  <p className="text-lg font-black text-foreground">₹{stateData.pageRate}<span className="text-[10px] font-bold text-muted-foreground lowercase ml-0.5">/pg</span></p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.mediaCost}</p>
                  <p className="text-lg font-black text-foreground">₹{stateData.mediaCost}<span className="text-[10px] font-bold text-muted-foreground lowercase ml-0.5">/unit</span></p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.inspectRate}</p>
                  <p className="text-lg font-black text-foreground">₹{stateData.inspectRate}<span className="text-[10px] font-bold text-muted-foreground lowercase ml-0.5">/hr</span></p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.estTotal}</p>
                    <p className="text-xl font-black text-primary">₹{stateData.maxCost}<span className="text-xs font-bold lowercase ml-0.5 text-primary/70">max*</span></p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.pio}</p>
                    <p className="text-sm font-bold text-foreground leading-tight">{selectedData.pio}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.responseTime}</p>
                  <p className="text-sm font-bold text-foreground">30 {t.workingDays}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.firstAppeal}</p>
                  <p className="text-sm font-bold text-foreground">{t.withinDays}</p>
                </div>
              </div>

              {stateData.specifics && (
                <div className="pt-6 border-t border-border/40">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{t.notes}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic bg-background/50 p-3 rounded-xl border border-border/40">{stateData.specifics}</p>
                </div>
              )}
              
              <div className="pt-2">
                <p className="text-[10px] text-muted-foreground/60 italic leading-tight">{t.bplExempt}</p>
              </div>
            </div>

            <div className="bg-orange-50/50 dark:bg-orange-950/10 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/40">
              <h4 className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> {t.recommendedSubjects}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(t.subjects || []).map((topic: string) => (
                  <span key={topic} className="text-[10px] bg-white dark:bg-orange-900/20 px-4 py-2 rounded-xl border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 font-bold shadow-sm">{topic}</span>
                ))}
              </div>
            </div>

            <a href={stateData.portal} target="_blank" rel="noreferrer"
              className="w-full min-h-[64px] py-4 bg-primary text-white text-lg font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="text-center">{t.proceedPortal}</span> <ExternalLink className="w-6 h-6 shrink-0" />
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
