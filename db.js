const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'VmobiApi',
    password: 'ciceron281!',
    database: 'vmobi'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

module.exports = db;
