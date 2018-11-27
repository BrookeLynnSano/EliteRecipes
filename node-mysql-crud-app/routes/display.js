//connecting to the database
var mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Stormz!',
	database: 'recipe'

});

db.connect();
db.query('SELECT * from recipes', function(err, rows, fields){
  if(!err)
    console.log(rows);
  else
    console.log('Error!!!!!!')
});
db.end();
