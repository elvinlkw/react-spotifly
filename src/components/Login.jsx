import React, { Component } from 'react';
import './../style/Login.css';
import {client_id, scopes, redirect_url} from './../constants/app_cred.js';

class Login extends Component {
    render() { 
        return (
            <div className="container-login">
                <a href={`https://accounts.spotify.com/en/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scopes}`}>Login</a>
                <p>Please Login First</p>
            </div>
        );
    }
}

export default Login;