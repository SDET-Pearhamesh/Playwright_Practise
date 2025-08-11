import {test} from '@playwright/test'

test('the first test' , async ({page}) => {

    await page.goto('http://localhost:4200/')

    await page.getByTitle('playwright-test-admin Demo Application')

})

test('Locators Syntax' ,  async ({page}) => {

    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

   // No need to add await infront of locator since its not a apromise and untill it perforrms action

   // By tagname
   page.locator('input')

   // If multiple elements match
   page.locator('input').first()

   // If multiple elements match
   page.locator('input').last()

   //By id #
   page.locator('#inputEmail1')

   //By class .
   page.locator('.input-full-width.size-medium.status-basic.shape-rectangle.nb-transition')

   //By attribute
   page.locator('[placeholder="Email"]')

   //By class value (Full)
   page.locator('[class="classvalue"]')

   //By full attribute with tagname
   page.locator('input[placeholder="Email"]')

   //By combination of different attribute - No space in betweeen 
   page.locator('input[placeholder="Email"][class="classvalue"]')

   //By xpath - Not recommended 
   page.locator('//input[@placeholder="Email"]')

   //By partial text - :text
   page.locator(':text-is("Using)')

   //By partial text - :text
   page.locator('text-is("Using the grid)')

})


test('User facing locators' , async ({page}) => {


    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    page.getByRole('button' , {name: "Email"}) // we have different roles mentioned by playwright

    page.getByPlaceholder('Enter your email') // We specifically have placeholder attribute in DOM 

    page.getByText('Email') // We have text in DOM 

    page.getByLabel('Email') // label attribute in mentioned in DOM 

    page.getByTestId('Custome') // We can add custome in source code and use this 

    page.getByTitle('Dashboard') // We have tilte attribute mentioned in DOM 

})

test('locating Child element' , async ({page}) => {

    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    //Just seperate by space
    // parent-tagname child-tagename text
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //By chaining locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // We can also combine with user facing locators
    await page.locator('nb-card').getByRole('button' , {name:"Sign in"})

    //Using index starts from 0 - Not recommended
    await page.locator('nb-card').nth(3)

})

test('Locate parent element' , async ({page}) => {

    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    await page.locator('nb-card' , {hasText: "Using the grid"})

    await page.locator('nb-card' , {has: page.locator('#EmailId')})

    await page.locator('nb-card').filter({hasText: "Using the grid"}).getByPlaceholder('Enter your email')

    await page.locator('nb-card').filter({hasText: "Using the grid"}).filter({hasText: "Using the grid"}).filter({has: page.locator('#EmailId')})

})

test('Reusing locators' , async ({page}) => {
 
    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    // Lets say we have lot of locators with common initial syntax

    await page.locator('nb-card').filter({hasText: "Using the grid"}).filter({hasText: "Using the grid"}).filter({has: page.locator('#EmailId')})
    await page.locator('nb-card').filter({hasText: "Using the grid"}).filter({hasText: "Using the grid"}).filter({has: page.locator('#Password')})

    const common = page.locator('nb-card').filter({hasText: "Using the grid"}).filter({hasText: "Using the grid"})

    //Reduce repeated syntax
    await common.filter({has: page.locator('#EmailId')})
    await common.filter({has: page.locator('#Password')})

})