import React, { Component } from 'react';

class GetTopArtist extends Component {
    constructor(){
        super();
        this.state = {
            topArtist: '',
            topArtistArtwork: '',
            topArtistPreview: '',
            topArtistTrack: '',
            topPreviewLoaded: false
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        spotifyApi.getMyTopArtists({time_range: 'long_term', limit: '1'}).then((res)=>{
            this.setState({
                topArtist: res.items[0].name,
                topArtistArtwork: res.items[0].images[1].url,
            })
            return res.items[0].id;
        }).then((id)=>{
            spotifyApi.getArtistTopTracks(id, 'US').then((data)=>{
                this.setState({
                    topPreviewLoaded: true,
                    topArtistTrack: data.tracks[0].name,
                    topArtistPreview: data.tracks[0].preview_url,
                })
            })
        });
    }
    render() { 
        return (
            <div className="container-current-top">
                <div className="wrapper-top-preview">
                    <h4>{this.state.topArtist}</h4>
                    <h6>{`${this.state.topArtist} - ${this.state.topArtistTrack}`}</h6>
                    {this.state.topPreviewLoaded && this.state.topArtistPreview && 
                    <audio controls src={this.state.topArtistPreview}></audio>}
                    {!this.state.topArtistPreview && 
                    <p>No Preview Available</p>}
                </div>
                <div className="wrapper-top-header">
                    <h1>All Time Top Artist</h1>
                    <img alt="Could Not Be Loaded" src={this.state.topArtistArtwork}/>
                </div>
            </div>
        );
    }
}

export default GetTopArtist;