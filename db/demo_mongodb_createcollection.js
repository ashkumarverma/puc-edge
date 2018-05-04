var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";
var url = "mongodb://27017/loginapp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});