import { loadDisposalData } from './loadData'

describe('Phase 3 data integration', () => {
  it('loads the frozen 25-topic dataset', () => {
    const data = loadDisposalData()
    expect(data.items).toHaveLength(25)
    expect(data.metadata.coverage.canonical_topics).toBe(25)
  })
})
