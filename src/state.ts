export type FlowState = {
  step: number
  name: string
  wish: string
  obstacle: string
  hobby: string
  trigger1: string
  action1: string
  trigger2: string
  action2: string
  trigger3: string
  action3: string
  anchorName: string
  anchorDate: string
  _fromDemo: boolean
}

export const initialState: FlowState = {
  step: 0,
  name: '',
  wish: '',
  obstacle: '',
  hobby: '',
  trigger1: '',
  action1: '',
  trigger2: '',
  action2: '',
  trigger3: '',
  action3: '',
  anchorName: '',
  anchorDate: '',
  _fromDemo: false,
}

export const DEMO_DATA: Omit<FlowState, 'step' | '_fromDemo'> = {
  name: 'The summer of saying yes',
  wish: "I'm telling Sara about the boat day with the Berlin friends, the night swim in the Aare, the morning I biked to work and got there before 8 just because I wanted to. None of it was planned three months ago. All of it happened because I said yes.",
  obstacle: 'I get home tired and default to the couch by 8pm',
  hobby: 'playing guitar',
  trigger1: "it's Wednesday and the workday ends",
  action1: 'text two friends and propose dinner outside, no matter the weather',
  trigger2: "it's a sunny Saturday morning",
  action2: 'be on my bike by 9, with a destination, no exceptions',
  trigger3: 'it rains on a weekend',
  action3: 'go to the bookshop on Spalenberg, not Netflix',
  anchorName: 'Train to Lisbon with Sara',
  anchorDate: '',
}

type FlowTextField = Exclude<keyof FlowState, 'step' | '_fromDemo'>

export type FlowAction =
  | { type: 'field'; field: FlowTextField; value: string }
  | { type: 'step'; step: number }
  | { type: 'restart' }
  | { type: 'demo'; anchorDate: string }

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value, _fromDemo: false }
    case 'step':
      return { ...state, step: action.step, _fromDemo: false }
    case 'restart':
      return initialState
    case 'demo':
      return { ...initialState, ...DEMO_DATA, anchorDate: action.anchorDate, _fromDemo: true }
    default:
      return state
  }
}

export type FlowField = FlowTextField
