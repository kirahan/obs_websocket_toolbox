type MockEventEmitter = (eventType: string, eventData: unknown) => void

let emitter: MockEventEmitter | null = null

export function setMockEventEmitter(fn: MockEventEmitter): void {
  emitter = fn
}

export function emitMockEvent(eventType: string, eventData: unknown): void {
  emitter?.(eventType, eventData)
}
