"use client";

import React from "react";
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Info,
  Globe,
  Mail,
  Map,
  Landmark,
  Copy,
  Check,
  UserCheck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/components/shared/LanguageProvider";

const HELP_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Help & FAQ",
    subtitle: "Everything you need to know about navigating the RTI system and using our platform.",
    getStarted: "Getting Started",
    commonQuestions: "Frequently Asked Questions",
    guideTitle: "Step-by-Step Guide",
    guideSteps: [
      { title: "Describe Issue", desc: "Speak or type your grievance. Our AI will analyze the legal context." },
      { title: "Review Draft", desc: "The platform generates a legally structured RTI draft in your language." },
      { title: "Select Authority", desc: "We suggest the correct department and provide state-specific filing links." },
      { title: "Submit RTI", desc: "Use the state portal to submit. We provide tracking advice and fee details." }
    ],
    faqs: [
      { q: "What is RTI?", a: "Right to Information (RTI) is an act of the Parliament of India which sets out the rules and procedures regarding citizens' right to information." },
      { q: "How much does it cost?", a: "The application fee is ₹10 for Central Government and varies by state (usually ₹10-₹50). BPL card holders are exempt." },
      { q: "How long does it take?", a: "Authorities must respond within 30 days. If life and liberty are involved, the response must come within 48 hours." },
      { q: "Can I file RTI in my language?", a: "Yes, our platform helps you draft in 5 major Indian languages, and Indian law supports filing in local vernaculars." }
    ],
    purityLabel: "Legally Compliant",
    purityDesc: "All drafts generated follow the standard RTI formats prescribed by the Government of India.",
    ruralTitle: "Rural & Offline Support",
    ruralSubtitle: "Tailored resources for citizens filing from villages and small towns.",
    offlineGuideTitle: "Offline Filing Guide",
    offlineSteps: [
      { q: "Using IPOs", a: "Purchase a ₹10 Indian Postal Order from any Post Office. Pay to: PIO, [Department Name]." },
      { q: "Court Fee Stamps", a: "In some states (e.g., UP, Bihar), you can paste a ₹10 Court Fee Stamp on the application." },
      { q: "Village Submissions", a: "Submit directly to the Panchayat Secretary or Block Development Officer (BDO)." }
    ],
    ruralTemplatesTitle: "Common Rural RTI Formats",
    templates: [
      { title: "MGNREGA", desc: "Request work muster rolls and pending wage payment details.", content: "Subject: Request for MGNREGA Work Details\n\n1. Provide the muster roll (attendance) for workers in [Village Name] for [Month/Year].\n2. Provide details of pending wage payments for Job Card No: [Your Number].\n3. Provide the list of approved works for the current financial year." },
      { title: "Ration (PDS)", desc: "Check entitlement vs actual distribution and shop stock registers.", content: "Subject: Request for PDS Distribution Records\n\n1. Provide the stock register of Fair Price Shop [Shop No/Name] for the last 3 months.\n2. Provide the distribution list highlighting the quantities of grains issued to Ration Card: [Your Number]." },
      { title: "Land Records", desc: "Request mutation status, land maps (Khasra/Khatauni), and gift deeds.", content: "Subject: Request for Land Record Status\n\n1. Provide the certified copy of Khasra/Khatauni for Plot No: [Plot No] in [Village Name].\n2. Provide the status of mutation (Dakhil-Kharij) request submitted on [Date]." }
    ],
    copyBtn: "Copy Template",
    copied: "Copied!",
    contactsTitle: "Who to Contact?",
    contactsSubtitle: "Identify the correct officer for your local area.",
    contacts: [
      { role: "Panchayat Secretary", level: "Village", info: "Responsible for village-level development and PMAY." },
      { role: "BDO / Block Officer", level: "Block", info: "Higher authority for MGNREGA and departmental schemes." },
      { role: "Tehsildar", level: "Tehsil", info: "Key officer for land records and income/caste certificates." }
    ],
    appealsTitle: "Appeals Process",
    appealsSubtitle: "When your RTI request is rejected or ignored.",
    appealsSteps: [
      { type: "First Appeal", time: "Within 30 Days", to: "First Appellate Authority (FAA)", desc: "File if you don't receive a response or are unsatisfied with the PIO's reply. The FAA is usually a senior officer in the same department." },
      { type: "Second Appeal", time: "Within 90 Days", to: "Information Commission (SIC/CIC)", desc: "If the First Appeal is also rejected. This goes to the State or Central Information Commission, an independent body." }
    ]
  },
  hi: {
    title: "सहायता एवं अक्सर पूछे जाने वाले प्रश्न",
    subtitle: "आरटीआई प्रणाली को नेविगेट करने और हमारे प्लेटफॉर्म का उपयोग करने के बारे में वह सब कुछ जो आपको जानना आवश्यक है।",
    getStarted: "शुरुआत करें",
    commonQuestions: "अक्सर पूछे जाने वाले प्रश्न",
    guideTitle: "चरण-दर-चरण मार्गदर्शिका",
    guideSteps: [
      { title: "समस्या बताएं", desc: "अपनी शिकायत बोलें या टाइप करें। हमारी एआई कानूनी संदर्भ का विश्लेषण करेगी।" },
      { title: "ड्राफ्ट की समीक्षा", desc: "प्लेटफॉर्म आपकी भाषा में कानूनी रूप से संरचित आरटीआई ड्राफ्ट तैयार करता है।" },
      { title: "प्राधिकरण चुनें", desc: "हम सही विभाग का सुझाव देते हैं और राज्य-विशिष्ट फाइलिंग लिंक प्रदान करते हैं।" },
      { title: "आरटीआई जमा करें", desc: "जमा करने के लिए राज्य पोर्टल का उपयोग करें। हम ट्रैकिंग सलाह और शुल्क विवरण प्रदान करते हैं।" }
    ],
    faqs: [
      { q: "आरटीआई क्या है?", a: "सूचना का अधिकार (आरटीआई) भारत की संसद का एक अधिनियम है जो नागरिकों के सूचना के अधिकार के संबंध में नियम और प्रक्रियाएं निर्धारित करता है।" },
      { q: "इसकी लागत कितनी है?", a: "केंद्र सरकार के लिए आवेदन शुल्क ₹10 है और राज्यों के अनुसार अलग-अलग होता है (आमतौर पर ₹10-₹50)। बीपीएल कार्ड धारकों को छूट दी गई है।" },
      { q: "इसमें कितना समय लगता है?", a: "प्राधिकारियों को 30 दिनों के भीतर जवाब देना होगा। यदि जीवन और स्वतंत्रता शामिल है, तो जवाब 48 घंटों के भीतर आना चाहिए।" },
      { q: "क्या मैं अपनी भाषा में आरटीआई फाइल कर सकता हूं?", a: "हां, हमारा प्लेटफॉर्म आपको 5 प्रमुख भारतीय भाषाओं में ड्राफ्ट करने में मदद करता है।" }
    ],
    purityLabel: "कानूनी रूप से अनुपालन",
    purityDesc: "तैयार किए गए सभी ड्राफ्ट भारत सरकार द्वारा निर्धारित मानक आरटीआई प्रारूपों का पालन करते हैं।",
    ruralTitle: "ग्रामीण और ऑफ़लाइन सहायता",
    ruralSubtitle: "गावों और छोटे शहरों से फाइल करने वाले नागरिकों के लिए विशेष संसाधन।",
    offlineGuideTitle: "ऑफ़लाइन फाइलिंग गाइड",
    offlineSteps: [
      { q: "आईपीओ का उपयोग", a: "किसी भी डाकघर से ₹10 का भारतीय डाक आदेश (IPO) खरीदें। देय: PIO, [विभाग का नाम]" },
      { q: "कोर्ट फीस स्टाम्प", a: "यूपी, बिहार जैसे राज्यों में आप आवेदन पर ₹10 का कोर्ट फीस स्टाम्प चिपका सकते हैं।" },
      { q: "ग्राम स्तर पर जमा", a: "सीधे पंचायत सचिव या प्रखंड विकास पदाधिकारी (BDO) को जमा करें।" }
    ],
    ruralTemplatesTitle: "सामान्य ग्रामीण आरटीआई प्रारूप",
    templates: [
      { title: "मनरेगा", desc: "कार्य मस्टर रोल और लंबित मजदूरी भुगतान विवरण का अनुरोध करें।", content: "विषय: मनरेगा कार्य विवरण के लिए अनुरोध\n\n1. [महीना/वर्ष] के लिए [गांव का नाम] में श्रमिकों के मस्टर रोल (उपस्थिति) प्रदान करें।\n2. जॉब कार्ड नंबर: [आपका नंबर] के लिए लंबित मजदूरी भुगतान का विवरण प्रदान करें।" },
      { title: "राशन (PDS)", desc: "पात्रता बनाम वास्तविक वितरण और दुकान स्टॉक रजिस्टर की जांच करें।", content: "विषय: पीडीएस वितरण रिकॉर्ड के लिए अनुरोध\n\n1. पिछले 3 महीनों के लिए उचित मूल्य की दुकान [दुकान नंबर/नाम] का स्टॉक रजिस्टर प्रदान करें।\n2. राशन कार्ड: [आपका नंबर] को जारी किए गए अनाज की मात्रा पर प्रकाश डालते हुए वितरण सूची प्रदान करें।" },
      { title: "भूमि रिकॉर्ड", desc: "नामांतरण स्थिति, भूमि मानचित्र (खसरा/खतौनी) का अनुरोध करें।", content: "विषय: भूमि रिकॉर्ड स्थिति के लिए अनुरोध\n\n1. [गांव का नाम] में प्लॉट नंबर: [प्लॉट नंबर] के लिए खसरा/खतौनी की प्रमाणित प्रति प्रदान करें।\n2. [तारीख] को जमा किए गए नामांतरण (दाखिल-खारिज) अनुरोध की स्थिति प्रदान करें।" }
    ],
    copyBtn: "प्रारूप कॉपी करें",
    copied: "कॉपी किया गया!",
    contactsTitle: "किससे संपर्क करें?",
    contactsSubtitle: "अपने स्थानीय क्षेत्र के लिए सही अधिकारी की पहचान करें।",
    contacts: [
      { role: "पंचायत सचिव", level: "ग्राम", info: "ग्राम स्तरीय विकास और आवास योजना के लिए जिम्मेदार।" },
      { role: "BDO / ब्लॉक अधिकारी", level: "ब्लॉक", info: "मनरेगा और विभागीय योजनाओं के लिए उच्च अधिकारी।" },
      { role: "तहसीलदार", level: "तहसील", info: "भूमि रिकॉर्ड और आय/जाति प्रमाण पत्र के लिए प्रमुख अधिकारी।" }
    ],
    appealsTitle: "अपील प्रक्रिया",
    appealsSubtitle: "जब आपका आरटीआई अनुरोध खारिज कर दिया जाए या अनदेखा किया जाए।",
    appealsSteps: [
      { type: "प्रथम अपील", time: "30 दिनों के भीतर", to: "प्रथम अपीलीय प्राधिकरण (FAA)", desc: "यदि आपको जवाब नहीं मिलता है या आप पीआईओ के जवाब से संतुष्ट नहीं हैं। FAA आमतौर पर उसी विभाग में एक वरिष्ठ अधिकारी होता है।" },
      { type: "द्वितीय अपील", time: "90 दिनों के भीतर", to: "सूचना आयोग (SIC/CIC)", desc: "यदि पहली अपील भी खारिज कर दी जाती है। यह राज्य या केंद्रीय सूचना आयोग को जाती है, जो एक स्वतंत्र निकाय है।" }
    ]
  },
  ta: {
    title: "உதவி & அடிக்கடி கேட்கப்படும் கேள்விகள்",
    subtitle: "தகவல் அறியும் உரிமைச் சட்டத்தைப் பயன்படுத்துவது மற்றும் எமது தளத்தைப் பயன்படுத்துவது பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்.",
    getStarted: "தொடங்குதல்",
    commonQuestions: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    guideTitle: "படிப்படியான வழிகாட்டி",
    guideSteps: [
      { title: "பிரச்சினையை விவரிக்கவும்", desc: "உங்கள் குறையைச் சொல்லுங்கள் அல்லது தட்டச்சு செய்யுங்கள். எமது AI சட்ட சூழலை ஆய்வு செய்யும்." },
      { title: "வரைவை மதிப்பாய்வு செய்யவும்", desc: "எமது தளம் உங்கள் மொழியில் சட்டப்பூர்வமாக கட்டமைக்கப்பட்ட ஆர்டிஐ வரைவை உருவாக்குகிறது." },
      { title: "அதிகார அமைப்பைத் தேர்ந்தெடுக்கவும்", desc: "சரியான துறையை நாங்கள் பரிந்துரைத்து, மாநிலம் சார்ந்த தாக்கல் இணைப்புகளை வழங்குகிறோம்." },
      { title: "ஆர்டிஐ தாக்கல் செய்யவும்", desc: "தாக்கல் செய்ய மாநில போர்டலைப் பயன்படுத்தவும். கண்காணிப்பு ஆலோசனை மற்றும் கட்டண விவரங்களை நாங்கள் வழங்குகிறோம்." }
    ],
    faqs: [
      { q: "ஆர்டிஐ என்றால் என்ன?", a: "தகவல் அறியும் உரிமைச் சட்டம் (RTI) என்பது இந்திய நாடாளுமன்றத்தின் ஒரு சட்டமாகும், இது குடிமக்களின் தகவல் அறியும் உரிமை தொடர்பான விதிகள் மற்றும் நடைமுறைகளை வகுக்கிறது." },
      { q: "இதற்கு எவ்வளவு செலவாகும்?", a: "மத்திய அரசுக்கு விண்ணப்பக் கட்டணம் ₹10, மாநிலங்களுக்கு ஏற்ப மாறுபடும் (பொதுவாக ₹10-₹50). பிபிஎல் கார்டு வைத்திருப்பவர்களுக்கு விலக்கு உண்டு." },
      { q: "இதற்கு எவ்வளவு நேரம் ஆகும்?", a: "அதிகாரிகள் 30 நாட்களுக்குள் பதிலளிக்க வேண்டும். உயிர் மற்றும் சுதந்திரம் சம்பந்தப்பட்டிருந்தால், 48 மணி நேரத்திற்குள் பதில் வர வேண்டும்." },
      { q: "எனது மொழியில் ஆர்டிஐ தாக்கல் செய்யலாமா?", a: "ஆம், எமது தளம் 5 முக்கிய இந்திய மொழிகளில் வரைவு செய்ய உதவுகிறது." }
    ],
    purityLabel: "சட்டப்பூர்வமாக இணக்கமானது",
    purityDesc: "உருவாக்கப்பட்ட அனைத்து வரைவுகளும் இந்திய அரசாங்கத்தால் பரிந்துரைக்கப்பட்ட தரமான ஆர்டிஐ படிவங்களைப் பின்பற்றுகின்றன.",
    ruralTitle: "கிராமப்புற மற்றும் ஆஃப்லைன் ஆதரவு",
    ruralSubtitle: "கிராமங்கள் மற்றும் சிறிய நகரங்களில் இருந்து விண்ணப்பிக்கும் குடிமக்களுக்கான பிரத்யேக வளங்கள்.",
    offlineGuideTitle: "ஆஃப்லைன் தாக்கல் வழிகாட்டி",
    offlineSteps: [
      { q: "IPO-களைப் பயன்படுத்துதல்", a: "எந்த அஞ்சலகத்திலிருந்தும் ₹10 மதிப்பிலான இந்திய அஞ்சல் ஆணையை (IPO) வாங்கவும். செலுத்துதல்: PIO, [துறை பெயர்]." },
      { q: "நீதிமன்றக் கட்டண முத்திரைகள்", a: "சில மாநிலங்களில் விண்ணப்பத்தில் ₹10 நீதிமன்றக் கட்டண முத்திரையை ஒட்டலாம்." },
      { q: "கிராமப்புற சமர்ப்பிப்புகள்", a: "ஊராட்சிச் செயலர் அல்லது வட்டார வளர்ச்சி அலுவலரிடம் (BDO) நேரடியாகச் சமர்ப்பிக்கவும்." }
    ],
    ruralTemplatesTitle: "பொதுவான கிராமப்புற ஆர்டிஐ படிவங்கள்",
    templates: [
      { title: "மகாத்மா காந்தி ஊரக வேலைவாய்ப்பு திட்டம்", desc: "வேலை வருகைப் பட்டியல் மற்றும் நிலுவையில் உள்ள ஊதிய விவரங்களைக் கோரவும்.", content: "பொருள்: மகாத்மா காந்தி ஊரக வேலைவாய்ப்பு திட்ட விவரங்களைக் கோருதல்\n\n1. [கிராமத்தின் பெயர்] கிராமத்தில் [மாதம்/ஆண்டு] பணியாற்றிய தொழிலாளர்களின் வருகைப் பட்டியலை வழங்கவும்.\n2. வேலை அட்டை எண்: [உங்கள் எண்] க்கான நிலுவையில் உள்ள ஊதிய விவரங்களை வழங்கவும்." },
      { title: "ரேஷன் (PDS)", desc: "உரிமை மற்றும் விநியோகம் மற்றும் கடை இருப்புப் பதிவேடுகளைச் சரிபார்க்கவும்.", content: "பொருள்: ரேஷன் விநியோகப் பதிவேடுகளைக் கோருதல்\n\n1. நியாயவிலைக் கடை [கடை எண்/பெயர்] கடந்த 3 மாதங்களுக்கான இருப்புப் பதிவேட்டை வழங்கவும்.\n2. ரேஷன் கார்டு: [உங்கள் எண்] விநியோகிக்கப்பட்ட தானியங்களின் அளவை விளக்கும் பட்டியலை வழங்கவும்." },
      { title: "நிலப் பதிவேடுகள்", desc: "பட்டா மாறுதல் நிலை மற்றும் நில வரைபடங்களைக் கோரவும்.", content: "பொருள்: நிலப் பதிவேடு நிலை குறித்த தகவல் கோருதல்\n\n1. [கிராமத்தின் பெயர்] கிராமத்தில் உள்ள புல எண்: [புல எண்] க்கான சான்றளிக்கப்பட்ட பட்டா நகலை வழங்கவும்.\n2. [தேதி] அன்று சமர்ப்பிக்கப்பட்ட பட்டா மாறுதல் கோரிக்கையின் நிலையை வழங்கவும்." }
    ],
    copyBtn: "படிவத்தை நகலெடுக்கவும்",
    copied: "நகலெடுக்கப்பட்டது!",
    contactsTitle: "யாரைத் தொடர்பு கொள்வது?",
    contactsSubtitle: "உங்கள் உள்ளூர் பகுதிக்கான சரியான அதிகாரியை அடையாளம் காணவும்.",
    contacts: [
      { role: "ஊராட்சிச் செயலாளர்", level: "கிராமம்", info: "கிராம அளவிலான வளர்ச்சி மற்றும் வீட்டுத் திட்டங்களுக்குப் பொறுப்பு." },
      { role: "BDO / வட்டார வளர்ச்சி அலுவலர்", level: "வட்டாரம்", info: "ஊரக வேலைவாய்ப்பு மற்றும் துறை சார்ந்த திட்டங்களுக்கான உயர் அதிகారి." },
      { role: "வட்டாட்சியர்", level: "வட்டம்", info: "நிலப் பதிவேடுகள் மற்றும் வருமான/சாதிச் சான்றிதழ்களுக்கான முக்கிய அதிகாரி." }
    ],
    appealsTitle: "மேல்முறையீட்டு நடைமுறை",
    appealsSubtitle: "உங்கள் ஆர்டிஐ கோரிக்கை நிராகரிக்கப்பட்டாலோ அல்லது புறக்கணிக்கப்பட்டாலோ.",
    appealsSteps: [
      { type: "முதல் மேல்முறையீடு", time: "30 நாட்களுக்குள்", to: "முதல் மேல்முறையீட்டு ஆணையம் (FAA)", desc: "உங்களுக்கு பதில் வரவில்லை என்றால் அல்லது பிஐஓ-வின் பதிலில் திருப்தி இல்லை என்றால் இதை தாக்கல் செய்யலாம்." },
      { type: "இரண்டாவது மேல்முறையீடு", time: "90 நாட்களுக்குள்", to: "தகவல் ஆணையம் (SIC/CIC)", desc: "முதல் மேல்முறையீடும் நிராகரிக்கப்பட்டால், இது மாநில அல்லது மத்திய தகவல் ஆணையத்திற்கு செல்லும்." }
    ]
  },
  kn: {
    title: "ಸಹಾಯ ಮತ್ತು FAQ",
    subtitle: "ಆರ್ ಟಿ ಐ ವ್ಯವಸ್ಥೆ ಮತ್ತು ನಮ್ಮ ವೇದಿಕೆಯ ಬಳಕೆಯ ಬಗ್ಗೆ ನೀವು ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಎಲ್ಲವೂ.",
    getStarted: "ಪ್ರಾರಂಭಿಸುವುದು",
    commonQuestions: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    guideTitle: "ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶಿ",
    guideSteps: [
      { title: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ", desc: "ನಿಮ್ಮ ದೂರನ್ನು ಧ್ವನಿ ಮೂಲಕ ಅಥವಾ ಟೈಪ್ ಮಾಡುವ ಮೂಲಕ ತಿಳಿಸಿ. ನಮ್ಮ AI ಕಾನೂನು ಚೌಕಟ್ಟನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ." },
      { title: "ಕರಡನ್ನು ಪರಿಶೀಲಿಸಿ", desc: "ವೇದಿಕೆಯು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕಾನೂನುಬದ್ಧವಾಗಿ ರಚಿಸಲಾದ ಆರ್ ಟಿ ಐ ಕರಡನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ." },
      { title: "ಪ್ರಾಧಿಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ", desc: "ನಾವು ಸರಿಯಾದ ಇಲಾಖೆಯನ್ನು ಸೂಚಿಸುತ್ತೇವೆ ಮತ್ತು ರಾಜ್ಯ-ನಿರ್ದಿಷ್ಟ ಸಲ್ಲಿಕೆ ಲಿಂಕ್‌ಗಳನ್ನು ನೀಡುತ್ತೇವೆ." },
      { title: "ಆರ್ ಟಿ ಐ ಸಲ್ಲಿಸಿ", desc: "ಸಲ್ಲಿಸಲು ರಾಜ್ಯ ಪೋರ್ಟಲ್ ಬಳಸಿ. ನಾವು ಟ್ರ್ಯಾಕಿಂಗ್ ಸಲಹೆ ಮತ್ತು ಶುಲ್ಕದ ವಿವರಗಳನ್ನು ನೀಡುತ್ತೇವೆ." }
    ],
    faqs: [
      { q: "ಆರ್ ಟಿ ಐ ಎಂದರೇನು?", a: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯಿದೆ (RTI) ಭಾರತದ ಸಂಸತ್ತಿನ ಒಂದು ಕಾಯಿದೆಯಾಗಿದ್ದು, ಇದು ನಾಗರಿಕರ ಮಾಹಿತಿ ಹಕ್ಕಿನ ನಿಯಮಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ." },
      { q: "ಇದಕ್ಕೆ ಎಷ್ಟು ವೆಚ್ಚವಾಗುತ್ತದೆ?", a: "ಕೇಂದ್ರ ಸರ್ಕಾರಕ್ಕೆ ಅರ್ಜಿ ಶುಲ್ಕ ₹10 ಮತ್ತು ರಾಜ್ಯಗಳ ಪ್ರಕಾರ ಬದಲಾಗುತ್ತದೆ (ಸಾಮಾನ್ಯವಾಗಿ ₹10-₹50). ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರಿಗೆ ವಿನಾಯಿತಿ ಇದೆ." },
      { q: "ಇದಕ್ಕೆ ಎಷ್ಟು ಸಮಯ ಬೇಕಾಗುತ್ತದೆ?", a: "ಪ್ರಾಧಿಕಾರಗಳು 30 ದಿನಗಳೊಳಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಬೇಕು. ಜೀವ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದರೆ, 48 ಗಂಟೆಗಳ ಒಳಗೆ ಉತ್ತರ ಬರಬೇಕು." },
      { q: "ನಾನು ನನ್ನ ಭಾಷೆಯಲ್ಲಿ ಆರ್ ಟಿ ಐ ಸಲ್ಲಿಸಬಹುದೇ?", a: "ಹೌದು, ನಮ್ಮ ವೇದಿಕೆಯು 5 ಪ್ರಮುಖ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಕರಡು ಸಿದ್ಧಪಡಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ." }
    ],
    purityLabel: "ಕಾನೂನುಬದ್ಧವಾಗಿ ಸರಿಹೊಂದುತ್ತದೆ",
    purityDesc: "ಸಿದ್ಧಪಡಿಸಲಾದ ಎಲ್ಲಾ ಕರಡುಗಳು ಭಾರತ ಸರ್ಕಾರ ಸೂಚಿಸಿದ ಪ್ರಮಾಣಿತ ಆರ್ ಟಿ ಐ ಸ್ವರೂಪಗಳನ್ನು ಅನುಸರಿಸುತ್ತವೆ.",
    ruralTitle: "ಗ್ರಾಮೀಣ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಬೆಂಬಲ",
    ruralSubtitle: "ಹಳ್ಳಿಗಳು ಮತ್ತು ಸಣ್ಣ ಪಟ್ಟಣಗಳಿಂದ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ನಾಗರಿಕರಿಗಾಗಿ ವಿಶೇಷ ಸಂಪನ್ಮೂಲಗಳು.",
    offlineGuideTitle: "ಆಫ್‌ಲೈನ್ ಸಲ್ಲಿಕೆ ಮಾರ್ಗದರ್ಶಿ",
    offlineSteps: [
      { q: "IPO ಗಳ ಬಳಕೆ", a: "ಯಾವುದೇ ಅಂಚೆ ಕಚೇರಿಯಿಂದ ₹10 ರ ಭಾರತೀಯ ಅಂಚೆ ಆದೇಶವನ್ನು (IPO) ಖರೀದಿಸಿ. ಕಳುಹಿಸಿ: PIO, [ಇಲಾಖೆಯ ಹೆಸರು]." },
      { q: "ಕೋರ್ಟ್ ಫೀ ಸ್ಟ್ಯಾಂಪ್‌", a: "ಕೆಲವು ರಾಜ್ಯಗಳಲ್ಲಿ ಅರ್ಜಿಯ ಮೇಲೆ ₹10 ರ ಕೋರ್ಟ್ ಫೀ ಸ್ಟ್ಯಾಂಪ್ ಅನ್ನು ಅಂಟಿಸಬಹುದು." },
      { q: "ಗ್ರಾಮ ಮಟ್ಟದ ಸಲ್ಲಿಕೆ", a: "ನೇರವಾಗಿ ಪಂಚಾಯತ್ ಕಾರ್ಯದರ್ಶಿ ಅಥವಾ ಬ್ಲಾಕ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗೆ (BDO) ಸಲ್ಲಿಸಿ." }
    ],
    ruralTemplatesTitle: "ಸಾಮಾನ್ಯ ಗ್ರಾಮೀಣ ಆರ್ ಟಿ ಐ ಕರಡುಗಳು",
    templates: [
      { title: "ಮನರೇಗಾ (MGNREGA)", desc: "ಕೆಲಸದ ವಿವರಗಳು ಮತ್ತು ಬಾಕಿ ವೇತನ ಪಾವತಿಯ ವಿವರಗಳನ್ನು ವಿನಂತಿಸಿ.", content: "ವಿಷಯ: ಮನರೇಗಾ ಕೆಲಸದ ವಿವರಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಕೋರಿ ಅರ್ಜಿ\n\n1. [ತಿಂಗಳು/ವರ್ಷ] ಅವಧಿಯ [ಗ್ರಾಮದ ಹೆಸರು] ಕೆಲಸಗಾರರ ಹಾಜರಾತಿ ಪ್ರತಿಯನ್ನು ನೀಡಿ.\n2. ಜಾಬ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ: [ನಿಮ್ಮ ಸಂಖ್ಯೆ] ಬಾಕಿ ಇರುವ ವೇತನ ಪಾವತಿಯ ವಿವರಗಳನ್ನು ನೀಡಿ." },
      { title: "ರೇಷನ್ (PDS)", desc: "ಹಂಚಿಕೆ ಮತ್ತು ನಿಜವಾದ ವಿತರಣೆ ಹಾಗೂ ಅಂಗಡಿಯ ದಾಸ್ತಾನು ರಿಜಿಸ್ಟರ್ ಪರಿಶೀಲಿಸಿ.", content: "ವಿಷಯ: ರೇಷನ್ ವಿತರಣಾ ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಕೋರಿ ಅರ್ಜಿ\n\n1. ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ [ಅಂಗಡಿ ಸಂಖ್ಯೆ/ಹೆಸರು] ಕಳೆದ 3 ತಿಂಗಳ ದಾಸ್ತಾನು ರಿಜಿಸ್ಟರ್ ಪ್ರತಿಯನ್ನು ನೀಡಿ.\n2. ರೇಷನ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ: [ನಿಮ್ಮ ಸಂಖ್ಯೆ] ಗೆ ವಿತರಿಸಲಾದ ಧಾನ್ಯದ ಪ್ರಮಾಣದ ವಿವರ ನೀಡಿ." },
      { title: "ಭೂ ದಾಖಲೆಗಳು", desc: "ಖಾತೆ ಬದಲಾವಣೆ ಮಾಹಿತಿ ಮತ್ತು ಭೂಮಿಯ ನಕ್ಷೆಗಳನ್ನು ವಿನಂತಿಸಿ.", content: "ವಿಷย: ಭೂ ದಾಖಲೆಗಳ ಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಮಾಹಿತಿ ಕೋರಿ ಅರ್ಜಿ\n\n1. [ಗ್ರಾಮದ ಹೆಸರು] ಗ್ರಾಮದ ಸರ್ವೆ ಸಂಖ್ಯೆ: [ಸರ್ವೆ ಸಂಖ್ಯೆ] ರ ಪಹಣಿ (RTC) ಯನ್ನು ನೀಡಿ.\n2. [ದಿನಾಂಕ] ರಂದು ಸಲ್ಲಿಸಲಾದ ಖಾತೆ ಬದಲಾವಣೆ ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿಸಿ." }
    ],
    copyBtn: "ಕರಡು ನಕಲಿಸಿ",
    copied: "ನಕಲಿಸಲಾಗಿದೆ!",
    contactsTitle: "ಯಾರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು?",
    contactsSubtitle: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪ್ರದೇಶಕ್ಕೆ ಸರಿಯಾದ ಅಧಿಕಾರಿಯನ್ನು ಗುರುತಿಸಿ.",
    contacts: [
      { role: "ಪಂಚಾಯತ್ ಕಾರ್ಯದರ್ಶಿ", level: "ಗ್ರಾಮ", info: "ಗ್ರಾಮ ಮಟ್ಟದ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ವಸತಿ ಯೋಜನೆಗಳ ಜವಾಬ್ದಾರಿ." },
      { role: "BDO / ಬ್ಲಾಕ್ ಅಧಿಕಾರಿ", level: "ಬ್ಲಾಕ್", info: "ಮನರೇಗಾ ಮತ್ತು ಇಲಾಖಾ ಯೋಜನೆಗಳ ಉನ್ನತ ಅಧಿಕಾರಿ." },
      { role: "ತಹಶೀಲ್ದಾರ್", level: "ತಹಶೀಲ್", info: "ಭೂ ದಾಖಲೆಗಳು ಮತ್ತು ಆದಾಯ/ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳ ಪ್ರಮುಖ ಅಧಿಕಾರಿ." }
    ],
    appealsTitle: "ಮೇಲ್ಮನವಿ ಪ್ರಕ್ರಿಯೆ",
    appealsSubtitle: "ನಿಮ್ಮ ಆರ್ ಟಿ ಐ ವಿನಂತಿಯನ್ನು ತಿರಸ್ಕರಿಸಿದಾಗ ಅಥವಾ ನಿರ್ಲಕ್ಷಿಸಿದಾಗ.",
    appealsSteps: [
      { type: "ಮೊದಲ ಮೇಲ್ಮನವಿ", time: "30 ದಿನಗಳೊಳಗೆ", to: "ಮೊದಲ ಮೇಲ್ಮನವಿ ಪ್ರಾಧಿಕಾರ (FAA)", desc: "ನಿಮಗೆ ಪ್ರತಿಕ್ರಿಯೆ ಬರದಿದ್ದರೆ ಅಥವಾ ಪಿಐಒ ಉತ್ತರದಿಂದ ತೃಪ್ತರಾಗದಿದ್ದರೆ ಇದನ್ನು ಸಲ್ಲಿಸಿ." },
      { type: "ಎರಡನೇ ಮೇಲ್ಮನವಿ", time: "90 ದಿನಗಳೊಳಗೆ", to: "ಮಾಹಿತಿ ಆಯೋಗ (SIC/CIC)", desc: "ಮೊದಲ ಮೇಲ್ಮನವಿಯೂ ತಿರಸ್ಕೃತಗೊಂಡರೆ, ಇದು ರಾಜ್ಯ ಅಥವಾ ಕೇಂದ್ರ ಮಾಹಿತಿ ಆಯೋಗಕ್ಕೆ ಹೋಗುತ್ತದೆ." }
    ]
  },
  te: {
    title: "సహాయం & తరచుగా అడిగే ప్రశ్నలు",
    subtitle: "ఆర్‌టిఐ వ్యవస్థ మరియు మా ప్లాట్‌ఫారమ్ వాడకం గురించి మీరు తెలుసుకోవలసిన ప్రతిదీ.",
    getStarted: "మొదలుపెట్టండి",
    commonQuestions: "తరచుగా అడిగే ప్రశ్నలు",
    guideTitle: "దశల వారీ మార్గదర్శి",
    guideSteps: [
      { title: "సమస్యను వివరించండి", desc: "మీ ఫిర్యాదును వాయిస్ లేదా టైప్ ద్వారా చెప్పండి. మా AI చట్టపరమైన అంశాలను విశ్లేషిస్తుంది." },
      { title: "డ్రాఫ్ట్‌ను సమీక్షించండి", desc: "మా ప్లాట్‌ఫారమ్ మీ భాషలో చట్టబద్ధమైన ఆర్‌టిఐ డ్రాఫ్ట్‌ను రూపొందిస్తుంది." },
      { title: "అథారిటీని ఎంచుకోండి", desc: "మేము సరైన విభాగాన్ని సూచిస్తాము మరియు రాష్ట్ర స్థాయి ఫైలింగ్ లింక్‌లను అందిస్తాము." },
      { title: "ఆర్‌టిఐ సమర్పించండి", desc: "సమర్పించడానికి రాష్ట్ర పోర్టల్‌ను ఉపయోగించండి. మేము ట్రాకింగ్ సలహా మరియు ఫీజు వివరాలను అందిస్తాము." }
    ],
    faqs: [
      { q: "ఆర్‌టిఐ అంటే ఏమిటి?", a: "సమాచార హక్కు (RTI) అనేది భారత పార్లమెంటు చట్టం, ఇది పౌరుల సమాచార హక్కుకు సంబంధించిన నిబంధనలు మరియు విధానాలను నిర్దేశిస్తుంది." },
      { q: "దీనికి ఎంత ఖర్చవుతుంది?", a: "కేంద్ర ప్రభుత్వానికి దరఖాస్తు రుసుము ₹10 మరియు రాష్ట్రాలను బట్టి మారుతుంది (సాధారణంగా ₹10-₹50). బిపిఎల్ కార్డ్ హోల్డర్లకు మినహాయింపు ఉంది." },
      { q: "దీనికి ఎంత సమయం పడుతుంది?", a: "అధికారులు 30 రోజుల్లోపు స్పందించాలి. ప్రాణ మరియు స్వేచ్ఛకు సంబంధించిన విషయమైతే, 48 గంటల్లో సమాధానం రావాలి." },
      { q: "నేను నా భాషలో ఆర్‌టిఐ ఫైల్ చేయవచ్చా?", a: "అవును, మా ప్లాట్‌ఫారమ్ 5 ప్రధాన భారతీయ భాషలలో డ్రాఫ్ట్ చేయడానికి సహాయపడుతుంది." }
    ],
    purityLabel: "చట్టబద్ధంగా సరైనది",
    purityDesc: "రూపొందించబడిన అన్ని డ్రాఫ్ట్‌లు భారత ప్రభుత్వం సూచించిన ప్రమాణాల ప్రకారం ఉంటాయి.",
    ruralTitle: "గ్రామీణ & ఆఫ్ లైన్ మద్దతు",
    ruralSubtitle: "గ్రామాలు మరియు చిన్న పట్టణాల నుండి దరఖాస్తు చేసే పౌరుల కోసం ప్రత్యేక వనరులు.",
    offlineGuideTitle: "ఆఫ్ లైన్ ఫైలింగ్ గైడ్",
    offlineSteps: [
      { q: "IPOల వాడకం", a: "ఏదైనా పోస్ట్ ఆఫీస్ నుండి ₹10 భారతీయ పోస్టల్ ఆర్డర్ (IPO) కొనండి. చెల్లించాల్సిన వారు: PIO, [శాఖ పేరు]." },
      { q: "కోర్టు ఫీజు స్టాంపులు", a: "కొన్ని రాష్ట్రాల్లో దరఖాస్తుపై ₹10 కోర్టు ఫీజు స్టాంపును అతికించవచ్చు." },
      { q: "గ్రామ స్థాయి సమర్పణలు", a: "నేరుగా పంచాయతీ కార్యదర్శికి లేదా బ్లాక్ డెవలప్‌మెంట్ ఆఫీసర్‌కు (BDO) సమర్పించండి." }
    ],
    ruralTemplatesTitle: "సాధారణ గ్రామీణ ఆర్‌టిఐ ఫార్మాట్లు",
    templates: [
      { title: "ఉపాధి హామీ (MGNREGA)", desc: "పని మస్టర్ రోల్స్ మరియు పెండింగ్ కూలీ చెల్లింపు వివరాలను కోరండి.", content: "విషయం: ఉపాధి హామీ పని వివరాల కోసం అభ్యర్థన\n\n1. [నెల/సంవత్సరం] కాలానికి [గ్రామం పేరు] లో పనిచేసిన కూలీల మస్టర్ రోల్ వివరాలు ఇవ్వగలరు.\n2. జాబ్ కార్డు సంఖ్య: [మీ నంబర్] కు రావాల్సిన పెండింగ్ కూలీ డబ్బుల వివరాలు ఇవ్వగలరు." },
      { title: "రేషన్ (PDS)", desc: "అర్హత vs వాస్తవ పంపిణీ మరియు షాప్ స్టాక్ రిజిస్టర్‌లను తనిఖీ చేయండి.", content: "విషయం: రేషన్ పంపిణీ రికార్డుల కోసం అభ్యర్థన\n\n1. రేషన్ షాపు [షాపు నంబర్/పేరు] గత 3 నెలల స్టాక్ రిజిస్టరు వివరాలు ఇవ్వగలరు.\n2. రేషన్ కార్డు సంఖ్య: [మీ నంబర్] కు పంపిణీ చేసిన బియ్యం/సరుకుల వివరాలు ఇవ్వగలరు." },
      { title: "భూమి రికార్డులు", desc: "మ్యుటేషన్ స్థితి మరియు భూమి మ్యాప్ ల కోసం అభ్యర్థించండి.", content: "విషయం: భూమి రికార్డుల స్థితి కోసం అభ్యర్థన\n\n1. [గ్రామం పేరు] లోని సర్వే నంబర్: [సర్వే నంబర్] కు సంబంధించిన అడంగల్/పహాణీ నకలు ఇవ్వగలరు.\n2. [తేదీ] నాడు సమర్పించిన మ్యుటేషన్ అభ్యర్థన స్థితిని తెలియజేయగలరు." }
    ],
    copyBtn: "ఫార్మాట్‌ను కాపీ చేయండి",
    copied: "కాపీ చేయబడింది!",
    contactsTitle: "ఎవరిని సంప్రదించాలి?",
    contactsSubtitle: "మీ స్థానిక ప్రాంతం కోసం సరైన అధికారిని గుర్తించండి.",
    contacts: [
      { role: "పంచాయతీ కార్యదర్శి", level: "గ్రామం", info: "గ్రామ స్థాయి అభివృద్ధి మరియు హౌసింగ్ పథకాల బాధ్యత." },
      { role: "BDO / బ్లాక్ అధికారి", level: "బ్లాక్", info: "ఉపాధి హామీ మరియు ఇతర శాఖాపరమైన పథకాల ఉన్నతాధికారి." },
      { role: "తహశీల్దార్", level: "తహశీల్", info: "భూమి రికార్డులు మరియు ఆదాయ/కుల ధృవీకరణ పత్రాల ముఖ్య అధికారి." }
    ],
    appealsTitle: "అప్పీల్ ప్రక్రియ",
    appealsSubtitle: "మీ ఆర్‌టిఐ అభ్యర్థన తిరస్కరించబడినప్పుడు లేదా పట్టించుకోనప్పుడు.",
    appealsSteps: [
      { type: "మొదటి అప్పీల్", time: "30 రోజుల్లోపు", to: "మొదటి అప్పీలేట్ అథారిటీ (FAA)", desc: "మీకు సమాధానం రాకపోయినా లేదా పిఐఓ సమాధానంతో సంతృప్తి చెందకపోయినా దీన్ని ఫైల్ చేయాలి." },
      { type: "రెండవ అప్పీల్", time: "90 రోజుల్లోపు", to: "సమాచార కమిషన్ (SIC/CIC)", desc: "మొదటి అప్పీల్ కూడా తిరస్కరించబడితే, ఇది రాష్ట్ర లేదా కేంద్ర సమాచార కమిషన్‌కు వెళుతుంది." }
    ]
  }
};

export default function HelpPage() {
  const { language } = useLanguage();
  const t = HELP_TRANSLATIONS[language] || HELP_TRANSLATIONS.en;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex bg-primary/10 p-3 md:p-4 rounded-2xl md:rounded-3xl mb-4 md:mb-6 border border-primary/20">
          <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3 md:mb-4 tracking-tight leading-tight">{t.title}</h1>
        <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
        <section>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t.guideTitle}</h2>
          </div>
          <div className="space-y-6">
            {t.guideSteps.map((step: any, idx: number) => (
              <div key={idx} className="flex gap-4 md:gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-base md:text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform shrink-0">
                    {idx + 1}
                  </div>
                  {idx < t.guideSteps.length - 1 && <div className="w-0.5 h-full bg-border my-2"></div>}
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
              <h3 className="text-lg md:text-xl font-black text-foreground">{t.purityLabel}</h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">{t.purityDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 md:p-6 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 group hover:border-emerald-500 transition-all cursor-default">
              <Zap className="w-6 h-6 text-emerald-500 mb-2 md:mb-3 group-hover:animate-pulse" />
              <h4 className="font-bold text-foreground text-sm md:text-base">AI Intelligence</h4>
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Advanced Llama 3 Analysis</p>
            </Card>
            <Card className="p-5 md:p-6 border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 group hover:border-blue-500 transition-all cursor-default">
              <Globe className="w-6 h-6 text-blue-500 mb-2 md:mb-3 group-hover:animate-spin-slow" />
              <h4 className="font-bold text-foreground text-sm md:text-base">Multilingual</h4>
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">5+ Indian Languages</p>
            </Card>
          </div>
        </section>
      </div>

      <section className="mt-16 md:mt-24">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Info className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-black text-foreground">{t.appealsTitle}</h2>
        </div>
        <p className="text-base text-muted-foreground mb-6 md:mb-8">{t.appealsSubtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {(t.appealsSteps || []).map((step: any, idx: number) => (
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
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 md:mb-4">{t.ruralTitle}</h2>
          <p className="text-sm md:text-base text-muted-foreground px-4">{t.ruralSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="p-6 md:p-8 border-orange-100 dark:border-orange-950/30 bg-orange-50/20 dark:bg-orange-950/10 relative overflow-hidden group rounded-3xl md:rounded-[40px]">
            <Mail className="absolute -right-4 -top-4 w-20 md:w-24 h-20 md:h-24 text-orange-500/10 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg md:text-xl font-bold text-orange-700 dark:text-orange-400 mb-5 md:mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" /> {t.offlineGuideTitle}
            </h3>
            <div className="space-y-5 md:space-y-6">
              {(t.offlineSteps || []).map((step: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <p className="text-sm font-bold text-foreground">{step.q}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.a}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8 lg:col-span-2 border-border/60 bg-card/40 rounded-3xl md:rounded-[40px]">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-5 md:mb-6 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" /> {t.ruralTemplatesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(t.templates || []).map((tpl: any, idx: number) => (
                <div key={idx} className="p-5 bg-muted/40 rounded-2xl border border-border group hover:border-primary transition-all flex flex-col justify-between">
                  <div>
                    <Map className="w-5 h-5 text-primary/40 mb-3 group-hover:text-primary transition-colors" />
                    <h4 className="font-bold text-foreground mb-2 text-sm">{tpl.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{tpl.desc}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(tpl.content);
                      const btn = document.getElementById(`copy-tpl-${idx}`);
                      if (btn) btn.innerText = t.copied;
                      setTimeout(() => { if (btn) btn.innerText = t.copyBtn; }, 2000);
                    }}
                    id={`copy-tpl-${idx}`}
                    className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold rounded-lg transition-all flex items-center justify-center text-center gap-1.5"
                  >
                    <Copy className="w-3 h-3" /> {t.copyBtn}
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
              <h2 className="text-xl md:text-2xl font-black text-foreground">{t.contactsTitle}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{t.contactsSubtitle}</p>
            <div className="space-y-4">
              {(t.contacts || []).map((contact: any, idx: number) => (
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
                <Mail className="w-10 h-10 md:w-12 md:h-12 text-primary" />
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
        <a href="/input" className="inline-flex items-center gap-2 md:gap-3 bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg primary-glow hover:scale-105 transition-all">
          Start Now <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>
    </div>
  );
}
