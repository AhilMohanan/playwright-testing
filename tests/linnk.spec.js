const {test,expect} = require('@playwright/test');

test('@linniq test' ,async({page})=>{

await page.goto("https://linnkiq.com/");
await page.getByRole('button', { name: 'Product' }).hover();
//await page.waitForSelector('text=ATS');
const ATSlink =await page.locator('a[href="/products/linnkme-ats/"]').first();
await ATSlink.waitFor({state: 'visible'});
await ATSlink.click();
await expect(page.locator('#linnkme-ats-hero-heading')).toContainText('ATS');
console.log(await page.locator('#linnkme-ats-hero-heading').textContent());


await page.goto('https://selectorshub.com/xpath-practice-page/');
await page.getByRole('button', { name: 'Checkout here' }).scrollIntoViewIfNeeded();
await page.locator('select[name="cars"]').selectOption('Opel');

await page.pause();


});