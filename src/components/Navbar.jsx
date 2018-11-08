import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Navbar extends Component {
    render() { 
        var {token} = this.props;
        console.log(token)
        return (
            <div className="navbar bg-dark navbar-expand">
                <span className="navbar-brand">
                    <NavLink exact to="/">Spotifly</NavLink>
                </span>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to={`/#access_token=${token}`} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/top-tracks#access_token=${token}`} className="nav-link">Top Tracks</NavLink>
                    </li>
                </ul>
                
            </div>
        );
    }
}

export default Navbar;