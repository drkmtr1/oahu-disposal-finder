export type ResultItem = {
  name: string
  verified_on: string
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

export function hasRequiredResultData(item: ResultItem): boolean {
  return (
    item.name.trim().length > 0 &&
    item.primary_pathway.next_action.trim().length > 0 &&
    Array.isArray(item.preparation) &&
    Array.isArray(item.restrictions) &&
    Array.isArray(item.prohibitions)
  )
}
