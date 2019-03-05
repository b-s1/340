var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gasiciec',
  password        : 'Spr!ngR@1n',
  database        : 'cs340_gasiciec'
});
module.exports.pool = pool;
