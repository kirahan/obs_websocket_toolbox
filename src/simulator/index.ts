import { ref } from 'vue'
import { mockObsClient } from './mock-client'

export const simulatorRunning = ref(false)

export function startSimulator() {
  simulatorRunning.value = true
}

export function stopSimulator() {
  simulatorRunning.value = false
  mockObsClient.disconnect()
}

export function emitSimulatorEvent(eventType: string, eventData: Record<string, unknown>) {
  mockObsClient.emit(eventType, eventData)
}

export {
  resetSimulatorState,
  simulatorState,
  simulatorCustomResponses,
} from './mock-state'
export { mockObsClient } from './mock-client'
