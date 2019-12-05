
const dBConnection = require('./ConnectionPooling');
//const dBConnection = require('./WithoutConnectionPooling.js');

exports.userService = function profileService(msg, callback) {
    switch (msg.path) {
        case "getAllUsers":
            getAllUsers(msg, callback);
            break;
       
    }
};

var con = mysql.createConnection({
    host: 'database-1.cakh22qnfhuh.us-east-2.rds.amazonaws.com',
    user: "admin",
    password: "admin123",
    database: "Twitter"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log(" My sql Connected!");
  });
  
  //Route to handle Post Request Call
  app.get('/getAllUsers',function(req,res){
      
     });

async function getAllUsers(msg, callback) {
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (!err) 
         res.send(result);
      });
}
