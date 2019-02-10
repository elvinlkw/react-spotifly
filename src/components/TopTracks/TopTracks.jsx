import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import TracksShort from './TracksShort';
import TracksMedium from './TracksMedium';
import TracksLong from './TracksLong';
import './../../style/TopTracks.css';
const spotifyApi = new SpotifyApi();

class TopTracks extends Component {
    constructor(){
        super();
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            this.token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(this.token);
    }
    render() { 
        return (
            <div className="top-track-container">
                <h1 className="text-center">Top Tracks</h1>
                <div className="row">
                    <TracksShort spotifyApi={spotifyApi} token={this.token}/>
                    <TracksMedium spotifyApi={spotifyApi}/>
                    <TracksLong spotifyApi={spotifyApi}/>
                </div>
            </div>
        );
    }
}

export default TopTracks;