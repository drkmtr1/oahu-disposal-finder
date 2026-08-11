type Source = {
  id: string
  title: string
  url: string
  dynamic?: boolean
}

type HhwProcessProps = {
  sources: Source[]
}

export function HhwProcess({ sources }: HhwProcessProps) {
  const currentProcessSource = sources.find((source) => source.dynamic)

  if (!currentProcessSource) {
    return (
      <section className="hhw-process" aria-labelledby="hhw-process-title">
        <h3 id="hhw-process-title">Household Hazardous Waste process unavailable</h3>
        <p>The current HHW process source is missing from this dataset, so this guidance cannot be completed safely.</p>
      </section>
    )
  }

  return (
    <section className="hhw-process" aria-labelledby="hhw-process-title">
      <h3 id="hhw-process-title">Household Hazardous Waste appointment required</h3>
      <p>City HHW drop-off is appointment-based. Register the item and confirm the current process before going.</p>
      <a href={currentProcessSource.url} target="_blank" rel="noreferrer">
        Open the current City HHW process: {currentProcessSource.title}
      </a>
    </section>
  )
}
