import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import './../../style/Search.css';
const spotifyApi = new SpotifyApi();

class Search extends Component {
    constructor(){
        super();
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            var token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(token);
        this.state = {
            track: [],
            searchCompleted: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(){
        this.refs.searchText.focus();
    }
    handleSubmit(e){
        e.preventDefault();        
        this.setState({
            searchCompleted: false
        })
        var input = this.refs.searchText.value;
        var track = [];
        if (input && input.length > 1){
            this.refs.searchText.value = '';
            document.getElementById('header').innerHTML = `Search: ${input}`;
            spotifyApi.search(input, ['track'], {limit:20}).then((res)=>{
                console.log(res)
                for(var i=0; i<res.tracks.items.length; i++){
                    var obj = {};
                    obj['key'] = i;
                    obj['artist'] = res.tracks.items[i].artists[0].name;
                    obj['track'] = res.tracks.items[i].name;
                    obj['artwork'] = res.tracks.items[i].album.images[1].url;
                    obj['preview'] = res.tracks.items[i].preview_url;
                    track.push(obj);
                }
                this.setState({
                    track: track,
                    searchCompleted: true
                });
            });
            
        }
    }
    handlePause(e){
        var audio_player = document.getElementsByTagName('audio');
        for(var i = 0, len = audio_player.length; i < len;i++){
            if(audio_player[i] !== e.target){
                audio_player[i].pause();
            }
        }
    }
    componentDidMount(){
        document.addEventListener('play', this.handlePause, true);
    }
    componentWillUnmount(){
        document.removeEventListener('play', this.handlePause, true);
    }
    render() { 
        var playPreview = (num)=>{
            var audios = document.getElementsByTagName('audio');
            audios[num].play();
            audios[num].volume = 0.5;
        }
        return (
            <div className="search-container">
                <h1 id="header" className="text-center">Search</h1>
                <form className="text-center" onSubmit={this.handleSubmit}>
                    <input placeholder="Search" type="text" className="form-control" ref="searchText"></input>
                    <button type="button" className="btn btn-info">Let's Get It!</button>
                </form>
                {this.state.searchCompleted && this.state.track.length > 0 &&
                <div className="search-result">
                    <h1 className="text-center">Tracks</h1>
                    <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', padding: '0 2rem'}}>
                    {this.state.track.map((track)=>{
                        return(
                            <div key={track.key} style={{margin: '2rem 1rem'}}>
                                <audio src={track.preview} />
                                <img className="image-artwork" onClick={()=>playPreview(track.key)} alt="NoPreview" src={track.artwork}></img>
                                <h6 style={{paddingTop: '10px'}} className="text-center">{track.artist}</h6>
                                <h6 className="text-center">{track.track}</h6>
                            </div>
                        )
                    })}</div>
                </div>}
                {this.state.searchCompleted && this.state.track.length === 0 && 
                    <h1 className="text-center">No Result Found</h1>
                }
            </div>
        );
    }
}

export default Search;