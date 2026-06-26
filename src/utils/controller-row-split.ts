export const DEFAULT_ROW_SPLIT = 50

export const MIN_ROW_SPLIT = 28

export const MAX_ROW_SPLIT = 72

export const MIN_UPPER_PX = 160

export const MIN_LOWER_PX = 200

/** Clamp upper area percentage using pixel minimums. */
export function clampRowSplit(percent: number, containerHeight: number): number {
  if (containerHeight <= 0) return DEFAULT_ROW_SPLIT

  const handlePx = 8
  const minUpperPercent = (MIN_UPPER_PX / containerHeight) * 100
  const minLowerPercent = ((MIN_LOWER_PX + handlePx) / containerHeight) * 100
  const maxUpperPercent = 100 - minLowerPercent

  return Math.min(
    Math.max(percent, minUpperPercent, MIN_ROW_SPLIT),
    Math.min(maxUpperPercent, MAX_ROW_SPLIT),
  )
}

/** Convert mouse Y position to upper split percentage. */
export function rowSplitFromPointer(clientY: number, containerTop: number, containerHeight: number): number {
  const percent = ((clientY - containerTop) / containerHeight) * 100
  return clampRowSplit(percent, containerHeight)
}
