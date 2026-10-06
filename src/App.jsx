import { useCallback, useEffect, useState } from 'react'
import Controls from './components/Controls'
import TollRow from './components/TollRow'
import TotalBar from './components/TotalBar'
import { calculateTotal } from './lib/calc'
import { useTheme } from './hooks/useTheme'
import './App.css'

let idCounter = 0

function createRow() {
  idCounter += 1
  return { id: `row-${idCounter}`, monto: '', cantidad: '1' }
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function App() {
  const [rows, setRows] = useState(() => [createRow()])
  const [focusId, setFocusId] = useState(() => rows[0].id)
  const { theme, toggleTheme } = useTheme()

  const total = calculateTotal(rows)

  const updateRow = useCallback((id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    )
  }, [])

  const addRow = useCallback(() => {
    const row = createRow()
    setRows((prev) => [...prev, row])
    setFocusId(row.id)
  }, [])

  const resetRows = useCallback(() => {
    const row = createRow()
    setRows([row])
    setFocusId(row.id)
  }, [])

  const removeLastRow = useCallback(() => {
    if (rows.length <= 1) {
      const row = createRow()
      setRows([row])
      setFocusId(row.id)
      return
    }
    const next = rows.slice(0, -1)
    setRows(next)
    setFocusId(next[next.length - 1].id)
  }, [rows])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      const target = event.target
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (isTyping) return

      const key = event.key.toLowerCase()
      if (key === 'q') {
        event.preventDefault()
        addRow()
      } else if (key === 'w') {
        event.preventDefault()
        resetRows()
      } else if (key === 'e') {
        event.preventDefault()
        removeLastRow()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [addRow, resetRows, removeLastRow])

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Calculadora de Peajes</h1>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
          }
          title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="app__main">
        <div className="rows">
          {rows.map((row, index) => (
            <TollRow
              key={row.id}
              row={row}
              index={index}
              autoFocus={row.id === focusId}
              onUpdate={updateRow}
              onEnter={addRow}
            />
          ))}
        </div>
        <p className="hint">
          Atajos: <kbd>Q</kbd> agregar · <kbd>W</kbd> reset · <kbd>E</kbd> borrar
        </p>
      </main>

      <footer className="app__footer">
        <TotalBar total={total} />
        <Controls
          canRemove={rows.length > 0}
          onAdd={addRow}
          onReset={resetRows}
          onRemove={removeLastRow}
        />
      </footer>
    </div>
  )
}
