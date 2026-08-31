const ExcelJs = require('exceljs');
const{test,expect}=require('@playwright/test');
// const workbook = new ExcelJs.Workbook();

// workbook.xlsx.readFile('C:/Users/sarga/Downloads/download.xlsx')
//   .then(() => {
//     const worksheet = workbook.getWorksheet('Sheet1');

//     worksheet.eachRow((row, rowNumber) => {
//       row.eachCell((cell, cellNumber) => {
//         console.log(cell.value);
//       });
//     });
//   });


  async function writeExcel(searchText, replaceText,change,filePath)
  {
    
    const workbook = new ExcelJs.Workbook();

await workbook.xlsx.readFile(filePath)
 
    const worksheet = workbook.getWorksheet('Sheet1');

    const outpute = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(outpute.row+change.rowchange,outpute.column+change.columnchange);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
    console.log('value replaced successfully');


  }


  async function readExcel(worksheet, searchText)
  {
    let outpute ={row:0,column:0};
      worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, collNumber) =>
      {
        if(cell.value == searchText)
        {
           outpute.row = rowNumber;
           outpute.column = collNumber;
        }
       
      });
    });
    return outpute;
    
  }
  
 // writeExcel('Iphone 14 Pro Max',100110,{rowchange:0,columnchange:2} ,'C:/Users/sarga/Downloads/download.xlsx');

 test('@upload excel upload & download',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const [download] = await Promise.all([
     page.waitForEvent('download'),
     page.locator('#downloadButton').click()
    ]);

    const filePath = 'C:/Users/sarga/Downloads/download.xlsx';
    await download.saveAs(filePath);
   
    await writeExcel('Mango',120,{rowchange:0,columnchange:2} ,'C:/Users/sarga/Downloads/download.xlsx');
    await writeExcel('Apple',180,{rowchange:0,columnchange:2} ,'C:/Users/sarga/Downloads/download.xlsx');
    await writeExcel('Papaya','Yellow',{rowchange:0,columnchange:1} ,'C:/Users/sarga/Downloads/download.xlsx');
    await writeExcel('Banana','Red',{rowchange:0,columnchange:1} ,'C:/Users/sarga/Downloads/download.xlsx');
    //await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:/Users/sarga/Downloads/download.xlsx');

    await expect (page.locator('.sc-jsEeTM.itluUR.rdt_TableRow').filter({hasText:'Mango'}).locator('#cell-4-undefined')).toHaveText('120');
    await expect (page.locator('.sc-jsEeTM.itluUR.rdt_TableRow').filter({hasText:'Apple'}).locator('#cell-4-undefined')).toHaveText('180');
    await expect (page.locator('.sc-jsEeTM.itluUR.rdt_TableRow').filter({hasText:'Papaya'}).locator('#cell-3-undefined')).toHaveText('Yellow');
    await expect (page.locator('.sc-jsEeTM.itluUR.rdt_TableRow').filter({hasText:'Banana'}).locator('#cell-3-undefined')).toHaveText('Red');
    await page.pause();


 });