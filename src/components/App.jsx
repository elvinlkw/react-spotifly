import React, { Component } from 'react';
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
            this.setState({
                loggedIn: true,
            });
        }
    }
    render() { 
        return (
            <React.Fragment>
                {!this.state.loggedIn && 
                <Login/>}

                {this.state.loggedIn &&
                <React.Fragment>
                    <Navbar token={this.authToken}/>
                    <Main/>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}

export default App;