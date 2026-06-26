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

export interface MockSceneItem {
  sceneItemId: number
  sourceName: string
  sourceType: string
  sceneItemEnabled: boolean
  sceneItemLocked: boolean
}

export interface MockFilter {
  filterName: string
  filterKind: string
  filterEnabled: boolean
}

export interface MockInputVolume {
  volumeMul: number
  muted: boolean
}

export interface SimulatorState {
  obsVersion: string
  obsWebSocketVersion: string
  platform: string
  platformDescription: string
  scenes: MockScene[]
  currentProgramScene: string
  previewScene: string
  inputs: MockInput[]
  inputVolumes: Record<string, MockInputVolume>
  sceneItems: Record<string, MockSceneItem[]>
  sourceFilters: Record<string, MockFilter[]>
  streaming: boolean
  recording: boolean
  virtualCam: boolean
  studioMode: boolean
  sceneCollections: string[]
  currentSceneCollection: string
  profiles: string[]
  currentProfile: string
  transitions: { transitionName: string; transitionKind: string }[]
  currentTransition: string
  transitionDuration: number
  tBarPosition: number
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
    { sceneName: 'Chat', sceneIndex: 3 },
    { sceneName: 'Starting', sceneIndex: 4 },
  ],
  currentProgramScene: 'Main',
  previewScene: '场景',
  inputs: [
    { inputName: 'Mic/Aux', inputKind: 'coreaudio_input_capture', inputUuid: 'mic-001' },
    { inputName: 'Aux', inputKind: 'coreaudio_input_capture', inputUuid: 'aux-001' },
    { inputName: 'Desktop Audio', inputKind: 'coreaudio_output_capture', inputUuid: 'desk-001' },
    { inputName: 'Music', inputKind: 'ffmpeg_source', inputUuid: 'music-001' },
  ],
  inputVolumes: {
    'Mic/Aux': { volumeMul: 0.75, muted: false },
    Aux: { volumeMul: 0.5, muted: false },
    'Desktop Audio': { volumeMul: 0.9, muted: false },
    Music: { volumeMul: 0.4, muted: true },
  },
  sceneItems: {
    Main: [
      {
        sceneItemId: 1,
        sourceName: 'Camera',
        sourceType: 'av_capture_input_v2',
        sceneItemEnabled: true,
        sceneItemLocked: false,
      },
      {
        sceneItemId: 2,
        sourceName: 'Browser Source',
        sourceType: 'browser_source',
        sceneItemEnabled: true,
        sceneItemLocked: false,
      },
    ],
    场景: [
      {
        sceneItemId: 3,
        sourceName: 'Camera',
        sourceType: 'av_capture_input_v2',
        sceneItemEnabled: true,
        sceneItemLocked: false,
      },
    ],
  },
  sourceFilters: {
    'Browser Source': [
      { filterName: 'Chroma Key', filterKind: 'chroma_key_filter', filterEnabled: true },
    ],
  },
  streaming: false,
  recording: false,
  virtualCam: false,
  studioMode: false,
  sceneCollections: ['Default'],
  currentSceneCollection: 'Default',
  profiles: ['Untitled'],
  currentProfile: 'Untitled',
  transitions: [{ transitionName: 'Fade', transitionKind: 'fade_transition' }],
  currentTransition: 'Fade',
  transitionDuration: 300,
  tBarPosition: 0.6,
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
