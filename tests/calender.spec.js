const{test,expect}= require('@playwright/test');


test('@Calneder calender',async({page})=>{

let date = '30';
let month = '6';
let year = '2028';

const expectedList =[month,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await  page.locator('.react-date-picker__inputGroup').click();
await page.locator('.react-calendar__navigation__label').click();
await page.locator('.react-calendar__navigation__label').click();
await page.locator('.react-calendar').getByRole('button',{name:year}).click();
//await page.locator('.react-calendar').getByRole('button',{name:month}).click();
const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
await page.locator('.react-calendar__year-view__months button').nth(Number(month) - 1).click();
await page.getByRole('button', { name: `${monthName} ${date}, ${year}` }).click();

const inputs =await page.locator('.react-date-picker__inputGroup__input');

for (let i = 0; i <expectedList.length; i++) {
   const value = await inputs.nth(i).inputValue();
    expect(value).toBe(expectedList[i]);
    console.log(value);

}
await page.pause(); 


});