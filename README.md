# 🌿 GreenView AI Chat Agent

Free AI chat agent powering customer support on [greenview.ae](https://greenview.ae).

## 🚀 What It Does

Customers type questions on your website → AI answers instantly using Groq (free LLM) → 24/7 without human intervention.

## 📁 Files

| File | Purpose |
|------|---------|
| `website-chat.json` | n8n workflow — the AI brain |
| `widget.html` | Frontend chat widget for greenview.ae |
| `docker-compose.yml` | Local n8n setup |
| `.env.example` | API keys template |

## ⚡ Quick Start

```bash
git clone https://github.com/mhz996dxb/greenview-agents.git
cd greenview-agents
cp .env.example .env
# Add your Groq API key to .env
docker-compose up -d
```

Then open http://localhost:5678 → Import `website-chat.json` → Activate.

## 🔑 Free API Keys

- **Groq** (recommended): https://console.groq.com/keys
- **Gemini**: https://aistudio.google.com/apikey
- **OpenRouter**: https://openrouter.ai/keys

## 🌐 Live Deployment

1. Deploy n8n to Render.com (free tier)
2. Copy the public URL
3. Paste URL into `widget.html` (replace `YOUR-N8N-DOMAIN.com`)
4. Embed `widget.html` on greenview.ae

## 🛠️ Stack

- **n8n** — automation platform (free, self-hosted)
- **Groq** — free LLM inference (Llama 3.1 70B)
- **Render.com** — free n8n hosting
- **Vercel** — greenview.ae hosting

## 📞 Support

WhatsApp: +971 50 500 3456