import { StepAction, StepCard, StepFrame, StepModule, Suggestions, SparRow, TextInput, type StepProps } from './StepCommon'

export function Step4(props: StepProps) {
  const { state, setField, goToStep, copySpar } = props
  return <StepFrame step={4} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 4 · Pre-commitment (Quit-date hobby)</div>
      <h2 className="module-title">Pre-commit to <em>stop.</em></h2>
      <div className="viz-row cols-2"><div className="viz-card"><div className="viz-label">Open-ended</div><div className="viz-text" style={{ fontSize: 14 }}><em>"I'm becoming a chess player"</em></div><div className="viz-text" style={{ marginTop: 6, color: '#c25a3d', fontWeight: 600 }}>→ pressure, never starts</div></div><div className="viz-card tinted"><div className="viz-label">Time-boxed</div><div className="viz-text" style={{ fontSize: 14 }}><em>"I'm playing chess for the summer"</em></div><div className="viz-text" style={{ marginTop: 6, color: 'var(--heat)', fontWeight: 600 }}>→ starts tonight</div></div></div>
      <p className="module-foot"><strong>September 21 is locked.</strong> Autumn equinox. The day this hobby ends, no matter what. Knowing the end is coming makes starting weightless.</p>
      <div className="module-cite"><strong>Source:</strong> Pre-commitment lowers activation cost · behavioral economics 101</div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">What's the thing you'll start now and quit Sept 21?</div>
      <TextInput id="input-hobby" value={state.hobby} onChange={(value) => setField('hobby', value)} placeholder="I'll get back into…" />
      <Suggestions labels={['chess','skateboarding','guitar','bouldering','river swimming']} values={['playing chess','skateboarding','playing guitar','bouldering outside','swimming in the river']} onPick={(value) => setField('hobby', value)} />
      <SparRow step={4} copySpar={copySpar}>Brainstorm hobbies that fit your week, budget, and energy — not just what sounds cool.</SparRow>
      <div className="btn-row"><button className="btn ghost" type="button" onClick={() => goToStep(3)}>← Back</button><button className="btn" type="button" onClick={() => goToStep(5)}>Next →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}
