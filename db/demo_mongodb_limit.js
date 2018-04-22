var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("customers").find().limit(5).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});