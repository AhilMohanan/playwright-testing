const{test,expect}=require('@playwright/test');

test('@vaildation popup validation',async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("[value='Hide']").click();
   // await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog',async dialog =>{
        console.log(dialog.message());
        if (dialog.type() === 'confirm') {
        await dialog.dismiss();
        } 
        else {
        await dialog.accept();
        }
    }); 
    await page.locator('#alertbtn').click();
   
    await page.locator('#confirmbtn').click();

    await page.locator('.mouse-hover').hover();
    await page.locator('.mouse-hover').filter({hasText:'Reload'}).click();

    await page.pause();
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('a[href*="practice-project"]').first().click();


});