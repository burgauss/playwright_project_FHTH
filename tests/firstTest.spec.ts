import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {
    // by tag name
    page.locator('input')

    // by id
    page.locator('#inputEmail1')

    // by class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium shape-rectangle nb-transition"]')

    //combine diferent selectors
    page.locator('input[placeholder="Email"].shape-rectangle')
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath (NOT RECOMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text{"Using"}')

    //by exact match
    page.locator(':text-is("Using the Grid)')

})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

	await page.getByPlaceholder('Jane Doe').first().click()

    await page.getByText('Using the Grid').click()

    // await page.getByTitle('IoT Dashboard').click()

    //considered a good practice to add data-testid to elements
    await page.getByTestId('SignIn').click()


})


test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //mixing typical locators with ui locators
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //avoid the use of nth.
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Password"}).click()

    //not recommended
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

text('Reusin')