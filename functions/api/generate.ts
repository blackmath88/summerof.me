interface Env {
  ANTHROPIC_API_KEY: string
}

interface RequestBody {
  name: string
  wish: string
  obstacle: string
  hobby: string
  plans: { trigger: string; action: string }[]
  anchor: { name: string; date: string }
  theme: 'a' | 'c' | 'd'
}

interface PolishedManifesto {
  subtitle: string
  obstacle_framing: string
  hobby_line: string
  plans: { trigger: string; action: string }[]
}

const MANIFESTO_SYSTEM_PROMPT = `You are polishing the wording of a personal summer manifesto. The user provided raw inputs through a 6-question flow built on behavioral science (Gollwitzer if-then plans, Oettingen mental contrasting, Bryant & Veroff anticipatory savoring).

Your job: tighten and elevate the user's words WITHOUT replacing their voice or adding sensory detail they didn't supply. You are an editor, not a co-writer.

Hard rules:
- Never invent facts, places, names, or details the user didn't write.
- Never use generic positive-thinking language ("embrace the moment," "live your best life," etc.).
- Keep first-person voice. Preserve the user's specific nouns and verbs.
- Subtitle should be 1-2 sentences max, present tense, declarative.
- Obstacle paragraph: name the obstacle plainly, then close with the if-then promise. Do not soften.
- Plan trigger should be more specific if possible (replace vague time words with concrete ones).
- Hobby quote: keep the user's hobby noun exactly. Tighten the surrounding sentence.

Return JSON only, no preamble:
{
  "subtitle": "...",
  "obstacle_framing": "...",
  "hobby_line": "...",
  "plans": [
    {"trigger": "...", "action": "..."},
    {"trigger": "...", "action": "..."},
    {"trigger": "...", "action": "..."}
  ]
}`

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  if (!ctx.env.ANTHROPIC_API_KEY) {
    return json({ error: 'Missing ANTHROPIC_API_KEY' }, 500)
  }

  let body: RequestBody
  try {
    body = (await ctx.request.json()) as RequestBody
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ctx.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      system: MANIFESTO_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: JSON.stringify(body) }],
    }),
  })

  if (!resp.ok) {
    return json({ error: 'Anthropic request failed' }, resp.status)
  }

  const data = await resp.json<{
    content?: { type?: string; text?: string }[]
  }>()
  const text = data.content?.find((block) => typeof block.text === 'string')?.text

  if (!text) {
    return json({ error: 'Anthropic response did not include text' }, 502)
  }

  try {
    const polished = JSON.parse(text) as PolishedManifesto
    return json({ polished: normalizePolished(polished, body) })
  } catch {
    return json({ error: 'Anthropic response was not valid JSON' }, 502)
  }
}

function normalizePolished(polished: PolishedManifesto, body: RequestBody): PolishedManifesto {
  return {
    subtitle: stringOr(polished.subtitle, body.wish),
    obstacle_framing: stringOr(polished.obstacle_framing, body.obstacle),
    hobby_line: stringOr(polished.hobby_line, body.hobby),
    plans: body.plans.map((plan, index) => ({
      trigger: stringOr(polished.plans?.[index]?.trigger, plan.trigger),
      action: stringOr(polished.plans?.[index]?.action, plan.action),
    })),
  }
}

function stringOr(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

