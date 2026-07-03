/**
 * POST /api/chat — Chat với NVIDIA model (GLM-5.2 / MiniMax M3)
 * Dùng OpenAI-compatible SDK gọi NVIDIA API
 * Frontend gửi { messages, model? } → stream trả về
 */

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { messages, model = 'z-ai/glm-5.2', temperature = 0.7, max_tokens = 4096 } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
    }

    const resp = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY || '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'}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        top_p: 0.95,
        max_tokens,
        stream: true,
      }),
    });

    // Stream response về client
    return new Response(resp.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
