type Facility = {
  id: string
  name: string
  address: string
  hours: string
  restrictions?: string[]
  source_ids: string[]
}

type Source = {
  id: string
  title: string
  url: string
}

type FacilityCardsProps = {
  facilities: Facility[]
  sources: Source[]
}

export function FacilityCards({ facilities, sources }: FacilityCardsProps) {
  if (facilities.length === 0) return null

  return (
    <section className="facility-cards" aria-labelledby="facilities-title">
      <h3 id="facilities-title">Eligible City locations</h3>
      <div className="facility-card-list">
        {facilities.map((facility) => {
          const facilitySources = sources.filter((source) => facility.source_ids.includes(source.id))

          return (
            <article key={facility.id} className="facility-card">
              <h4>{facility.name}</h4>
              <p>{facility.address}</p>
              <p>
                <strong>Published hours:</strong> {facility.hours}
              </p>
              {facility.restrictions && facility.restrictions.length > 0 && (
                <section aria-labelledby={`${facility.id}-restrictions`}>
                  <h5 id={`${facility.id}-restrictions`}>Location restrictions</h5>
                  <ul>
                    {facility.restrictions.map((restriction) => (
                      <li key={restriction}>{restriction}</li>
                    ))}
                  </ul>
                </section>
              )}
              {facilitySources.length > 0 && (
                <p>
                  {facilitySources.map((source) => (
                    <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  ))}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
