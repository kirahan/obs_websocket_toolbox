import { handleMockRequest } from './mock-handler'

type EventCallback = (data: unknown) => void

const listeners: Record<string, EventCallback[]> = {}

export const mockObsClient = {
  async connect(_url?: string, _password?: string) {
    return { negotiatedRpcVersion: 1 }
  },

  async disconnect() {
    Object.keys(listeners).forEach((key) => {
      listeners[key] = []
    })
  },

  async call<T = unknown>(requestType: string, requestData?: Record<string, unknown>) {
    const result = await handleMockRequest(requestType, requestData)
    return result as T
  },

  on(eventType: string, callback: EventCallback) {
    if (!listeners[eventType]) listeners[eventType] = []
    listeners[eventType].push(callback)
  },

  emit(eventType: string, eventData: unknown) {
    listeners[eventType]?.forEach((cb) => cb(eventData))
  },
}
