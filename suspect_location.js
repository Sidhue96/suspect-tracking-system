var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tracking");
  dbo.collection('suspect').aggregate([
    { $lookup:
       {
         from: 'location',
         localField: 'camera',
         foreignField: 'camera',
         as: 'suspect_location'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    for(i=0;i<res.length;i++){
	var loc = {
		"label" : res[i].suspect,
		"lat" : res[i].suspect_location[0].lat,
		"lon" : res[i].suspect_location[0].lon
	};
	dbo.collection('suspect_location').insertOne(loc, function(err,res){
		if (err) throw err;
    		db.close();
	});
    }
    db.close();
  });
});
