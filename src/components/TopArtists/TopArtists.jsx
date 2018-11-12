import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import ArtistsShort from './ArtistsShort';
import ArtistsMedium from './ArtistsMedium';
import ArtistsLong from './ArtistsLong';
import './../../style/TopArtists.css';
const spotifyApi = new SpotifyApi();

class TopArtists extends Component {
    constructor(){
        super();
        let url = window.location.href;
        var token = url.split("token=")[1].split("&")[0].trim();
        spotifyApi.setAccessToken(token);
    }
    render() { 
        return (
            <div className="top-artists-container">
                <h1 className="text-center">Top Artists</h1>
                <div className="row" style={{width: '100vw', overflowX: 'hidden'}}>
                    <ArtistsShort spotifyApi={spotifyApi}/>
                    <ArtistsMedium spotifyApi={spotifyApi}/>
                    <ArtistsLong spotifyApi={spotifyApi}/>
                </div>
            </div>
        );
    }
}

export default TopArtists;