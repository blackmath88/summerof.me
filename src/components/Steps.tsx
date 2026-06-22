import { JourneyBar } from './JourneyBar'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import { Step6 } from './steps/Step6'
import type { FlowField, FlowState } from '../state'

type StepNum = 1 | 2 | 3 | 4 | 5 | 6

export function Steps({ state, setField, goToStep, copySpar, generateManifesto }: { state: FlowState; setField: (field: FlowField, value: string) => void; goToStep: (step: number) => void; copySpar: (step: StepNum) => void; generateManifesto: () => void }) {
  const props = { state, setField, goToStep, copySpar, generateManifesto }
  return <section id="flow"><JourneyBar step={state.step} goToStep={goToStep} /><Step1 {...props} /><Step2 {...props} /><Step3 {...props} /><Step4 {...props} /><Step5 {...props} /><Step6 {...props} /></section>
}
