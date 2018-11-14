import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
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
        this.state={
            topTrack: '',
            topTrackArtwork: '',
            topTrackLoaded:false,
            topArtist: '',
            topArtistArtwork: '',
            topArtistPreview: '',
            topArtistTrack: '',
            topPreviewLoaded: false,
            favoriteGenres: {}
        }
        spotifyApi.setAccessToken(token);
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
                topTrackLoaded:true,
            });
        }, (res)=> {
            alert('Data Could Not Be Retrieved!');
        });

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
                });
            });
        });

        spotifyApi.getMyTopArtists({time_range: 'long_term', limit: '50'}).then((res)=>{
            var obj = {};
            var temp;
            var sortedResult = {};
            for(var i=0;i<res.items.length;i++){
                for (var j=0; j<res.items[i].genres.length; j++){
                    temp = res.items[i].genres[j].split(/[ -]+/).join('_');
                    if(Object.keys(obj).includes(temp)){
                        obj[temp] += 1;
                    } else{
                        obj[temp] = 1;
                    }
                }
            }
            sortedResult = this.sortResult(obj);
            this.setState({
                favoriteGenres: sortedResult
            })
        });
    }
    sortResult(object){
        var result = {}
        var sortedArray = []
        for (var key in object){
            sortedArray.push([key, object[key]]);
        }
        sortedArray.sort(function(a, b) {
            return b[1] - a[1];
        });
        for (var i=0; i <= 5; i++){
            result[sortedArray[i][0]] = Math.ceil((sortedArray[i][1]/50)*100);
        }

        return result;
    }
    render() { 
        document.addEventListener('play', function(e){
            var audios = document.getElementsByTagName('audio');
            for(var i = 0, len = audios.length; i < len;i++){
                if(audios[i] !== e.target){
                    audios[i].pause();
                    document.getElementsByTagName('i')[i].className = 'fa fa-play fa-2x';
                }
            }
        }, true);
        var renderPlayPause = (player) => {
            var classlist = document.getElementsByTagName('i')[player].className;
            var audio = document.getElementsByTagName('audio');
            if(classlist.includes('play')){
                classlist = classlist.replace('play', 'pause');
                audio[player].play();
            }else{
                classlist = classlist.replace('pause', 'play');
                audio[player].pause();
            }
            document.getElementsByTagName('i')[player].className = classlist;
        }
        var getPlayer = ()=>{
            var num_player_index = 0;
            var num_player = document.getElementsByTagName('audio').length;
            num_player_index = num_player-1;
            return num_player_index;
        }
        return (
            <div className="container">
                <div className="container-current-top">
                    <div className="wrapper-top-header">
                        <h1 className="text-center">All Time Top Track</h1>
                        <img alt="Could Not Be Loaded" src={this.state.topTrackArtwork}/>
                    </div>
                    <div className="wrapper-top-preview">
                        <h4>{this.state.topTrack}</h4>
                        {this.state.topTrackLoaded && this.state.topTrackPreview &&
                        <div>
                            <audio src={this.state.topTrackPreview}></audio>
                            <i onClick={()=>renderPlayPause(0)} className="fa fa-play fa-2x"></i>
                        </div>}
                        {!this.state.topTrackPreview && <p>No Preview Available</p>}
                        
                    </div>
                </div>
                <div className="container-current-top">
                    <div className="wrapper-top-preview">
                        <h4>{this.state.topArtist}</h4>
                        <h6 style={{textDecoration: 'underline'}}>{`${this.state.topArtist} - ${this.state.topArtistTrack}`}</h6>
                        {this.state.topPreviewLoaded && this.state.topArtistPreview && 
                        <div>
                            <audio src={this.state.topArtistPreview}></audio>
                            <i onClick={()=>renderPlayPause(getPlayer())} className="fa fa-play fa-2x"></i>
                        </div>}
                        {!this.state.topArtistPreview && <p>No Preview Available</p>}
                    </div>
                    <div className="wrapper-top-header">
                        <h1 className="text-center">All Time Top Artist</h1>
                        <img alt="Could Not Be Loaded" src={this.state.topArtistArtwork}/>
                    </div>
                </div>
                <div className="container-favorite-genres">
                    <h1 className="text-center">Favorite Genres</h1>
                    <h4 className="text-center">Your most played tracks include the following genres: </h4>
                    <div>{
                        Object.keys(this.state.favoriteGenres).map((genre)=>{
                            return(
                                <div key={genre} className="genres">
                                    <h4 style={{width: "20%", textAlign:"center"}}>{genre.split('_').join(' ').toUpperCase()}</h4>
                                    <h4>{`${this.state.favoriteGenres[genre]}%`}</h4>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.favoriteGenres[genre]}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            )
                        })
                    }</div>
                </div>
            </div>
        );
    }
}

export default Homepage;