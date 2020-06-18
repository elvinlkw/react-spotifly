import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../img/spotify-logo.png';
import './../style/Navbar.css';

const Navbar = ({ token }) => {
	return (
		<div className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div>
				<img src={logo} alt="" style={{ width: '40px' }}/>
				<span className="navbar-brand">
					<NavLink exact to={`/react-spotifly#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Spotifly</NavLink>
				</span>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav ml-auto" id="navbarSupportedContent">
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly#access_token=${token}&token_type=Bearer&expires_in=3600`} activeClassName="active" className="nav-link">Home</NavLink>
				</li>
				{/* <li className="nav-item">
						<NavLink exact to={`/profile#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">My Profile</NavLink>
				</li> */}
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/search#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Search</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/top-tracks#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Tracks</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/top-artists#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Artists</NavLink>
				</li>
			</ul>
			</div>
		</div>
	);
}

export default Navbar;