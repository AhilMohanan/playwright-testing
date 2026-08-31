const ExcelJs = require('exceljs');

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
  
  writeExcel('Iphone 14 Pro Max',100110,{rowchange:0,columnchange:2} ,'C:/Users/sarga/Downloads/download.xlsx');