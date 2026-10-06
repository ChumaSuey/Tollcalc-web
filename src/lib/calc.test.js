import { describe, expect, it } from 'vitest'
import {
  calculateTotal,
  formatCurrency,
  parseNumber,
  sanitizeAmount,
  sanitizeQuantity,
} from './calc'

describe('parseNumber', () => {
  it('returns 0 for empty or invalid values', () => {
    expect(parseNumber('')).toBe(0)
    expect(parseNumber(undefined)).toBe(0)
    expect(parseNumber('abc')).toBe(0)
    expect(parseNumber('.')).toBe(0)
  })

  it('parses integers and decimals, accepting comma as separator', () => {
    expect(parseNumber('10')).toBe(10)
    expect(parseNumber('10.5')).toBe(10.5)
    expect(parseNumber('10,5')).toBe(10.5)
  })
})

describe('calculateTotal', () => {
  it('is zero with no rows', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('multiplies monto by cantidad per row (parity with Python app)', () => {
    expect(calculateTotal([{ monto: '10', cantidad: '1' }])).toBe(10)
    expect(
      calculateTotal([
        { monto: '10', cantidad: '1' },
        { monto: '5', cantidad: '2' },
      ]),
    ).toBe(20)
  })

  it('ignores rows with missing values', () => {
    expect(
      calculateTotal([
        { monto: '', cantidad: '1' },
        { monto: '2', cantidad: '' },
        { monto: '3', cantidad: '2' },
      ]),
    ).toBe(6)
  })
})

describe('formatCurrency', () => {
  it('formats like the Python total', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(10)).toBe('$10.00')
    expect(formatCurrency(20)).toBe('$20.00')
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })
})

describe('sanitizers', () => {
  it('keeps digits and a single decimal separator for montos', () => {
    expect(sanitizeAmount('12a3')).toBe('123')
    expect(sanitizeAmount('10.5.7')).toBe('10.57')
    expect(sanitizeAmount('1,5')).toBe('1,5')
  })

  it('keeps digits only for cantidades', () => {
    expect(sanitizeQuantity('3x')).toBe('3')
    expect(sanitizeQuantity('1.5')).toBe('15')
  })
})
