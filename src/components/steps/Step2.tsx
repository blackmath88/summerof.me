import { StepAction, StepCard, StepFrame, StepModule, SparRow, type StepProps } from './StepCommon'

export function Step2(props: StepProps) {
  const { state, setField, goToStep, copySpar } = props
  return <StepFrame step={2} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 2 · Savoring (Imagine forward)</div>
      <h2 className="module-title">Rehearse the <em>future.</em></h2>
      <div className="viz-row cols-2"><div className="viz-card"><span className="viz-stat">+1</span><div className="viz-label">Positive affect <em>now</em></div><div className="viz-text" style={{ marginTop: 4 }}>As you write it.</div></div><div className="viz-card"><span className="viz-stat">+1</span><div className="viz-label">Enjoyment <em>then</em></div><div className="viz-text" style={{ marginTop: 4 }}>When the moments arrive.</div></div></div>
      <p className="module-foot">Athletes do this. Surgeons do this. <strong>Anyone good at hard things rehearses the outcome in sensory detail first.</strong></p>
      <div className="module-cite"><strong>Source:</strong> Anticipatory savoring · Bryant & Veroff, 2007</div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">It's late August. You're glowing. What do you tell a friend?</div>
      <textarea id="input-wish" value={state.wish} onChange={(event) => setField('wish', event.target.value)} placeholder="I'm telling them about…" />
      <SparRow step={2} copySpar={copySpar}>Get help writing three vivid, sensory sentences about a summer you haven't lived yet.</SparRow>
      <div className="btn-row"><button className="btn ghost" type="button" onClick={() => goToStep(1)}>← Back</button><button className="btn" type="button" onClick={() => goToStep(3)}>Next →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}
