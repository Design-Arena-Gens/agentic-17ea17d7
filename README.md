# WhatsApp AI Agent (Next.js on Vercel)

Production webhook: `https://agentic-17ea17d7.vercel.app/api/webhook`

## Environment variables
- `OPENAI_API_KEY`: OpenAI API key for responses
- `WHATSAPP_ACCESS_TOKEN`: Meta WhatsApp Cloud API token
- `WHATSAPP_VERIFY_TOKEN`: Webhook verify token (set same in Meta dashboard)
- `OPENAI_MODEL` (optional): defaults to `gpt-4o-mini`

Copy `.env.example` to your deployment environment.

## Meta Webhook
- Callback URL: `https://agentic-17ea17d7.vercel.app/api/webhook`
- Verify Token: value of `WHATSAPP_VERIFY_TOKEN`

## Local development
```bash
npm install
npm run dev
```
