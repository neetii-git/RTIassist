# RTIAssist 🏛️

**RTIAssist** is a state-of-the-art AI-powered platform designed to simplify the process of filing Right to Information (RTI) applications across all 36 Indian States and Union Territories. It uses advanced Large Language Models (LLMs) to bridge the gap between citizen concerns and administrative bureaucracy.

---

## 🚀 How It Works

1.  **User Input**: Citizens provide their complaint or query via voice or text in any of the 6+ supported major Indian languages.
2.  **Intent Extraction**: Our AI analyzes the raw input to understand the core issue and extract key details.
3.  **Semantic Matching**: The system automatically maps the complaint to the correct government department from our comprehensive national database.
4.  **RTI Generation**: Professional, legally-sound RTI drafts are generated instantly in the user's preferred language.
5.  **PDF Export & Submission**: Drafts can be downloaded as high-fidelity PDFs or users are guided directly to the relevant state portal for submission.

---

## 🔍 Authority Mapping Proof

To ensure transparency and trust, RTIAssist provides clear reasoning for every department it selects.

**Example Case:**
- **Input**: *"The main road in my locality hasn't been repaired for 2 years despite multiple complaints."*
- **Mapped To**: **Public Works Department (PWD)**
- **Confidence**: 98%
- **Reasoning**: "The complaint specifically identifies a lack of road maintenance in a locality, which falls under the core jurisdiction of the State/UT Public Works Department (PWD)."

---

## 🧠 The Engine: Why It Works

### 1. Semantic Search & Reasoning
Unlike traditional keyword-based search, RTIAssist uses **Semantic Inference**. We use LLM-based reasoning to understand the *intent* behind a complaint. If a user mentions "dirty water", the system knows to look for "Municipal Corporation" or "Water Supply Department" even if those exact words aren't in the user's input.

### 2. Department Intelligence Database
We maintain a curated database of primary PIO (Public Information Officer) offices and departmental jurisdictions for every state in India. This database is used as the foundational truth for our matching engine.

### 3. LLM-Based Matching
We leverage **Llama 3.3 (70B)** via Groq for high-speed, deterministic matching. Each matching request is processed with strict JSON formatting and low temperature to ensure accuracy and consistency.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS with [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Inference**: [Groq SDK](https://groq.com/) (Llama-3.3-70b-versatile)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Language Support**: Multi-lingual i18n support.

---

## 👨‍💻 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Environment Variables

Create a `.env.local` file with your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```
