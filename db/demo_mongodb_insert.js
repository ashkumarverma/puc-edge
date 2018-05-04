var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";
var url = "mongodb://27017/loginapp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});