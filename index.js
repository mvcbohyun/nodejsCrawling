const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));
records.forEach((r,i) => {
    console.log(i,r);// r[0] 영화 제목 r[1]영화 링크 
});
