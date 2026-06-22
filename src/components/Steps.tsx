import type { FlowField, FlowState } from '../state'

type StepsProps = {
  state: FlowState
  setField: (field: FlowField, value: string) => void
  goToStep: (step: number) => void
  generate: () => void
}

export function Steps({ state, setField, goToStep, generate }: StepsProps) {
  return (
    <section id="flow">
      <div className="progress" id="progress-bar">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div
            key={step}
            className={`dot ${step < state.step ? 'done' : ''} ${step === state.step ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="step-card">
        <StepShell step={1} current={state.step}>
          <div className="step-label">
            Step 1 of 6 · <span className="accent">Identity</span>
          </div>
          <h2>What's this summer going to be called?</h2>
          <p className="why">
            Naming creates a mental boundary between your past self and your summer self. <em>"The summer of
            ___"</em> is a verbal commitment. <span className="ref">(Dai, Milkman & Riis, 2014.)</span>
          </p>
          <TextInput
            value={state.name}
            onChange={(value) => setField('name', value)}
            placeholder="The summer of…"
          />
          <Suggestions
            values={['The summer of speed', 'The summer of saying yes', 'The summer of the lake', 'The summer of slow mornings']}
            onPick={(value) => setField('name', value)}
          />
          <div className="btn-row">
            <button className="btn" onClick={() => goToStep(2)} type="button">
              Next →
            </button>
          </div>
        </StepShell>

        <StepShell step={2} current={state.step}>
          <div className="step-label">
            Step 2 of 6 · <span className="accent">Imagine forward</span>
          </div>
          <h2>It's late August. You're glowing. What do you tell a friend?</h2>
          <p className="why">
            Picture sitting across from a friend in September. They ask how summer was. You light up.{' '}
            <em>Imagining future positive moments in sensory detail generates real positive emotion right now</em>{' '}
            — and increases enjoyment later. <span className="ref">(Bryant & Veroff, 2007.)</span>
          </p>
          <textarea
            value={state.wish}
            onChange={(event) => setField('wish', event.target.value)}
            placeholder="I tell them about…"
          />
          <div className="btn-row">
            <button className="btn ghost" onClick={() => goToStep(1)} type="button">
              ← Back
            </button>
            <button className="btn" onClick={() => goToStep(3)} type="button">
              Next →
            </button>
          </div>
        </StepShell>

        <StepShell step={3} current={state.step}>
          <div className="step-label">
            Step 3 of 6 · <span className="accent">Get honest</span>
          </div>
          <h2>What's most likely to get in the way?</h2>
          <p className="why">
            This is the step most goal-setting skips. <em>Positive fantasies alone predict worse outcomes</em> —
            you need to name the obstacle in the same breath as the wish. It's almost always internal.{' '}
            <span className="ref">(Oettingen.)</span>
          </p>
          <TextInput
            value={state.obstacle}
            onChange={(value) => setField('obstacle', value)}
            placeholder="Honestly, the thing is…"
          />
          <Suggestions
            labels={['Tired after work', 'Waiting to be invited', 'Overthinking', 'Forgetting']}
            values={[
              'I get home tired and default to the couch',
              'I wait for someone to invite me',
              "I overthink and don't text people",
              'I just forget',
            ]}
            onPick={(value) => setField('obstacle', value)}
          />
          <div className="btn-row">
            <button className="btn ghost" onClick={() => goToStep(2)} type="button">
              ← Back
            </button>
            <button className="btn" onClick={() => goToStep(4)} type="button">
              Next →
            </button>
          </div>
        </StepShell>

        <StepShell step={4} current={state.step}>
          <div className="step-label">
            Step 4 of 6 · <span className="accent">Low-stakes start</span>
          </div>
          <h2>One thing you'll start now and quit on September 21.</h2>
          <p className="why">
            A hobby with a built-in end date removes performance pressure. You're not getting back into chess —
            you're getting back into chess <em>for the summer</em>. Pre-committing to stop makes starting easy.
          </p>
          <TextInput
            value={state.hobby}
            onChange={(value) => setField('hobby', value)}
            placeholder="I'll get back into…"
          />
          <Suggestions
            labels={['chess', 'skateboarding', 'guitar', 'bouldering', 'river swimming']}
            values={['playing chess', 'skateboarding', 'playing guitar', 'bouldering outside', 'swimming in the river']}
            onPick={(value) => setField('hobby', value)}
          />
          <div className="btn-row">
            <button className="btn ghost" onClick={() => goToStep(3)} type="button">
              ← Back
            </button>
            <button className="btn" onClick={() => goToStep(5)} type="button">
              Next →
            </button>
          </div>
        </StepShell>

        <StepShell step={5} current={state.step}>
          <div className="step-label">
            Step 5 of 6 · <span className="accent">The engine</span>
          </div>
          <h2>Three if-then plans. This is the part that works.</h2>
          <p className="why">
            Meta-analysis of 94 studies: <em>if-then plans roughly double the rate of goal attainment</em> (d ≈
            0.65). The trigger has to be specific — a time, a place, a moment — not a feeling.{' '}
            <span className="ref">(Gollwitzer & Sheeran, 2006.)</span>
          </p>
          {[1, 2, 3].map((index) => (
            <PlanFields key={index} index={index} state={state} setField={setField} />
          ))}
          <div className="btn-row">
            <button className="btn ghost" onClick={() => goToStep(4)} type="button">
              ← Back
            </button>
            <button className="btn" onClick={() => goToStep(6)} type="button">
              Next →
            </button>
          </div>
        </StepShell>

        <StepShell step={6} current={state.step}>
          <div className="step-label">
            Step 6 of 6 · <span className="accent">Anchor</span>
          </div>
          <h2>One specific thing. One specific date.</h2>
          <p className="why">
            Anticipation is a generator of present positive affect. Naming one dated event you already look
            forward to gives you something to mentally rehearse for the next 90 days.{' '}
            <em>("Train to Lisbon, July 14" beats "summer travel.")</em>
          </p>
          <TextInput
            value={state.anchorName}
            onChange={(value) => setField('anchorName', value)}
            placeholder="The thing — e.g., 'Train to Lisbon with Sara'"
            className="anchor-name-input"
          />
          <input
            type="date"
            value={state.anchorDate}
            onChange={(event) => setField('anchorDate', event.target.value)}
          />
          <div className="btn-row">
            <button className="btn ghost" onClick={() => goToStep(5)} type="button">
              ← Back
            </button>
            <button className="btn warm" onClick={generate} type="button">
              Generate my manifesto →
            </button>
          </div>
        </StepShell>
      </div>
    </section>
  )
}

function StepShell({ step, current, children }: { step: number; current: number; children: React.ReactNode }) {
  return (
    <div className={`step ${step === current ? 'active' : ''}`} data-step={step}>
      {children}
    </div>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}) {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      autoComplete="off"
    />
  )
}

function Suggestions({
  values,
  labels = values,
  onPick,
}: {
  values: string[]
  labels?: string[]
  onPick: (value: string) => void
}) {
  return (
    <div className="suggestions">
      {values.map((value, index) => (
        <button className="chip" key={value} onClick={() => onPick(value)} type="button">
          {labels[index]}
        </button>
      ))}
    </div>
  )
}

function PlanFields({
  index,
  state,
  setField,
}: {
  index: number
  state: FlowState
  setField: (field: FlowField, value: string) => void
}) {
  const trigger = `trigger${index}` as FlowField
  const action = `action${index}` as FlowField

  return (
    <div className="if-then-block">
      <div className="if-then-num">Plan {index}</div>
      <div className="if-then-row">
        <div className="if-then-label">When</div>
        <input
          type="text"
          value={state[trigger]}
          onChange={(event) => setField(trigger, event.target.value)}
          placeholder={index === 1 ? "it's Wednesday after work…" : index === 2 ? "it's a sunny Saturday morning…" : 'it rains on a weekend…'}
        />
      </div>
      <div className="if-then-row">
        <div className="if-then-label">I will</div>
        <input
          type="text"
          value={state[action]}
          onChange={(event) => setField(action, event.target.value)}
          placeholder={index === 1 ? 'text two friends and go to the park' : index === 2 ? 'be on my bike by 9, no exceptions' : 'go to the bookshop, not Netflix'}
        />
      </div>
    </div>
  )
}

