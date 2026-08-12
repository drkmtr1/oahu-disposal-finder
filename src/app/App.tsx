import { useEffect, useRef, useState } from 'react'
import { DisposalResult } from '../components/DisposalResult'
import { DataError } from '../components/DataError'
import { FallbackGuidance } from '../components/FallbackGuidance'
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
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)
  const clarificationHeadingRef = useRef<HTMLHeadingElement>(null)
  const fallbackHeadingRef = useRef<HTMLHeadingElement>(null)
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
  const unsupportedFallback = data.fallbacks.unsupported
  const unsupportedSources = data.sources.filter((source) => unsupportedFallback.source_ids.includes(source.id))

  useEffect(() => {
    if (selectedTopicId && !hasFacilityDataError) {
      resultHeadingRef.current?.focus()
      return
    }

    if (clarificationId) {
      clarificationHeadingRef.current?.focus()
      return
    }

    if (fallbackId || noMatchQuery !== null) fallbackHeadingRef.current?.focus()
  }, [clarificationId, fallbackId, hasFacilityDataError, noMatchQuery, selectedTopicId])

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
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="language-bar">
        <div className="site-frame language-bar-content">
          <span>Independent Hawaiʻi civic information pilot</span>
          <a href="https://health.hawaii.gov/ola/" target="_blank" rel="noreferrer">
            Language access resources
          </a>
        </div>
      </div>
      <div className="government-bar">
        <div className="site-frame government-bar-content">
          <span>Oʻahu resident household disposal guidance</span>
          <a href="https://www.honolulu.gov/env/" target="_blank" rel="noreferrer">
            Honolulu ENV
          </a>
        </div>
      </div>
      <div className="island-backdrop">
        <div className="site-frame site-shell">
          <header className="site-header">
            <div className="brand-lockup">
              <div className="brand-mark" aria-hidden="true">Oʻ</div>
              <div>
                <p className="agency-name">Independent Hawaiʻi civic information service</p>
                <h1>Oʻahu Household-Item Disposal Finder</h1>
                <p className="brand-subtitle">Independent civic-tech pilot using public City guidance</p>
              </div>
            </div>
            <form className="header-search" onSubmit={handleSearch}>
              <label className="visually-hidden" htmlFor="header-topic-search">Search this site</label>
              <input
                id="header-topic-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a supported item"
              />
              <button type="submit">Search</button>
            </form>
          </header>
          <nav className="primary-nav" aria-label="Site navigation">
            <a href="#main-content">Find an item</a>
            <a href="#browse-title">Browse topics</a>
            <a href="#about-this-pilot">About this pilot</a>
            <a href="#source-guidance">Source guidance</a>
          </nav>
          <main id="main-content" className="site-main">
            <section aria-labelledby="search-title" className="search-section">
              <p className="section-kicker">Household disposal guidance</p>
              <h2 id="search-title">Find a supported item</h2>
              <p>Enter an exact supported item or choose a topic below.</p>
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
                  <button type="submit">Find disposal guidance</button>
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
                  headingRef={resultHeadingRef}
                />
              )
            )}

            {clarificationGroup && (
              <section className="clarification" aria-labelledby="clarification-title">
                <h2 id="clarification-title" ref={clarificationHeadingRef} tabIndex={-1}>A quick question</h2>
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
              <FallbackGuidance
                fallback={selectedFallback}
                sources={fallbackSources}
                headingRef={fallbackHeadingRef}
              />
            )}

            {noMatchQuery !== null && (
              <FallbackGuidance
                fallback={unsupportedFallback}
                sources={unsupportedSources}
                query={noMatchQuery}
                headingRef={fallbackHeadingRef}
              />
            )}
          </main>
          <footer className="site-footer" id="about-this-pilot">
            <div className="footer-grid">
              <section>
                <h2>About this pilot</h2>
                <p>{data.metadata.disclaimer}</p>
              </section>
              <section id="source-guidance">
                <h2>Source guidance</h2>
                <p>{data.metadata.scope}</p>
                <a href="https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/" target="_blank" rel="noreferrer">
                  Visit Honolulu ENV How to Dispose
                </a>
              </section>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
