export const en = {
  // Navbar
  nav: {
    dashboard: "Dashboard",
    help: "Help",
    offlineGuide: "Offline Guide",
    login: "Track RTI",
    getStarted: "Draft RTI",
    authorities: "Authorities"
  },

  common: {
    voiceStart: "Start Voice Input",
    voiceStop: "Stop Recording",
    voiceNetError: "Voice input is not supported in this browser. Please use Chrome or Edge.",
    micDenied: "Microphone access denied. Please enable microphone permissions.",
    speechError: "Speech recognition error: {error}",
    loading: "Loading translations...",
    newRTI: "New RTI",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    steps: ["User Input", "Authority Detection", "RTI Generation"]
  },

  // Home Page (Hero)
  hero: {
    badge: "Empowering 1.4 Billion Citizens",
    title: "Your Rights, Your Voice,",
    titleAccent: "Simpler than ever.",
    subtitle: "India's first AI-powered RTI assistant. Draft, file, and track your Right to Information requests in any language, anywhere.",
    startDrafting: "Start Drafting Now",
    howItWorks: "How it works",
    videoTour: "Video Tour",
    howTitle: "How Bharat RTI Works",
    howSteps: [
      { title: "Voice or Text Input", desc: "Speak or type your grievance. Our AI understands your intent in any Indian language." },
      { title: "Intent Extraction", desc: "The system extracts key legal points and identifies the core issue automatically." },
      { title: "Semantic Matching", desc: "We map your complaint to the correct authority from our national database using AI logic." },
      { title: "RTI Generation", desc: "Llama-3 drafts a perfect, legally binding application tailored to your state's rules." },
      { title: "PDF & Submission", desc: "Download your high-fidelity PDF or submit directly to the state portal via our guided links." }
    ],
    engineTitle: "The Semantic Engine",
    engineSubtitle: "Why RTIAssist is smarter than a simple search box.",
    engineFeatures: [
      { title: "Semantic Inference", desc: "We don't just find keywords; we understand the legal meaning behind your words.", icon: "Brain" },
      { title: "Department DB", desc: "A curated database of 8,000+ jurisdictions across all 36 States & UTs.", icon: "Database" },
      { title: "Live LLM Logic", desc: "Every mapping is backed by a 70B parameter reasoning model for 98% accuracy.", icon: "Cpu" }
    ],
    features: [
      { title: "Multilingual", desc: "Support for 22+ regional languages with real-time translation.", icon: "Globe" },
      { title: "Voice-First", desc: "Perfect for rural users with built-in speech-to-text capabilities.", icon: "Mic" },
      { title: "PDF Export", desc: "Professional formatting guaranteed for every application.", icon: "FileText" },
      { title: "Offline Ready", desc: "Detailed guides for areas with low internet connectivity.", icon: "WifiOff" }
    ]
  },

  // Offline Page
  offline: {
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
      { title: "Drafting", desc: "Write your application on a plain A4 paper in any language. Clearly state it's under RTI Act 2005." },
      { title: "Fee Payment", desc: "Buy a ₹10 IPO (Indian Postal Order) or Court Fee Stamp. Mention 'PIO' as the payee." },
      { title: "Submission", desc: "Hand deliver to the Panchayat Secretary or send via Registered Post from the local Post Office." }
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

  // Result Page
  result: {
    title: "Your RTI Draft",
    autoDrafted: "Auto-drafted",
    preview: "Document Preview",
    detectedAuth: "Detected Authority",
    confidence: "Confidence Score",
    pioOffice: "PIO Office",
    mappingProof: "AI Mapping Proof",
    reasoning: "Reasoning & Logic",
    whyAuthority: "Why this authority?",
    actions: "Actions",
    downloadBtn: "Download as PDF",
    directSubmission: "Direct Submission",
    submissionDesc: "Submit to the state's RTI portal.",
    goToPortal: "Go to {state} Portal",
    startOver: "Start Over",
    ipoWarning: "This state requires physical filing via IPO.",
    partialWarning: "Partial online support — physical filing may be needed.",
    feeGuide: "How to Pay Fees",
    evidenceChecklist: "AI Evidence Checklist",
    feeOnline: "This state supports Online Payment (Debit/UPI) via the portal linked below.",
    feeIpo: "You must buy a ₹10 Indian Postal Order (IPO) or Court Fee Stamp from a Post Office.",
    feeLabel: "Fee Amount: ₹10",
    defaultDraft: `To,
[Designation of Public Information Officer]
[Name of Department/Authority]
[Address/City/State]

Subject: Request for Information under the Right to Information Act, 2005

Respected Sir/Madam,

I wish to seek information regarding the following matter:
[Description of your grievance or issue]

Kindly provide the following information under the RTI Act, 2005:

1. Please provide the current status and certified copies of all records related to the aforementioned matter.
2. Provide details of the officer(s) responsible for addressing this issue and the timeline for its resolution.
3. Provide the list of actions taken on previous complaints (if any) filed regarding this specific issue.

I have attached the requisite RTI application fee of Rs. 10/- via [IPO/DD/Online Receipt Number].

Kindly provide the information.
Thank you.

Yours faithfully,
[Your Name]
[Your Address]
[Your Contact Number]
[Date]`
  },

  // Input Page
  input: {
    title: "Craft Your {accent}",
    accent: "RTI Draft",
    subtitle: "Provide the details of your grievance. Our AI will identify the legal sections and departments for you.",
    placeholder: "Describe your issue (e.g., Street lights not working, pothole on main road, or ration card delay...)",
    analyzing: "Analyzing...",
    generate: "Analyze & Generate",
    minChars: "Minimum 20 characters required to analyze.",
    detectLocation: "Detect Location",
    detecting: "Detecting...",
    locationSet: "Location: {state}",
    locationError: "Location access denied",
    trusted: "Trusted by 5,000+ citizens nationwide",
    features: [
      { title: "Verified Data", desc: "Cross-checked with RTI guidelines." },
      { title: "Quick Draft", desc: "Finished in under 60 seconds." },
      { title: "Auto-Detection", desc: "AI finds the correct PIO details." }
    ],
    specificityTitle: "Pro-Tip: Be Specific",
    specificityPoints: [
      "Mention dates or timeframes (e.g., 'Since Jan 2024')",
      "Specify locations (e.g., 'Main Road, sector 4')",
      "Ask for 'Certified Copies' of documents"
    ]
  },

  // Processing Page
  processing: {
    steps: [
      { id: 1, text: "Understanding complaint..." },
      { id: 2, text: "Identifying government authority..." },
      { id: 3, text: "Formatting legal structure..." },
      { id: 4, text: "Drafting RTI application..." },
    ],
    fallback: "Loading AI Engine...",
    error: "Failed to process request. Check API keys.",
    apiError: "Error: {error}"
  },
  dashboard: {
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
    daysRemaining: "{days} days left",
    overdue: "Overdue",
    responseDeadline: "Response Deadline",
    draftSnippet: "Draft Snippet",
    tracking: "Application Tracking",
    exportPdf: "Export PDF",
    viewFullDraft: "View Full Draft",
    selectPrompt: "Select an application to view tracking details.",
    dummySnippet: "I wish to seek information regarding the delay in road repair and maintenance in the aforementioned locality. Kindly provide details on sanctioned funds and contractors assigned...",
    exportHeader: "RTI Application Draft",
    history: [
      {
        id: "RTI-2023-892",
        title: "Delay in road repair in Block C",
        authority: "Public Works Department",
        date: "2023-11-02",
        status: "Completed",
        timeline: [
          { date: "Nov 2, 2023", event: "Draft Generated" },
          { date: "Nov 4, 2023", event: "Submitted to Portal" },
          { date: "Nov 15, 2023", event: "Response Received" },
        ]
      },
      {
        id: "RTI-2023-845",
        title: "Details of uncollected garbage tenders",
        authority: "Municipal Corporation",
        date: "2023-10-15",
        status: "In Progress",
        timeline: [
          { date: "Oct 15, 2023", event: "Draft Generated" },
          { date: "Oct 18, 2023", event: "Submitted to Portal" },
          { date: "Waiting", event: "Department Response" },
        ]
      },
      {
        id: "RTI-2023-712",
        title: "Pending property tax assessment",
        authority: "Revenue Department",
        date: "2023-09-28",
        status: "Draft",
        timeline: [
          { date: "Sep 28, 2023", event: "Draft Generated" },
          { date: "-", event: "Submission Pending" },
        ]
      }
    ]
  },

  // Help Page
  help: {
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

  // Footer
  footer: {
    tagline: "Empowering every Indian citizen through digital transparency. Built for the billion.",
    product: "Product",
    features: "Features",
    howItWorks: "How It Works",
    offlineGuide: "Offline Guide",
    track: "Track Request",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Disclaimer",
    copyright: "© 2026 RTIAssist. An initiative for a transparent India."
  }
};
