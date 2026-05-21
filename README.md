# Ambuj's Portfolio

Personal portfolio site of **Ambuj** — [YOUR_TAGLINE].

- **Website:** https://ambuj.co
- **Contact:** itsambuja@gmail.com
- **GitHub:** https://github.com/AmbujaAK

## About this codebase

This repo started as a fork of Santiago Fernández de Valderrama's open-source portfolio (santifer.io) and has been rebranded into Ambuj's site. Case studies were trimmed down to a single voice-agent template (`/ai-agent-jacobo`) to be filled in over time.

See **`REMAINING.md`** for the open rebrand tasks (App.tsx rewrite, eval persona files, photo replacement, etc.).

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Motion
- **AI:** Claude API (chatbot), OpenAI Realtime (voice), agentic RAG over Supabase pgvector
- **Observability:** Langfuse traces + LLM-as-Judge evals
- **Hosting:** Vercel (edge functions + cron)
- **Pre-rendering:** custom SSR via `scripts/prerender.tsx`

## Local development

```bash
cp .env.local.example .env       # then fill in your own API keys
npm install
npm run dev                       # http://localhost:5173
```

## Project commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build + prerender |
| `npm run rag:sync` | Re-index portfolio content into the RAG store |
| `npm run evals` | Run the eval suite (see `evals/`) |

## License

[YOUR_LICENSE_CHOICE]
