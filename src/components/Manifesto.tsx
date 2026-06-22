import { Pictogram } from '../pictograms/Pictogram'
import { guessPictogramId } from '../pictograms/guess'
import { PICTOGRAMS } from '../pictograms/registry'
import { THEMES, type ThemeId } from '../lib/themes'
import type { FlowState } from '../state'

export function Manifesto({ state, theme, restart, cycleTheme }: { state: FlowState; theme: ThemeId; restart: () => void; cycleTheme: () => void }) {
  const summerName = state.name || 'The summer of intent'
  const cleanName = summerName.replace(/^the summer of\s+/i, '')
  const plans = [
    { trigger: state.trigger1, action: state.action1 },
    { trigger: state.trigger2, action: state.action2 },
    { trigger: state.trigger3, action: state.action3 },
  ].filter((p) => p.trigger || p.action)
  const anchor = getAnchor(state)
  const heroPictogram = plans.length || state.anchorName ? guessPictogramId(state.anchorName || plans[0]?.action || 'gather') : null
  const todayFmt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return <section id="manifesto">
    {state._fromDemo ? <div className="demo-banner"><span className="badge">Example</span>This is a sample summer. Make yours →</div> : null}
    <div className="action-eyebrow" style={{ marginBottom: 12 }}>Your manifesto · <span style={{ color: 'var(--heat)' }}>Memphis edition</span></div>
    <div className="manifesto-frame">
      <div className="manifesto-cover">
        {heroPictogram ? <div className="hero-pict"><Pictogram id={heroPictogram} width={140} height={70} /></div> : null}
        <div className="top-row"><span>Filed: {todayFmt}</span><span>A manifesto · Edition 1</span></div>
        <div className="theme-tag"><span className="tag-dot"></span>{THEMES[theme].name}</div>
        <h1 className="serif">The summer<br />of <span className="heat">{cleanName}.</span></h1>
        <p className="subtitle">{state.wish || 'A summer worth telling a friend about.'}</p>
      </div>
      <div className="manifesto-body">
        {plans.length ? <div className="section-block"><div className="section-label">The plans · if · then</div>{plans.map((plan, index) => { const pid = guessPictogramId(plan.action); return <div className="plan-row" key={index}><div className="pict-wrap"><Pictogram id={pid} width={96} height={48} /></div><div><div className="when">when {plan.trigger || '—'}</div><div className="what">I will {plan.action || '—'}</div></div></div> })}</div> : null}
        {anchor ? <div className="section-block"><div className="section-label">The anchor</div><div className="anchor"><div><div className="countdown">{anchor.days}<span className="countdown-small">days until</span></div></div><div className="what-anchor">{state.anchorName || '—'}<div className="anchor-date">{anchor.formatted}</div></div></div></div> : null}
        {state.hobby ? <div className="section-block"><div className="section-label">The hobby · quits 21 Sept</div><p className="hobby-quote">I'm getting back into <strong>{state.hobby}</strong>. Until the equinox. Then I stop.</p></div> : null}
        {state.obstacle ? <div className="section-block"><div className="obstacle-card"><div className="obstacle-label">When the obstacle hits — and it will</div><div className="obstacle-text">The thing most likely to derail this: <strong>{state.obstacle}</strong>. Naming it is half the work. You have an if-then for that.</div></div></div> : null}
        {plans.length ? <div className="section-block"><div className="section-label">The shape of it</div><div className="pictogram-strip">{plans.map((plan, index) => { const pid = guessPictogramId(plan.action); return <div className="item" key={index}><Pictogram id={pid} width={110} height={55} /><div className="item-name">{PICTOGRAMS[pid].name}</div></div> })}</div></div> : null}
      </div>
      <div className="manifesto-footer"><span>Name your summer</span><span>{THEMES[theme].name}</span></div>
    </div>
    <div className="btn-row" style={{ justifyContent: 'center' }}><button className="btn ghost" type="button" onClick={restart}>↺ Start over</button><button className="btn" type="button" onClick={cycleTheme}>↻ Try another world</button><button className="btn warm" type="button" onClick={() => window.alert('In production: shareable URL with 30-day TTL on Cloudflare KV.')}>Share link →</button></div>
  </section>
}

function getAnchor(state: FlowState) {
  if (!state.anchorDate) return null
  const today = new Date()
  const target = new Date(state.anchorDate + 'T00:00:00')
  const days = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (days < 0) return null
  return { days, formatted: target.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) }
}
