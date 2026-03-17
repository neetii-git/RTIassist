"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StepProgress } from "@/components/shared/StepProgress";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Download, Copy, Edit2, Check, ArrowLeft, Send, ExternalLink, Info, Globe } from "lucide-react";
import { NATIONAL_RTI_CONFIG, STATES_LIST, isOfflineOnly, getStateName } from "@/lib/states";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { exportToPdf } from "@/lib/pdf-utils";

const getFallbackDraft = (lang: string) => {
  const drafts: Record<string, string> = {
    en: `To,
The Public Information Officer (PIO),
Public Works Department (PWD),
[City/District Name, State]

Subject: Request for Information under Right to Information Act, 2005

Respected Sir/Madam,

I wish to seek information regarding the delay in road repair and maintenance in [Locality Name]. The roads have been in a dilapidated condition since [Approximate Date/Month], causing severe inconvenience and safety hazards to the residents.

Kindly provide the following information under the RTI Act, 2005:

1. Are there any approved proposals or sanctioned funds for the repair/reconstruction of the roads in the aforementioned locality? If yes, please provide a certified copy of the approval and the estimated timeline for the project.
2. If the funds have been allocated, please state the total amount sanctioned and the details of the contractor/agency assigned for the work.
3. What is the designated frequency of routine road maintenance for this locality as per PWD guidelines? Please provide a copy of the relevant guidelines.
4. How many complaints have been registered by the public regarding this specific road in the last 12 months, and what action has been taken on them?

I have attached the requisite RTI application fee of Rs. 10/- via [IPO/DD/Online Receipt Number ______]. 

Kindly provide the information in English/Hindi.
Thank you.

Yours faithfully,
[Your Name]
[Your Address]
[Your Contact Number]
[Date]`,
    hi: `सेवा में,
लोक सूचना अधिकारी (PIO),
लोक निर्माण विभाग (PWD),
[शहर/जिले का नाम, राज्य]

विषय: सूचना का अधिकार अधिनियम, 2005 के तहत सूचना के लिए अनुरोध

आदरणीय महोदय/महोदया,

मैं [मोहल्ले का नाम] में सड़क मरम्मत और रखरखाव में देरी के संबंध में जानकारी प्राप्त करना चाहता हूं। [अनुमानित तिथि/माह] से सड़कों की स्थिति जर्जर है, जिससे निवासियों को भारी असुविधा और सुरक्षा संबंधी खतरे हो रहे हैं।

कृपया आरटीआई अधिनियम, 2005 के तहत निम्नलिखित जानकारी प्रदान करें:

1. क्या उपर्युक्त क्षेत्र में सड़कों की मरम्मत/पुनर्निर्माण के लिए कोई स्वीकृत प्रस्ताव या स्वीकृत धन है? यदि हाँ, तो कृपया अनुमोदन की एक प्रमाणित प्रति और परियोजना के लिए अनुमानित समयरेखा प्रदान करें।
2. यदि धन आवंटित किया गया है, तो कृपया स्वीकृत कुल राशि और काम के लिए सौंपे गए ठेकेदार/एजेंसी का विवरण बताएं।
3. लोक निर्माण विभाग के दिशानिर्देशों के अनुसार इस इलाके के लिए नियमित सड़क रखरखाव की निर्धारित आवृत्ति क्या है? कृपया संबंधित दिशा-निर्देशों की एक प्रति प्रदान करें।
4. पिछले 12 महीनों में इस विशिष्ट सड़क के संबंध में जनता द्वारा कितनी शिकायतें दर्ज की गई हैं, और उन पर क्या कार्रवाई की गई है?

मैंने [आईपीओ/डीडी/ऑनलाइन रसीद संख्या ______] के माध्यम से 10/- रुपये का आवश्यक आरटीआई आवेदन शुल्क संलग्न किया है।

कृपया जानकारी प्रदान करें।
धन्यवाद।

भवदीय,
[आपका नाम]
[आपका पता]
[आपका संपर्क नंबर]
[दिनांक]`,
    ta: `பெறுநர்,
பொது தகவல் அதிகாரி (PIO),
பொதுப்பணித் துறை (PWD),
[நகரம்/மாவட்டப் பெயர், மாநிலம்]

பொருள்: தகவல் அறியும் உரிமைச் சட்டம், 2005-இன் கீழ் தகவல் கோருதல்

மதிப்பிற்குரிய ஐயா/அம்மையீர்,

[பகுதி பெயர்] பகுதியில் சாலை பழுதுபார்ப்பு மற்றும் பராமரிப்பு தாமதம் குறித்த தகவல்களை அறிய விரும்புகிறேன். [தோராயமான தேதி/மாதம்] முதல் சாலைகள் மிகவும் மோசமான நிலையில் உள்ளன, இதனால் குடியிருப்பாளர்களுக்கு கடுமையான சிரமங்களும் பாதுகாப்பு அபாயங்களும் ஏற்படுகின்றன.

RTI சட்டம், 2005-இன் கீழ் பின்வரும் தகவல்களை வழங்கவும்:

1. மேற்கண்ட பகுதியில் சாலைகளை பழுதுபார்க்க/மறுசீரமைக்க அங்கீகரிக்கப்பட்ட திட்டங்கள் அல்லது ஒதுக்கப்பட்ட நிதிகள் உள்ளதா? ஆம் எனில், ஒப்புதலின் சான்றளிக்கப்பட்ட நகலையும், திட்டத்திற்கான உத்தேச காலக்கெடுவையும் வழங்கவும்.
2. நிதி ஒதுக்கப்பட்டிருந்தால், அனுமதிக்கப்பட்ட மொத்தத் தொகையையும், பணிக்காக நியமிக்கப்பட்ட ஒப்பந்ததாரர்/நிறுவனத்தின் விவரங்களையும் குறிப்பிடவும்.
3. PWD வழிகாட்டுதல்களின்படி, இப்பகுதிக்கான வழக்கமான சாலை பராமரிப்பின் நிர்ணயிக்கப்பட்ட அதிர்வெண் என்ன? சம்பந்தப்பட்ட வழிகாட்டுதல்களின் நகலை வழங்கவும்.
4. கடந்த 12 மாதங்களில் இந்த குறிப்பிட்ட சாலை தொடர்பாக பொது மக்களால் எத்தனை புகார்கள் பதிவு செய்யப்பட்டுள்ளன, அவற்றின் மீது என்ன நடவடிக்கை எடுக்கப்பட்டுள்ளது?

தேவையான RTI விண்ணப்பக் கட்டணமான ரூ. 10/-ஐ [IPO/DD/Online Receipt Number ______] மூலம் இணைத்துள்ளேன்.

தகவலை வழங்கவும்.
நன்றி.

தங்கள் உண்மையுள்ள,
[உங்கள் பெயர்]
[உங்கள் முகவரி]
[உங்கள் தொடர்பு எண்]
[தேதி]`,
    kn: `ರವರಿಗೆ,
ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ (PIO),
ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ (PWD),
[ನಗರ/ಜಿಲ್ಲೆಯ ಹೆಸರು, ರಾಜ್ಯ]

ವಿಷಯ: ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ, 2005 ರ ಅಡಿಯಲ್ಲಿ ಮಾಹಿತಿಗಾಗಿ ವಿನಂತಿ

ಗೌರವಾನ್ವಿತ ಸರ್/ಮೇಡಂ,

[ಪ್ರದೇಶದ ಹೆಸರು] ನಲ್ಲಿ ರಸ್ತೆ ದುರಸ್ತಿ ಮತ್ತು ನಿರ್ವಹಣೆಯಲ್ಲಿನ ವಿಳಂಬಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲು ನಾನು ಬಯಸುತ್ತೇನೆ. [ಅಂದಾಜು ದಿನಾಂಕ/ತಿಂಗಳು] ಯಿಂದ ರಸ್ತೆಗಳು ಶಿಥಿಲಾವಸ್ಥೆಯಲ್ಲಿವೆ, ಇದರಿಂದಾಗಿ ನಿವಾಸಿಗಳಿಗೆ ತೀವ್ರ ಅನಾನುಕೂಲತೆ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಅಪಾಯಗಳು ಉಂಟಾಗುತ್ತಿವೆ.

RTI ಕಾಯ್ದೆ, 2005 ರ ಅಡಿಯಲ್ಲಿ ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಿ:

1. ಮೇಲ್ಕಂಡ ಪ್ರದೇಶದಲ್ಲಿ ರಸ್ತೆಗಳ ದುರಸ್ತಿ/ಪುನರ್ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಯಾವುದಾದರೂ ಅನುಮೋದಿತ ಪ್ರಸ್ತಾವನೆಗಳು ಅಥವಾ ಮಂಜೂರಾದ ಹಣವಿದೆಯೇ? ಹೌದು ಎಂದಾದರೆ, ದಯವಿಟ್ಟು ಅನುಮೋದನೆಯ ಪ್ರಮಾಣೀಕೃತ ಪ್ರತಿ ಮತ್ತು ಯೋಜನೆಗೆ ಅಂದಾಜು ಕಾಲಮಿತಿಯನ್ನು ಒದಗಿಸಿ.
2. ಹಣವನ್ನು ಮಂಜೂರು ಮಾಡಿದ್ದರೆ, ದಯವಿಟ್ಟು ಮಂಜೂರಾದ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ಮತ್ತು ಕೆಲಸಕ್ಕಾಗಿ ನಿಯೋಜಿಸಲಾದ ಗುತ್ತಿಗೆದಾರ/ಏಜೆನ್ಸಿಯ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ.
3. ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆಯ (PWD) ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ ಈ ಪ್ರದೇಶಕ್ಕೆ ನಿಯಮಿತ ರಸ್ತೆ ನಿರ್ವಹಣೆಯ ನಿಗದಿತ ಆವರ್ತನ ಏನು? ದಯವಿಟ್ಟು ಸಂಬಂಧಿತ ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರತಿಯನ್ನು ಒದಗಿಸಿ.
4. ಕಳೆದ 12 ತಿಂಗಳುಗಳಲ್ಲಿ ಈ ನಿರ್ದಿಷ್ಟ ರಸ್ತೆಯ ಬಗ್ಗೆ ಸಾರ್ವಜನಿಕರು ಎಷ್ಟು ದೂರುಗಳನ್ನು ದಾಖಲಿಸಿದ್ದಾರೆ ಮತ್ತು ಅವುಗಳ ಮೇಲೆ ಏನು ಕ್ರಮ ಕೈಗೊಳ್ಳಲಾಗಿದೆ?

ನಾನು ಅಗತ್ಯವಿರುವ RTI ಅರ್ಜಿ ಶುಲ್ಕ ರೂ. 10/- ಅನ್ನು [IPO/DD/Online Receipt Number ______] ಮೂಲಕ ಲಗತ್ತಿಸಿದ್ದೇನೆ.

ದಯವಿಟ್ಟು ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಿ.
ಧನ್ಯವಾದಗಳು.

ತಮ್ಮ ವಿಶ್ವಾಸಿ,
[ನಿಮ್ಮ ಹೆಸರು]
[ನಿಮ್ಮ ವಿಳಾಸ]
[ನಿಮ್ಮ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ]
[ದಿನಾಂಕ]`,
    te: `కు,
పబ్లిక్ ఇన్ఫర్మేషన్ ఆఫీసర్ (PIO),
రోడ్లు మరియు భవనాల శాఖ (R&B/PWD),
[నగరం/జిల్లా పేరు, రాష్ట్రం]

విషయం: సమాచార హక్కు చట్టం, 2005 కింద సమాచారం కోసం అభ్యర్థన

గౌరవనీయులైన సార్/మేడమ్,

[ప్రాంతం పేరు] లో రోడ్డు మరమ్మత్తు మరియు నిర్వహణలో జాప్యం గురించి సమాచారం కోరుతున్నాను. [అంచనా తేదీ/నెల] నుండి రోడ్లు అధ్వాన్న స్థితిలో ఉన్నాయి, దీని వల్ల స్థానికులకు తీవ్ర అసౌకర్యం మరియు భద్రతా ముప్పు ఏర్పడుతోంది.

RTI చట్టం, 2005 కింద దయచేసి కింది సమాచారాన్ని అందించగలరు:

1. పైన పేర్కొన్న ప్రాంతంలో రోడ్ల మరమ్మత్తు/పునర్నిర్మాణం కోసం ఏవైనా ఆమోదించబడిన ప్రతిపాదనలు లేదా మంజూరైన నిధులు ఉన్నాయా? అవును అయితే, దయచేసి ఆమోదం యొక్క ధృవీకరించబడిన కాపీని మరియు ప్రాజెక్ట్ కోసం అంచనా వేసిన కాలాన్ని అందించండి.
2. నిధులు కేటాయించినట్లయితే, దయచేసి మంజూరు చేయబడిన మొత్తం రొక్కాన్ని మరియు పని కోసం కేటాయించబడిన కాంట్రాక్టర్/ఏజెన్సీ వివరాలను పేర్కొనండి.
3. PWD మార్గదర్శకాల ప్రకారం ఈ ప్రాంతానికి సంబంధించిన సాధారణ రోడ్ నిర్వహణ యొక్క నిర్దేశిత ఫ్రీక్వెన్సీ ఏమిటి? దయచేసి సంబంధిత మార్గదర్శకాల కాపీని అందించండి.
4. గత 12 నెలల్లో ఈ నిర్దిష్ట రోడ్డు గురించి ప్రజల నుండి ఎన్ని ఫిర్యాదులు నమోదయ్యాయి, మరియు వాటిపై ఎలాంటి చర్యలు తీసుకోబడ్డాయి?

నేను అవసరమైన RTI అప్లికేషన్ ఫీజు రూ. 10/- ను [IPO/DD/Online Receipt Number ______] ద్వారా జత చేశాను.

దయచేసి సమాచారాన్ని అందించగలరు.
ధన్యవాదాలు.

భవదీయులు,
[మీ పేరు]
[మీ చిరునామా]
[మీ సంప్రదింపు నంబర్]
[తేదీ]`
  };
  return drafts[lang] || drafts['en'];
};

const RESULT_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Your RTI Draft",
    autoDrafted: "Auto-drafted",
    preview: "Document Preview",
    detectedAuth: "Detected Authority",
    confidence: "Confidence Score",
    pioOffice: "PIO Office",
    actions: "Actions",
    downloadBtn: "Download as PDF",
    directSubmission: "Direct Submission",
    submissionDesc: "Submit to the state's RTI portal.",
    goToPortal: "Go to {state} Portal",
    startOver: "Start Over",
    ipoWarning: "This state requires physical filing via IPO.",
    partialWarning: "Partial online support — physical filing may be needed."
  },
  hi: {
    title: "आपका आरटीआई ड्राफ्ट",
    autoDrafted: "स्व-तैयार",
    preview: "दस्तावेज़ पूर्वावलोकन",
    detectedAuth: "पहचाना गया प्राधिकरण",
    confidence: "विश्वास स्कोर",
    pioOffice: "पीआईओ कार्यालय",
    actions: "कार्रवाई",
    downloadBtn: "पीडीएफ के रूप में डाउनलोड करें",
    directSubmission: "सीधे सबमिशन",
    submissionDesc: "राज्य के आरटीआई पोर्टल पर सबमिट करें।",
    goToPortal: "{state} पोर्टल पर जाएं",
    startOver: "फिर से शुरू करें",
    ipoWarning: "इस राज्य में आईपीओ के माध्यम से भौतिक फाइलिंग की आवश्यकता है।",
    partialWarning: "आंशिक ऑनलाइन सहायता — भौतिक फाइलिंग की आवश्यकता हो सकती है।"
  },
  ta: {
    title: "உங்கள் ஆர்டிஐ வரைவு",
    autoDrafted: "தானாக தயாரிக்கப்பட்டது",
    preview: "ஆவண முன்னோட்டம்",
    detectedAuth: "கண்டறியப்பட்ட ஆணையம்",
    confidence: "நம்பிக்கை மதிப்பெண்",
    pioOffice: "PIO அலுவலகம்",
    actions: "செயல்கள்",
    downloadBtn: "PDF ஆக பதிவிறக்கவும்",
    directSubmission: "நேரடி சமர்ப்பிப்பு",
    submissionDesc: "மாநிலத்தின் RTI போர்ட்டலில் சமர்ப்பிக்கவும்.",
    goToPortal: "{state} போர்ட்டலுக்குச் செல்லவும்",
    startOver: "மீண்டும் தொடங்கவும்",
    ipoWarning: "இந்த மாநிலத்திற்கு IPO மூலம் நேரடி சமர்ப்பிப்பு தேவை.",
    partialWarning: "பகுதி ஆன்லைன் ஆதரவு - நேரடி சமர்ப்பிப்பு தேவைப்படலாம்."
  },
  kn: {
    title: "ನಿಮ್ಮ ಆರ್ ಟಿ ಐ ಕರಡು",
    autoDrafted: "ಸ್ವಯಂ-ಕರಡು",
    preview: "ದಾಖಲೆ ಮುನ್ನೋಟ",
    detectedAuth: "ಗುರುತಿಸಲಾದ ಪ್ರಾಧಿಕಾರ",
    confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್",
    pioOffice: "PIO ಕಚೇರಿ",
    actions: "ಕ್ರಮಗಳು",
    downloadBtn: "PDF ಆಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    directSubmission: "ನೇರ ಸಲ್ಲಿಕೆ",
    submissionDesc: "ರಾಜ್ಯದ ಆರ್ ಟಿ ಐ ಪೋರ್ಟಲ್ ಗೆ ಸಲ್ಲಿಸಿ.",
    goToPortal: "{state} ಪೋರ್ಟಲ್ ಗೆ ಹೋಗಿ",
    startOver: "ಮತ್ತೆ ಶುರು ಮಾಡಿ",
    ipoWarning: "ಈ ರಾಜ್ಯಕ್ಕೆ ಐಪಿಒ ಮೂಲಕ ಭೌತಿಕ ಸಲ್ಲಿಕೆ ಅಗತ್ಯವಿದೆ.",
    partialWarning: "ಭಾಗಶಃ ಆನ್‌ಲೈನ್ ಬೆಂಬಲ — ಭೌತಿಕ ಸಲ್ಲಿಕೆ ಬೇಕಾಗಬಹುದು."
  },
  te: {
    title: "మీ ఆర్‌టిఐ డ్రాఫ్ట్",
    autoDrafted: "ఆటో-డ్రాఫ్ట్",
    preview: "డాక్యుమెంట్ ప్రివ్యూ",
    detectedAuth: "గుర్తించిన అథారిటీ",
    confidence: "కాన్ఫిడెన్స్ స్కోర్",
    pioOffice: "PIO కార్యాలయం",
    actions: "చర్యలు",
    downloadBtn: "PDFగా డౌన్​లోడ్ చేయండి",
    directSubmission: "నేరుగా సమర్పణ",
    submissionDesc: "రాష్ట్ర ఆర్‌టిఐ పోర్టల్‌లో సమర్పించండి.",
    goToPortal: "{state} పోర్టల్‌కు వెళ్లండి",
    startOver: "మళ్లీ ప్రారంభించండి",
    ipoWarning: "ఈ రాష్ట్రంలో IPO ద్వారా భౌతిక ఫైలింగ్ అవసరం.",
    partialWarning: "పాక్షిక ఆన్‌లైన్ మద్దతు — భౌతిక ఫైలింగ్ అవసరం కావచ్చు."
  }
};

export default function ResultPage() {
  const { language: selectedLang } = useLanguage();
  const t = RESULT_TRANSLATIONS[selectedLang] || RESULT_TRANSLATIONS.en;
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedState, setSelectedState] = useState("Central Government");
  const stateData = NATIONAL_RTI_CONFIG[selectedState];
  const [rtiContent, setRtiContent] = useState(getFallbackDraft(selectedLang));
  const [confidence, setConfidence] = useState("98%");
  const [pioOffice, setPioOffice] = useState(RESULT_TRANSLATIONS[selectedLang]?.pioOffice || "PIO Office");

  // Load actual AI result from sessionStorage
  useEffect(() => {
    const savedResult = sessionStorage.getItem('rti_result');
    if (savedResult) {
      try {
        const data = JSON.parse(savedResult);
        if (data.draft) setRtiContent(data.draft);
        if (data.confidence) setConfidence(data.confidence);
        if (data.authority?.pio) setPioOffice(data.authority.pio);
      } catch (err) {
        console.error("Failed to parse RTI result from session:", err);
      }
    }
  }, []);

  // Auto-update the draft when language changes (if it hasn't been edited drastically)
  useEffect(() => {
    const savedResult = sessionStorage.getItem('rti_result');
    if (!savedResult) {
      setRtiContent(getFallbackDraft(selectedLang));
    }
  }, [selectedLang]);

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
            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{t.title}</h1>
            <div className="flex items-center gap-2">
              <Badge className="px-3 py-1 bg-primary/10 text-primary border-none text-[10px] md:text-xs">{t.autoDrafted}</Badge>
              <Badge variant="default" className="px-3 py-1 uppercase text-[10px] md:text-xs">{selectedLang}</Badge>
            </div>
          </div>
          
          <Card className="p-0 overflow-hidden bg-card border-border shadow-xl rounded-2xl md:rounded-3xl">
            <div className="bg-muted border-b border-border px-4 md:px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.preview}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-muted-foreground/10 rounded-lg text-muted-foreground transition-colors border border-transparent hover:border-border"
                  title="Edit RTI"
                >
                  <Edit2 className="w-4 h-4" />
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
            
            <div className="p-6 md:p-10" id="rti-document-content">
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
              <Info className="w-4 h-4 text-primary" /> {t.detectedAuth}
            </h3>
            <div className="p-4 bg-background rounded-2xl border border-primary/10 mb-6 group hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.confidence}</span>
                <span className="text-xs font-black text-primary">{confidence}</span>
              </div>
              <p className="font-black text-foreground text-lg md:text-xl leading-tight">{pioOffice}</p>
              <div className="mt-5 space-y-2">
                <label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.1em]">{t.goToPortal.split('{')[0] || "Select Portal"}</label>
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

            <div className="space-y-3">
              <button 
                onClick={handleDownloadPdf}
                className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 primary-glow group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> {t.downloadBtn}
              </button>
              {isOfflineOnly(selectedState) ? (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2 leading-relaxed">
                    <Info className="w-4 h-4 shrink-0" /> {t.ipoWarning}
                  </p>
                </div>
              ) : (
                <Link 
                  href={stateData.portal} 
                  target="_blank"
                  className="w-full bg-foreground text-background font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all group"
                >
                  <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" /> {t.goToPortal.replace("{state}", getStateName(selectedState, selectedLang))} <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </Card>

          <Card className="p-6 border-dashed border-border bg-muted/20 rounded-2xl md:rounded-[32px]">
            <h3 className="font-black text-foreground mb-3 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
               <Send className="w-4 h-4 text-primary" /> {t.directSubmission}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {t.submissionDesc}
              {stateData.isPartial && <span className="block mt-2 text-amber-500 font-bold text-[10px] uppercase tracking-wider">{t.partialWarning}</span>}
            </p>
            <Link href="/" className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-2 transition-all">
              <ArrowLeft className="w-3 h-3" /> {t.startOver}
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
