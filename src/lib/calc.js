const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function parseNumber(value) {
  if (value === null || value === undefined) return 0
  const cleaned = String(value).replace(',', '.').trim()
  if (cleaned === '' || cleaned === '.') return 0
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : 0
}

export function calculateTotal(rows) {
  return rows.reduce(
    (total, row) => total + parseNumber(row.monto) * parseNumber(row.cantidad),
    0,
  )
}

export function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  return currencyFormatter.format(value)
}

export function sanitizeAmount(value) {
  const input = String(value ?? '')
  let result = ''
  let hasSeparator = false
  for (const char of input) {
    if (char >= '0' && char <= '9') {
      result += char
    } else if ((char === '.' || char === ',') && !hasSeparator) {
      hasSeparator = true
      result += char
    }
  }
  return result
}

export function sanitizeQuantity(value) {
  const input = String(value ?? '')
  let result = ''
  for (const char of input) {
    if (char >= '0' && char <= '9') result += char
  }
  return result
}
