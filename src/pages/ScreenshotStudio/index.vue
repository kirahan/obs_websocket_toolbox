<template>
  <ModuleLayout>
    <div class="module-body full-width screenshot-studio-page">
      <header class="page-header row">
        <div>
          <h1>{{ $t('modules.screenshotStudio.title') }}</h1>
          <p>{{ $t('modules.screenshotStudio.subtitle') }}</p>
        </div>
        <a-tag :color="WSconnected ? 'success' : 'default'">
          {{ WSconnected ? $t('modules.screenshotStudio.connected') : $t('modules.screenshotStudio.notConnected') }}
        </a-tag>
      </header>

      <div class="studio-layout">
        <aside class="panel source-panel">
          <h3>{{ $t('modules.screenshotStudio.source') }}</h3>
          <a-select
            v-model:value="selectedSource"
            show-search
            style="width: 100%"
            :placeholder="$t('modules.screenshotStudio.pickSource')"
            :disabled="!WSconnected"
            @change="onSourceChange"
          >
            <a-select-opt-group v-if="sceneNames.length" :label="$t('modules.screenshotStudio.scenes')">
              <a-select-option v-for="name in sceneNames" :key="`scene-${name}`" :value="name">
                {{ name }}
              </a-select-option>
            </a-select-opt-group>
            <a-select-opt-group v-if="inputNames.length" :label="$t('modules.screenshotStudio.inputs')">
              <a-select-option v-for="name in inputNames" :key="`input-${name}`" :value="name">
                {{ name }}
              </a-select-option>
            </a-select-opt-group>
          </a-select>
          <a-button
            class="batch-btn"
            block
            :disabled="!WSconnected || batchRunning"
            :loading="batchRunning"
            @click="batchExportScenes"
          >
            {{ $t('modules.screenshotStudio.batchScenes') }}
          </a-button>
        </aside>

        <main class="panel preview-panel">
          <h3>{{ $t('modules.screenshotStudio.preview') }}</h3>
          <div class="preview-frame">
            <img v-if="previewUrl" :src="previewUrl" :alt="selectedSource" class="preview-image" />
            <div v-else class="preview-empty">
              <PictureOutlined class="preview-icon" />
              <p>{{ previewHint }}</p>
              <span v-if="displaySize" class="preview-size">{{ displaySize }}</span>
            </div>
          </div>
          <p v-if="lastCapturedAt" class="capture-meta">
            {{ $t('modules.screenshotStudio.lastCapture') }}: {{ lastCapturedAt }}
          </p>
        </main>

        <aside class="panel settings-panel">
          <h3>{{ $t('modules.screenshotStudio.settings') }}</h3>

          <label class="field-label">{{ $t('modules.screenshotStudio.width') }}</label>
          <a-input-number
            v-model:value="imageWidth"
            :min="8"
            :max="4096"
            :disabled="useNativeSize"
            addon-after="px"
            style="width: 100%"
          />

          <label class="field-label">{{ $t('modules.screenshotStudio.height') }}</label>
          <a-input-number
            v-model:value="imageHeight"
            :min="8"
            :max="4096"
            :disabled="useNativeSize"
            addon-after="px"
            style="width: 100%"
          />

          <a-checkbox v-model:checked="useNativeSize" class="native-check">
            {{ $t('modules.screenshotStudio.nativeSize') }}
          </a-checkbox>

          <label class="field-label">{{ $t('modules.screenshotStudio.format') }}</label>
          <a-select v-model:value="imageFormat" style="width: 100%" :options="formatOptions" />

          <template v-if="imageFormat === 'jpg'">
            <label class="field-label">{{ $t('modules.screenshotStudio.quality') }}</label>
            <a-slider v-model:value="compressionQuality" :min="0" :max="100" />
          </template>

          <label class="field-label">{{ $t('modules.screenshotStudio.savePath') }}</label>
          <a-input
            v-model:value="savePath"
            :placeholder="$t('modules.screenshotStudio.savePathPlaceholder')"
          />

          <div class="actions">
            <a-button
              type="primary"
              block
              :loading="capturing"
              :disabled="!WSconnected || !selectedSource"
              @click="capture"
            >
              {{ $t('modules.screenshotStudio.capture') }}
            </a-button>
            <a-button block :disabled="!previewUrl" @click="downloadCurrent">
              <DownloadOutlined />
              {{ $t('modules.screenshotStudio.download') }}
            </a-button>
            <a-button block :disabled="!previewUrl" @click="copyCurrent">
              <CopyOutlined />
              {{ $t('modules.screenshotStudio.copy') }}
            </a-button>
            <a-button
              block
              :loading="saving"
              :disabled="!WSconnected || !selectedSource || !savePath.trim()"
              @click="saveToObs"
            >
              {{ $t('modules.screenshotStudio.saveToObs') }}
            </a-button>
          </div>
        </aside>
      </div>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { CopyOutlined, DownloadOutlined, PictureOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModuleLayout from '../../components/ModuleLayout.vue'
import {
  captureAllSceneScreenshots,
  captureSourceScreenshot,
  copyScreenshotToClipboard,
  downloadAllScreenshots,
  downloadScreenshot,
  getSupportedImageFormats,
  listScreenshotSources,
  saveSourceScreenshot,
} from '../../obs/screenshot'
import { WSconnected } from '../../state/websocket'

const { t } = useI18n()

const selectedSource = ref<string>()
const sceneNames = ref<string[]>([])
const inputNames = ref<string[]>([])
const formatOptions = ref<{ label: string; value: string }[]>([])
const previewUrl = ref('')
const imageWidth = ref(1920)
const imageHeight = ref(1080)
const useNativeSize = ref(false)
const imageFormat = ref('png')
const compressionQuality = ref(90)
const savePath = ref('')
const capturing = ref(false)
const saving = ref(false)
const batchRunning = ref(false)
const lastCapturedAt = ref('')

const displaySize = computed(() => {
  if (useNativeSize.value) return t('modules.screenshotStudio.nativeSizeHint')
  return `${imageWidth.value} × ${imageHeight.value}`
})

const previewHint = computed(() => {
  if (!WSconnected.value) return t('modules.screenshotStudio.notConnected')
  if (!selectedSource.value) return t('modules.screenshotStudio.pickSource')
  return t('modules.screenshotStudio.previewEmpty')
})

function buildCaptureOptions(sourceName: string) {
  return {
    sourceName,
    imageFormat: imageFormat.value,
    imageWidth: useNativeSize.value ? undefined : imageWidth.value,
    imageHeight: useNativeSize.value ? undefined : imageHeight.value,
    imageCompressionQuality: imageFormat.value === 'jpg' ? compressionQuality.value : undefined,
  }
}

async function loadSources() {
  const { scenes, inputs } = await listScreenshotSources()
  sceneNames.value = scenes
  inputNames.value = inputs
  if (!selectedSource.value && scenes.length) {
    selectedSource.value = scenes[0]
  }
}

async function loadFormats() {
  const formats = await getSupportedImageFormats()
  formatOptions.value = formats.map((format) => ({
    label: format.toUpperCase(),
    value: format,
  }))
  if (!formats.includes(imageFormat.value)) {
    imageFormat.value = formats[0] ?? 'png'
  }
}

async function capture() {
  if (!selectedSource.value || !WSconnected.value) return
  capturing.value = true
  try {
    previewUrl.value = await captureSourceScreenshot(buildCaptureOptions(selectedSource.value))
    lastCapturedAt.value = new Date().toLocaleTimeString()
    if (!previewUrl.value) message.warning(t('modules.screenshotStudio.captureEmpty'))
  } catch (error) {
    message.error(String(error))
  } finally {
    capturing.value = false
  }
}

function downloadCurrent() {
  if (!previewUrl.value || !selectedSource.value) return
  downloadScreenshot(previewUrl.value, `${selectedSource.value}.${imageFormat.value}`)
}

async function copyCurrent() {
  if (!previewUrl.value) return
  try {
    await copyScreenshotToClipboard(previewUrl.value)
    message.success(t('modules.screenshotStudio.copied'))
  } catch {
    message.error(t('modules.screenshotStudio.copyFailed'))
  }
}

async function saveToObs() {
  if (!selectedSource.value || !savePath.value.trim()) return
  saving.value = true
  try {
    previewUrl.value = await saveSourceScreenshot({
      ...buildCaptureOptions(selectedSource.value),
      imageFilePath: savePath.value.trim(),
    })
    lastCapturedAt.value = new Date().toLocaleTimeString()
    message.success(t('modules.screenshotStudio.saved'))
  } catch (error) {
    message.error(String(error))
  } finally {
    saving.value = false
  }
}

async function batchExportScenes() {
  batchRunning.value = true
  try {
    const images = await captureAllSceneScreenshots({
      imageFormat: imageFormat.value,
      imageWidth: useNativeSize.value ? undefined : imageWidth.value,
      imageHeight: useNativeSize.value ? undefined : imageHeight.value,
      imageCompressionQuality: imageFormat.value === 'jpg' ? compressionQuality.value : undefined,
    })
    const count = Object.keys(images).length
    if (!count) {
      message.warning(t('modules.screenshotStudio.batchEmpty'))
      return
    }
    downloadAllScreenshots(images, imageFormat.value)
    message.success(t('modules.screenshotStudio.batchDone', { count }))
  } catch (error) {
    message.error(String(error))
  } finally {
    batchRunning.value = false
  }
}

function onSourceChange() {
  previewUrl.value = ''
}

watch(WSconnected, async (connected) => {
  if (connected) {
    await Promise.allSettled([loadSources(), loadFormats()])
  }
})

onMounted(async () => {
  await loadFormats()
  if (WSconnected.value) await loadSources()
})
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';

.full-width {
  max-width: 1280px;
}

.page-header.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
}

.studio-layout {
  display: grid;
  grid-template-columns: 220px 1fr 260px;
  gap: var(--space-md);
  min-height: 520px;
}

.source-panel,
.settings-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.batch-btn {
  margin-top: var(--space-sm);
}

.preview-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.preview-frame {
  flex: 1;
  min-height: 360px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.preview-empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--space-lg);

  .preview-icon {
    font-size: 48px;
    margin-bottom: var(--space-sm);
    opacity: 0.5;
  }

  p {
    margin: 0 0 var(--space-xs);
  }
}

.preview-size {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.capture-meta {
  margin: var(--space-sm) 0 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
}

.native-check {
  margin: var(--space-xs) 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

@media (max-width: 960px) {
  .studio-layout {
    grid-template-columns: 1fr;
  }
}
</style>
