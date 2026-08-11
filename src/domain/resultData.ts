export type ResultItem = {
  name: string
  verified_on: string
  source_ids: string[]
  primary_pathway: {
    type: string
    next_action: string
    facility_ids: string[]
  }
  preparation: string[]
  restrictions: string[]
  prohibitions: string[]
  alternatives: {
    label: string
    source_ids: string[]
  }[]
}

export type ResultSource = {
  id: string
  title: string
  organization: string
  url: string
}

export function hasRequiredResultData(item: ResultItem, sources: ResultSource[]): boolean {
  return (
    item.name.trim().length > 0 &&
    item.verified_on.trim().length > 0 &&
    item.primary_pathway.next_action.trim().length > 0 &&
    Array.isArray(item.preparation) &&
    Array.isArray(item.restrictions) &&
    Array.isArray(item.prohibitions) &&
    Array.isArray(item.source_ids) &&
    item.source_ids.length > 0 &&
    item.source_ids.every((sourceId) => {
      const source = sources.find((candidate) => candidate.id === sourceId)
      return Boolean(
        source &&
          source.title.trim() &&
          source.organization.trim() &&
          source.url.trim(),
      )
    })
  )
}
