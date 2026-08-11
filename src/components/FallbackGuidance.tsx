import type { DisposalData } from '../data/loadData'

type Fallback = DisposalData['fallbacks'][keyof DisposalData['fallbacks']]
type Source = DisposalData['sources'][number]

type FallbackGuidanceProps = {
  fallback: Fallback
  sources: Source[]
  query?: string
}

export function FallbackGuidance({ fallback, sources, query }: FallbackGuidanceProps) {
  const isNoMatch = query !== undefined

  return (
    <section className={isNoMatch ? 'fallback no-match' : 'fallback'} aria-live="polite" aria-labelledby="fallback-title">
      <h2 id="fallback-title">
        {isNoMatch ? 'This item is not currently covered by V1' : 'Check the official source'}
      </h2>
      {isNoMatch && <p>“{query}” did not match a supported item or topic.</p>}
      <p>{fallback.message}</p>
      {isNoMatch && (
        <p>
          Not being covered by this V1 does not mean the City has no disposal rule for the item.
        </p>
      )}
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
      {isNoMatch && <p><a href="#browse-title">Browse the 25 supported topics</a></p>}
    </section>
  )
}
