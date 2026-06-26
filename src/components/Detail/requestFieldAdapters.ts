import type { I_Request_Params } from '../../data/requests'

export type RequestFieldKind = 'text' | 'number' | 'boolean' | 'json' | 'any'
export type RequestDraftValue = string | number | boolean | null

export interface NumberRange {
  min?: number
  max?: number
}

export function getFieldKind(field: I_Request_Params): RequestFieldKind {
  switch (field.type.toLowerCase()) {
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'object':
      return 'json'
    case 'any':
      return 'any'
    default:
      return 'text'
  }
}

export function getDefaultDraftValue(field: I_Request_Params): RequestDraftValue {
  const kind = getFieldKind(field)
  if (field.default && field.default !== '{}' && field.default !== 'N/A') {
    return field.default
  }
  if (kind === 'json') return '{}'
  return null
}

export function isEmptyDraftValue(value: RequestDraftValue | undefined) {
  return value === undefined || value === null || value === ''
}

export function getNumberRange(field: I_Request_Params): NumberRange {
  const restrictions = field.valueRestrictions || ''
  const minMatch = restrictions.match(/>=\s*(-?\d+(?:\.\d+)?)/)
  const maxMatch = restrictions.match(/<=\s*(-?\d+(?:\.\d+)?)/)
  return {
    min: minMatch ? Number(minMatch[1]) : undefined,
    max: maxMatch ? Number(maxMatch[1]) : undefined,
  }
}

function parseJsonObject(raw: string, fieldName: string) {
  try {
    const parsed = JSON.parse(raw || '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { error: `${fieldName} must be a JSON object` }
    }
    return { value: parsed }
  } catch {
    return { error: `${fieldName} is not valid JSON` }
  }
}

function parseAny(raw: string) {
  if (raw === '') return null
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

export function parseDraftValue(field: I_Request_Params, value: RequestDraftValue | undefined) {
  const kind = getFieldKind(field)
  if (isEmptyDraftValue(value)) return { value: undefined }

  if (kind === 'number') {
    const numberValue = Number(value)
    if (!Number.isFinite(numberValue)) return { error: `${field.name} must be a number` }
    return { value: numberValue }
  }

  if (kind === 'boolean') return { value: value === true }

  if (kind === 'json') return parseJsonObject(String(value), field.name)

  if (kind === 'any') return { value: parseAny(String(value)) }

  return { value: String(value) }
}

export function formatJsonDraftValue(
  field: I_Request_Params,
  value: RequestDraftValue | undefined,
  space: number,
) {
  const kind = getFieldKind(field)
  if (kind !== 'json' && kind !== 'any') return { value }

  const raw = isEmptyDraftValue(value) ? (kind === 'json' ? '{}' : 'null') : String(value)
  try {
    const parsed = JSON.parse(raw)
    if (kind === 'json' && (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))) {
      return { error: `${field.name} must be a JSON object` }
    }
    return { value: JSON.stringify(parsed, null, space) }
  } catch {
    return { error: `${field.name} is not valid JSON` }
  }
}

export function validateDraftValue(field: I_Request_Params, value: RequestDraftValue | undefined) {
  if (field.require && isEmptyDraftValue(value)) {
    return `${field.name} is required`
  }
  if (isEmptyDraftValue(value)) return null

  const kind = getFieldKind(field)
  if (kind === 'number') {
    const numberValue = Number(value)
    if (!Number.isFinite(numberValue)) return `${field.name} must be a number`

    const { min, max } = getNumberRange(field)
    if (min !== undefined && numberValue < min) return `${field.name} must be >= ${min}`
    if (max !== undefined && numberValue > max) return `${field.name} must be <= ${max}`
  }

  if (kind === 'json') {
    const result = parseJsonObject(String(value), field.name)
    if ('error' in result) return result.error
  }

  return null
}
