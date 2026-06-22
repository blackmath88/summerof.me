import { JOURNEY } from '../data/journey'

export function JourneyOverview({ goToStep }: { goToStep: (step: number) => void }) {
  return <div className="journey-overview">{JOURNEY.map((j) => <button className="journey-row" key={j.num} type="button" onClick={() => goToStep(j.num)}><div className="journey-num">{j.num}</div><div className="journey-content"><div className="journey-model">{j.model}</div><div className="journey-action"><em>{j.action}</em></div></div><div className="journey-time">{j.time}</div></button>)}</div>
}

export function JourneyBar({ step, goToStep }: { step: number; goToStep: (step: number) => void }) {
  return <div className="journey-bar"><div className="journey-segments">{JOURNEY.map((j) => <button key={j.num} type="button" onClick={() => goToStep(j.num)} className={`journey-seg ${j.num < step ? 'done' : ''} ${j.num === step ? 'active' : ''}`}><div className="seg-num">{j.num}</div><div className="seg-label">{j.model}</div></button>)}</div></div>
}
