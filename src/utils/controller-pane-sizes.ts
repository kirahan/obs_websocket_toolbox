export const DEFAULT_LEFT_SPLIT = 28

export const DEFAULT_RIGHT_SPLIT = 28

/** Minimum pixel widths: [scenes, scene tree, audio] */
export const MIN_PANE_WIDTHS = [180, 200, 120] as const

/** Middle column percentage derived from fixed left and right. */
export function middleSplit(left: number, right: number): number {
  return 100 - left - right
}

export function toColumnPercents(left: number, right: number): [number, number, number] {
  return [left, middleSplit(left, right), right]
}

function minPercent(index: 0 | 1 | 2, containerWidth: number): number {
  return (MIN_PANE_WIDTHS[index] / containerWidth) * 100
}

function maxRightPercent(left: number, containerWidth: number): number {
  const minMiddle = minPercent(1, containerWidth)
  return 100 - left - minMiddle
}

/** Clamp left split; right column stays unchanged. */
export function clampLeftSplit(left: number, right: number, containerWidth: number): number {
  if (containerWidth <= 0) return left
  const minLeft = minPercent(0, containerWidth)
  const maxLeft = 100 - right - minPercent(1, containerWidth)
  return Math.min(Math.max(left, minLeft), maxLeft)
}

/** Clamp right split; left column stays unchanged. No max width on audio — only scene tree min. */
export function clampRightSplit(left: number, right: number, containerWidth: number): number {
  if (containerWidth <= 0) return right
  const minRight = minPercent(2, containerWidth)
  const maxRight = maxRightPercent(left, containerWidth)
  return Math.min(Math.max(right, minRight), maxRight)
}

/** Drag handle between scenes and scene tree. Only left split changes. */
export function applyLeftSplitDrag(
  left: number,
  right: number,
  deltaPercent: number,
  containerWidth: number,
): number {
  return clampLeftSplit(left + deltaPercent, right, containerWidth)
}

/** Drag handle between scene tree and audio. Only right split changes. */
export function applyRightSplitDrag(
  left: number,
  right: number,
  deltaPercent: number,
  containerWidth: number,
): number {
  return clampRightSplit(left, right - deltaPercent, containerWidth)
}

export function clampSplitPair(
  left: number,
  right: number,
  containerWidth: number,
): { left: number; right: number } {
  const nextLeft = clampLeftSplit(left, right, containerWidth)
  const nextRight = clampRightSplit(nextLeft, right, containerWidth)
  return { left: nextLeft, right: nextRight }
}

/** @deprecated Legacy 3-array storage migration helper */
export function migrateLegacyPaneSizes(sizes: number[]): { left: number; right: number } {
  if (sizes.length !== 3) {
    return { left: DEFAULT_LEFT_SPLIT, right: DEFAULT_RIGHT_SPLIT }
  }
  return { left: sizes[0], right: sizes[2] }
}
