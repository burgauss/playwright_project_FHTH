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
        expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()


    })
})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: 'Hide on Click'}).click({force: true})
})