var mysql      = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : 'w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'fvf14tm874v7zcv7',
  password : 'zrneyh6euq64wiod',
  database : 'fqpdkiqfsbon3xyq'
});
  
connection.connect();
  
connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});
  
connection.end();