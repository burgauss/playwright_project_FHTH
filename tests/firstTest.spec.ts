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
})