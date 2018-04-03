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
			dataSize: 0,
			userDetails: {},
			sortField: 'user',
			searchValue: ''
		}

		this.current = 0;
		this.pageSize = 10;
		this.updateState = this.updateState.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.updateSortField = this.updateSortField.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.fetchData(this.updateState, 0, 'reset'); 
		this.sendRequest.bind(this);
	}

	updateInput(e) {
		this.setState({searchValue: e.target.value});
	}

	updateSortField(field) {
		this.setState({sortField: field});
		console.log("updateSortField: value=" + field);
	}

	updateState(info) {
		this.setState({data: info.data});
		this.setState({dataSize: info.size});
	}


	fetchData(updateState, offset, order) {
		var request = require('request');
		var url = 'http://localhost:8081/listUsers?offset=' + offset + '&pageSize=' + (offset + this.pageSize) + '&sortOrder=' + order + '&sortField=' + this.state.sortField + '&search=' + this.state.searchValue;
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
				// console.log(info);
				updateState(info);
			}
			else {
				console.log("error=" + error);
			}
		}
		request(options, callback);
	}

	clickHandler(item) {

	// this.current = item.verbatim;
		this.setState({userDetails: item});
		console.log(this.current);
	}

	onTodoChange(){
		console.log(this);
		//consoling 'this' here, shows old values only.
		//not sure how and even if I need to update state here.
		// Do I need to pass new state to this function from DOM
		//TODO: send new data to store
	}

	sendRequest(page) {
console.log("page=" + page + " current=" + this.current + " lastPage=" + this.state.lastPage);
		if(page === 'next') {
			if(this.current < this.state.dataSize - this.pageSize) {
				this.current += this.pageSize;
				this.fetchData(this.updateState, this.current);
			}
		}
		else if(page === 'prev') {
			if(this.current >= this.pageSize) {
				this.current -= this.pageSize;
				this.fetchData(this.updateState, this.current);
			}
		}
		else if(page === 'asc' || page === 'desc' || page === 'reset') {
			this.current = 0;
			this.fetchData(this.updateState, this.current, page);
		}
		else if(page === 'search') {
			this.current = 0;
			this.fetchData(this.updateState, this.current, page);
		}
		else {
			this.current = page;
			this.fetchData(this.updateState, this.current);
		}
	}

 
	render() {
		var elements = [<li className="page-item" onClick={this.sendRequest.bind(this, "prev")}><a className="page-link" href="#">Previous</a></li>];
		for (var i = 0; i < this.state.dataSize/this.pageSize; i++) {
			//elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, "1")}><a className="page-link" href="#">1</a>);
			elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, i * this.pageSize)}><a className="page-link" href="#">{i + 1}</a></li>);
		}
		elements.push(<li className="page-item" onClick={this.sendRequest.bind(this, "next")}><a className="page-link" href="#">Next</a></li>);
		return (
		      <div className="container-fluid col-sm-12">
			<nav className="navbar navbar-expand-sm bg-light navbar-light">
				<div className="collapse navbar-collapse " id="nav-content"> 
					<div className="dropdown">
						<label>Sort Field: </label><input type="button" className="btn  dropdown-toggle" data-toggle="dropdown"  value={this.state.sortField}>
						</input>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#" onClick={this.updateSortField.bind(this, 'user')}>user</a>
							<a className="dropdown-item" href="#" onClick={this.updateSortField.bind(this, 'id')}>id</a>
							<a className="dropdown-item" href="#" onClick={this.updateSortField.bind(this, 'score')}>score</a>
						</div>
					</div>				
					<button className="btn" onClick={this.sendRequest.bind(this, 'asc')}>Sort (ascending order)</button>
					<button className="btn" onClick={this.sendRequest.bind(this, 'desc')}>Sort (descending order)</button>
					<button className="btn" onClick={this.sendRequest.bind(this, 'reset')}>Reset</button>
				</div>
				
				<div className="collapse navbar-collapse right" id="nav-content">  					
					<form className="form-inline " role="search">
						<input id="search" type="text" className="form-control" onChange={this.updateInput}></input>
						<button className="btn btn-secondary" onClick={this.sendRequest.bind(this, 'search')}>Search</button>
					</form>
				</div>
			</nav>
			<br/>

			<div className="row" >
				<div className="col-sm-5 color1"  >
					{Array.apply(null,  this.state.data).map(function(item, i){ 
						// console.log("i=" + i + " item=" + item);                                       
					    return (
					     	<div className="card col-sm-12 color2" onClick={this.clickHandler.bind(this, item)} key={i}>
							<div className="card-body"><span className="left-positioned">{item.user}</span><span className="right">{item.id}</span></div>
							<a href="alert('Hi')"><span></span></a>
						</div>
					    );                
					}, this)} 
			
				</div>	 
				<div className="col-sm-7 color1" >
					<div className="card details col-sm-12 color2" >
						<h3>{this.state.userDetails.user}<span className="right">{this.state.userDetails.id}</span></h3>
						<p>{this.state.userDetails.verbatim}</p>
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
