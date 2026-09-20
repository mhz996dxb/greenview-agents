// Cloudflare Worker — GreenView AI Backend
// Free forever. 100,000 requests/day. No card needed.

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    try {
      const { message } = await request.json();
      if (!message) return new Response(JSON.stringify({ error: 'No message' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      });

      // Free LLM — Groq (30 req/min free, no card)
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: "You are GreenView Nursery's AI assistant in Dubai. Help with plant selection, care advice for UAE climate (45°C summers), pricing, and nursery visits. Keep replies under 80 words. Mention plants available at Al Warsan 3. Offer WhatsApp contact for complex queries.",
            },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, try again.';
      return new Response(JSON.stringify({ reply }), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ reply: 'Connection error. WhatsApp us.' }), {
        status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
  },
};