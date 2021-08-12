const xlsx = require('xlsx');
const axios = require('axios'); // ajax 라이브러리
const cheerio = require('cheerio');// html 파싱

const workbook = xlsx.readFile('xlsx/data.xlsx');
console.log(workbook.SheetNames);
for(const name of workbook.SheetNames){
    const ws = workbook.Sheets[name];
    // 시트별로 따로 코딩 가능 !
}
const ws = workbook.Sheets.영화목록;
ws['!ref'] = 'A2:B11'; // 이렇게 설정 해놓으면 A1 부터 스켄하던게 A2 부터 스켄
const records = xlsx.utils.sheet_to_json(ws,{header:'A'});
console.log(ws['!ref']);// A1:B11 -> A2:B11

// ws['!ref'] = ws['!ref'].split(':').map((Y,i) =>{
//     if(i===0){{
//         return 'A2';
//     }}
//     return Y;
// }).join(':');
console.log(records);
records.shift(); // 배열에서 첫번째 제거 
