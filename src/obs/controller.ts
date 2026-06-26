import OBS from './index'
import { isSimulatorConnection } from '../simulator/connection'
import { mockObsClient } from '../simulator'
import { OBSstatus } from '../state/websocket'
import { currentScene, previewScene, scenesList, inputsList, transitionsList } from './state'

type ObsClient = {
  call(request: string, data?: Record<string, unknown>): Promise<Record<string, unknown>>
  on(event: string, callback: (data: unknown) => void): void
  off?(event: string, callback: (data: unknown) => void): void
}

const volumeMeterCallbacks = new Set<(data: unknown) => void>()
const controllerEventHandlers = new Map<string, Set<(data: unknown) => void>>()

function getClient(): ObsClient {
  if (isSimulatorConnection()) return mockObsClient as ObsClient
  return OBS.getInstance().ws as ObsClient
}

function mulToDb(mul: number): string {
  if (mul <= 0) return '-inf dB'
  const db = 20 * Math.log10(mul)
  return `${db.toFixed(1)} dB`
}

export { mulToDb }

export async function refreshSceneList(): Promise<void> {
  const { scenes, currentProgramSceneName } = await getClient().call('GetSceneList')
  scenesList.value = (scenes as { sceneName: string }[]).map((scene, index) => ({
    name: scene.sceneName,
    sceneIndex: index,
  }))
  currentScene.value = String(currentProgramSceneName ?? '')
}

export async function refreshInputList(): Promise<void> {
  const { inputs } = await getClient().call('GetInputList')
  inputsList.value = (inputs as { inputName: string; inputKind: string; inputUuid?: string }[]).map(
    (input) => ({
      name: input.inputName,
      kind: input.inputKind,
      uuid: input.inputUuid,
    }),
  )
}

export async function refreshTransitions(): Promise<void> {
  const { transitions } = await getClient().call('GetSceneTransitionList')
  transitionsList.value = (transitions as { transitionName: string; transitionKind?: string; transitionUuid?: string }[]).map(
    (transition) => ({
      name: transition.transitionName,
      kind: transition.transitionKind,
      uuid: transition.transitionUuid,
    }),
  )
}

export async function refreshStatus(): Promise<void> {
  const obs = OBS.getInstance()
  await obs.getStatus()
  const vcam = await getClient().call('GetVirtualCamStatus').catch(() => ({ outputActive: false }))
  OBSstatus.isVirtualCam.value = !!vcam.outputActive
}

export async function getProgramScene(): Promise<string> {
  const res = await getClient().call('GetCurrentProgramScene')
  return String(res.currentProgramSceneName ?? '')
}

export async function getPreviewScene(): Promise<string> {
  const res = await getClient().call('GetCurrentPreviewScene')
  return String(res.currentPreviewSceneName ?? '')
}

export async function setProgramScene(sceneName: string): Promise<void> {
  await getClient().call('SetCurrentProgramScene', { sceneName })
  currentScene.value = sceneName
}

export async function setPreviewScene(sceneName: string): Promise<void> {
  await getClient().call('SetCurrentPreviewScene', { sceneName })
  previewScene.value = sceneName
}

export async function getSceneScreenshot(
  sceneName: string,
  width = 640,
  height = 360,
): Promise<string> {
  const res = await getClient().call('GetSourceScreenshot', {
    sourceName: sceneName,
    imageFormat: 'jpg',
    imageWidth: width,
    imageHeight: height,
  })
  const imageData = String(res.imageData ?? '')
  if (!imageData) return ''
  return imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`
}

export async function getStudioModeEnabled(): Promise<boolean> {
  const res = await getClient().call('GetStudioModeEnabled')
  return !!res.studioModeEnabled
}

export async function setStudioModeEnabled(enabled: boolean): Promise<void> {
  await getClient().call('SetStudioModeEnabled', { studioModeEnabled: enabled })
  OBSstatus.isStudioModule.value = enabled
}

export async function getCurrentTransition(): Promise<{ name: string; duration: number }> {
  const res = await getClient().call('GetCurrentSceneTransition')
  return {
    name: String(res.transitionName ?? ''),
    duration: Number(res.transitionDuration ?? 300),
  }
}

export async function setCurrentTransition(transitionName: string): Promise<void> {
  await getClient().call('SetCurrentSceneTransition', { transitionName })
}

export async function setTransitionDuration(duration: number): Promise<void> {
  await getClient().call('SetCurrentSceneTransitionDuration', { transitionDuration: duration })
}

export async function triggerTransition(): Promise<void> {
  await getClient().call('TriggerStudioModeTransition')
  currentScene.value = await getProgramScene()
}

export async function setTBarPosition(position: number): Promise<void> {
  await getClient().call('SetTBarPosition', { position })
}

export async function cutToPreview(): Promise<void> {
  const preview = await getPreviewScene()
  if (preview) await setProgramScene(preview)
}

export async function toggleRecord(): Promise<void> {
  if (OBSstatus.isRecording.value) {
    await getClient().call('StopRecord')
  } else {
    await getClient().call('StartRecord')
  }
  await refreshStatus()
}

export async function toggleStream(): Promise<void> {
  if (OBSstatus.isStreaming.value) {
    await getClient().call('StopStream')
  } else {
    await getClient().call('StartStream')
  }
  await refreshStatus()
}

export async function toggleVirtualCam(): Promise<void> {
  if (OBSstatus.isVirtualCam.value) {
    await getClient().call('StopVirtualCam')
  } else {
    await getClient().call('StartVirtualCam')
  }
  await refreshStatus()
}

export interface SceneTreeItem {
  sceneItemId: number
  sourceName: string
  sourceType: string
  sceneItemEnabled: boolean
  sceneItemLocked: boolean
}

export async function getSceneItemList(sceneName: string): Promise<SceneTreeItem[]> {
  const res = await getClient().call('GetSceneItemList', { sceneName })
  return (res.sceneItems as SceneTreeItem[]) ?? []
}

export interface SourceFilter {
  filterName: string
  filterKind: string
  filterEnabled: boolean
}

export async function getSourceFilterList(sourceName: string): Promise<SourceFilter[]> {
  const res = await getClient().call('GetSourceFilterList', { sourceName })
  return (res.filters as SourceFilter[]) ?? []
}

export async function setSceneItemEnabled(
  sceneName: string,
  sceneItemId: number,
  enabled: boolean,
): Promise<void> {
  await getClient().call('SetSceneItemEnabled', { sceneName, sceneItemId, sceneItemEnabled: enabled })
}

export async function setSceneItemLocked(
  sceneName: string,
  sceneItemId: number,
  locked: boolean,
): Promise<void> {
  await getClient().call('SetSceneItemLocked', { sceneName, sceneItemId, sceneItemLocked: locked })
}

export async function getInputVolume(inputName: string): Promise<number> {
  const res = await getClient().call('GetInputVolume', { inputName })
  return Number(res.inputVolumeMul ?? 1)
}

export async function setInputVolume(inputName: string, volumeMul: number): Promise<void> {
  await getClient().call('SetInputVolume', { inputName, inputVolumeMul: volumeMul })
}

export async function getInputMute(inputName: string): Promise<boolean> {
  const res = await getClient().call('GetInputMute', { inputName })
  return !!res.inputMuted
}

export async function toggleInputMute(inputName: string): Promise<void> {
  await getClient().call('ToggleInputMute', { inputName })
}

let volumeMeterHandler: ((data: unknown) => void) | null = null
let lastVolumeMeterEmit = 0

export function subscribeVolumeMeters(callback: (levels: Record<string, number>) => void): void {
  const client = getClient()
  volumeMeterCallbacks.add(callback as (data: unknown) => void)

  if (!volumeMeterHandler) {
    volumeMeterHandler = (data: unknown) => {
      const now = Date.now()
      if (now - lastVolumeMeterEmit < 100) return
      lastVolumeMeterEmit = now
      const payload = data as { inputs?: { inputName: string; inputLevelsMul?: number[] }[] }
      const levels: Record<string, number> = {}
      payload.inputs?.forEach((input) => {
        const peak = input.inputLevelsMul?.[0] ?? 0
        levels[input.inputName] = peak
      })
      volumeMeterCallbacks.forEach((cb) => (cb as (levels: Record<string, number>) => void)(levels))
    }
    client.on('InputVolumeMeters', volumeMeterHandler)
  }
}

export function unsubscribeVolumeMeters(callback?: (levels: Record<string, number>) => void): void {
  if (callback) volumeMeterCallbacks.delete(callback as (data: unknown) => void)
  else volumeMeterCallbacks.clear()

  if (volumeMeterCallbacks.size === 0 && volumeMeterHandler) {
    getClient().off?.('InputVolumeMeters', volumeMeterHandler)
    volumeMeterHandler = null
  }
}

function ensureControllerEvent(eventName: string, handler: (data: unknown) => void): void {
  if (!controllerEventHandlers.has(eventName)) {
    controllerEventHandlers.set(eventName, new Set())
    getClient().on(eventName, (data) => {
      controllerEventHandlers.get(eventName)?.forEach((cb) => cb(data))
    })
  }
  controllerEventHandlers.get(eventName)?.add(handler)
}

export function subscribeControllerEvents(handlers: {
  onProgramSceneChanged?: (sceneName: string) => void
  onPreviewSceneChanged?: (sceneName: string) => void
  onStudioModeChanged?: (enabled: boolean) => void
}): () => void {
  const disposers: Array<() => void> = []

  if (handlers.onProgramSceneChanged) {
    const handler = (data: unknown) => {
      const sceneName = String((data as { sceneName?: string }).sceneName ?? '')
      currentScene.value = sceneName
      handlers.onProgramSceneChanged?.(sceneName)
    }
    ensureControllerEvent('CurrentProgramSceneChanged', handler)
    disposers.push(() => controllerEventHandlers.get('CurrentProgramSceneChanged')?.delete(handler))
  }

  if (handlers.onPreviewSceneChanged) {
    const handler = (data: unknown) => {
      const sceneName = String((data as { sceneName?: string }).sceneName ?? '')
      previewScene.value = sceneName
      handlers.onPreviewSceneChanged?.(sceneName)
    }
    ensureControllerEvent('CurrentPreviewSceneChanged', handler)
    disposers.push(() => controllerEventHandlers.get('CurrentPreviewSceneChanged')?.delete(handler))
  }

  if (handlers.onStudioModeChanged) {
    const handler = (data: unknown) => {
      const enabled = !!(data as { studioModeEnabled?: boolean }).studioModeEnabled
      OBSstatus.isStudioModule.value = enabled
      handlers.onStudioModeChanged?.(enabled)
    }
    ensureControllerEvent('StudioModeStateChanged', handler)
    disposers.push(() => controllerEventHandlers.get('StudioModeStateChanged')?.delete(handler))
  }

  return () => disposers.forEach((dispose) => dispose())
}

export async function initControllerData(): Promise<void> {
  await refreshSceneList()
  await refreshInputList()
  await refreshTransitions()
  await refreshStatus()
  if (OBSstatus.isStudioModule.value) {
    previewScene.value = await getPreviewScene()
  }
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.click()
}

export async function copyScreenshot(dataUrl: string): Promise<void> {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
}
