import { loadDisposalData } from '../data/loadData'
import { normalizeSearch } from './normalizeSearch'
import { resolveCanonicalTopic } from './resolveCanonicalTopic'

const topics = loadDisposalData().items

describe('canonical topic resolution', () => {
  it('normalizes case, outer whitespace, and repeated internal whitespace', () => {
    expect(normalizeSearch('  Computer   /   LAPTOP  ')).toBe('computer / laptop')
  })

  it('resolves every canonical topic exactly after normalization', () => {
    for (const topic of topics) {
      expect(resolveCanonicalTopic(`  ${topic.name.toUpperCase()}  `, topics)).toEqual({
        kind: 'item',
        itemId: topic.id,
      })
    }
  })

  it('resolves every frozen direct alias to exactly one topic', () => {
    for (const topic of topics) {
      for (const alias of topic.aliases) {
        expect(resolveCanonicalTopic(alias, topics)).toEqual({ kind: 'item', itemId: topic.id })
      }
    }
  })

  it('routes every frozen clarification trigger to its defined group', () => {
    const clarificationGroups = loadDisposalData().clarification_groups

    for (const group of clarificationGroups) {
      for (const trigger of group.triggers) {
        expect(resolveCanonicalTopic(trigger, topics, clarificationGroups)).toEqual({
          kind: 'clarification',
          clarificationId: group.id,
        })
      }
    }
  })

  it('does not route an unsupported phrase to a disposal topic', () => {
    expect(resolveCanonicalTopic('mystery household item', topics)).toEqual({
      kind: 'no-match',
      query: 'mystery household item',
    })
  })
})
