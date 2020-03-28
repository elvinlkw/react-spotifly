import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './../style/Navbar.css';

class Navbar extends Component {
    render() { 
        var {token} = this.props;
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand">
                    <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Spotifly</NavLink>
                </span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li className="nav-item">
                        <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} activeClassName="active" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/profile#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">My Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/search#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/top-tracks#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Tracks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={`/top-artists#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Artists</NavLink>
                    </li>
                </ul>
                </div>
            </nav>
            // <div className="navbar navbar-expand">
            //     <span className="navbar-brand">
            //         <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Spotifly</NavLink>
            //     </span>
            //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //         <span class="navbar-toggler-icon"></span>
            //     </button>
            //     <ul className="navbar-nav ml-auto" id="navbarSupportedContent">>
            //         <li className="nav-item">
            //             <NavLink exact to={`/#access_token=${token}&token_type=Bearer&expires_in=3600`} activeClassName="active" className="nav-link">Home</NavLink>
            //         </li>
            //         <li className="nav-item">
            //             <NavLink exact to={`/profile#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">My Profile</NavLink>
            //         </li>
            //         <li className="nav-item">
            //             <NavLink exact to={`/search#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Search</NavLink>
            //         </li>
            //         <li className="nav-item">
            //             <NavLink exact to={`/top-tracks#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Tracks</NavLink>
            //         </li>
            //         <li className="nav-item">
            //             <NavLink exact to={`/top-artists#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Artists</NavLink>
            //         </li>
            //     </ul>
            // </div>
        );
    }
}

export default Navbar;