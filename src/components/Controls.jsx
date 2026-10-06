export default function Controls({ canRemove, onAdd, onReset, onRemove }) {
  return (
    <div className="controls">
      <button type="button" className="btn btn--primary" onClick={onAdd}>
        Agregar
        <span className="btn__key">Q</span>
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Reset
        <span className="btn__key">W</span>
      </button>
      <button
        type="button"
        className="btn btn--danger"
        onClick={onRemove}
        disabled={!canRemove}
        title="Borrar el último monto"
      >
        Borrar
        <span className="btn__key">E</span>
      </button>
    </div>
  )
}
