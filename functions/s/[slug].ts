interface Env {
  MANIFESTOS: KVNamespace
}

type ThemeId = 'a' | 'c' | 'd'

type SharePayload = {
  version: 1
  createdAt: string
  theme: ThemeId
  state: {
    name: string
    wish: string
    obstacle: string
    hobby: string
    anchorName: string
    anchorDate: string
  }
  copy: {
    subtitle: string
    obstacleText: string
    hobbyLine: string
    plans: { trigger: string; action: string }[]
  }
}

const THEME_NAMES: Record<ThemeId, string> = {
  a: 'Mediterranean Noon',
  c: 'Tropical Pop',
  d: 'Lake & Pine',
}

const THEME_CSS: Record<ThemeId, string> = {
  a: '--bg-1:#fffcef;--bg-2:#f3edd5;--bg-3:#e2dab8;--paper-tint:#fffcef;--color-a:#0b4f9c;--color-b:#ffd84d;--color-c:#ed3142;--heat:#ed3142;--heat-soft:#fbd9dd;--gradient-hero:radial-gradient(circle at 75% 25%, rgba(255,216,77,.4) 0%, transparent 60%), #fffcef;',
  c: '--bg-1:#fff8f0;--bg-2:#ffe9e5;--bg-3:#ffd1d8;--paper-tint:#fff8f0;--color-a:#ff4d8d;--color-b:#00b8d4;--color-c:#ffc233;--heat:#ff4d8d;--heat-soft:#ffd5e3;--gradient-hero:radial-gradient(circle at 75% 25%, rgba(255,77,141,.3) 0%, transparent 55%), #fff8f0;',
  d: '--bg-1:#fdf6e3;--bg-2:#f0e6c8;--bg-3:#e2d4a8;--paper-tint:#fdf6e3;--color-a:#1f4e3c;--color-b:#2c7a8c;--color-c:#c25a3d;--heat:#c25a3d;--heat-soft:#f3dccf;--gradient-hero:radial-gradient(circle at 75% 25%, rgba(194,90,61,.25) 0%, transparent 55%), #fdf6e3;',
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const slug = ctx.params.slug as string
  const data = await ctx.env.MANIFESTOS.get(slug)
  if (!data) return new Response('Not found', { status: 404 })

  const manifesto = JSON.parse(data) as SharePayload

  return new Response(renderManifestoHTML(manifesto, new URL(ctx.request.url).origin, slug), {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}

function renderManifestoHTML(manifesto: SharePayload, origin: string, slug: string) {
  const theme = manifesto.theme in THEME_NAMES ? manifesto.theme : 'c'
  const summerName = manifesto.state.name || 'The summer of intent'
  const cleanName = summerName.replace(/^the summer of\s+/i, '')
  const title = `The summer of ${cleanName}`
  const description = manifesto.copy.subtitle || 'A summer worth telling a friend about.'
  const url = `${origin}/s/${slug}`
  const ogImage = `${origin}/og-default-${theme}.png`
  const created = manifesto.createdAt
    ? new Date(manifesto.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · Name Your Summer</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeAttr(url)}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:image" content="${escapeAttr(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Name Your Summer">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="${escapeAttr(ogImage)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..900,30..100&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${sharedCss(theme)}</style>
</head>
<body>
  <main>
    <nav class="nav"><div class="brand"><span class="brand-dot"></span>Name Your Summer</div><a href="/">Make yours</a></nav>
    <section class="manifesto-frame">
      <div class="manifesto-cover">
        <div class="top-row"><span>Filed: ${escapeHtml(created)}</span><span>A manifesto · ${escapeHtml(THEME_NAMES[theme])}</span></div>
        <div class="theme-tag"><span class="tag-dot"></span>${escapeHtml(THEME_NAMES[theme])}</div>
        <h1>The summer<br>of <span>${escapeHtml(cleanName)}.</span></h1>
        <p class="subtitle">${escapeHtml(description)}</p>
      </div>
      <div class="manifesto-body">
        ${renderPlans(manifesto.copy.plans)}
        ${renderAnchor(manifesto)}
        ${manifesto.copy.hobbyLine ? `<section><div class="section-label">The hobby · quits 21 Sept</div><p class="hobby-quote">${escapeHtml(manifesto.copy.hobbyLine)}</p></section>` : ''}
        ${manifesto.copy.obstacleText ? `<section><div class="obstacle-card"><div class="obstacle-label">When the obstacle hits — and it will</div><div>${escapeHtml(manifesto.copy.obstacleText)}</div></div></section>` : ''}
      </div>
      <footer><span>Name your summer</span><span>${escapeHtml(THEME_NAMES[theme])}</span></footer>
    </section>
  </main>
</body>
</html>`
}

function renderPlans(plans: { trigger: string; action: string }[]) {
  if (!plans.length) return ''

  return `<section><div class="section-label">The plans · if · then</div>${plans.map((plan) => `
    <div class="plan-row">
      <div class="marker"></div>
      <div><div class="when">when ${escapeHtml(plan.trigger || '—')}</div><div class="what">I will ${escapeHtml(plan.action || '—')}</div></div>
    </div>`).join('')}</section>`
}

function renderAnchor(manifesto: SharePayload) {
  if (!manifesto.state.anchorDate) return ''
  const target = new Date(`${manifesto.state.anchorDate}T00:00:00`)
  const days = Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (days < 0) return ''
  const formatted = target.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })

  return `<section><div class="section-label">The anchor</div><div class="anchor"><div class="countdown">${days}<span>days until</span></div><div>${escapeHtml(manifesto.state.anchorName || '—')}<div class="anchor-date">${escapeHtml(formatted)}</div></div></div></section>`
}

function sharedCss(theme: ThemeId) {
  return `:root{--ink:#1a1814;--ink-soft:#6c655c;--line:#e8e0d0;--paper:#fff;--radius:24px;${THEME_CSS[theme]}}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at top left,var(--bg-1) 0%,var(--bg-2) 50%,var(--bg-3) 100%);color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.55}main{max-width:780px;margin:0 auto;padding:20px 24px 120px}.nav{position:sticky;top:16px;z-index:2;border-radius:999px;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;background:rgba(255,255,255,.72);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.88);box-shadow:0 8px 24px rgba(26,24,20,.06)}.nav a{color:var(--ink);font-size:13px;font-weight:700;text-decoration:none}.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px}.brand-dot,.tag-dot{width:11px;height:11px;border-radius:50%;background:linear-gradient(135deg,var(--color-a),var(--color-b),var(--color-c))}.manifesto-frame{background:var(--paper);border-radius:var(--radius);overflow:hidden;box-shadow:0 24px 60px rgba(26,24,20,.08);border:1px solid rgba(255,255,255,.9)}.manifesto-cover{padding:56px 44px 44px;background:var(--gradient-hero);border-bottom:1px solid var(--line)}.top-row{display:flex;justify-content:space-between;gap:16px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:40px;font-weight:600}.theme-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);font-weight:600;margin-bottom:20px}.manifesto-cover h1{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:clamp(56px,12vw,108px);line-height:.9;letter-spacing:-.045em;margin:0 0 12px;font-variation-settings:"opsz" 144,"SOFT" 100}.manifesto-cover h1 span{color:var(--heat);font-style:italic}.subtitle{font-family:Fraunces,Georgia,serif;font-style:italic;font-size:22px;line-height:1.45;color:var(--ink-soft);margin:24px 0 0;max-width:540px}.manifesto-body{padding:44px 44px 24px}section{margin-bottom:40px}.section-label{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft);font-weight:700;margin-bottom:18px;display:flex;align-items:center;gap:10px}.section-label:before{content:"";display:block;width:24px;height:1.5px;background:var(--heat);border-radius:2px}.plan-row{display:grid;grid-template-columns:64px 1fr;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid var(--line)}.marker{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--color-a),var(--color-b),var(--color-c))}.when{font-family:Fraunces,Georgia,serif;font-style:italic;font-size:13px;color:var(--heat);font-weight:500;margin-bottom:2px}.what{font-size:17px;line-height:1.4;font-weight:500}.anchor{display:flex;align-items:center;gap:24px;padding:28px;background:linear-gradient(135deg,var(--ink) 0%,#2e2820 100%);color:#fff;border-radius:18px}.countdown{font-family:Fraunces,Georgia,serif;font-size:68px;line-height:1;color:var(--color-b)}.countdown span{font-family:Inter,sans-serif;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);display:block;margin-top:6px}.anchor-date{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:8px;font-weight:600}.hobby-quote{font-family:Fraunces,Georgia,serif;font-style:italic;font-size:24px;line-height:1.35;margin:0}.obstacle-card{padding:24px;background:var(--heat-soft);border-radius:18px}.obstacle-label{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--heat);font-weight:700;margin-bottom:10px}footer{padding:24px 44px;background:var(--paper-tint);border-top:1px solid var(--line);display:flex;justify-content:space-between;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft);font-weight:600}@media(max-width:640px){main{padding:16px 16px 100px}.manifesto-cover{padding:40px 24px 32px}.manifesto-body{padding:30px 24px}.top-row,footer{flex-direction:column}.anchor{flex-direction:column;align-items:flex-start}.countdown{font-size:52px}}`
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char] || char)
}

function escapeAttr(value: string) {
  return escapeHtml(value).replace(/\n/g, ' ')
}

