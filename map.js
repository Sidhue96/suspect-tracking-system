var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var geocoding = new require('reverse-geocoding');



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tracking");
   dbo.collection("location").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log('LOCATION');
    result.forEach(function(e){
	console.log(e.lat+", "+e.lon);
	var config = {
		'latitude': e.lat,
		'longitude': e.lon
	};
	geocoding.location(config, function (err, data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});			
     });
    db.close();
  });





});


