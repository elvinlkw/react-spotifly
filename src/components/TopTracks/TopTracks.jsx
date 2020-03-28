import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import TracksShort from './TracksShort';
import TracksMedium from './TracksMedium';
import TracksLong from './TracksLong';
import '../../style/TopTracks.css';
const spotifyApi = new SpotifyApi();

class TopTracks extends Component {
    constructor(){
        super();
        let url = window.location.href;
        this.state = {
            term: "sh-term"
        };
        if(url.indexOf("token=") > -1){ 
            this.token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(this.token);
    }
    handleOption(e){
        this.setState({term: e.target.value});
    }
    render() { 
        return (
            <div className="top-track-container">
                <h1 className="text-center">Top Tracks</h1>
                <div className="form-group">
                    <p>View:</p>
                    <select className="form-control" value={this.state.term} onChange={(e)=>this.handleOption(e)}>
                        <option value="sh-term">4 Weeks</option>
                        <option value="md-term">6 Months</option>
                        <option value="lg-term">All Time</option>
                    </select>
                </div>
                <div className="top-tracks-wrapper row">
                    {this.state.term === 'sh-term' && <TracksShort spotifyApi={spotifyApi} token={this.token}/>}
                    {this.state.term === 'md-term' && <TracksMedium spotifyApi={spotifyApi} token={this.token}/>}
                    {this.state.term === 'lg-term' && <TracksLong spotifyApi={spotifyApi} token={this.token}/>}
                </div>
            </div>
        );
    }
}

export default TopTracks;