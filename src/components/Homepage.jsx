import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import './../style/Homepage.css';
const spotifyApi = new SpotifyApi();

class Homepage extends Component {
    constructor(){
        super();
        let url = window.location.href;
        var token = url.split("token=")[1].split("&")[0].trim();
        spotifyApi.setAccessToken(token);
        this.state = {
            topTrack: '',
            topArtist: '',
            topTrackArtwork: '',
            topArtistArtwork: '',
            topArtistPreview: '',
            topTrackPreview: '',
            topTrackLoaded:false,
            topPreviewLoaded: false,
            genre: {}
        }
    }
    componentWillMount(){
        spotifyApi.getMyTopTracks({time_range: 'long_term'}).then((res)=>{
            var artist = '';
            for (var j=0; j<res.items[0].artists.length;j++){
                if(artist.length > 1){
                    artist += ', ' + res.items[0].artists[j].name;
                }else{
                    artist += res.items[0].artists[j].name;
                }
            }
            this.setState({
                topTrack: artist + ' - ' + res.items[0].name,
                topTrackArtwork: res.items[0].album.images[1].url,
                topTrackPreview: res.items[0].preview_url,
                topTrackLoaded:true
            });
        }, (res)=> {
            alert('Data Could Not Be Retrieved!');
        });

        spotifyApi.getMyTopArtists({time_range: 'long_term', limit: '50'}).then((res)=>{
            this.setState({
                topArtist: res.items[0].name,
                topArtistArtwork: res.items[0].images[1].url
            })
            return res.items[0].id;
        }).then((id)=>{
            spotifyApi.getArtistTopTracks(id, 'US').then((data)=>{
                this.setState({
                    topPreviewLoaded: true,
                    topArtistPreview: data.tracks[0].preview_url
                })
            })
        });
    }
    render() { 
        return (
            <div className="container">
                <div className="container-current-top">
                    <div className="wrapper-top-header">
                        <h1>All Time Top Track</h1>
                        <img alt="Could Not Be Loaded" src={this.state.topTrackArtwork}/>
                    </div>
                    <div className="wrapper-top-preview">
                        <h4>{this.state.topTrack}</h4>
                        {this.state.topTrackLoaded && 
                        <audio controls>
                            <source src={this.state.topTrackPreview}></source>
                        </audio>}
                    </div>
                </div>
                <div className="container-current-top">
                    <div className="wrapper-top-preview">
                        <h4>{this.state.topArtist}</h4>
                        {this.state.topPreviewLoaded && 
                        <audio controls>
                            <source src={this.state.topArtistPreview}></source>
                        </audio>}
                    </div>
                    <div className="wrapper-top-header">
                        <h1>All Time Top Artist</h1>
                        <img alt="Could Not Be Loaded" src={this.state.topArtistArtwork}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;