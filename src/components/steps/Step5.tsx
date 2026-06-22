import { StepAction, StepCard, StepFrame, StepModule, SparRow, type StepProps } from './StepCommon'
import type { FlowField } from '../../state'

export function Step5(props: StepProps) {
  const { state, setField, goToStep, copySpar } = props
  return <StepFrame step={5} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 5 · Implementation intentions (If-then)</div>
      <h2 className="module-title">This is the part <em>that works.</em></h2>
      <div className="viz-row cols-3"><div className="viz-card dark"><span className="viz-stat">0.65</span><div className="viz-label">Effect size (d)</div></div><div className="viz-card dark"><span className="viz-stat">94</span><div className="viz-label">Studies analyzed</div></div><div className="viz-card dark"><span className="viz-stat">~2×</span><div className="viz-label">Vs goal alone</div></div></div>
      <p className="module-foot">Pre-decided triggers bypass willpower. When the moment comes, <strong>you don't deliberate</strong> — you execute the plan you already made. The trigger must be <em>specific</em>: a time, a place, a moment. Not a feeling.</p>
      <div className="module-cite"><strong>Source:</strong> Implementation intentions · Gollwitzer & Sheeran, 2006 meta-analysis</div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">Write three "when this, I will that" plans.</div>
      {[1, 2, 3].map((index) => <PlanFields key={index} index={index} state={state} setField={setField} />)}
      <SparRow step={5} copySpar={copySpar}>Bad if-then plans use feelings as triggers. Get drafts that use real time/place anchors.</SparRow>
      <div className="btn-row"><button className="btn ghost" type="button" onClick={() => goToStep(4)}>← Back</button><button className="btn" type="button" onClick={() => goToStep(6)}>Next →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}

function PlanFields({ index, state, setField }: Pick<StepProps, 'state' | 'setField'> & { index: number }) {
  const trigger = `trigger${index}` as FlowField
  const action = `action${index}` as FlowField
  return <div className="if-then-block"><div className="if-then-num">Plan {index}</div><div className="if-then-row"><div className="if-then-label">When</div><input id={`input-trigger-${index}`} type="text" value={state[trigger]} onChange={(event) => setField(trigger, event.target.value)} placeholder={index === 1 ? "it's Wednesday after work…" : index === 2 ? "it's a sunny Saturday morning…" : 'it rains on a weekend…'} /></div><div className="if-then-row"><div className="if-then-label">I will</div><input id={`input-action-${index}`} type="text" value={state[action]} onChange={(event) => setField(action, event.target.value)} placeholder={index === 1 ? 'text two friends and go to the park' : index === 2 ? 'be on my bike by 9, no exceptions' : 'go to the bookshop, not Netflix'} /></div></div>
}
