type FacilityReference = {
  primary_pathway: {
    facility_ids: readonly string[]
  }
}

type IdentifiedFacility = {
  id: string
}

export function resolveEligibleFacilities<T extends IdentifiedFacility>(
  item: FacilityReference,
  facilities: readonly T[],
): T[] {
  return item.primary_pathway.facility_ids.map((facilityId) => {
    const facility = facilities.find((candidate) => candidate.id === facilityId)

    if (!facility) throw new Error(`Unknown facility ID: ${facilityId}`)

    return facility
  })
}
