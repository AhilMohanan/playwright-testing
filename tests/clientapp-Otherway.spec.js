const{test,expect} = require('@playwright/test');
const { asyncWrapProviders } = require('node:async_hooks');

test('@EtoE clientapp',async ({page})=>{

const productName='iphone 13 pro';    
const products = await page.locator('.card-body');
await page.goto('https://rahulshettyacademy.com/client/');
await page.getByPlaceholder('email@example.com').fill('ahilmohanan009@gmail.com');
await page.getByPlaceholder('enter your passsword').fill('Shadow@009');
await page.getByRole('button',{name:'Login'}).click();
await page.waitForLoadState('networkidle');
await page.locator('.card-body').last().waitFor();
const titel = await page.locator('.card-body b').allTextContents();
console.log(titel);

await page.locator('.card-body').filter({hasText:productName}).getByRole('button',{name:' Add To Cart'}).click();

expect(await page.locator('.toast-message').textContent()).toContain('Product Added To Cart');

await page.locator('li').getByRole('button',{name:'Cart',}).click();
await expect( page.locator('h1')).toContainText('My Cart');
await expect ( page.locator(`h3:has-text("${productName}")`)).toBeVisible();

await page.getByRole('button', { name: 'Checkout' }).click();
const expiryDropdowns =await page.locator('.input.ddl');
await expiryDropdowns.nth(0).selectOption('09'); // month
await expiryDropdowns.nth(1).selectOption('29'); // year
await page.locator('div input').nth(1).fill('542');
await page.locator('div input').nth(2).fill('Ahil Mohanan');
await page.locator('div input').nth(3).fill('rahulshettyacademy');
await page.getByRole('button', { name: 'Apply Coupon' }).click();
await expect(page.locator('.mt-1.ng-star-inserted')).toContainText('* Coupon Applied');

await page.getByPlaceholder('Select Country').pressSequentially('ind',{ delay: 150 });
const dropdown = page.locator('.list-group');
await dropdown.waitFor({ state: 'visible' });
const optionsCount= await dropdown.locator('button').count();
for (let i = 0; i < optionsCount; i++) {

    const text = await dropdown.locator('button').nth(i).textContent()
    if (text.trim() === 'India')
    {       
        await dropdown.locator('button').nth(i).click();
        break;

    }
    
  }

let emailid = await page.locator('.user__name.mt-5 label').textContent();
let emailIDdisplayed =await page .locator('.user__name.mt-5 input').nth(0).inputValue();
await expect(emailIDdisplayed).toBe(emailid);

await page.locator('a:has-text("PLACE ORDER")').click();
await expect(page.locator('#toast-container')).toContainText('Order Placed Successfully');

const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').first().textContent();
console.log(orderNumber);
let orderid =orderNumber.split(' ')[2].trim();
console.log(orderid);
//orderid = "69a3047b415d779f9b4c5153";

await page.getByRole('button', { name: 'ORDERS' }).click();

await page.locator('tbody tr').first().waitFor();
await page.locator('tbody tr').last().waitFor();

const rows =await page.locator('tbody tr');   // Locator
  
for (let i = 0; i < await rows.count(); i++) {
   const rowOrderId = await rows.nth(i).locator('th').textContent();
   
        
    if (rowOrderId.trim() === orderid)
    {

        console.log(rowOrderId);
        await rows.nth(i).locator('td .btn.btn-primary').click();
        break;
    }
}

await page.locator('.col-text.-main').waitFor();
await expect(page.locator('.col-text.-main')).toContainText(orderid);
await page.locator('.btn.-teal').click();

});