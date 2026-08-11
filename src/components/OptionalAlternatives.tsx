type Alternative = {
  label: string
  source_ids: string[]
}

type Source = {
  id: string
  title: string
  url: string
}

type OptionalAlternativesProps = {
  alternatives: Alternative[]
  sources: Source[]
}

export function OptionalAlternatives({ alternatives, sources }: OptionalAlternativesProps) {
  if (alternatives.length === 0) return null

  return (
    <section className="optional-alternatives" aria-labelledby="alternatives-title">
      <h3 id="alternatives-title">Optional alternatives</h3>
      <p>These are optional source-backed alternatives, not required disposal steps.</p>
      <ul>
        {alternatives.map((alternative) => {
          const alternativeSources = sources.filter((source) => alternative.source_ids.includes(source.id))

          return (
            <li key={alternative.label}>
              <p>{alternative.label}</p>
              {alternativeSources.length > 0 && (
                <p>
                  {alternativeSources.map((source) => (
                    <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
