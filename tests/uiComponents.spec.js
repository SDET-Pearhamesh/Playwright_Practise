import { expect, test } from "@playwright/test"

test.beforeEach(async({page}) =>  {

    await page.goto('http://localhost:4200/')
 
})

test.describe('form layout page' , () => {

    test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    })

    test('input fields' , async ({page}) => {

        const gridEmailInput = page.locator('nb-card').filter({hasText: "Using the grid"}).getByPlaceholder('Email')
        await gridEmailInput.fill('test@test.com') // to input in text field
        await gridEmailInput.clear() // To clear entered value

        await gridEmailInput.pressSequentially('test@test.com')
        await gridEmailInput.clear() // Keyboard action

        await gridEmailInput.pressSequentially('test@test.com' , {delay: 500}) // each keyword is send half second delayed

        const valueASent = await gridEmailInput.inputValue()

        //Generic assertion
        expect(valueASent).toEqual('test@test.com')

        //Locator assertion
        await expect(gridEmailInput).toHaveValue(valueASent) 
    })

    test('Radio button' , async ({page}) => {

     const gridForm = page.locator('nb-card').filter({hasText: "Using the grid"})
     
     //This is to check radio button - sending force to change status to hidden to visible
     await gridForm.getByLabel('Option 1').check({force: true})
     const status = await gridForm.getByRole('radio' , {name:"Option 1"}).isChecked() // if I use getbyrole - I ma getting options is checked

     //Generic assertion to check whether checked pr not 
     expect(status).toBeTruthy()

     //Locator assertion
     await expect(gridForm.getByRole('radio' , {name:"Option 1"})).toBeChecked()

    })


})

test('Check boxes' , async ({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //Dont use click method 
    await page.getByRole('checkbox' , {name: "Hide on Click"}).check({force: true}) // To check a check box

    //If its alreday uncheck - It will not fail - 
    await page.getByRole('checkbox' , {name: "Hide on Click"}).uncheck({force: true}) // To uncheck a check box


    // Let check all boxes 
    const allBoxes = page.getByRole('checkbox')

    for(const eachBox of await allBoxes.all()){

        await eachBox.check({force: true})
        expect(await eachBox.isChecked()).toBeTruthy()
    }

    for(const eachBox of await allBoxes.all()){

        await eachBox.uncheck({force: true})
        expect(await eachBox.isChecked()).toBeFalsy()

    }
})
  
    test('list and dropdown' , async ({page}) => {


    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    // How to select iten from dropdown 
    page.getByRole('list') // this when list has UL tagname
    page.getByRole('listitem') //when the list has LI tagname

    const options = page.getByRole('list').locator('nb-option') // Usimg this
    await expect(options).toHaveText(["Light", "Dark" , "Cosmic" , "Corporate"])

    // To select option
    await options.filter({hasText: "Cosmic"}).click()

    
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
}

await dropdownMenu.click()

for(const color in colors){

    await options.filter({hasText: color}).click()
    await expect(header).toHaveCSS('background-color', colors[color])
    if(color != "Corporate")
    await dropdownMenu.click()
}

})
