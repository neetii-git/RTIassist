export interface StateConfig {
  name: string;
  portal: string;
  generalFee: number;    // Application fee
  pageRate: number;      // Cost per A4 page
  mediaCost: number;     // Floppy/CD/DVD
  inspectRate: number;   // Per hour/proportion after 1st free hr
  maxCost: number;       // Est: generalFee + 100×pageRate + media + inspect
  mode: string;
  specifics?: string;    // BPL notes, appeals, exceptions
  isPartial?: boolean;   // Whether the online support is partial
}

export const NATIONAL_RTI_CONFIG: Record<string, StateConfig> = {
  "Central Government": {
    name: "Central Government (All Ministries)", 
    portal: "https://rtionline.gov.in", 
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5,
    maxCost: 305, mode: "Online/Offline",
    specifics: "BPL exempt w/ proof; appeals free" 
  },
  
  "Andaman & Nicobar": {
    name: "Andaman & Nicobar Islands", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)", specifics: "Follows Central rules; BPL exempt"
  },
  
  "Andhra Pradesh": {
    name: "Andhra Pradesh", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online/Offline", specifics: "₹5/15min inspect; BPL exempt"
  },
  
  "Arunachal Pradesh": {
    name: "Arunachal Pradesh", portal: "https://rti.arunachal.gov.in",
    generalFee: 50, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 355,
    mode: "Online/Offline"
  },
  
  "Assam": {
    name: "Assam", portal: "https://rtionline.assam.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online/Offline", specifics: "BPL exempt"
  },
  
  "Bihar": {
    name: "Bihar", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Chandigarh": {
    name: "Chandigarh", portal: "https://rtionline.gov.in",
    generalFee: 50, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 355,
    mode: "Online (via Central)"
  },
  
  "Chhattisgarh": {
    name: "Chhattisgarh", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Dadra & Nagar Haveli": {
    name: "Dadra & Nagar Haveli and Daman & Diu", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)"
  },
  
  "Delhi (NCT)": {
    name: "Delhi (NCT)", portal: "https://rtionline.delhi.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online", specifics: "BPL exempt"
  },
  
  "Goa": {
    name: "Goa", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Offline/Email"
  },
  
  "Gujarat": {
    name: "Gujarat", portal: "https://rtionline.gujarat.gov.in",
    generalFee: 20, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 325,
    mode: "Online"
  },
  
  "Haryana": {
    name: "Haryana", portal: "https://rtionline.gov.in",
    generalFee: 50, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 355,
    mode: "Online"
  },
  
  "Himachal Pradesh": {
    name: "Himachal Pradesh", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Jammu & Kashmir": {
    name: "Jammu & Kashmir", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)"
  },
  
  "Jharkhand": {
    name: "Jharkhand", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Karnataka": {
    name: "Karnataka", portal: "https://rtionline.karnataka.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Kerala": {
    name: "Kerala", portal: "https://rtiportal.kerala.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Ladakh": {
    name: "Ladakh", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)"
  },
  
  "Lakshadweep": {
    name: "Lakshadweep", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)"
  },
  
  "Madhya Pradesh": {
    name: "Madhya Pradesh", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Maharashtra": {
    name: "Maharashtra", portal: "https://rtionline.maharashtra.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Manipur": {
    name: "Manipur", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Offline"
  },
  
  "Meghalaya": {
    name: "Meghalaya", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Offline"
  },
  
  "Mizoram": {
    name: "Mizoram", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 1, mediaCost: 30, inspectRate: 5, maxCost: 285,
    mode: "Online", specifics: "₹1/page unique; appeals free"
  },
  
  "Nagaland": {
    name: "Nagaland", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Offline"
  },
  
  "Odisha": {
    name: "Odisha", portal: "https://rtiodisha.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 325,
    mode: "Online", specifics: "Appeal1: ₹20, Appeal2: ₹25; BPL full exempt"
  },
  
  "Puducherry": {
    name: "Puducherry", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online (via Central)"
  },
  
  "Punjab": {
    name: "Punjab", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Rajasthan": {
    name: "Rajasthan", portal: "https://rtionline.rajasthan.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Sikkim": {
    name: "Sikkim", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Offline"
  },
  
  "Tamil Nadu": {
    name: "Tamil Nadu", portal: "https://rtionline.tn.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Telangana": {
    name: "Telangana", portal: "https://tgic.telangana.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 100, inspectRate: 5, maxCost: 355,
    mode: "Online", specifics: "Village: ₹0, Mandal: ₹5; CD: ₹100-200"
  },
  
  "Tripura": {
    name: "Tripura", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online", specifics: "Appeals free"
  },
  
  "Uttar Pradesh": {
    name: "Uttar Pradesh", portal: "https://rtionline.up.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "Uttarakhand": {
    name: "Uttarakhand", portal: "https://uic.uk.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  },
  
  "West Bengal": {
    name: "West Bengal", portal: "https://rtionline.gov.in",
    generalFee: 10, pageRate: 2, mediaCost: 50, inspectRate: 5, maxCost: 305,
    mode: "Online"
  }
};

export const STATE_NAMES: Record<string, Record<string, string>> = {
  en: {
    "Central Government": "Central Government (All Ministries)",
    "Andaman & Nicobar": "Andaman & Nicobar Islands",
    "Andhra Pradesh": "Andhra Pradesh",
    "Arunachal Pradesh": "Arunachal Pradesh",
    "Assam": "Assam",
    "Bihar": "Bihar",
    "Chandigarh": "Chandigarh",
    "Chhattisgarh": "Chhattisgarh",
    "Dadra & Nagar Haveli": "Dadra & Nagar Haveli and Daman & Diu",
    "Delhi (NCT)": "Delhi (NCT)",
    "Goa": "Goa",
    "Gujarat": "Gujarat",
    "Haryana": "Haryana",
    "Himachal Pradesh": "Himachal Pradesh",
    "Jammu & Kashmir": "Jammu & Kashmir",
    "Jharkhand": "Jharkhand",
    "Karnataka": "Karnataka",
    "Kerala": "Kerala",
    "Ladakh": "Ladakh",
    "Lakshadweep": "Lakshadweep",
    "Madhya Pradesh": "Madhya Pradesh",
    "Maharashtra": "Maharashtra",
    "Manipur": "Manipur",
    "Meghalaya": "Meghalaya",
    "Mizoram": "Mizoram",
    "Nagaland": "Nagaland",
    "Odisha": "Odisha",
    "Puducherry": "Puducherry",
    "Punjab": "Punjab",
    "Rajasthan": "Rajasthan",
    "Sikkim": "Sikkim",
    "Tamil Nadu": "Tamil Nadu",
    "Telangana": "Telangana",
    "Tripura": "Tripura",
    "Uttar Pradesh": "Uttar Pradesh",
    "Uttarakhand": "Uttarakhand",
    "West Bengal": "West Bengal"
  },
  hi: {
    "Central Government": "केंद्र सरकार (सभी मंत्रालय)",
    "Andaman & Nicobar": "अंडमान और निकोबार द्वीप समूह",
    "Andhra Pradesh": "आंध्र प्रदेश",
    "Arunachal Pradesh": "अरुणाचल प्रदेश",
    "Assam": "असम",
    "Bihar": "बिहार",
    "Chandigarh": "चंडीगढ़",
    "Chhattisgarh": "छत्तीसगढ़",
    "Dadra & Nagar Haveli": "दादरा और नगर हवेली तथा दमन और दीव",
    "Delhi (NCT)": "दिल्ली (NCT)",
    "Goa": "गोवा",
    "Gujarat": "गुजरात",
    "Haryana": "हरियाणा",
    "Himachal Pradesh": "हिमाचल प्रदेश",
    "Jammu & Kashmir": "जम्मू और कश्मीर",
    "Jharkhand": "झारखंड",
    "Karnataka": "कर्नाटक",
    "Kerala": "केरल",
    "Ladakh": "लद्दाख",
    "Lakshadweep": "लक्षद्वीप",
    "Madhya Pradesh": "मध्य प्रदेश",
    "Maharashtra": "महाराष्ट्र",
    "Manipur": "मणिपुर",
    "Meghalaya": "मेघालय",
    "Mizoram": "मिजोरम",
    "Nagaland": "नागालैंड",
    "Odisha": "ओडिशा",
    "Puducherry": "पुडुचेरी",
    "Punjab": "पंजाब",
    "Rajasthan": "राजस्थान",
    "Sikkim": "सिक्किम",
    "Tamil Nadu": "तमिलनाडु",
    "Telangana": "तेलंगाना",
    "Tripura": "त्रिपुरा",
    "Uttar Pradesh": "उत्तर प्रदेश",
    "Uttarakhand": "उत्तराखंड",
    "West Bengal": "पश्चिम बंगाल"
  },
  ta: {
    "Central Government": "மத்திய அரசு (அனைத்து அமைச்சகங்கள்)",
    "Andaman & Nicobar": "அந்தமான் & நிக்கோபார் தீவுகள்",
    "Andhra Pradesh": "ஆந்திரப் பிரதேசம்",
    "Arunachal Pradesh": "அருணாச்சலப் பிரதேசம்",
    "Assam": "அசாம்",
    "Bihar": "பீகார்",
    "Chandigarh": "சண்டிகர்",
    "Chhattisgarh": "சத்தீஸ்கர்",
    "Dadra & Nagar Haveli": "தாத்ரா & நகர் ஹவேலி மற்றும் டாமன் & டியூ",
    "Delhi (NCT)": "டெல்லி (NCT)",
    "Goa": "கோவா",
    "Gujarat": "குஜராத்",
    "Haryana": "ஹரியானா",
    "Himachal Pradesh": "இமாச்சலப் பிரதேசம்",
    "Jammu & Kashmir": "ஜம்மு & காஷ்மீர்",
    "Jharkhand": "ஜார்க்கண்ட்",
    "Karnataka": "கர்நாடகா",
    "Kerala": "கேரளா",
    "Ladakh": "லடாக்",
    "Lakshadweep": "லட்சத்தீவு",
    "Madhya Pradesh": "மத்தியப் பிரதேசம்",
    "Maharashtra": "மகாராஷ்டிரா",
    "Manipur": "மணிப்பூர்",
    "Meghalaya": "மேகாலயா",
    "Mizoram": "மிசோரம்",
    "Nagaland": "நாகாலாந்து",
    "Odisha": "ஒடிசா",
    "Puducherry": "புதுச்சேரி",
    "Punjab": "பஞ்சாப்",
    "Rajasthan": "ராஜஸ்தான்",
    "Sikkim": "சிக்கிம்",
    "Tamil Nadu": "தமிழ்நாடு",
    "Telangana": "தெலுங்கானா",
    "Tripura": "திரிபுரா",
    "Uttar Pradesh": "உத்தரப் பிரதேசம்",
    "Uttarakhand": "உத்தரகண்ட்",
    "West Bengal": "மேற்கு வங்காளம்"
  },
  kn: {
    "Central Government": "ಕೇಂದ್ರ ಸರ್ಕಾರ (ಎಲ್ಲಾ ಸಚಿವಾಲಯಗಳು)",
    "Andaman & Nicobar": "ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್ ದ್ವೀಪಗಳು",
    "Andhra Pradesh": "ಆಂಧ್ರಪ್ರದೇಶ",
    "Arunachal Pradesh": "ಅರುಣಾಚಲ ಪ್ರದೇಶ",
    "Assam": "ಅಸ್ಸಾಂ",
    "Bihar": "ಬಿಹಾರ",
    "Chandigarh": "ಚಂಡೀಗಢ",
    "Chhattisgarh": "ಛತ್ತೀಸ್‌ಗಢ",
    "Dadra & Nagar Haveli": "ದಾದ್ರಾ ಮತ್ತು ನಗರ ಹವೇಲಿ ಮತ್ತು ದಮನ್ ಮತ್ತು ದಿಯು",
    "Delhi (NCT)": "ದೆಹಲಿ (NCT)",
    "Goa": "ಗೋವಾ",
    "Gujarat": "ಗುಜರಾತ್",
    "Haryana": "ಹರಿಯಾಣ",
    "Himachal Pradesh": "ಹಿಮಾಚಲ ಪ್ರದೇಶ",
    "Jammu & Kashmir": "ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ",
    "Jharkhand": "ಜಾರ್ಖಂಡ್",
    "Karnataka": "ಕರ್ನಾಟಕ",
    "Kerala": "ಕೇರಳ",
    "Ladakh": "ಲಡಾಖ್",
    "Lakshadweep": "ಲಕ್ಷದ್ವೀಪ",
    "Madhya Pradesh": "ಮಧ್ಯಪ್ರದೇಶ",
    "Maharashtra": "ಮಹಾರಾಷ್ಟ್ರ",
    "Manipur": "ಮಣಿಪುರ",
    "Meghalaya": "ಮೇಘಾಲಯ",
    "Mizoram": "ಮಿಜೋರಾಂ",
    "Nagaland": "ನಾಗಾಲ್ಯಾಂಡ್",
    "Odisha": "ಒಡಿಶಾ",
    "Puducherry": "ಪುದುಚೇರಿ",
    "Punjab": "ಪಂಜಾಬ್",
    "Rajasthan": "ರಾಜಸ್ಥಾನ",
    "Sikkim": "ಸಿಕ್ಕಿಂ",
    "Tamil Nadu": "ತಮಿಳುನಾಡು",
    "Telangana": "ತೆಲಂಗಾಣ",
    "Tripura": "ತ್ರಿಪುರ",
    "Uttar Pradesh": "ಉತ್ತರ ಪ್ರದೇಶ",
    "Uttarakhand": "ಉತ್ತರಾಖಂಡ",
    "West Bengal": "ಪಶ್ಚಿಮ ಬಂಗಾಳ"
  },
  te: {
    "Central Government": "కేంద్ర ప్రభుత్వం (అన్ని మంత్రిత్వ శాఖలు)",
    "Andaman & Nicobar": "అండమాన్ & నికోబార్ దీవులు",
    "Andhra Pradesh": "ఆంధ్రప్రదేశ్",
    "Arunachal Pradesh": "అరుణాచల్ ప్రదేశ్",
    "Assam": "అస్సాం",
    "Bihar": "బీహార్",
    "Chandigarh": "చండీగఢ్",
    "Chhattisgarh": "ఛత్తీస్‌గఢ్",
    "Dadra & Nagar Haveli": "దాద్రా & నగర్ హవేలీ మరియు డామన్ & దియ్యు",
    "Delhi (NCT)": "ఢిల్లీ (NCT)",
    "Goa": "గోవా",
    "Gujarat": "గుజరాత్",
    "Haryana": "హర్యానా",
    "Himachal Pradesh": "హిమాచల్ ప్రదేశ్",
    "Jammu & Kashmir": "జమ్మూ & కాశ్మీర్",
    "Jharkhand": "జార్ఖండ్",
    "Karnataka": "కర్ణాటక",
    "Kerala": "కేరళ",
    "Ladakh": "లడఖ్",
    "Lakshadweep": "లక్షద్వీప్",
    "Madhya Pradesh": "మధ్యప్రదేశ్",
    "Maharashtra": "మహారాష్ట్ర",
    "Manipur": "మణిపూర్",
    "Meghalaya": "మేఘాలయ",
    "Mizoram": "మిజోరం",
    "Nagaland": "నాగాలాండ్",
    "Odisha": "ఒడిశా",
    "Puducherry": "పుదుచ్చేరి",
    "Punjab": "పంజాబ్",
    "Rajasthan": "రాజస్థాన్",
    "Sikkim": "సిక్కిం",
    "Tamil Nadu": "తమిళనాడు",
    "Telangana": "తెలంగాణ",
    "Tripura": "త్రిపుర",
    "Uttar Pradesh": "ఉత్తర ప్రదేశ్",
    "Uttarakhand": "ఉత్తరాఖండ్",
    "West Bengal": "పశ్చిమ బెంగాల్"
  }
};

export const STATES_LIST = Object.keys(NATIONAL_RTI_CONFIG).sort((a, b) => {
  if (a === "Central Government") return -1;
  if (b === "Central Government") return 1;
  return a.localeCompare(b);
});

export function getStateName(key: string, lang: string): string {
  const translations = STATE_NAMES[lang] || STATE_NAMES.en;
  return translations[key] || key;
}

export function isOnline(mode: string): boolean {
  return mode.includes("Online");
}

export function isOfflineOnly(mode: string): boolean {
  return mode === "Offline" || mode === "Offline Preferred";
}
