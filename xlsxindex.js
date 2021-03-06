const xlsx = require('xlsx');
const axios = require('axios'); // ajax 라이브러리
const cheerio = require('cheerio');// html 파싱
const add_to_sheet = require('./add_to_sheet');// html 파싱

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
        add_to_sheet(ws,'C1','s','평점')
        const response = await axios.get(r.링크);
        if(response.status ===200){// 응다입 성공한 경우
            const html = response.data;
            
            const $ = cheerio.load(html);
            const text =$('.score.score_left .star_score').text();// 태그는 무시하고 텍스트 값만 가져옴 
            console.log(r.제목 ,'평점 '+text.trim());
            const  newCell = 'C'+(i+2);
            add_to_sheet(ws,newCell,'n',parseFloat(text.trim()));

        }
    }
    xlsx.writeFile(workbook ,'xlsx/result.xlsx');
    // 순서 상관없이 한번에 요청해서 가져옴  순서가 변경될수 있음 !
    // await Promise.all(records.map( async(r) =>{
       
    //userAgent -- 크롬 엣지 이런거 
    // }))
};
crawler();