
const List = require('../models/ListSchema');


exports.newListService = function newListService(msg, callback) {


    switch (msg.path) {
        case "getUserLists":
            getUserLists(msg, callback);
            break;
        case "getSubscriberLists":
            getSubscriberLists(msg, callback);
            break;
        case "createnewList":
            createnewlist(msg, callback);
            break;


    };

    


    function createnewList(req, callback) {
        console.log("Inside createnewlist");
        console.log("Req Body : ", req.body);

        var dbo = mongodb.db("twitter");


        var obj = {
            user_id: req.body.user_id, name: req.body.name, description: req.body.Description,
            members: req.body.members, subscribers: req.body.subscribers, username: req.body.username, userhandle: req.body.userhandle
        };
        dbo.collection("List").insert(obj, function (err, result) {
            if (err) { checkstatus = "Failed List Insert" }
            else checkstatus = "Success List inserted";

            callback(null, { status: 200, checkstatus });

        });




        function getUserLists(msg, callback) {
            console.log("IN SAVE MESSAGE ", JSON.stringify(msg.body));

            var obj = { userhandle: msg.body.userhandle };

            list.find(obj).toArray(msgData, function (err, message) {
                if (message) {
                    callback(null, { status: 200, message });
                }
            });
        }

        function getSubscriberLists(msg, callback) {
            console.log("Inside get getSubscriberLists");
            console.log("Req Body : ", msg.body.userhandle);

            var obj = { subscribers: { $elemMatch: { handle: { $eq: msg.body.userhandle } } } };

            dbo.collection("List").find(obj).toArray(function (err, result) {
                if (!err) { console.log('result in subscriber list') }
                else {
                    console.log(result)
                    callback(null, { status: 200, message });

                }
            });
        }

    }
}