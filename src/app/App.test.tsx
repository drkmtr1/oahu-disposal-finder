import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('topic browse', () => {
  it('renders all 25 data-backed canonical topics', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /Oʻahu Household-Item Disposal Finder/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Browse supported topics' })).toBeInTheDocument()
    expect(within(screen.getByRole('list')).getAllByRole('button')).toHaveLength(25)
    expect(screen.getByRole('button', { name: 'Propane tank / cylinder' })).toBeInTheDocument()
    expect(screen.getByText(/Residential household disposal guidance/)).toBeInTheDocument()
    expect(screen.getByText(/Independent civic-tech pilot derived from public City guidance/)).toBeInTheDocument()
  })

  it('selects a topic using a keyboard-reachable native button', async () => {
    const user = userEvent.setup()
    render(<App />)

    const topic = screen.getByRole('button', { name: 'Bicycle' })
    topic.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { level: 2, name: 'Bicycle' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'What to do' })).toBeInTheDocument()
  })

  it('resolves an exact canonical topic after benign input normalization', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Enter a supported item or topic'), '  propane   TANK / cylinder  ')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Propane tank / cylinder' })).toBeInTheDocument()
    expect(screen.getByText('Do not dispose of propane tanks in regular trash.')).toBeInTheDocument()
  })

  it('shows no match rather than guessing for unsupported input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Enter a supported item or topic'), 'couch')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Furniture / mattress / carpet' })).toBeInTheDocument()
  })

  it('renders data-driven clarification choices and routes a keyboard selection', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Enter a supported item or topic'), 'battery')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('Which type of battery do you have?')).toBeInTheDocument()
    const choice = screen.getByRole('button', { name: 'Alkaline household battery' })
    choice.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { level: 2, name: 'Alkaline battery' })).toBeInTheDocument()
  })

  it('takes a clarification fallback choice to its data-backed official source', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Enter a supported item or topic'), 'paint')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    await user.click(screen.getByRole('button', { name: 'Aerosol/spray paint or another paint product' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Check the official source' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Paints (HHW)' })).toBeInTheDocument()
  })
})
