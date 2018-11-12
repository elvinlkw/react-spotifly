import React, { Component } from 'react';

class GetTopTracks extends Component {
    constructor(){
        super();
        this.state = {
            topTrack: '',
            topTrackArtwork: '',
            topArtistPreview: '',
            topTrackLoaded:false
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
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
                topTrackLoaded:true,
            });
        }, (res)=> {
            alert('Data Could Not Be Retrieved!');
        });
    }
    render() { 
        return (
            <div>
                <div className="container-current-top">
                    <div className="wrapper-top-header">
                        <h1>All Time Top Track</h1>
                        <img alt="Could Not Be Loaded" src={this.state.topTrackArtwork}/>
                    </div>
                    <div className="wrapper-top-preview">
                        <h4>{this.state.topTrack}</h4>
                        {this.state.topTrackLoaded && this.state.topTrackPreview &&
                        <audio controls id="play" src={this.state.topTrackPreview}></audio>}
                        {!this.state.topTrackPreview && 
                        <p>No Preview Available</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default GetTopTracks;