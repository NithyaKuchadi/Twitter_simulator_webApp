const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });


  
  router.post('/getallusers', function (req, res) {

    kafka.make_request('userTopics',{"path":"", "email": req.body.userhandle}, function(err,result){
     if (result.status === 200)
      {
        res.status(200).json({ msgs: result.msgs });
      } else if (result.status === 401){
       res.status(200).json({ responseMessage: 'No results found!' });
      }
    });
  
  });

  module.exports = router;