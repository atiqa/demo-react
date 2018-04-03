import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp'; 


class App extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			lastPage: 0,
			userDetails: 'test'
		}

		this.current = 0;
		this.pageSize = 10;
		this.updateState = this.updateState.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.fetchData(this.updateState, 0);
		this.sendRequest.bind(this);
	}

	updateState(info) {
		this.setState({data: info.data});
		this.setState({lastPage: info.size/this.pageSize});
	}


	fetchData(updateState, offset) {
		var request = require('request');
		var url = 'http://localhost:8081/listUsers?offset=' + offset + '&pageSize=' + (offset + this.pageSize);
		var options = {
			url: url,
			headers: {
				'User-Agent': 'request'
			},
			method: 'GET'
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				console.log(info);
				updateState(info);
			}
			else {
				console.log("error=" + error);
			}
		}
		request(options, callback);
	}

	clickHandler(item) {
	// alert(item.verbatim);
	// this.current = item.verbatim;
		this.setState({userDetails: item.verbatim});
		console.log(this.current);
	}

	sendRequest(page) {
console.log("page=" + page);
		if(page === 'next') {
			if(this.current < this.state.lastPage) {
				this.current += 10;
				this.fetchData(this.updateState, this.current);
			}
		}
		else if(page === 'prev') {
			if(this.current >= 10) {
				this.current -= 10;
				this.fetchData(this.updateState, this.current);
			}
		}
		else {
			this.current = page;
			this.fetchData(this.updateState, this.current);
		}
	}

 
	render() {
		var elements = [<li className="page-item" onClick={this.sendRequest.bind(this, "prev")}><a className="page-link" href="#">Previous</a></li>];
		for (var i = 0; i < 90; i += 10) {
			//elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, "1")}><a className="page-link" href="#">1</a>);
			elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, i)}><a className="page-link" href="#">{i}</a></li>);
		}
		elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, "next")}><a className="page-link" href="#">Next</a></li>);
		return (
		      <div className="container col-sm-12">
			<nav className="navbar navbar-expand-sm bg-light navbar-light">
				<form className="form-inline right-positioned">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text"></span>
						</div>
						<input type="text" className="form-control" placeholder="Username">
						</input>
					</div>    
				</form>
			</nav>
			<br/>

			<div className="row" >
				<div className="col-sm-5 color1"  >
					{Array.apply(null,  this.state.data).map(function(item, i){ 
						console.log("i=" + i + " item=" + item);                                       
					    return (
					     	<div className="card col-sm-12 color2" onClick={this.clickHandler.bind(this, item)} key={i}>
							<div className="card-body"><span className="left-positioned">{item.user}</span><span className="right-positioned">{item.id}</span></div>
							<a href="alert('Hi')"><span></span></a>
						</div>
					    );                
					}, this)} 
			
				</div>	 
				<div className="col-sm-7 color1" >
					<div className="card details col-sm-12 color2" >
						<div className="card-body">{this.state.userDetails}</div>
					</div>
				</div> 
			</div>
			<ul className="pagination pagination-sm">
				{ elements }
			</ul>
		      </div>
 		);
	}
}

export default App;
