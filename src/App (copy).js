import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp'; 
import Fetch from 'react-fetch'



class App extends Component {
 constructor(){
     super();
     this.state = {
        data: [{id: 1, coment: 'comment 1'}, {id: 2, coment: 'comment 2'}, {id: 3, coment: 'comment 3'}]
     }
     this.current = 0;
/*************
fetchJsonp('https://resonatetest.azurewebsites.net/data', {
      method: 'GET',
      mode: 'no-cors',
      // credentials: 'include',
    })
      .then(response => console.table(response.json()))
.then(response => {});
 
*/     
   }


   click(i) {
	alert('Hi' + i);
	this.current = i;
	
   }

 
  render() {
    return (


      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	<h1>Developing my React APP</h1>
        <p className="App-intro">
          To get  started, edit <code>src/App.js</code> and save to reload.
        </p>

	<div className="row" >
		<div className="col-sm-5 color1"  >
			{Array.apply(null,  this.state.data).map(function(item, i){ 
				console.log("i=" + i + " item=" + item);                                       
		            return (
		             	<div className="card col-sm-12 color2" onClick={this.click.bind(this, i)}>
					<div className="card-body">User A<span className="right-positioned">10</span></div>
					<a href="alert('Hi')"><span></span></a>
				</div>
		            );                
		        }, this)} 
			
		</div>	 
		<div className="col-sm-7 color1" >
			<div className="card details col-sm-12 color2" >
				<div className="card-body">{this.current}</div>
			</div>
		</div> 
        </div>
      </div>
    );
  }
}

export default App;
