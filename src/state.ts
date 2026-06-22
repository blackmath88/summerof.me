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
}

type FieldAction = {
  type: 'field'
  field: keyof Omit<FlowState, 'step'>
  value: string
}

export type FlowAction =
  | FieldAction
  | { type: 'step'; step: number }
  | { type: 'restart' }

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value }
    case 'step':
      return { ...state, step: action.step }
    case 'restart':
      return initialState
    default:
      return state
  }
}

export type FlowField = FieldAction['field']

