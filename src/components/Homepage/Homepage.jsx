import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import GetTopTracks from './GetTopTrack';
import GetTopArtist from './GetTopArtist';
import GetTopGenre from './GetTopGenre';
import './../../style/Homepage.css';
import 'font-awesome/css/font-awesome.min.css';
const spotifyApi = new SpotifyApi();

class Homepage extends Component {
    constructor(){
        super();
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            var token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(token);
    }
    render() { 
        return (
            <div className="container">
                <GetTopTracks spotifyApi={spotifyApi}/>
                <GetTopArtist spotifyApi={spotifyApi}/>
                <GetTopGenre spotifyApi={spotifyApi}/>
            </div>
        );
    }
}

export default Homepage;