// Shared Gemini client for both chatbots (site widget: /api/chat, demo: /api/demo-chat).
// Plain fetch against the REST API — no npm dependency needed.
//
// Model: gemini-3.5-flash-lite by default. Override per deployment with
// GEMINI_MODEL (applies to both bots) or DEMO_CHAT_MODEL (demo bot only),
// e.g. "gemini-3.8-flash" — no code change required.

export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export type GeminiResult =
  | { ok: true; reply: string }
  | { ok: false; status: number; error: string };

type GeminiOptions = {
  apiKey: string;
  model?: string;
  system: string;
  messages: ChatMsg[];
  maxOutputTokens: number;
  // "minimal" is plenty for FAQ-style chat and keeps replies fast and cheap.
  thinkingLevel?: "minimal" | "low" | "medium" | "high";
};

export async function callGemini(opts: GeminiOptions): Promise<GeminiResult> {
  const model = opts.model || DEFAULT_GEMINI_MODEL;

  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": opts.apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: opts.system }] },
        // Gemini calls the assistant role "model".
        contents: opts.messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        // maxOutputTokens includes thinking tokens, so keep thinking minimal and
        // leave headroom. Temperature is left at Google's default on purpose:
        // Gemini 3 models are tuned for it and can loop at low values.
        generationConfig: {
          maxOutputTokens: opts.maxOutputTokens,
          thinkingConfig: { thinkingLevel: opts.thinkingLevel ?? "minimal" },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { ok: false, status: res.status, error: errText };
    }

    const data = await res.json();

    if (data?.promptFeedback?.blockReason) {
      return { ok: false, status: 200, error: `Blocked: ${data.promptFeedback.blockReason}` };
    }

    const parts: Array<{ text?: string; thought?: boolean }> = data?.candidates?.[0]?.content?.parts ?? [];
    const reply = parts
      .filter((p) => typeof p.text === "string" && !p.thought)
      .map((p) => p.text as string)
      .join("")
      .trim();

    if (!reply) {
      return {
        ok: false,
        status: 200,
        error: `Empty reply (finishReason: ${data?.candidates?.[0]?.finishReason ?? "unknown"})`,
      };
    }
    return { ok: true, reply };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}
