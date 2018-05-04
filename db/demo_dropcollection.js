var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";
var url = "mongodb://27017/loginapp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.dropCollection("customers", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});