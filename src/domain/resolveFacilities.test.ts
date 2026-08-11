import { loadDisposalData } from '../data/loadData'
import { resolveEligibleFacilities } from './resolveFacilities'

const data = loadDisposalData()

describe('eligible facility resolution', () => {
  it('resolves every frozen item mapping using its facility IDs in order', () => {
    for (const item of data.items) {
      expect(resolveEligibleFacilities(item, data.facilities).map((facility) => facility.id)).toEqual(
        item.primary_pathway.facility_ids,
      )
    }
  })

  it('preserves the propane exclusion for Keʻehi Transfer Station', () => {
    const propane = data.items.find((item) => item.id === 'IT-020')

    if (!propane) throw new Error('Expected propane data')

    expect(resolveEligibleFacilities(propane, data.facilities).map((facility) => facility.id)).not.toContain(
      'FAC-TS-KEEHI',
    )
  })

  it('resolves the source-backed concrete destinations and their limits', () => {
    const concrete = data.items.find((item) => item.id === 'IT-023')

    if (!concrete) throw new Error('Expected concrete data')

    const facilities = resolveEligibleFacilities(concrete, data.facilities)
    expect(facilities.map((facility) => facility.id)).toEqual(['FAC-TS-KAPAA', 'FAC-WGSL'])
    expect(concrete.restrictions).toEqual(
      expect.arrayContaining([
        expect.stringContaining('five 5-gallon buckets'),
        expect.stringContaining('two standard pickup-truck loads per day'),
      ]),
    )
  })

  it('rejects an unknown facility ID', () => {
    expect(() =>
      resolveEligibleFacilities(
        { primary_pathway: { facility_ids: ['FAC-NOT-REAL'] } },
        data.facilities,
      ),
    ).toThrow('Unknown facility ID: FAC-NOT-REAL')
  })
})
