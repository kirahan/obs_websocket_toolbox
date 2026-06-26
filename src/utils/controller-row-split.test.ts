import { describe, expect, it } from 'vitest'
import {
  clampRowSplit,
  DEFAULT_ROW_SPLIT,
  rowSplitFromPointer,
} from './controller-row-split'

describe('controller-row-split', () => {
  it('defaults near half when container is tall enough', () => {
    expect(clampRowSplit(DEFAULT_ROW_SPLIT, 800)).toBe(50)
  })

  it('respects minimum lower area height', () => {
    expect(clampRowSplit(90, 500)).toBeLessThan(72)
  })

  it('maps pointer position to split percentage', () => {
    expect(rowSplitFromPointer(300, 100, 800)).toBeCloseTo(25, 0)
  })
})
