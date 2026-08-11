import { hasRequiredResultData, type ResultItem } from '../domain/resultData'
import { DataError } from './DataError'
import { FacilityCards } from './FacilityCards'
import { HhwProcess } from './HhwProcess'
import { OptionalAlternatives } from './OptionalAlternatives'
import { SourceProvenance } from './SourceProvenance'

type DisposalResultProps = {
  item: ResultItem
  sources: {
    id: string
    title: string
    organization: string
    url: string
    dynamic?: boolean
  }[]
  facilities: {
    id: string
    name: string
    address: string
    hours: string
    restrictions?: string[]
    source_ids: string[]
  }[]
}

function InstructionList({ instructions }: { instructions: string[] }) {
  return (
    <ul>
      {instructions.map((instruction) => (
        <li key={instruction}>{instruction}</li>
      ))}
    </ul>
  )
}

export function DisposalResult({ item, sources, facilities }: DisposalResultProps) {
  if (!hasRequiredResultData(item)) {
    return <DataError />
  }

  return (
    <section className="selected-topic" aria-labelledby="selected-topic-title" aria-live="polite">
      <p className="eyebrow">Selected topic</p>
      <h2 id="selected-topic-title">{item.name}</h2>

      <section aria-labelledby="next-action-title">
        <h3 id="next-action-title">What to do</h3>
        <p>{item.primary_pathway.next_action}</p>
      </section>

      {item.prohibitions.length > 0 && (
        <section className="prohibitions" aria-labelledby="prohibitions-title">
          <h3 id="prohibitions-title">Do not</h3>
          <InstructionList instructions={item.prohibitions} />
        </section>
      )}

      {item.preparation.length > 0 && (
        <section aria-labelledby="preparation-title">
          <h3 id="preparation-title">Prepare before disposal</h3>
          <InstructionList instructions={item.preparation} />
        </section>
      )}

      {item.restrictions.length > 0 && (
        <section aria-labelledby="restrictions-title">
          <h3 id="restrictions-title">Restrictions and limits</h3>
          <InstructionList instructions={item.restrictions} />
        </section>
      )}

      {item.primary_pathway.type === 'hhw_appointment' && <HhwProcess sources={sources} />}

      <FacilityCards facilities={facilities} sources={sources} />

      <OptionalAlternatives alternatives={item.alternatives} sources={sources} />

      <SourceProvenance sources={sources} verifiedOn={item.verified_on} />
    </section>
  )
}
