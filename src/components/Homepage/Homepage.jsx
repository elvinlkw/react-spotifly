import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import GetTopTracks from './GetTopTracks';
import GetTopArtist from './GetTopArtist';
import GetTopGenre from './GetTopGenre';
import './../../style/Homepage.css';
import 'font-awesome/css/font-awesome.min.css';
const spotifyApi = new SpotifyApi();

class Homepage extends Component {
    constructor(props){
        super(props);
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            var token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(token);
    }
    handlePlay(){
        
    }
    render() { 
        document.addEventListener('play', function(e){
            var audios = document.getElementsByTagName('audio');
            for(var i = 0, len = audios.length; i < len;i++){
                if(audios[i] !== e.target){
                    audios[i].pause();
                }
            }
        }, true);
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