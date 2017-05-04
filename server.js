var express=require("express");
var app = express();
var mongojs=require("mongojs");
var db=mongojs("api_express",["serviceClients"]);

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Reading
app.get("/serviceClients",function(req,res){
	db.serviceClients.find(function(err,docs){
		res.json(docs);
	});
});
//Creating
app.post("/serviceClients",function(req,res){
	var svc=req.body;
	console.log(svc);
	db.serviceClients.insert(req.body,function(err,doc){
		res.json(doc);
	});
});
//Deleting 
app.delete("/serviceClients/:id",function(req,res){
	var id=req.params.id;
	console.log(id);
	db.serviceClients.remove({_id : mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
//Updating
app.get("/serviceClients/:id",function(req,res){
	var id=req.params.id;
	console.log(id);
	db.serviceClients.findOne({_id : mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});


app.put("/serviceClients/:id/:name", function(req, res) {
	var id = req.params.id;
	var name = req.params.name;

	db.serviceClients.findAndModify({query:{_id: mongojs.ObjectId(id)},
							  update: {name: name}},
		function (err, doc) {
			res.json(doc);
	});
});
app.listen(3000);