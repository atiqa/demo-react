import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp'; 


class RestService extends Component {
	constructor(){
		super();

		this.state = {
			backendData: [],
			processedData: [],
			sortOrder: 'reset'
		}
		this.updateState = this.updateState.bind(this);
		this.getData = this.getData.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.fetchData(this.updateState, 0, 'reset');
		alert("RestService.constructor created");
	}
	componentDidMount() {
		alert("RestService.componentDidMount");
		this.fetchData(this.updateState, 0, 'reset'); 
	}

	getData(request) { 
		alert("RestService.getData - request=" +  request);
		var data = {};
		var processedData = this.state.processedData;
	
		if(request.searchValue.length > 0 ) {
			this.setState({processedData: []});
			var processedData = [];
			console.log("searchValue=" + request.searchValue );
			var re = new RegExp(request.searchValue, "i");
			var r = this.state.backendData.map(function(obj){
				// console.log("ret=" + re.test(obj.user));
				if(re.test(obj.user)) {
					processedData.push(obj);
				}
			});
			this.setState({processedData: processedData});

			console.log("searchValue=" + request.searchValue + " size=" + processedData.length);
		}
		if(request.sortOrder === 'asc') {
			console.log("sortField(asc)=" + request.sortField);
			processedData.sort(function(a, b){return (a[request.sortField] > b[request.sortField]) ? 1 : -1});
		}
		else if(request.sortOrder === 'desc') {
			console.log("sortField(desc)=" + request.sortField);
			processedData.sort(function(a, b){return (a[request.sortField] < b[request.sortField]) ? 1 : -1});
		}
		else if(request.sortOrder === 'reset') {
			console.log("sortField(reset)=" + request.sortField);
			processedData = this.state.backendData.slice(0, this.state.backendData.length);
		}
		data.size = processedData.length;
		data.data = processedData.slice(request.offset, request.pageSize);
		alert("data.size=" + data.size);
		return data;
	}

	updateState(data) {
		console.log("data=" + data);
		this.setState({backendData: JSON.parse(data)});
		this.setState({processedData: JSON.parse(data)});
	}


	fetchData(updateState) {
		var request = require('request');
		var url = 'https://whispering-basin-42627.herokuapp.com/listUsers';
		var options = {
			url: url,
			headers: {
				'User-Agent': 'request'
			},
			method: 'GET'
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				updateState(body);
			}
			else {
				console.log("error=" + error);
			}
		}
		request(options, callback);
		alert("RestService.fetchData");
	}	
}

export default RestService;
