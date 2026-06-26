import { handleMockRequest } from './mock-handler'
import { setMockEventEmitter } from './mock-events'

type EventCallback = (data: unknown) => void

const listeners: Record<string, EventCallback[]> = {}
let volumeMeterTimer: ReturnType<typeof setInterval> | null = null

function startVolumeMeterLoop() {
  if (volumeMeterTimer) return
  volumeMeterTimer = setInterval(async () => {
    try {
      const data = await handleMockRequest('__emitVolumeMeters')
      mockObsClient.emit('InputVolumeMeters', data)
    } catch {
      // ignore when simulator not ready
    }
  }, 100)
}

function stopVolumeMeterLoop() {
  if (volumeMeterTimer) {
    clearInterval(volumeMeterTimer)
    volumeMeterTimer = null
  }
}

export const mockObsClient = {
  async connect(_url?: string, _password?: string) {
    startVolumeMeterLoop()
    return { negotiatedRpcVersion: 1 }
  },

  async disconnect() {
    stopVolumeMeterLoop()
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

  off(eventType: string, callback: EventCallback) {
    if (!listeners[eventType]) return
    listeners[eventType] = listeners[eventType].filter((cb) => cb !== callback)
  },

  emit(eventType: string, eventData: unknown) {
    listeners[eventType]?.forEach((cb) => cb(eventData))
  },
}

setMockEventEmitter((eventType, eventData) => {
  mockObsClient.emit(eventType, eventData)
})
