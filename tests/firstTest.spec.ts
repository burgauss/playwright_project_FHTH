import {test, expect} from '@playwright/test'

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

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')


})

test('Extracting values', async ({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toBe('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input values
    const emailFiled = basicForm.getByRole('textbox', {name: 'Email'})
    await emailFiled.fill('test@test.com')
    const emailValue = await emailFiled.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //validate the placeholder
    const placeholder = await emailFiled.getAttribute('placeholder')
    expect(placeholder).toEqual('Email')
})

test('Assertioons', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')

    //general assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertio, if test fail it will continue
    await expect.soft(basicFormButton).toHaveText('Submit') 
    await basicFormButton.click()
})