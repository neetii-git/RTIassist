# RTIAssist 🏛️

**Draft a Right to Information (RTI) application in minutes, in your own language, sent to the right government department.**

🔗 **Live demo:** [assistrti.vercel.app](https://assistrti.vercel.app)

Filing an RTI in India is hard for most people. You have to know which department handles your problem, who its Public Information Officer (PIO) is, and how to word a legally valid request. RTIAssist does that part for you. Describe the problem by voice or text, and it finds the right authority and writes a ready-to-file RTI draft for any of India's 36 states and union territories.

> Built at a hackathon. I designed and built the app end to end: the Next.js front end, the AI pipeline that matches complaints to departments, multilingual support, and PDF export.

<!-- Add a screenshot here: save it as public/images/screenshot.png and uncomment the next line -->
<!-- ![RTIAssist screenshot](public/images/screenshot.png) -->

---

## ✨ Features

- **Voice or text input** in 12 Indian languages, including Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam and Urdu
- **Finds the right department automatically:** the AI works out what the complaint is really about, not just its keywords
- **Explains its choice:** every match comes with a confidence score and a one-line reason
- **Writes the RTI draft** in a proper legal format, in the user's language
- **PDF export** plus a link to the right state RTI portal for filing
- **Accounts and dashboard:** sign in to save drafts and track your applications
- **Help chatbot** that answers questions about the RTI process
- **Authority explorer:** an interactive India map to browse departments by state

## 🔍 Example

| | |
|---|---|
| **Input** | *"The main road in my locality hasn't been repaired for 2 years despite multiple complaints."* |
| **Mapped to** | Public Works Department (PWD) |
| **Confidence** | 98% |
| **Reasoning** | Road maintenance in a locality falls under the State/UT PWD. |

## 🧠 How it works

1. **Understand the complaint:** an LLM pulls out the core issue, the location and key details from what the user typed or said.
2. **Match the authority:** the issue is checked against a curated database of departments and PIO offices for every state and UT. LLM reasoning picks the right one, so "dirty water" maps to the municipal corporation or water supply board even if neither is named.
3. **Generate the draft:** a structured RTI application is written in the user's language.
4. **Export and file:** download it as a PDF, or go straight to the right portal.

Matching runs on **Llama 3.3 70B via Groq**, with strict JSON output and low temperature so results stay consistent. Lighter tasks like translation and chat use **Llama 3.1 8B**.

## 🛠️ Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| AI | Groq SDK (Llama 3.3 70B, Llama 3.1 8B) |
| Data | PostgreSQL (Supabase) with Prisma ORM |
| Auth | NextAuth (email/password and Google) |
| PDF | jsPDF and html2canvas |
| Maps | react-simple-maps and d3-geo |
| Hosting | Vercel |

## 👩‍💻 Run it locally

```bash
git clone https://github.com/neetii-git/RTIassist.git
cd RTIassist
npm install
cp .env.example .env.local   # then fill in your keys
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

All the keys are listed in [`.env.example`](.env.example). At a minimum you need:

| Variable | What it's for |
|---|---|
| `GROQ_API_KEY` | The AI calls (free key at [console.groq.com](https://console.groq.com)) |
| `DATABASE_URL` | Postgres connection string (e.g. Supabase) |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Sign-in |

`.env.local` is ignored by git, so never commit real keys. When you deploy, add the same keys in your host's environment settings (on Vercel: Project → Settings → Environment Variables).

## 📁 Project structure

```
src/
  app/          pages (input, processing, result, dashboard, authorities, chatbot) and API routes
  components/   UI components
  lib/          AI services, database client, helpers
  locales/      UI translations
prisma/         database schema
scripts/        seed and accuracy-check scripts
```

## 👤 Author

**Neeti Soni** · [GitHub](https://github.com/neetii-git)
