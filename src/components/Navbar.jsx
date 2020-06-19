import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './../style/Navbar.css';

const Navbar = ({ token, history }) => {
	const handleLogOut = (e) => {
		e.preventDefault();
		sessionStorage.clear();
		const url = 'https://accounts.spotify.com/en/logout';
		const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
		setTimeout(() => {
			spotifyLogoutWindow.close();
			history.push('/react-spotifly/login');
		}, 2000);
	}
	return (
		<div className="navbar navbar-expand-lg navbar-dark bg-dark">
			<span className="navbar-brand">
				<NavLink exact to={`/react-spotifly`} className="nav-link">Spotify Data Analyzer</NavLink>
			</span>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav ml-auto" id="navbarSupportedContent">
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly`} activeClassName="active" className="nav-link">Home</NavLink>
				</li>
				{/* <li className="nav-item">
						<NavLink exact to={`/profile`} className="nav-link">My Profile</NavLink>
				</li> */}
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/search`} className="nav-link">Search</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/top-tracks`} className="nav-link">Top Tracks</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact to={`/react-spotifly/top-artists#access_token=${token}&token_type=Bearer&expires_in=3600`} className="nav-link">Top Artists</NavLink>
				</li>
				<li className="nav-item">
					<a href="!#" onClick={handleLogOut} className="nav-link">Log Out</a>
				</li>
			</ul>
			</div>
		</div>
	);
}

export default withRouter(Navbar);