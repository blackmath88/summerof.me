import { StepAction, StepCard, StepFrame, StepModule, Suggestions, SparRow, TextInput, type StepProps } from './StepCommon'

export function Step3(props: StepProps) {
  const { state, setField, goToStep, copySpar } = props
  return <StepFrame step={3} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 3 · Contrasting (Get honest)</div>
      <h2 className="module-title">Wishing alone <em>backfires.</em></h2>
      <div className="viz-row cols-2"><div className="viz-card"><div className="viz-label">Wish only</div><div className="viz-text" style={{ fontSize: 14 }}>Brain rewards you <strong>now</strong> for outcome that hasn't happened →</div><div className="viz-text" style={{ marginTop: 6, color: '#c25a3d', fontWeight: 600 }}>predicts worse outcomes</div></div><div className="viz-card tinted"><div className="viz-label">Wish + obstacle</div><div className="viz-text" style={{ fontSize: 14 }}>Daydream gets <strong>contrasted</strong> against the real friction →</div><div className="viz-text" style={{ marginTop: 6, color: 'var(--heat)', fontWeight: 600 }}>predicts action</div></div></div>
      <p className="module-foot">Name the friction. It's almost never money or time — <strong>it's a habit.</strong> Yours, at 7pm on the couch.</p>
      <div className="module-cite"><strong>Source:</strong> Mental contrasting · Oettingen, 2014 · 25 years of replication</div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">What's most likely to get in the way?</div>
      <TextInput id="input-obstacle" value={state.obstacle} onChange={(value) => setField('obstacle', value)} placeholder="Honestly, the thing is…" />
      <Suggestions labels={['Tired after work','Waiting to be invited','Overthinking','Forgetting']} values={['I get home tired and default to the couch','I wait for someone to invite me',"I overthink and don't text people",'I just forget']} onPick={(value) => setField('obstacle', value)} />
      <SparRow step={3} copySpar={copySpar}>First answers about obstacles are often deflections. Get pushed to name the real thing.</SparRow>
      <div className="btn-row"><button className="btn ghost" type="button" onClick={() => goToStep(2)}>← Back</button><button className="btn" type="button" onClick={() => goToStep(4)}>Next →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}
