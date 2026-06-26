import { obsEventDetailData, obsRequestDetailData } from '../data/protocol'
import { t } from '../locales'
import type { I_Event_item } from '../state/websocket'

/** Summary 字段值的展示类型 */
export type EventSummaryValueKind = 'text' | 'boolean-true' | 'boolean-false'

/** Summary 单行键值片段 */
export interface EventSummaryPart {
  label: string
  value: string
  valueKind: EventSummaryValueKind
}

/** Summary 状态行类型 */
export type EventSummaryStatusKind = 'success' | 'error' | 'info'

/** 事件 Summary 结构化结果 */
export interface EventSummary {
  description?: string
  parts: EventSummaryPart[]
  status?: { text: string; kind: EventSummaryStatusKind }
}

const SKIP_PARAM_KEYS = new Set([
  'sceneUuid',
  'inputUuid',
  'sourceUuid',
  'outputUuid',
  'filterUuid',
  'transitionUuid',
  'imageData',
  'imageDataFormat',
])

const FIELD_LABEL_KEYS: Record<string, string> = {
  sceneName: 'modules.eventMonitor.summary.fields.scene',
  sourceName: 'modules.eventMonitor.summary.fields.item',
  inputName: 'modules.eventMonitor.summary.fields.input',
  sceneItemName: 'modules.eventMonitor.summary.fields.item',
  sceneItemId: 'modules.eventMonitor.summary.fields.itemId',
  sceneItemEnabled: 'modules.eventMonitor.summary.fields.enabled',
  sceneItemLocked: 'modules.eventMonitor.summary.fields.locked',
  outputActive: 'modules.eventMonitor.summary.fields.active',
  outputState: 'modules.eventMonitor.summary.fields.state',
  transitionName: 'modules.eventMonitor.summary.fields.transition',
  transitionDuration: 'modules.eventMonitor.summary.fields.duration',
  transitionKind: 'modules.eventMonitor.summary.fields.kind',
  vendorName: 'modules.eventMonitor.summary.fields.vendor',
  eventType: 'modules.eventMonitor.summary.fields.eventType',
  eventData: 'modules.eventMonitor.summary.fields.eventData',
}

const MAX_PARTS = 8
const MAX_VALUE_LEN = 48

function translate(key: string, fallback: string): string {
  const result = t(key)
  return result === key ? fallback : result
}

function humanizeFieldName(name: string): string {
  return name
    .replace(/Uuid$/i, ' UUID')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function getParamLabel(ownerKey: string, paramName: string): string {
  const shortKey = FIELD_LABEL_KEYS[paramName]
  if (shortKey) {
    return translate(shortKey, humanizeFieldName(paramName))
  }
  const desKey = `debug.ResParamsDes.${ownerKey}.${paramName}`
  const des = translate(desKey, '')
  if (des) {
    const short = des.split(/[，,]/)[0]?.trim()
    if (short && short.length <= 16) return short
  }
  return humanizeFieldName(paramName)
}

function formatValue(value: unknown): { text: string; valueKind: EventSummaryValueKind } {
  if (typeof value === 'boolean') {
    const text = String(value)
    return { text, valueKind: value ? 'boolean-true' : 'boolean-false' }
  }
  if (value === null || value === undefined) {
    return { text: '—', valueKind: 'text' }
  }
  if (typeof value === 'object') {
    const text = JSON.stringify(value)
    return {
      text: text.length > MAX_VALUE_LEN ? `${text.slice(0, MAX_VALUE_LEN)}…` : text,
      valueKind: 'text',
    }
  }
  const text = String(value)
  return {
    text: text.length > MAX_VALUE_LEN ? `${text.slice(0, MAX_VALUE_LEN)}…` : text,
    valueKind: 'text',
  }
}

function shouldSkipParam(key: string, params: Record<string, unknown>): boolean {
  if (SKIP_PARAM_KEYS.has(key)) return true
  if (key.endsWith('Uuid') && Object.keys(params).some((k) => k !== key && !k.endsWith('Uuid'))) {
    return true
  }
  if (key === 'sceneItemId' && ('sourceName' in params || 'sceneItemName' in params || 'inputName' in params)) {
    return true
  }
  return false
}

function getOrderedParamKeys(
  ownerKey: string,
  params: Record<string, unknown>,
  mode: 'event' | 'request' | 'response',
): string[] {
  let defined: string[] = []
  if (mode === 'event') {
    defined = obsEventDetailData[ownerKey]?.responseParams.map((p) => p.name) ?? []
  } else if (mode === 'request') {
    defined = obsRequestDetailData[ownerKey]?.requestParams.map((p) => p.name) ?? []
  } else {
    defined = obsRequestDetailData[ownerKey]?.responseParams.map((p) => p.name) ?? []
  }
  const ordered = defined.filter((key) => key in params && !shouldSkipParam(key, params))
  const rest = Object.keys(params).filter((key) => !ordered.includes(key) && !shouldSkipParam(key, params))
  return [...ordered, ...rest]
}

function buildParts(ownerKey: string, params: unknown, mode: 'event' | 'request' | 'response'): EventSummaryPart[] {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    if (typeof params === 'string' && params) {
      return [{ label: translate('modules.eventMonitor.summary.fields.message', 'Message'), value: params, valueKind: 'text' }]
    }
    return []
  }

  const record = params as Record<string, unknown>
  const keys = getOrderedParamKeys(ownerKey, record, mode).slice(0, MAX_PARTS)
  return keys.map((key) => {
    const { text, valueKind } = formatValue(record[key])
    return {
      label: getParamLabel(ownerKey, key),
      value: text,
      valueKind,
    }
  })
}

function getEventDescription(name: string): string | undefined {
  if (obsEventDetailData[name]) {
    return translate(`debug.EventDes.${name}`, obsEventDetailData[name].des)
  }
  if (obsRequestDetailData[name]) {
    return translate(`debug.RequestDes.${name}`, obsRequestDetailData[name].des)
  }
  return undefined
}

/** 将 Summary 格式化为纯文本（搜索、CSV 导出） */
export function formatEventSummaryPlain(item: I_Event_item): string {
  const summary = buildEventSummary(item)
  const lines: string[] = []
  if (summary.description) lines.push(summary.description)
  if (summary.parts.length) {
    lines.push(summary.parts.map((p) => `${p.label}: ${p.value}`).join(', '))
  }
  if (summary.status) lines.push(summary.status.text)
  return lines.join(' | ')
}

/** 根据事件条目生成人类可读的 Summary */
export function buildEventSummary(item: I_Event_item): EventSummary {
  const isObsEvent = Boolean(obsEventDetailData[item.name])
  const isRequest = Boolean(obsRequestDetailData[item.name])
  const description = getEventDescription(item.name)

  if (item.type === 'error') {
    const message = typeof item.params === 'string' ? item.params : JSON.stringify(item.params)
    return {
      description,
      parts: [],
      status: {
        text: message || translate('modules.eventMonitor.summary.requestFailed', 'Request failed'),
        kind: 'error',
      },
    }
  }

  if (item.type === 'request') {
    return {
      description,
      parts: buildParts(item.name, item.params, 'request'),
    }
  }

  if (isObsEvent) {
    const parts = buildParts(item.name, item.params, 'event')
    return {
      description: parts.length ? undefined : description,
      parts: parts.length ? parts : [],
      status: parts.length ? undefined : description ? { text: description, kind: 'info' } : undefined,
    }
  }

  if (isRequest && item.type === 'response') {
    const parts = buildParts(item.name, item.params, 'response')
    return {
      description: parts.length ? description : undefined,
      parts,
      status: {
        text: translate('modules.eventMonitor.summary.requestSuccessful', 'Request successful'),
        kind: 'success',
      },
    }
  }

  const fallback = typeof item.params === 'string' ? item.params : JSON.stringify(item.params)
  return {
    parts: fallback && fallback !== '{}' ? [{ label: '', value: fallback.slice(0, 100), valueKind: 'text' }] : [],
    status: description ? { text: description, kind: 'info' } : undefined,
  }
}
