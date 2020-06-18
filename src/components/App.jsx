import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';

class App extends Component {
	constructor(){
		super();
		this.state = {
			loggedIn: false
		}
	}
	componentDidMount(){
		let url = window.location.href;
		if(url.indexOf("token=") > -1){ 
			this.authToken = url
				.split("token=")[1]
				.split("&")[0]
				.trim();
			sessionStorage.setItem('token', this.authToken);
			sessionStorage.setItem('loggedIn', this.state.loggedIn);
			this.setState({
				loggedIn: true,
			});
		} else if (sessionStorage.getItem('loggedIn')) {
			this.setState({
				loggedIn: true,
			});
		}
		
	}
	render() {
		const { loggedIn } = this.state;
		return (
			<Router>
				<div>
					<Route exact path="/react-spotifly/login" component={Login}></Route>
					{!loggedIn && 
					<Login />}
					{loggedIn &&
					<div>
						<Navbar token={this.authToken}/>
						<Main token={this.authToken}/>
					</div>}
				</div>
			</Router>
		);
	}
}

export default App;