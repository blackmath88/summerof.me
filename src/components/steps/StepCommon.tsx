import type { FlowField, FlowState } from '../../state'

export type StepProps = {
  state: FlowState
  setField: (field: FlowField, value: string) => void
  goToStep: (step: number) => void
  copySpar: (step: 1 | 2 | 3 | 4 | 5 | 6) => void
  generateManifesto: () => void
}

export function StepFrame({ step, current, children }: { step: number; current: number; children: React.ReactNode }) {
  return <div className={`step ${step === current ? 'active' : ''}`} data-step={step}>{children}</div>
}

export function StepCard({ children }: { children: React.ReactNode }) {
  return <div className="step-card">{children}</div>
}

export function StepModule({ children }: { children: React.ReactNode }) {
  return <div className="step-module">{children}</div>
}

export function StepAction({ children }: { children: React.ReactNode }) {
  return <div className="step-action">{children}</div>
}

export function Suggestions({ values, labels = values, onPick }: { values: string[]; labels?: string[]; onPick: (value: string) => void }) {
  return <div className="suggestions">{values.map((value, index) => <button className="chip" key={value} type="button" onClick={() => onPick(value)}>{labels[index]}</button>)}</div>
}

export function SparRow({ step, copySpar, children }: { step: 1 | 2 | 3 | 4 | 5 | 6; copySpar: (step: 1 | 2 | 3 | 4 | 5 | 6) => void; children: React.ReactNode }) {
  return <><div className="spar-divider"><span>Stuck?</span></div><div className="spar-row"><div className="spar-text"><strong>Spar with an AI.</strong> {children}</div><button className="btn-spar" type="button" onClick={() => copySpar(step)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy prompt</button></div></>
}

export function TextInput({ id, value, onChange, placeholder, className }: { id?: string; value: string; onChange: (value: string) => void; placeholder: string; className?: string }) {
  return <input id={id} className={className} type="text" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete="off" />
}
