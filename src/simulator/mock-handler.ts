import { obsRequestDetailData } from '../data/requests'
import { emitMockEvent } from './mock-events'
import { simulatorCustomResponses, simulatorState } from './mock-state'

function mockScreenshotBase64(label: string, width = 640, height = 360): string {
  if (typeof document === 'undefined') {
    return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const hash = label.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  ctx.fillStyle = `hsl(${hash % 360}, 55%, 42%)`
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = `${Math.max(12, Math.floor(width / 16))}px sans-serif`
  ctx.fillText(label, 12, height / 2)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
  return dataUrl.split(',')[1] ?? ''
}

export function handleMockRequest(
  requestType: string,
  requestData?: Record<string, unknown>,
): unknown {
  if (requestType === '__emitVolumeMeters') {
    const state = simulatorState.value
    return {
      inputs: state.inputs.map((input) => {
        const level = Math.random() * (state.inputVolumes[input.inputName]?.muted ? 0.02 : 0.7)
        return {
          inputName: input.inputName,
          inputLevelsMul: [level],
          inputLevelsDb: [20 * Math.log10(Math.max(level, 0.0001))],
        }
      }),
    }
  }

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
        emitMockEvent('CurrentProgramSceneChanged', { sceneName: state.currentProgramScene })
      }
      return {}
    case 'GetCurrentPreviewScene':
      return { currentPreviewSceneName: state.previewScene }
    case 'SetCurrentPreviewScene':
      if (requestData?.sceneName) {
        state.previewScene = String(requestData.sceneName)
        emitMockEvent('CurrentPreviewSceneChanged', { sceneName: state.previewScene })
      }
      return {}
    case 'GetSourceScreenshot': {
      const sourceName = String(requestData?.sourceName ?? state.currentProgramScene)
      const width = Number(requestData?.imageWidth ?? 640)
      const height = Number(requestData?.imageHeight ?? 360)
      return { imageData: mockScreenshotBase64(sourceName, width, height) }
    }
    case 'GetSceneItemList': {
      const sceneName = String(requestData?.sceneName ?? state.currentProgramScene)
      return { sceneItems: state.sceneItems[sceneName] ?? [] }
    }
    case 'GetSourceFilterList': {
      const sourceName = String(requestData?.sourceName ?? '')
      return { filters: state.sourceFilters[sourceName] ?? [] }
    }
    case 'SetSceneItemEnabled': {
      const sceneName = String(requestData?.sceneName ?? '')
      const sceneItemId = Number(requestData?.sceneItemId)
      const items = state.sceneItems[sceneName] ?? []
      const item = items.find((entry) => entry.sceneItemId === sceneItemId)
      if (item) item.sceneItemEnabled = !!requestData?.sceneItemEnabled
      return {}
    }
    case 'SetSceneItemLocked': {
      const sceneName = String(requestData?.sceneName ?? '')
      const sceneItemId = Number(requestData?.sceneItemId)
      const items = state.sceneItems[sceneName] ?? []
      const item = items.find((entry) => entry.sceneItemId === sceneItemId)
      if (item) item.sceneItemLocked = !!requestData?.sceneItemLocked
      return {}
    }
    case 'GetInputVolume': {
      const inputName = String(requestData?.inputName ?? '')
      return { inputVolumeMul: state.inputVolumes[inputName]?.volumeMul ?? 1 }
    }
    case 'SetInputVolume': {
      const inputName = String(requestData?.inputName ?? '')
      if (!state.inputVolumes[inputName]) {
        state.inputVolumes[inputName] = { volumeMul: 1, muted: false }
      }
      state.inputVolumes[inputName].volumeMul = Number(requestData?.inputVolumeMul ?? 1)
      return {}
    }
    case 'GetInputMute': {
      const inputName = String(requestData?.inputName ?? '')
      return { inputMuted: state.inputVolumes[inputName]?.muted ?? false }
    }
    case 'ToggleInputMute': {
      const inputName = String(requestData?.inputName ?? '')
      if (!state.inputVolumes[inputName]) {
        state.inputVolumes[inputName] = { volumeMul: 1, muted: false }
      }
      state.inputVolumes[inputName].muted = !state.inputVolumes[inputName].muted
      return { inputMuted: state.inputVolumes[inputName].muted }
    }
    case 'SetInputMute': {
      const inputName = String(requestData?.inputName ?? '')
      if (!state.inputVolumes[inputName]) {
        state.inputVolumes[inputName] = { volumeMul: 1, muted: false }
      }
      state.inputVolumes[inputName].muted = !!requestData?.inputMuted
      return {}
    }
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
    case 'GetVirtualCamStatus':
      return { outputActive: state.virtualCam, outputTimecode: '00:00:00.000' }
    case 'StartVirtualCam':
      state.virtualCam = true
      return {}
    case 'StopVirtualCam':
      state.virtualCam = false
      return {}
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
    case 'SetStudioModeEnabled':
      state.studioMode = !!requestData?.studioModeEnabled
      emitMockEvent('StudioModeStateChanged', { studioModeEnabled: state.studioMode })
      return {}
    case 'SetCurrentSceneTransition':
      if (requestData?.transitionName) {
        state.currentTransition = String(requestData.transitionName)
      }
      return {}
    case 'SetCurrentSceneTransitionDuration':
      state.transitionDuration = Number(requestData?.transitionDuration ?? 300)
      return {}
    case 'SetTBarPosition':
      state.tBarPosition = Number(requestData?.position ?? 0)
      return {}
    case 'TriggerStudioModeTransition':
      state.currentProgramScene = state.previewScene
      emitMockEvent('CurrentProgramSceneChanged', { sceneName: state.currentProgramScene })
      return {}
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
        transitionDuration: state.transitionDuration,
        transitionUuid: 'fade-uuid',
        transitionKind: 'fade_transition',
      }
    case 'Sleep':
      return new Promise((resolve) => setTimeout(() => resolve({}), Number(requestData?.sleepMillis ?? 0)))
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
