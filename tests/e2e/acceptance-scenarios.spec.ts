import { expect, test } from '@playwright/test'

async function search(page: import('@playwright/test').Page, query: string) {
  await page.getByLabel('Enter a supported item or topic').fill(query)
  await page.getByRole('button', { name: 'Search', exact: true }).click()
}

test('acceptance scenario: swollen laptop lithium-ion battery requires clarification before a source-backed route', async ({ page }) => {
  await page.goto('/')
  await search(page, 'swollen laptop battery')

  await expect(page.getByRole('heading', { level: 2, name: 'A quick question' })).toBeVisible()
  await expect(page.getByText(/removed\/standalone.*built into/i)).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'What to do' })).not.toBeVisible()

  await page.getByRole('button', { name: 'Built into / not removable from the device' }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Embedded-battery electronic device' })).toBeVisible()
  await expect(page.getByText(/Schedule the device for a City Household Hazardous Waste event/)).toBeVisible()
  await expect(page.getByRole('link', { name: /Open the current City HHW process/ })).toBeVisible()
})

test('acceptance scenario: old propane tank shows the prohibition, eligible locations, and official source', async ({ page }) => {
  await page.goto('/')
  await search(page, 'propane tank')

  await expect(page.getByRole('heading', { level: 2, name: 'Propane tank / cylinder' })).toBeVisible()
  await expect(page.getByText('Do not dispose of propane tanks in regular trash.')).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Eligible City locations' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 4, name: 'Keʻehi Transfer Station' })).not.toBeVisible()
  await expect(page.getByRole('link', { name: 'Propane (HHW)' })).toBeVisible()
})

test('acceptance scenario: leftover latex paint shows the source-backed dry-or-absorb route', async ({ page }) => {
  await page.goto('/')
  await search(page, 'latex paint')

  await expect(page.getByRole('heading', { level: 2, name: 'Latex / oil paint' })).toBeVisible()
  await expect(page.getByText(/Absorb the liquid paint with suitable absorbent material or air-dry it in the can/)).toBeVisible()
  await expect(page.getByText(/Aerosol, lead, aluminum, paint thinner\/stripper/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Paints (HHW)' })).toBeVisible()
})

test('acceptance scenario: mattress shows a bulky-item pathway and official source', async ({ page }) => {
  await page.goto('/')
  await search(page, 'mattress')

  await expect(page.getByRole('heading', { level: 2, name: 'Furniture / mattress / carpet' })).toBeVisible()
  await expect(page.getByText('Schedule a bulky-item collection appointment or take the household item to a City disposal site.')).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Eligible City locations' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'ENV Frequently Asked Questions' })).toBeVisible()
})

test('acceptance scenario: concrete pieces shows the limited eligible facilities and official source', async ({ page }) => {
  await page.goto('/')
  await search(page, 'concrete pieces')

  await expect(page.getByRole('heading', { level: 2, name: 'Rock / dirt / concrete' })).toBeVisible()
  await expect(page.getByText(/Kapaʻa Transfer Station: up to five 5-gallon buckets/)).toBeVisible()
  await expect(page.getByText(/WGSL: up to two standard pickup-truck loads/)).toBeVisible()
  await expect(page.getByRole('heading', { level: 4, name: 'Kapaʻa Transfer Station' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 4, name: 'Waimānalo Gulch Sanitary Landfill' })).toBeVisible()
  await expect(
    page.getByLabel('Sources and verification').getByRole('link', { name: 'Waste Drop-Off Rules — Residents' }),
  ).toBeVisible()
})
