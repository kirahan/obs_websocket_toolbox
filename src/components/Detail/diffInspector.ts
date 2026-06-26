export interface DiffItem {
  path: string
  before: string
  after: string
  type: 'added' | 'removed' | 'changed'
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function formatValue(value: unknown) {
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function valuesEqual(left: unknown, right: unknown) {
  return formatValue(left) === formatValue(right)
}

export function collectDiffItems(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  basePath = '',
): DiffItem[] {
  const diffs: DiffItem[] = []
  const keys = new Set([...Object.keys(before), ...Object.keys(after)])

  for (const key of keys) {
    const path = basePath ? `${basePath}.${key}` : key
    const beforeValue = before[key]
    const afterValue = after[key]

    if (!(key in before)) {
      diffs.push({
        path,
        before: '',
        after: formatValue(afterValue),
        type: 'added',
      })
      continue
    }

    if (!(key in after)) {
      diffs.push({
        path,
        before: formatValue(beforeValue),
        after: '',
        type: 'removed',
      })
      continue
    }

    if (isPlainObject(beforeValue) && isPlainObject(afterValue)) {
      diffs.push(...collectDiffItems(beforeValue, afterValue, path))
      continue
    }

    if (!valuesEqual(beforeValue, afterValue)) {
      diffs.push({
        path,
        before: formatValue(beforeValue),
        after: formatValue(afterValue),
        type: 'changed',
      })
    }
  }

  return diffs
}
