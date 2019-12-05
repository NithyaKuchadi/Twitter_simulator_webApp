const mongoose = require('mongoose')
const config = require('../config/settings');

var connection;
if (true) {
    connection = mongoose.createConnection(config.listdatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("connected");
    });

    connection.on("disconnected", () => {
    console.log("disconnected");
    });
}


const ListSchema = new mongoose.Schema({
	user_id: {
		type: Number,
        required: true
    },
    name: {
		type: String,
        required: true
    },
     
    description:{
     type: String,
     required:true
    },

    members:{
        type: Array,
        required:true
       },

    subscribers:{
        type: Array,
        required:true
       }   
   
});

var exported;
if (true) {
    exported = connection.model("list", ListSchema);
} 
module.exports = exported;



