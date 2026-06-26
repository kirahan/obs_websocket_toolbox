import { useStorage } from '@vueuse/core'

export interface MockInput {
  inputName: string
  inputKind: string
  inputUuid: string
}

export interface MockScene {
  sceneName: string
  sceneIndex: number
}

export interface SimulatorState {
  obsVersion: string
  obsWebSocketVersion: string
  platform: string
  platformDescription: string
  scenes: MockScene[]
  currentProgramScene: string
  inputs: MockInput[]
  streaming: boolean
  recording: boolean
  studioMode: boolean
  sceneCollections: string[]
  currentSceneCollection: string
  profiles: string[]
  currentProfile: string
  transitions: { transitionName: string; transitionKind: string }[]
  currentTransition: string
}

const defaultState = (): SimulatorState => ({
  obsVersion: '32.0.0',
  obsWebSocketVersion: '5.6.0',
  platform: 'macos',
  platformDescription: 'macOS (Simulator)',
  scenes: [
    { sceneName: 'Main', sceneIndex: 0 },
    { sceneName: '场景', sceneIndex: 1 },
    { sceneName: 'BRB', sceneIndex: 2 },
  ],
  currentProgramScene: 'Main',
  inputs: [
    { inputName: 'Camera', inputKind: 'av_capture_input_v2', inputUuid: 'cam-001' },
    { inputName: 'Mic', inputKind: 'coreaudio_input_capture', inputUuid: 'mic-001' },
  ],
  streaming: false,
  recording: false,
  studioMode: false,
  sceneCollections: ['Default'],
  currentSceneCollection: 'Default',
  profiles: ['Untitled'],
  currentProfile: 'Untitled',
  transitions: [{ transitionName: 'Fade', transitionKind: 'fade_transition' }],
  currentTransition: 'Fade',
})

export const simulatorState = useStorage<SimulatorState>('simulatorState', defaultState(), undefined, {
  mergeDefaults: true,
})

export const simulatorCustomResponses = useStorage<Record<string, unknown>>(
  'simulatorCustomResponses',
  {},
)

export function resetSimulatorState() {
  simulatorState.value = defaultState()
}
