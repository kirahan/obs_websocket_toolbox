import { describe, expect, it } from 'vitest'
import { mulToDb } from './controller'

describe('controller obs helpers', () => {
  it('converts volume multiplier to decibels', () => {
    expect(mulToDb(1)).toBe('0.0 dB')
    expect(mulToDb(0)).toBe('-inf dB')
    expect(mulToDb(0.5)).toContain('dB')
  })
})
