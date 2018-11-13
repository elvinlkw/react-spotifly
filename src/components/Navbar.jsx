import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './../style/Navbar.css';

class Navbar extends Component {
    render() { 
        var {token} = this.props;
        return (
            <div className="navbar bg-dark navbar-expand">
                <span className="navbar-brand">
                    <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Spotifly</NavLink>
                </span>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/profile#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">My Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/top-tracks#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Tracks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/top-artists#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Artists</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;