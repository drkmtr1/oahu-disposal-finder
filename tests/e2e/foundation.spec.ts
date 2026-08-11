import { expect, test } from '@playwright/test'

test('resident can browse and select every supported canonical topic', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Oʻahu Household-Item Disposal Finder' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Browse supported topics' })).toBeVisible()
  await expect(page.getByRole('list').getByRole('button')).toHaveCount(25)

  await page.getByRole('button', { name: 'Bicycle' }).press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'Bicycle' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'What to do' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Sources and verification' })).toBeVisible()
})

test('resident can search a canonical topic, alias, or deterministic clarification', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Enter a supported item or topic').fill('  propane   TANK / cylinder  ')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Propane tank / cylinder' })).toBeVisible()
  await expect(page.getByText('Do not dispose of propane tanks in regular trash.')).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Eligible City locations' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 4, name: 'Keʻehi Transfer Station' })).not.toBeVisible()

  await page.getByLabel('Enter a supported item or topic').fill('couch')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Furniture / mattress / carpet' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Optional alternatives' })).toBeVisible()
  await expect(page.getByText(/not required disposal steps/)).toBeVisible()

  await page.getByLabel('Enter a supported item or topic').fill('battery')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByText('Which type of battery do you have?')).toBeVisible()
  await page.getByRole('button', { name: 'Alkaline household battery' }).press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'Alkaline battery' })).toBeVisible()

  await page.getByLabel('Enter a supported item or topic').fill('paint')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('button', { name: 'Aerosol/spray paint or another paint product' }).click()
  await expect(page.getByRole('link', { name: 'Paints (HHW)' })).toBeVisible()

  await page.getByLabel('Enter a supported item or topic').fill('lead paint')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 3, name: 'Household Hazardous Waste appointment required' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Open the current City HHW process/ })).toBeVisible()

  await page.getByLabel('Enter a supported item or topic').fill('mystery household item')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'This item is not currently covered by V1' })).toBeVisible()
  await expect(page.getByText(/does not mean the City has no disposal rule/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'How to Dispose of Trash' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Browse the 25 supported topics' })).toBeVisible()
})
