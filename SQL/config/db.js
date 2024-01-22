const mysql = require('mysql2');

const connection = mysql.createConnection({
    user : 'test',
    password: 'testpassword11',
    host: 'mariadb',
    database: 'nodeapp'
});

module.exports = connection.promise();