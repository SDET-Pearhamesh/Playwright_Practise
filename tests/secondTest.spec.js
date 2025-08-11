import {expect, test} from '@playwright/test'

test('Extracting value' , async ({page}) => {

    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})

    //Single text using - textContent
    const buttonText = await basicForm.locator('button').textContent()

    console.log(buttonText)

    expect(buttonText).toEqual('Submit')

    //To check all values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtons).toContain("Option 1", "Option 2", "Disabled Option")

    //To grab entered email 
    const emailField = basicForm.getByRole('textbox' , {name: "Email"})
    await emailField.fill('test@test.com')
    const emailId = await emailField.inputValue()

    expect(emailId).toEqual("test@test.com")

    //Gettingvalue of attribute value
    const placeholderText = await emailField.getAttribute('placeholder')
    expect(placeholderText).toEqual("Email")

})

test('Assertions' , async ({page}) => {

    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    //Generic assetions - expect("Expecetd Value"). - after . we get all assertions . Not waiting 
    expect(buttonText).toEqual('Submit')

    // Locator asserion - expect(Locator). - all assertion are locator based. Waits for 5 seconds
    await expect(basicForm).toBeVisible()

    //Soft assertion - Runs even after failing
    await expect.soft(basicForm).toHaveText('Basic formEmail addressPasswordCheck me outSubmit')


})
