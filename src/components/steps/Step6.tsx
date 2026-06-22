import { StepAction, StepCard, StepFrame, StepModule, SparRow, TextInput, type StepProps } from './StepCommon'

export function Step6(props: StepProps) {
  const { state, setField, goToStep, copySpar, generateManifesto } = props
  return <StepFrame step={6} current={state.step}><StepCard>
    <StepModule>
      <div className="module-eyebrow">Step 6 · Anticipation (Anchor event)</div>
      <h2 className="module-title">Looking forward <em>is the reward.</em></h2>
      <div className="viz-quote"><p className="quote-text">"The two weeks before Greece generate more cumulative happiness than the week actually in Greece."</p><div className="quote-source">— Bryant & Veroff, Savoring (2007)</div></div>
      <p className="module-foot" style={{ marginTop: 14 }}>One specific dated event. <strong>Specificity is what lets the brain rehearse it.</strong> "Train to Lisbon, July 14" beats "summer travel."</p>
      <div className="module-cite"><strong>Source:</strong> Anchored anticipation · Bryant & Veroff, 2007 · Van Boven, 2010</div>
    </StepModule>
    <StepAction>
      <div className="action-eyebrow">Your turn →</div><div className="action-prompt serif">Name one specific thing on a specific date.</div>
      <TextInput id="input-anchor-name" className="anchor-name-input" value={state.anchorName} onChange={(value) => setField('anchorName', value)} placeholder="The thing — e.g., 'Train to Lisbon with Sara'" />
      <input id="input-anchor-date" type="date" value={state.anchorDate} onChange={(event) => setField('anchorDate', event.target.value)} />
      <SparRow step={6} copySpar={copySpar}>Turn a vague idea ("travel") into a specific, dated, mentally-rehearsable anchor.</SparRow>
      <div className="btn-row"><button className="btn ghost" type="button" onClick={() => goToStep(5)}>← Back</button><button className="btn warm" type="button" onClick={generateManifesto}>Generate my manifesto →</button></div>
    </StepAction>
  </StepCard></StepFrame>
}
