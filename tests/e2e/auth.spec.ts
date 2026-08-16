import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('can navigate to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('text=Welcome Back')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText('Sign In')
  })

  test('can navigate to register page', async ({ page }) => {
    await page.goto('/login')
    await page.click('text=Sign up')
    await expect(page).toHaveURL('/register')
  })

  test('shows validation errors on login', async ({ page }) => {
    await page.goto('/login')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email address')).toBeVisible()
  })

  test('shows validation errors on register', async ({ page }) => {
    await page.goto('/register')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email address')).toBeVisible()
  })
})
