const mysql =require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aviatur'

});

mysqlConnection.connect(function(err){
    if (err) {
      console.log(err);
      return;  
    }else{
        console.log('se conecto a la base de datos satisfactoriamente')
    }
});

module.exports = mysqlConnection;