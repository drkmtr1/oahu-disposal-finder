import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

async function expectNoAxeViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])
}

test('@a11y representative core-flow states have no automatically detectable WCAG A/AA violations', async ({ page }) => {
  await page.goto('/')
  await expectNoAxeViolations(page)

  await page.getByLabel('Enter a supported item or topic').fill('battery')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'A quick question' })).toBeFocused()
  await expectNoAxeViolations(page)

  await page.getByRole('button', { name: 'Alkaline household battery' }).press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'Alkaline battery' })).toBeFocused()
  await expectNoAxeViolations(page)

  await page.getByLabel('Enter a supported item or topic').fill('propane tank')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Propane tank / cylinder' })).toBeFocused()
  await expectNoAxeViolations(page)

  await page.getByLabel('Enter a supported item or topic').fill('mystery household item')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'This item is not currently covered by V1' })).toBeFocused()
  await expectNoAxeViolations(page)
})

test('@a11y keyboard activation reaches every core state without a focus trap', async ({ page }) => {
  await page.goto('/')

  const search = page.getByLabel('Enter a supported item or topic')
  await search.focus()
  await search.fill('battery')
  await search.press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'A quick question' })).toBeFocused()

  const choice = page.getByRole('button', { name: 'Alkaline household battery' })
  await choice.focus()
  await choice.press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'Alkaline battery' })).toBeFocused()

  await search.focus()
  await search.fill('mystery household item')
  await search.press('Enter')
  await expect(page.getByRole('heading', { level: 2, name: 'This item is not currently covered by V1' })).toBeFocused()
})
