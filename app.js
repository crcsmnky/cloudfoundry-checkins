var express = require('express')
  , mongodb = require('mongodb');

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-1.8'][0]['credentials'];
}
else {
  var mongo = {
    "hostname":"localhost","port":27017,"username":"","password":"","name":"","db":""
  };
}

var generate_mongo_url = function(obj) {
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'checkins');

  if(obj.username && obj.password) {
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db + "?auto_reconnect=true";
  }
  else {
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
});

app.post('/checkin', function(req,res) { 
  var comment = req.param('comment',null);
  var location = [parseFloat(req.param("lat")), parseFloat(req.param("lon"))];
  if(comment && location) {
    mongodb.connect(mongourl, function(err,conn) {
      conn.collection('checkins', function(err,coll) {
        var obj = {'comment':comment, 'location':location, 'datetime':new Date()};
        coll.insert(obj, {safe:true}, function(err) {
          res.send(obj['_id']);
        });
      });
    });
  }
});

app.listen(port, host);

