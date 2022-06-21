var mysql      = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 

if (process.env.JAWSDB_URL){
var connection = mysql.createConnection(PROCESS.ENW.JAWSDB_URL)
}  else {
    var connection = mysql.createConnection({
      host     : 'w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port     : 3306,
      user     : 'ylyzdremgwtrmwjr',
      password : 'kvtyq9myhdl91hxl',
      database : 'kf9xbq8240bl7iwo'
    });
}
  
connection.connect();
  
module.exports = db;