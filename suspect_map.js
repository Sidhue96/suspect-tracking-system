var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tracking");
    dbo.collection("suspect_location").find({}).toArray(function(err, result) {
        if (err) throw err;
        http.createServer(function(req,res){
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write('<html>');
            res.write('<head>    <style>       #map {        height: 800px;        width: 100%;       }    </style>  </head>');
            res.write('<body>');
            res.write('<div id="map"></div>');
            res.write('<script>');
            res.write('function initMap(){');
            res.write('var map = new google.maps.Map(document.getElementById("map"), { zoom:12, center: {lat: 13.011082, lng: 80.236314} });');
            for(x=0;x<result.length;x++){
                res.write('var marker = new google.maps.Marker({');
                res.write('position: {lat: '+result[x].lat+', lng: '+result[x].lon+'},');
                res.write('map: map');
                res.write('});');
            }
            res.write('}');
            res.write('</script>');
            res.write('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDk6RyQwLWOfmHQjtDzGxuCwszGv6n4WUQ&callback=initMap">');
            res.write('</script>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        }).listen(8080);
        db.close();
    });
});