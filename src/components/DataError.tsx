export function DataError() {
  return (
    <section className="data-error" aria-labelledby="data-error-title" aria-live="assertive">
      <h2 id="data-error-title">Guidance unavailable</h2>
      <p>This topic cannot be shown safely because required disposal information is missing.</p>
    </section>
  )
}
