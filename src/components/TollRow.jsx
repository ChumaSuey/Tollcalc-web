import { useEffect, useRef } from 'react'
import { sanitizeAmount, sanitizeQuantity } from '../lib/calc'

export default function TollRow({ row, index, autoFocus, onUpdate, onEnter }) {
  const montoRef = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      const input = montoRef.current
      if (input) {
        input.focus()
        input.select()
      }
    }
  }, [autoFocus])

  return (
    <div className="toll-row">
      <label className="field field--monto">
        <span className="field__label">Monto</span>
        <span className="field__control">
          <span className="field__prefix">$</span>
          <input
            ref={montoRef}
            className="field__input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            value={row.monto}
            onChange={(event) =>
              onUpdate(row.id, 'monto', sanitizeAmount(event.target.value))
            }
            aria-label={`Monto de la fila ${index + 1}`}
          />
        </span>
      </label>

      <label className="field field--cantidad">
        <span className="field__label">Cantidad</span>
        <input
          className="field__input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={row.cantidad}
          onChange={(event) =>
            onUpdate(row.id, 'cantidad', sanitizeQuantity(event.target.value))
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onEnter()
            }
          }}
          aria-label={`Cantidad de la fila ${index + 1}`}
        />
      </label>
    </div>
  )
}
