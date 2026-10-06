export default function Controls({
  canRemove,
  showHotkeys = true,
  onAdd,
  onReset,
  onRemove,
}) {
  return (
    <div className="controls">
      <button type="button" className="btn btn--primary" onClick={onAdd}>
        Agregar
        {showHotkeys && <span className="btn__key">Q</span>}
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Reset
        {showHotkeys && <span className="btn__key">W</span>}
      </button>
      <button
        type="button"
        className="btn btn--danger"
        onClick={onRemove}
        disabled={!canRemove}
        title="Borrar el último monto"
      >
        Borrar
        {showHotkeys && <span className="btn__key">E</span>}
      </button>
    </div>
  )
}
