import test, { Page } from "@playwright/test"
import { NavigationPage } from "../page-objects/NavigationPage.spec"

test.beforeEach(async({page}) =>  {

    await page.goto('http://localhost:4200/')
 
})

test('Form page' , async ({page}) => {

    const naviagateTo = new NavigationPage(page)
    await naviagateTo.formLayoutPage()

})