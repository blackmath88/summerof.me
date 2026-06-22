import { useMemo, useState } from 'react'
import { Pictogram } from './Pictogram'
import { THEMES, type ThemeId } from '../lib/themes'
import { guessPictogramId } from '../pictograms/guess'
import { PICTOGRAMS } from '../pictograms/registry'
import type { SharePayload } from '../lib/share'
import type { FlowState } from '../state'

type ManifestoProps = {
  state: FlowState
  theme: ThemeId
  restart: () => void
  cycleTheme: () => void
}

type PolishedManifesto = {
  subtitle: string
  obstacle_framing: string
  hobby_line: string
  plans: { trigger: string; action: string }[]
}

type PolishedResult = {
  key: string
  value: PolishedManifesto
}

export function Manifesto({ state, theme, restart, cycleTheme }: ManifestoProps) {
  const [polishEnabled, setPolishEnabled] = useState(false)
  const [polished, setPolished] = useState<PolishedResult | null>(null)
  const [polishStatus, setPolishStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [shareStatus, setShareStatus] = useState<'idle' | 'saving' | 'ready' | 'error'>('idle')
  const [shareUrl, setShareUrl] = useState('')
  const summerName = state.name || 'The summer of intent'
  const cleanName = summerName.replace(/^the summer of\s+/i, '')
  const rawPlans = useMemo(() => [
    { trigger: state.trigger1, action: state.action1 },
    { trigger: state.trigger2, action: state.action2 },
    { trigger: state.trigger3, action: state.action3 },
  ].filter((plan) => plan.trigger || plan.action), [state])
  const polishBody = useMemo(() => ({
    name: state.name,
    wish: state.wish,
    obstacle: state.obstacle,
    hobby: state.hobby,
    plans: rawPlans,
    anchor: { name: state.anchorName, date: state.anchorDate },
    theme,
  }), [rawPlans, state, theme])
  const polishKey = useMemo(() => JSON.stringify({
    name: state.name,
    wish: state.wish,
    obstacle: state.obstacle,
    hobby: state.hobby,
    plans: rawPlans,
    anchor: { name: state.anchorName, date: state.anchorDate },
  }), [rawPlans, state])
  const activePolished = polishEnabled && polished?.key === polishKey ? polished.value : null
  const displayPlans = activePolished ? mergePlans(rawPlans, activePolished.plans) : rawPlans
  const rawObstacleText = `The thing most likely to derail this: ${state.obstacle}. Naming it is half the work. You have an if-then for that.`
  const rawHobbyLine = `I'm getting back into ${state.hobby}. Until the equinox. Then I stop.`
  const subtitle = activePolished?.subtitle
    ? activePolished.subtitle
    : state.wish || 'A summer worth telling a friend about.'
  const obstacleText = activePolished?.obstacle_framing
    ? activePolished.obstacle_framing
    : (
      <>
        The thing most likely to derail this: <strong>{state.obstacle}</strong>. Naming it is half the work. You have
        an if-then for that.
      </>
    )
  const hobbyText = activePolished?.hobby_line
    ? activePolished.hobby_line
    : (
      <>
        I'm getting back into <strong>{state.hobby}</strong>. Until the equinox. Then I stop.
      </>
    )
  const heroPictogram = displayPlans.length || state.anchorName
    ? guessPictogramId(state.anchorName || displayPlans[0]?.action || 'gather')
    : null
  const todayFmt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const anchor = getAnchor(state)
  const sharePayload = useMemo<SharePayload>(() => ({
    version: 1,
    createdAt: new Date().toISOString(),
    theme,
    state,
    copy: {
      subtitle,
      obstacleText: activePolished?.obstacle_framing || rawObstacleText,
      hobbyLine: activePolished?.hobby_line || rawHobbyLine,
      plans: displayPlans,
    },
  }), [activePolished, displayPlans, rawHobbyLine, rawObstacleText, state, subtitle, theme])

  function handlePolishToggle(enabled: boolean) {
    setPolishEnabled(enabled)
    if (!enabled) return
    if (polished?.key === polishKey) {
      setPolishStatus('ready')
      return
    }
    setPolishStatus('loading')

    fetch('/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(polishBody),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Polish request failed')
        return response.json() as Promise<{ polished?: PolishedManifesto }>
      })
      .then((data) => {
        if (!data.polished) throw new Error('Missing polished response')
        setPolished({ key: polishKey, value: data.polished })
        setPolishStatus('ready')
      })
      .catch(() => {
        setPolishStatus('error')
      })
  }

  function handleShare() {
    setShareStatus('saving')
    setShareUrl('')

    fetch('/api/save', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(sharePayload),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Save request failed')
        return response.json() as Promise<{ slug?: string }>
      })
      .then((data) => {
        if (!data.slug) throw new Error('Missing slug')
        const url = `${window.location.origin}/s/${data.slug}`
        setShareUrl(url)
        setShareStatus('ready')
        void navigator.clipboard?.writeText(url)
      })
      .catch(() => {
        setShareStatus('error')
      })
  }

  return (
    <section id="manifesto">
      <div className="step-label manifesto-label">
        Your manifesto · <span className="accent">Memphis edition</span>
      </div>
      <div className="polish-panel">
        <label className="polish-toggle">
          <input
            type="checkbox"
            checked={polishEnabled}
            onChange={(event) => handlePolishToggle(event.target.checked)}
          />
          <span className="toggle-track" aria-hidden="true">
            <span className="toggle-thumb" />
          </span>
          <span>
            <strong>Polish my words</strong>
            <small>{statusCopy(polishEnabled, polishStatus)}</small>
          </span>
        </label>
      </div>
      <div className="manifesto-frame">
        <div className="manifesto-cover">
          {heroPictogram ? (
            <div className="hero-pict">
              <Pictogram id={heroPictogram} width={140} height={70} />
            </div>
          ) : null}
          <div className="top-row">
            <span>Filed: {todayFmt}</span>
            <span>A manifesto · Edition 1</span>
          </div>
          <div className="theme-tag">
            <span className="tag-dot" />
            {THEMES[theme].name}
          </div>
          <h1 className="serif">
            The summer
            <br />
            of <span className="heat">{cleanName}.</span>
          </h1>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="manifesto-body">
          {displayPlans.length ? (
            <div className="section-block">
              <div className="section-label">The plans · if · then</div>
              {displayPlans.map((plan, index) => {
                const pid = guessPictogramId(plan.action)
                return (
                  <div className="plan-row" key={`${plan.trigger}-${plan.action}-${index}`}>
                    <div className="pict-wrap">
                      <Pictogram id={pid} width={96} height={48} />
                    </div>
                    <div>
                      <div className="when">when {plan.trigger || '—'}</div>
                      <div className="what">I will {plan.action || '—'}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}

          {anchor ? (
            <div className="section-block">
              <div className="section-label">The anchor</div>
              <div className="anchor">
                <div>
                  <div className="countdown">
                    {anchor.days}
                    <span className="countdown-small">days until</span>
                  </div>
                </div>
                <div className="what-anchor">
                  {state.anchorName || '—'}
                  <div className="anchor-date">{anchor.formatted}</div>
                </div>
              </div>
            </div>
          ) : null}

          {state.hobby ? (
            <div className="section-block">
              <div className="section-label">The hobby · quits 21 Sept</div>
              <p className="hobby-quote">{hobbyText}</p>
            </div>
          ) : null}

          {state.obstacle ? (
            <div className="section-block">
              <div className="obstacle-card">
                <div className="obstacle-label">When the obstacle hits — and it will</div>
                <div className="obstacle-text">{obstacleText}</div>
              </div>
            </div>
          ) : null}

          {displayPlans.length ? (
            <div className="section-block">
              <div className="section-label">The shape of it</div>
              <div className="pictogram-strip">
                {displayPlans.map((plan, index) => {
                  const pid = guessPictogramId(plan.action)
                  return (
                    <div className="item" key={`${pid}-${index}`}>
                      <Pictogram id={pid} width={110} height={55} />
                      <div className="item-name">{PICTOGRAMS[pid].name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div className="manifesto-footer">
          <span>Name your summer</span>
          <span>{THEMES[theme].name}</span>
        </div>
      </div>
      <div className="btn-row manifesto-actions">
        <button className="btn ghost" onClick={restart} type="button">
          ↺ Start over
        </button>
        <button className="btn" onClick={cycleTheme} type="button">
          ↻ Try another world
        </button>
        <button className="btn warm" onClick={handleShare} disabled={shareStatus === 'saving'} type="button">
          {shareStatus === 'saving' ? 'Saving…' : 'Share link →'}
        </button>
      </div>
      {shareStatus === 'ready' ? (
        <div className="share-result">
          <span>Share URL copied:</span>
          <a href={shareUrl}>{shareUrl}</a>
        </div>
      ) : null}
      {shareStatus === 'error' ? (
        <div className="share-result error">Could not save this manifesto. Check the KV binding and try again.</div>
      ) : null}
    </section>
  )
}

function mergePlans(rawPlans: { trigger: string; action: string }[], polishedPlans: { trigger: string; action: string }[]) {
  return rawPlans.map((plan, index) => ({
    trigger: polishedPlans[index]?.trigger || plan.trigger,
    action: polishedPlans[index]?.action || plan.action,
  }))
}

function statusCopy(enabled: boolean, status: 'idle' | 'loading' | 'ready' | 'error') {
  if (!enabled) return 'Off: using your exact words.'
  if (status === 'loading') return 'Asking for a light edit…'
  if (status === 'ready') return 'On: compare against your original.'
  if (status === 'error') return 'Could not polish. Showing your original.'
  return 'On: your original stays one click away.'
}

function getAnchor(state: FlowState) {
  if (!state.anchorDate) return null
  const today = new Date()
  const target = new Date(`${state.anchorDate}T00:00:00`)
  const days = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (days < 0) return null

  return {
    days,
    formatted: target.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
  }
}
