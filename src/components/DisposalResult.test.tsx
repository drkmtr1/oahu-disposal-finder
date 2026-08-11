import { render, screen } from '@testing-library/react'
import { loadDisposalData } from '../data/loadData'
import { resolveEligibleFacilities } from '../domain/resolveFacilities'
import { DisposalResult } from './DisposalResult'

const lithiumBattery = loadDisposalData().items.find((item) => item.id === 'IT-008')
const lithiumSources = loadDisposalData().sources.filter((source) => lithiumBattery?.source_ids.includes(source.id))
const lithiumFacilities = lithiumBattery
  ? resolveEligibleFacilities(lithiumBattery, loadDisposalData().facilities)
  : []
const furniture = loadDisposalData().items.find((item) => item.id === 'IT-012')
const furnitureSources = loadDisposalData().sources.filter((source) => furniture?.source_ids.includes(source.id))
const hhwItems = loadDisposalData().items.filter((item) => item.primary_pathway.type === 'hhw_appointment')

if (!lithiumBattery) throw new Error('Expected standalone lithium battery data')
if (!furniture) throw new Error('Expected furniture data')

describe('DisposalResult', () => {
  it('renders the action-first fields from the selected item data', () => {
    render(<DisposalResult item={lithiumBattery} sources={lithiumSources} facilities={lithiumFacilities} />)

    expect(screen.getByRole('heading', { level: 2, name: 'Standalone lithium / rechargeable battery' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'What to do' })).toBeInTheDocument()
    expect(screen.getByText(lithiumBattery.primary_pathway.next_action)).toBeInTheDocument()
    expect(screen.getByText('Do not dispose of standalone lithium/rechargeable batteries in regular trash.')).toBeInTheDocument()
    expect(screen.getByText('Tape battery terminals.')).toBeInTheDocument()
    expect(screen.getByText(/If the battery is still built into/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Sources and verification' })).toBeInTheDocument()
    expect(screen.getByText('Last verified:').parentElement).toHaveTextContent('2026-08-09')
    expect(screen.getByText(/not the date the City last updated them/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Batteries (HHW)' })).toHaveAttribute(
      'href',
      'https://www.honolulu.gov/env/ref/batteries-hhw/',
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Eligible City locations' })).toBeInTheDocument()
    expect(screen.getByText('Waimānalo Convenience Center')).toBeInTheDocument()
  })

  it('renders a data error instead of partial disposal guidance when a critical field is missing', () => {
    render(
      <DisposalResult
        item={{
          ...lithiumBattery,
          primary_pathway: { ...lithiumBattery.primary_pathway, next_action: '' },
        }}
        sources={lithiumSources}
        facilities={lithiumFacilities}
      />,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Guidance unavailable' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'What to do' })).not.toBeInTheDocument()
  })

  it('renders a data error when required provenance is missing', () => {
    render(
      <DisposalResult
        item={{ ...lithiumBattery, verified_on: '' }}
        sources={lithiumSources}
        facilities={lithiumFacilities}
      />,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Guidance unavailable' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Sources and verification' })).not.toBeInTheDocument()
  })

  it('renders a data error when a declared source cannot be resolved', () => {
    render(
      <DisposalResult
        item={lithiumBattery}
        sources={lithiumSources.filter((source) => source.id !== 'SRC-006')}
        facilities={lithiumFacilities}
      />,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Guidance unavailable' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'What to do' })).not.toBeInTheDocument()
  })

  it('labels source-backed alternatives as optional rather than required steps', () => {
    render(<DisposalResult item={furniture} sources={furnitureSources} facilities={[]} />)

    expect(screen.getByRole('heading', { level: 3, name: 'Optional alternatives' })).toBeInTheDocument()
    expect(screen.getByText(/not required disposal steps/)).toBeInTheDocument()
    expect(screen.getByText('Donate usable furniture or household items where accepted.')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'How to Dispose of Trash' })).not.toHaveLength(0)
  })

  it('shows an appointment process and current City source for every HHW-routed item', () => {
    for (const item of hhwItems) {
      const sources = loadDisposalData().sources.filter((source) => item.source_ids.includes(source.id))
      const { unmount } = render(<DisposalResult item={item} sources={sources} facilities={[]} />)

      expect(
        screen.getByRole('heading', { level: 3, name: 'Household Hazardous Waste appointment required' }),
      ).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Open the current City HHW process/ })).toBeInTheDocument()
      unmount()
    }
  })
})
