var mysql = require('mysql');

module.exports = async () => {

    var con = mysql.createConnection({
        host: 'database-1.cakh22qnfhuh.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "admin123",
        database: "Twitter"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log(" My sql Connected!");
    });



}
