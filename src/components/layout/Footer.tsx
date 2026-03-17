"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";

const FOOTER_TRANSLATIONS: Record<string, any> = {
  en: {
    desc: "Empowering citizens with AI-generated Right to Information applications.",
    builtFor: "Built for Bharat."
  },
  hi: {
    desc: "एआई-जनरेटेड सूचना का अधिकार आवेदनों के साथ नागरिकों को सशक्त बनाना।",
    builtFor: "भारत के लिए निर्मित।"
  },
  ta: {
    desc: "AI-உருவாக்கிய தகவல் அறியும் உரிமை விண்ணப்பங்கள் மூலம் குடிமக்களுக்கு அதிகாரம் அளித்தல்.",
    builtFor: "பாரதத்திற்காக உருவாக்கப்பட்டது."
  },
  kn: {
    desc: "AI-ರಚಿತ ಮಾಹಿತಿ ಹಕ್ಕು ಅರ್ಜಿಗಳೊಂದಿಗೆ ನಾಗರಿಕರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
    builtFor: "ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ."
  },
  te: {
    desc: "AI-రూపొందించిన సమాచార హక్కు దరఖాస్తులతో పౌరులను బలోపేతం చేయడం.",
    builtFor: "భారత్ కోసం నిర్మించబడింది."
  }
};

export function Footer() {
  const { language } = useLanguage();
  const t = FOOTER_TRANSLATIONS[language] || FOOTER_TRANSLATIONS.en;
  
  return (
    <footer className="w-full border-t border-border bg-muted/50 py-12 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-bold text-lg text-foreground">
            RTI<span className="text-primary">Assist</span>
          </span>
          <p className="text-muted-foreground text-sm mt-1">
            {t.desc}
          </p>
        </div>
        <div className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} RTIAssist. {t.builtFor}
        </div>
      </div>
    </footer>
  );
}
