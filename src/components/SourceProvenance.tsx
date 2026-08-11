type Source = {
  id: string
  title: string
  organization: string
  url: string
}

type SourceProvenanceProps = {
  sources: Source[]
  verifiedOn: string
}

export function SourceProvenance({ sources, verifiedOn }: SourceProvenanceProps) {
  return (
    <section className="source-provenance" aria-labelledby="sources-title">
      <h3 id="sources-title">Sources and verification</h3>
      <p>
        <strong>Last verified:</strong> {verifiedOn}. This project manually checked these sources on
        this date; it is not the date the City last updated them.
      </p>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
            <span> — {source.organization}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
