import { useState } from 'react'
import { DisposalResult } from '../components/DisposalResult'
import { DataError } from '../components/DataError'
import { loadDisposalData } from '../data/loadData'
import { resolveCanonicalTopic } from '../domain/resolveCanonicalTopic'
import { resolveEligibleFacilities } from '../domain/resolveFacilities'

const data = loadDisposalData()
type FallbackId = keyof typeof data.fallbacks

function App() {
  const [query, setQuery] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [clarificationId, setClarificationId] = useState<string | null>(null)
  const [fallbackId, setFallbackId] = useState<FallbackId | null>(null)
  const [noMatchQuery, setNoMatchQuery] = useState<string | null>(null)
  const selectedTopic = data.items.find((item) => item.id === selectedTopicId) ?? null
  const selectedTopicSources = selectedTopic
    ? data.sources.filter((source) => selectedTopic.source_ids.includes(source.id))
    : []
  let selectedTopicFacilities: typeof data.facilities = []
  let hasFacilityDataError = false

  if (selectedTopic) {
    try {
      selectedTopicFacilities = resolveEligibleFacilities(selectedTopic, data.facilities)
    } catch {
      hasFacilityDataError = true
    }
  }
  const clarificationGroup = data.clarification_groups.find((group) => group.id === clarificationId) ?? null
  const selectedFallback = fallbackId ? data.fallbacks[fallbackId] : null
  const fallbackSources = selectedFallback
    ? data.sources.filter((source) => selectedFallback.source_ids.includes(source.id))
    : []

  function selectTopic(itemId: string) {
    setSelectedTopicId(itemId)
    setClarificationId(null)
    setFallbackId(null)
    setNoMatchQuery(null)
  }

  function selectFallback(id: string) {
    setSelectedTopicId(null)
    setClarificationId(null)
    setFallbackId(id as FallbackId)
    setNoMatchQuery(null)
  }

  function handleClarificationChoice(itemId?: string, fallback?: string) {
    if (itemId) {
      selectTopic(itemId)
      return
    }

    if (fallback) selectFallback(fallback)
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const resolution = resolveCanonicalTopic(query, data.items, data.clarification_groups)

    if (resolution.kind === 'item') {
      selectTopic(resolution.itemId)
      return
    }

    if (resolution.kind === 'clarification') {
      setSelectedTopicId(null)
      setClarificationId(resolution.clarificationId)
      setFallbackId(null)
      setNoMatchQuery(null)
      return
    }

    setSelectedTopicId(null)
    setClarificationId(null)
    setFallbackId(null)
    setNoMatchQuery(resolution.query)
  }

  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="eyebrow">Hawaiʻi Civic-Tech Pilot</p>
          <h1>Oʻahu Household-Item Disposal Finder</h1>
        </div>
      </header>
      <main id="main-content" className="container">
        <section aria-labelledby="search-title" className="search-section">
          <h2 id="search-title">Search supported topics</h2>
          <form onSubmit={handleSearch}>
            <label htmlFor="topic-search">Enter a supported item or topic</label>
            <div className="search-controls">
              <input
                id="topic-search"
                name="topic-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                required
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </section>

        <section aria-labelledby="browse-title" className="browse-section">
          <h2 id="browse-title">Browse supported topics</h2>
          <p>Choose the household item that best matches what you have.</p>
          <ul className="topic-list">
            {data.items.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => selectTopic(item.id)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {selectedTopic && (
          hasFacilityDataError ? (
            <DataError />
          ) : (
            <DisposalResult
              item={selectedTopic}
              sources={selectedTopicSources}
              facilities={selectedTopicFacilities}
            />
          )
        )}

        {clarificationGroup && (
          <section className="clarification" aria-labelledby="clarification-title" aria-live="polite">
            <h2 id="clarification-title">A quick question</h2>
            <p>{clarificationGroup.prompt}</p>
            <ul className="clarification-options">
              {clarificationGroup.options.map((option) => (
                <li key={option.label}>
                  <button
                    type="button"
                    onClick={() => handleClarificationChoice(option.item_id, option.fallback)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {selectedFallback && (
          <section className="fallback" aria-labelledby="fallback-title" aria-live="polite">
            <h2 id="fallback-title">Check the official source</h2>
            <p>{selectedFallback.message}</p>
            <ul>
              {fallbackSources.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {noMatchQuery !== null && (
          <section className="no-match" aria-labelledby="no-match-title" aria-live="polite">
            <h2 id="no-match-title">No exact supported topic found</h2>
            <p>
              “{noMatchQuery}” does not match a supported item or topic. We will not guess a
              disposal result.
            </p>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            {data.metadata.scope}
          </p>
          <p>
            {data.metadata.disclaimer}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
