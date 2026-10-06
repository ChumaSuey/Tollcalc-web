import { formatCurrency } from '../lib/calc'

export default function TotalBar({ total }) {
  return (
    <div className="total" role="status" aria-live="polite" aria-atomic="true">
      <span className="total__label">Total</span>
      <span className="total__value">{formatCurrency(total)}</span>
    </div>
  )
}
