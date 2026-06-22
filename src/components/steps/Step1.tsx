import { StepAction, StepCard, StepFrame, StepModule, Suggestions, SparRow, TextInput, type StepProps } from './StepCommon'

export function Step1(props: StepProps) {
  const { state, setField, goToStep, copySpar } = props
  return <StepFrame step={1} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 1 · Fresh start (Naming)</div>
      <h2 className="module-title">A name creates a <em>line.</em></h2>
      <div className="viz-row cols-2"><div className="viz-card"><div className="viz-label">No name</div><div className="viz-text">"Summer 2022" → blur</div></div><div className="viz-card tinted"><div className="viz-label">With a name</div><div className="viz-text"><em>"Summer of saying yes"</em> → every choice has a vote</div></div></div>
      <p className="module-foot">The cheapest commitment available — <strong>ten seconds, costs nothing</strong>, gives every later choice a measure to vote against.</p>
      <div className="module-cite"><strong>Source:</strong> Fresh-start effect · Dai, Milkman & Riis, 2014, <em>Management Science</em></div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">What's your summer's name?</div>
      <TextInput id="input-name" value={state.name} onChange={(value) => setField('name', value)} placeholder="The summer of…" />
      <Suggestions values={['The summer of speed','The summer of saying yes','The summer of the lake','The summer of slow mornings']} onPick={(value) => setField('name', value)} />
      <SparRow step={1} copySpar={copySpar}>Copy a tailored prompt — paste into Claude, ChatGPT, anywhere you think.</SparRow>
      <div className="btn-row"><button className="btn" type="button" onClick={() => goToStep(2)}>Next →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}
