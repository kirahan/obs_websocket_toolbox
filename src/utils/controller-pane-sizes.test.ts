import { describe, expect, it } from 'vitest'
import {
  applyLeftSplitDrag,
  applyRightSplitDrag,
  clampRightSplit,
  DEFAULT_LEFT_SPLIT,
  DEFAULT_RIGHT_SPLIT,
  middleSplit,
  toColumnPercents,
} from './controller-pane-sizes'

describe('controller-pane-sizes', () => {
  it('derives middle column from left and right splits', () => {
    expect(toColumnPercents(28, 28)).toEqual([28, 44, 28])
    expect(middleSplit(28, 28)).toBe(44)
  })

  it('changes only left split when dragging scenes handle', () => {
    const right = DEFAULT_RIGHT_SPLIT
    const nextLeft = applyLeftSplitDrag(DEFAULT_LEFT_SPLIT, right, 5, 1200)
    expect(nextLeft).toBeGreaterThan(DEFAULT_LEFT_SPLIT)
    expect(toColumnPercents(nextLeft, right)[2]).toBe(right)
  })

  it('changes only right split when dragging audio handle', () => {
    const left = DEFAULT_LEFT_SPLIT
    const nextRight = applyRightSplitDrag(left, DEFAULT_RIGHT_SPLIT, 5, 1200)
    expect(nextRight).toBeLessThan(DEFAULT_RIGHT_SPLIT)
    expect(toColumnPercents(left, nextRight)[0]).toBe(left)
  })

  it('allows audio wider than former 320px cap until scene tree min width', () => {
    const containerWidth = 1000
    const left = 28
    const wideRight = clampRightSplit(left, 50, containerWidth)
    expect((wideRight / 100) * containerWidth).toBeGreaterThan(320)
    expect(toColumnPercents(left, wideRight)[0]).toBe(left)
  })
})
