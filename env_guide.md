# Environment Variables Guide

This project uses environment variables for sensitive configurations. 

## Local Development
To run the app locally, you need to create a `.env.local` file in the root directory.

```powershell
# .env.local example
GROQ_API_KEY=your_actual_groq_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> [!IMPORTANT]
> Never commit `.env.local` to GitHub. It is already included in `.gitignore`.

## Production / GitHub
When pushing to GitHub, the `.env.local` file is ignored. To make the app run in the cloud (e.g., Vercel, Netlify):
1. Go to your deployment platform's dashboard.
2. Navigate to **Environment Variables** settings.
3. Add the keys manually (e.g., `GROQ_API_KEY`).

## Secure Workflow
If you want to share the required keys with other developers without exposing private secrets, maintain an `.env.example` file:

```bash
# .env.example
GROQ_API_KEY=
NEXT_PUBLIC_APP_URL=
```
Users can then copy this to `.env.local` and fill in their own keys.
