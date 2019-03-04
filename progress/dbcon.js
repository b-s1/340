var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shahb',
  password        : '3510',
  database        : 'cs340_shahb'
});
module.exports.pool = pool;