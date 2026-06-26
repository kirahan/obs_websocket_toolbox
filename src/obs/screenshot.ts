import OBS from './index'
import { isSimulatorConnection } from '../simulator/connection'
import { mockObsClient } from '../simulator'

type ObsClient = {
  call(request: string, data?: Record<string, unknown>): Promise<Record<string, unknown>>
}

export interface ScreenshotCaptureOptions {
  sourceName: string
  imageFormat: string
  imageWidth?: number
  imageHeight?: number
  imageCompressionQuality?: number
}

export interface ScreenshotSaveOptions extends ScreenshotCaptureOptions {
  imageFilePath: string
}

function getClient(): ObsClient {
  if (isSimulatorConnection()) return mockObsClient as ObsClient
  return OBS.getInstance().ws as ObsClient
}

/** Build a data URL from OBS base64 image payload. */
export function toScreenshotDataUrl(imageData: string, format: string): string {
  if (!imageData) return ''
  if (imageData.startsWith('data:')) return imageData
  const mime = format === 'jpg' ? 'jpeg' : format
  return `data:image/${mime};base64,${imageData}`
}

/** Supported image formats from GetVersion. */
export async function getSupportedImageFormats(): Promise<string[]> {
  const res = await getClient().call('GetVersion')
  const formats = res.supportedImageFormats as string[] | undefined
  return formats?.length ? formats : ['png', 'jpg', 'bmp']
}

/** Load scene and input names for source picker. */
export async function listScreenshotSources(): Promise<{ scenes: string[]; inputs: string[] }> {
  const [sceneList, inputList] = await Promise.all([
    getClient().call('GetSceneList'),
    getClient().call('GetInputList'),
  ])
  const scenes = (sceneList.scenes as { sceneName: string }[]).map((scene) => scene.sceneName)
  const inputs = (inputList.inputs as { inputName: string }[]).map((input) => input.inputName)
  return { scenes, inputs }
}

function buildScreenshotRequest(options: ScreenshotCaptureOptions): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    sourceName: options.sourceName,
    imageFormat: options.imageFormat,
  }
  if (options.imageWidth !== undefined && options.imageWidth > 0) {
    payload.imageWidth = options.imageWidth
  }
  if (options.imageHeight !== undefined && options.imageHeight > 0) {
    payload.imageHeight = options.imageHeight
  }
  if (options.imageCompressionQuality !== undefined && options.imageCompressionQuality >= 0) {
    payload.imageCompressionQuality = options.imageCompressionQuality
  }
  return payload
}

/** Capture screenshot and return data URL. */
export async function captureSourceScreenshot(options: ScreenshotCaptureOptions): Promise<string> {
  const res = await getClient().call('GetSourceScreenshot', buildScreenshotRequest(options))
  return toScreenshotDataUrl(String(res.imageData ?? ''), options.imageFormat)
}

/** Save screenshot to OBS-accessible filesystem path. */
export async function saveSourceScreenshot(options: ScreenshotSaveOptions): Promise<string> {
  const res = await getClient().call('SaveSourceScreenshot', {
    ...buildScreenshotRequest(options),
    imageFilePath: options.imageFilePath,
  })
  return toScreenshotDataUrl(String(res.imageData ?? ''), options.imageFormat)
}

export function downloadScreenshot(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.click()
}

export async function copyScreenshotToClipboard(dataUrl: string): Promise<void> {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
}

/** Batch capture all scenes; returns map of scene name to data URL. */
export async function captureAllSceneScreenshots(
  options: Omit<ScreenshotCaptureOptions, 'sourceName'>,
): Promise<Record<string, string>> {
  const { scenes } = await listScreenshotSources()
  const results: Record<string, string> = {}
  const captures = await Promise.allSettled(
    scenes.map(async (sceneName) => {
      const dataUrl = await captureSourceScreenshot({ ...options, sourceName: sceneName })
      return { sceneName, dataUrl }
    }),
  )
  captures.forEach((entry) => {
    if (entry.status === 'fulfilled' && entry.value.dataUrl) {
      results[entry.value.sceneName] = entry.value.dataUrl
    }
  })
  return results
}

export function downloadAllScreenshots(
  images: Record<string, string>,
  format: string,
): void {
  Object.entries(images).forEach(([name, dataUrl]) => {
    downloadScreenshot(dataUrl, `${name}.${format}`)
  })
}
