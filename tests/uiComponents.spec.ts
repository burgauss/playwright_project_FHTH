import {test, expect} from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('From Layouts page', () => {
    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')

        await usingTheGridEmailInput.clear()

        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay:500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        // await usingTheGridForm.getByLabel('Option 1').check({force: true}) //because the label is vissualy hidden
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        //generic assertion
        const radioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(radioStatus).toBeTruthy()
    
        //locator assertion
        // expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()


    })
})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: 'Hide on Click'}).click({force: true})
    //recommended way, also you can use uncheck
    await page.getByRole('checkbox', {name: 'Hide on Click'}).check({force: true}) 

    const allBoxes = page.getByRole('checkbox')
    for(let box of await allBoxes.all()) {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('List and dropdowns', async ({page}) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when the list has LI tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')

    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()

    //validate that the color in the backgroud changes
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for (const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropdownMenu.click()
    }
})

test('List and dropdowns JB', async ({page}) => {
    // This wait 
    const dropdownMenu = page.locator('ngx-header nb-select')

    const optionList = page.getByRole('list').locator('nb-option')
    //validate that the color in the backgroud changes
    const header = page.locator('nb-layout-header')
    // await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for (const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropdownMenu.click()
    }
})

test('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    
    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name:"Top"}).hover()

    //if we have a regular tooltip we could use (NOT THE CASE)
    // page.getByRole('tooltip') 

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('dialog boxes', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    
})