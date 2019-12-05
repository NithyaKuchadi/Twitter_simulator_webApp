const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');



router.post("/subscribe", (req, res) => {
  
  let data = {
    "userid": req.body.userid,
    "listid":req.body.list_id
  }
  kafka.make_request('listTopics', { "path": "subscribe", "body": data }, function (err, result) {
    if (result) {
       res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});


router.post("/getalluserlists", (req, res) => {

  let data = {
    "userid": req.body.userid
  }
  kafka.make_request('listTopics', { "path": "getalluserlists", "body": data }, function (err, result) {
    if (result) {
       res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});

router.get("/createnewlist", (req, res) => {
  console.log("IN createnewlist");
  kafka.make_request('listTopics', { "path": "createnewlist","body":{}}, function (err, result) {
    if (result) {
       res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});


module.exports = router;