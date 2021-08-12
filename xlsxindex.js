const xlsx = require('xlsx');
const axios = require('axios'); // ajax 라이브러리
const cheerio = require('cheerio');// html 파싱

const workbook = xlsx.readFile('xlsx/data.xlsx');

//console.log(Object.keys(workbook.Sheets)  );

const ws = workbook.Sheets.영화목록;

//console.log(workbook.Sheets.영화목록 );

const records = xlsx.utils.sheet_to_json(ws);
//console.log(records);
//records.forEach( (r,i) => {

   // console.log(r.제목,r.링크);
//});
//for(const [i,r] of records.entries()){
    //console.log(i,r);
//}

const crawler = async ()=>{
    // 순서 대로 가져옴 밑에 코드보단 느림
    
    for(const[i,r] of records.entries()){
        const response = await axios.get(r.링크);
        if(response.status ===200){// 응다입 성공한 경우
            const html = response.data;
            
            const $ = cheerio.load(html);
            const text =$('.score.score_left .star_score').text();
            console.log(r.제목 ,'평점 '+text.trim());

        }
    }
    // 순서 상관없이 한번에 요청해서 가져옴  순서가 변경될수 있음 !
    // await Promise.all(records.map( async(r) =>{
       
    // }))
};
crawler();