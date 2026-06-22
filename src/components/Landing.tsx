import { Pictogram } from './Pictogram'
import { THEMES, type ThemeId } from '../lib/themes'

type LandingProps = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  begin: () => void
}

export function Landing({ theme, setTheme, begin }: LandingProps) {
  return (
    <section id="screen-landing">
      <div className="eyebrow">
        A six-minute ritual · One named summer · <span className="accent">Free, no account</span>
      </div>
      <h1 className="hero-h">
        Name your
        <br />
        <em>summer.</em>
      </h1>
      <p className="lead">
        Most summers slip by because nobody named them. This is a guided ritual — six questions, one
        declarative manifesto, plans you'll actually keep. Built on three pieces of behavior science.
      </p>

      <div className="theme-picker">
        <div className="label">Pick a world →</div>
        <div className="theme-cards">
          {Object.entries(THEMES).map(([id, option]) => (
            <button
              key={id}
              className={`theme-card ${theme === id ? 'active' : ''}`}
              data-theme={id}
              onClick={() => setTheme(id as ThemeId)}
              type="button"
            >
              <h3 className="tc-name">{option.cardTitle}</h3>
              <p className="tc-sub">{option.sub}</p>
              <div className={`tc-preview theme-preview-${id}`}>
                <Pictogram id="swim" width={100} height={44} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn warm" onClick={begin} type="button">
          Begin the ritual →
        </button>
        <button
          className="skip"
          onClick={() => document.getElementById('system-mini')?.scrollIntoView({ behavior: 'smooth' })}
          type="button"
        >
          or see the pictograms first
        </button>
      </div>

      <div className="hero-meta">
        <div className="meta-card">
          <strong>Today is a fresh start.</strong>
          <p>
            Temporal landmarks separate your past self from your future one. Today, this hour, this is the
            line.
          </p>
        </div>
        <div className="meta-card">
          <strong>No photos, no scroll.</strong>
          <p>
            This page does not host your media. It orchestrates intentions. Everything is geometry.
          </p>
        </div>
      </div>
    </section>
  )
}

