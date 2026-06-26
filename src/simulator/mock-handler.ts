import { obsRequestDetailData } from '../data/requests'
import { simulatorCustomResponses, simulatorState } from './mock-state'

export function handleMockRequest(
  requestType: string,
  requestData?: Record<string, unknown>,
): unknown {
  if (simulatorCustomResponses.value[requestType]) {
    return simulatorCustomResponses.value[requestType]
  }

  const state = simulatorState.value
  const scenes = state.scenes.map((s) => ({ sceneName: s.sceneName, sceneIndex: s.sceneIndex }))

  switch (requestType) {
    case 'GetVersion':
      return {
        obsVersion: state.obsVersion,
        obsWebSocketVersion: state.obsWebSocketVersion,
        rpcVersion: 1,
        availableRequests: Object.keys(obsRequestDetailData),
        supportedImageFormats: ['png', 'jpg', 'bmp'],
        platform: state.platform,
        platformDescription: state.platformDescription,
      }
    case 'GetStats':
      return {
        cpuUsage: 12.5,
        memoryUsage: 512,
        availableDiskSpace: 102400,
        activeFps: 60,
        averageFrameRenderTime: 8.2,
        renderSkippedFrames: 0,
        renderTotalFrames: 12000,
        outputSkippedFrames: 0,
        outputTotalFrames: 12000,
        webSocketSessionIncomingMessages: 42,
        webSocketSessionOutgoingMessages: 38,
      }
    case 'GetSceneList':
      return { scenes, currentProgramSceneName: state.currentProgramScene }
    case 'GetInputList':
      return {
        inputs: state.inputs.map((i) => ({
          inputName: i.inputName,
          inputKind: i.inputKind,
          inputUuid: i.inputUuid,
        })),
      }
    case 'GetCurrentProgramScene':
      return { currentProgramSceneName: state.currentProgramScene }
    case 'SetCurrentProgramScene':
      if (requestData?.sceneName) {
        state.currentProgramScene = String(requestData.sceneName)
      }
      return {}
    case 'GetStreamStatus':
      return {
        outputActive: state.streaming,
        outputReconnecting: false,
        outputTimecode: '00:00:00.000',
        outputDuration: 0,
        outputBytes: 0,
        outputSkippedFrames: 0,
        outputTotalFrames: 0,
      }
    case 'GetRecordStatus':
      return {
        outputActive: state.recording,
        outputPaused: false,
        outputTimecode: '00:00:00.000',
        outputDuration: 0,
        outputBytes: 0,
      }
    case 'StartStream':
      state.streaming = true
      return {}
    case 'StopStream':
      state.streaming = false
      return {}
    case 'StartRecord':
      state.recording = true
      return {}
    case 'StopRecord':
      state.recording = false
      return {}
    case 'ToggleStream':
      state.streaming = !state.streaming
      return { outputActive: state.streaming }
    case 'ToggleRecord':
      state.recording = !state.recording
      return { outputActive: state.recording }
    case 'GetStudioModeEnabled':
      return { studioModeEnabled: state.studioMode }
    case 'GetVideoSettings':
      return {
        fpsNumerator: 60,
        fpsDenominator: 1,
        baseWidth: 1920,
        baseHeight: 1080,
        outputWidth: 1920,
        outputHeight: 1080,
      }
    case 'GetSceneCollectionList':
      return {
        currentSceneCollectionName: state.currentSceneCollection,
        sceneCollections: state.sceneCollections,
      }
    case 'GetProfileList':
      return {
        currentProfileName: state.currentProfile,
        profiles: state.profiles,
      }
    case 'GetSceneTransitionList':
      return {
        currentSceneTransitionName: state.currentTransition,
        currentSceneTransitionUuid: 'fade-uuid',
        transitions: state.transitions.map((t) => ({
          transitionName: t.transitionName,
          transitionKind: t.transitionKind,
          transitionFixed: false,
          transitionConfigurable: true,
          transitionUuid: 'fade-uuid',
        })),
      }
    case 'GetCurrentSceneTransition':
      return {
        transitionName: state.currentTransition,
        transitionDuration: 300,
        transitionUuid: 'fade-uuid',
        transitionKind: 'fade_transition',
      }
    case 'Sleep':
      const ms = Number(requestData?.sleepMillis ?? 0)
      return new Promise((resolve) => setTimeout(() => resolve({}), ms))
    case 'CallVendorRequest':
      return {
        vendorName: requestData?.vendorName ?? '',
        requestType: requestData?.requestType ?? '',
        responseData: { ok: true, mock: true },
      }
    case 'BroadcastCustomEvent':
      return {}
    default:
      throw new Error(`Unknown request type: ${requestType}`)
  }
}
