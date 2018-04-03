var express = require('express');
var app = express();

let backendData;
var processedData;
var sortOrder;

var request = require('request');

var url = 'https://resonatetest.azurewebsites.net/data';

var options = {
	url: url,	
	method: 'GET'
};


app.get('/listUsers', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(backendData);
	console.log("Server/listUser invoked - data length:" + backendData.length);
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port);
	request(options, callback);
})

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		backendData = body;
		console.log(backendData);
	}
	else {
		console.log("error=" + error);
	}
}

