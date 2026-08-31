const {test, expect}= require('@playwright/test');
const { promises } = require('node:dns');

test('1ST basic test', async ({page})=>{
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('[name="signin"]');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
    await page.screenshot({path:'screenshot.png'});

    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('Learning');
    await page.locator('[name="signin"]').click();
    await expect(page.locator('[style*="block"]').first()).toContainText('Incorrect username/password.');
    console.log(await page.locator('[style*="block"]').first().textContent());
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signIn.click();

    
    // const text = await cardTitles.first().textContent();
    // await expect(text).toBe('iphone X');
    console.log(await cardTitles.allTextContents());

    const product = page.locator('.card.h-100').filter({hasText:'Nokia Edge'});
    await product.getByRole('button', { name: 'Add' }).click();
    

});

test('2ND basic test', async ({browser})=>{
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://google.com'); 
   
    await page1.screenshot({path:'screenshot/screenshot1.png'});
    expect(await page1.title()).toBe('Google');
    expect(await page1.title()).not.toContain('Googlee');
    expect(await page1.title()).not.toBe('google');
    expect(await page1.title()).not.toContain('google');
    expect(await page1.title()).not.toMatch(/Googlee/);
    expect(await page1.title()).not.toMatch(/google/);
     expect( page1).toHaveTitle('Google');
});


test('3rd basic test', async ({page})=>{
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
     await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('Learning');
    const dropdown = await page.locator('select.form-control');
    await dropdown.selectOption('Teacher');
    await page.getByRole('radio', { name: 'User' }).check();
    await expect(page.getByRole('radio', { name: 'User' })).toBeChecked();
    //console.log(await page.getByRole('radio', { name: 'Admin' }).isChecked());
    
    //console.log(await page.locator('div').filter({ hasText: 'You will be limited to only' }).nth(3).textContent());
    await expect( page.locator('div').filter({ hasText: 'You will be limited to only' }).nth(3)).toContainText('You will be limited to only');
    await page.getByRole('button', { name: 'Okay' }).click();
    await page.locator('#terms').click();
    await expect( page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();

    const blinkingText = page.locator('.blinkingText').nth(1);
    await expect(blinkingText).toHaveAttribute('class', 'blinkingText');
    await blinkingText.click();
    //await page.locator('[name="signin"]').click();

});

test('child windows handeling', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
    const DocumentLink = page.locator('.blinkingText').nth(0);

    const[Page2]= await Promise.all([
        context.waitForEvent('page'),
        DocumentLink.click()
    ])

    const text = await Page2.locator('.im-para.red').textContent();
    console.log(text);
    const arrayText = text.split(' ');
    const domain = arrayText[4];
    console.log(arrayText);
    await page.locator('#username').fill(domain);
    const TextContent = await page.locator('#username').inputValue();
    console.log(TextContent);
    await page.pause();


    });