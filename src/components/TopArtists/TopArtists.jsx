import React, { Component } from 'react';
import ArtistList from './ArtistList';
import './../../style/TopArtists.css';

class TopArtists extends Component {
	render() {         
		return (
			<div className="top-artists-container">
				<h1 className="text-center">Top Artists</h1>
				<div className="row" style={{width: '100vw', overflowX: 'hidden'}}>
					<ArtistList term="short_term" disableLoading={this.handleLoading}/>
					<ArtistList term="medium_term" />
					<ArtistList term="long_term" disableLoading={this.handleLoading}/>
				</div>
			</div>
		);
	}
}

export default TopArtists;