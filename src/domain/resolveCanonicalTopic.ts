import { normalizeSearch } from './normalizeSearch'

type CanonicalTopic = {
  id: string
  name: string
  aliases: readonly string[]
}

type ClarificationGroup = {
  id: string
  triggers: readonly string[]
}

export type CanonicalTopicResolution =
  | { kind: 'item'; itemId: string }
  | { kind: 'clarification'; clarificationId: string }
  | { kind: 'no-match'; query: string }

export function resolveCanonicalTopic(
  query: string,
  topics: readonly CanonicalTopic[],
  clarificationGroups: readonly ClarificationGroup[] = [],
): CanonicalTopicResolution {
  const normalizedQuery = normalizeSearch(query)
  const canonicalTopic = topics.find((candidate) => normalizeSearch(candidate.name) === normalizedQuery)

  if (canonicalTopic) return { kind: 'item', itemId: canonicalTopic.id }

  const aliasedTopic = topics.find((candidate) =>
    candidate.aliases.some((alias) => normalizeSearch(alias) === normalizedQuery),
  )

  if (aliasedTopic) return { kind: 'item', itemId: aliasedTopic.id }

  const clarificationGroup = clarificationGroups.find((group) =>
    group.triggers.some((trigger) => normalizeSearch(trigger) === normalizedQuery),
  )

  return clarificationGroup
    ? { kind: 'clarification', clarificationId: clarificationGroup.id }
    : { kind: 'no-match', query }
}
