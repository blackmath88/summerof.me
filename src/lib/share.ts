import type { ThemeId } from './themes'
import type { FlowState } from '../state'

export type SharePlan = {
  trigger: string
  action: string
}

export type SharePayload = {
  version: 1
  createdAt: string
  theme: ThemeId
  state: FlowState
  copy: {
    subtitle: string
    obstacleText: string
    hobbyLine: string
    plans: SharePlan[]
  }
}

