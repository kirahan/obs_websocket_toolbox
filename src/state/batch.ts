export interface BatchStep {
  id: string
  requestType: string
  requestData: Record<string, unknown>
  delayAfterMs: number
}

export type BatchExecutionMode = 'serial' | 'parallel'

export interface BatchRunLog {
  id: string
  requestType: string
  ok: boolean
  durationMs: number
  response?: unknown
  error?: string
}
