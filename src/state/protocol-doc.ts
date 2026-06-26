import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { detailName, expandedKeys, getParentListFromKey, selectedKeys } from './index'

/** 协议文档侧边栏是否打开 */
export const protocolDocPanelOpen = ref(false)

/** 当前展示的 Request / Event 名称 */
export const protocolDocName = ref('')

/** 侧边栏宽度（px） */
export const protocolDocPanelWidth = useStorage('protocolDocPanelWidth', 520)

/** 构建 iframe 内嵌文档 URL */
export function buildProtocolDocUrl(name: string): string {
  const base = import.meta.env.BASE_URL
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${window.location.origin}${normalizedBase}doc/${encodeURIComponent(name)}`
}

/** 同步 Debugger 树选中状态 */
function syncDebuggerSelection(name: string): void {
  detailName.value = name
  selectedKeys.value = [name]
  for (const key of getParentListFromKey(name)) {
    if (!expandedKeys.value.includes(key)) {
      expandedKeys.value.push(key)
    }
  }
}

/** 打开协议文档：非 Debugger 页用侧边 iframe，Debugger 页仅更新详情区 */
export function openProtocolDoc(name: string, options?: { forcePanel?: boolean }): void {
  if (!name) return
  protocolDocName.value = name
  syncDebuggerSelection(name)

  const onDebugPage = window.location.pathname.includes('/debug')
  if (onDebugPage && !options?.forcePanel) {
    protocolDocPanelOpen.value = false
    return
  }

  protocolDocPanelOpen.value = true
}

/** 关闭协议文档侧边栏 */
export function closeProtocolDoc(): void {
  protocolDocPanelOpen.value = false
}
