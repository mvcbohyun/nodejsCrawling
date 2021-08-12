const xlsx = require('xlsx');

function range_add_cell(range, cell) {
  var rng = xlsx.utils.decode_range(range);
  var c = typeof cell === 'string' ? xlsx.utils.decode_cell(cell) : cell;
  if (rng.s.r > c.r) rng.s.r = c.r;
  if (rng.s.c > c.c) rng.s.c = c.c;

  if (rng.e.r < c.r) rng.e.r = c.r;
  if (rng.e.c < c.c) rng.e.c = c.c;
  return xlsx.utils.encode_range(rng);
}
// 영화목록 , (A1,B2), 's' --문자열 , 'n' --숫자, 들어갈 데이터  
module.exports = function add_to_sheet(sheet, cell, type, raw) {
  sheet['!ref'] = range_add_cell(sheet['!ref'], cell);
  sheet[cell] = { t: type, v: raw };
};
