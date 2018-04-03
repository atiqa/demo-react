var express = require('express');
var app = express();

let backendData;
var processedData;
var sortOrder;


app.get('/listUsers', function (req, res) {
   
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	var offset = req.param('offset');
	var pageSize = req.param('pageSize');
	sortOrder = req.param('sortOrder');
	var sortField = req.param('sortField');
	var searchValue = req.param('search');
	var data = {};

	
	if(searchValue.length > 0 ) {
		console.log("searchValue=" + searchValue );
		var re = new RegExp(searchValue, "i");
		processedData = [];
		var r = backendData.map(function(obj){
			// console.log("ret=" + re.test(obj.user));
			if(re.test(obj.user)) {
				processedData.push(obj);
			}
		});
		//console.log("processedData=" + processedData);
		//console.log("r=" + processedData);

		console.log("searchValue=" + searchValue + " size=" + processedData.length);
	}
	if(sortOrder === 'asc') {
		console.log("sortField(asc)=" + sortField);
		processedData.sort(function(a, b){return (a[sortField] > b[sortField]) ? 1 : -1});
	}
	else if(sortOrder === 'desc') {
		console.log("sortField(desc)=" + sortField);
		processedData.sort(function(a, b){return (a[sortField] < b[sortField]) ? 1 : -1});
	}
	else if(sortOrder === 'reset') {
		console.log("sortField(reset)=" + sortField);
		processedData = backendData.slice(0, backendData.length);
	}
	data.size = processedData.length;
	data.data = processedData.slice(offset, pageSize);
	res.send(data);
	// console.log(data);
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})


function fetchData() {
	var request = require('request');

	var url1 = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
	var url = 'https://resonatetest.azurewebsites.net/data';
	var url2 = 'http://localhost:8081/listUsers';
	var options = {
		url: url,
		headers: {
			'User-Agent': 'request'
		},
		method: 'GET'
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			backendData = JSON.parse(body);
			processedData = JSON.parse(body);
			console.log(backendData);
		}
		else {
			console.log("error=" + error);
		}
	}

	request(options, callback);
}
fetchData();


