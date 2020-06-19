import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';
import AuthContext from '../context/auth-context';


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
	updateAuth = (received) => {
		console.log('finally');
		if(!received){
			this.setState({ loggedIn: false });
		}
	}
	render() {
		const { loggedIn } = this.state;
		return (
			<AuthContext.Provider value={{ loggedIn: loggedIn, updateAuth: this.updateAuth }}>
				<Router>
					<div>
						{this.isLogin}
						{!loggedIn && 
						<Login />}
						{loggedIn &&
						<div>
							<Navbar />
							<Main />
						</div>}
					</div>
				</Router>
			</AuthContext.Provider>
		);
	}
}

export default App;