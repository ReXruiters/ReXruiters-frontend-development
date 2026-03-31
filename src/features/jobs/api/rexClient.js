import REX_SYSTEM from '../constants/rexSystemPrompt';

/**
 * Minimal client for Anthropic Messages API.
 * NOTE: You must include your API Key header to make this work in production.
 * See: https://docs.anthropic.com/claude/reference/messages_post
 */
export async function callRex(history) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-api-key": process.env.ANTHROPIC_API_KEY, // ← required
        // "anthropic-version": "2023-06-01" // often required by Anthropic
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: REX_SYSTEM,
        messages: history,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API ${res.status}`);
    }
    const data = await res.json();
    return { ok: true, text: data.content.filter(b => b.type === "text").map(b => b.text).join("\n") };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
