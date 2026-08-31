const{test,expect} = require('@playwright/test');

test('pw special locator',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.pause();
    await page.getByRole('textbox').first().fill('Ahil Mohanan');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByRole('textbox').nth(1).fill('ahilMohanan009@gmail.com');
    await page.getByPlaceholder('Password').fill('Shadow@009');
    await page.getByRole('radio',{name:'Employed'}).click();
    await page.getByText('Shop').click();
    await page.locator('app-card').filter({hasText:'Samsung Note 8'}).getByRole('button', { name: 'Add ' }).click();
    await page.getByText('Checkout', { exact: false }).click();
    await expect(page.getByText('Samsung Note 8')).toBeVisible();
    await page.getByRole('button',{name:'Checkout'}).click();
    await page.getByRole('textbox', { name: 'Please choose your delivery location. Then click on purchase button' }).pressSequentially('ind',{delay:150});

    const dropdown = page.locator('.suggestions');
    await dropdown.getByText('India', { exact: true }).click();
    await page.getByText('I agree with the term & Conditions').click();
    await page.getByRole('button', { name: 'Purchase' }).click();
    const alertText = await page.locator('.alert').textContent();
    console.log(alertText);



});