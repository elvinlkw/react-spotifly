import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import './../../style/Search.css';
import Modal from './Modal';
const spotifyApi = new SpotifyApi();

class Search extends Component {
    constructor(){
        super();
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            this.token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(this.token);
        this.state = {
            track: [],
            album: [],
            tracklist: [],
            trackArtist: [],
            albumArtwork: '',
            releaseDate: '',
            duration: '',
            preview: '',
            selectedOption: 'popularity',
            searchCompleted: false,
            showTracklist: false,
            show: false,
            currentlyPlaying: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidUpdate(){
        this.refs.searchText.focus();
    }
    componentDidMount(){
        document.addEventListener('play', this.handlePause, true);
    }
    componentWillUnmount(){
        document.removeEventListener('play', this.handlePause, true);
    }
    sortArrayByDate(trackArray, sort){
        if(sort === 'date-desc'){
            trackArray.sort((a, b)=>{
                return new Date(b.release_date) - new Date(a.release_date)
            });
        } else if(sort === 'date-asc'){
            trackArray.sort((a, b)=>{
                return new Date(a.release_date) - new Date(b.release_date)
            });
        } else{
            trackArray.sort((a,b)=>{
                return b.popularity - a.popularity;
            });
        }
        for(var i=0; i<trackArray.length; i++){
            trackArray[i].key = i
        }
        return trackArray;
    }
    hideModal(e){
        e.preventDefault();
        this.setState({
            tracklist: [],
            preview: '',
            show: false,
            currentlyPlaying: null
        });
        document.querySelector('audio').pause();
    }
    handleSubmit(e, sort){
        e.preventDefault();
        this.setState({
            searchCompleted: false
        })
        var input = this.refs.searchText.value;
        var track = [], album = [];
        if (input && input.length > 1){
            document.getElementById('header').innerHTML = `Results: ${input}`;
            spotifyApi.search(input, ['track', 'album'], {limit: 50}).then((res)=>{
                //Code for Album Filtering
                var albums = res.albums;
                var key_count = 0;
                for(let i=0; i<res.albums.items.length; i++){
                    if(albums.items[i].album_type === 'album'){
                        let obj = {};
                        obj['key'] = key_count;
                        obj['artwork'] = albums.items[i].images[1].url;
                        obj['artist'] = albums.items[i].artists[0].name;
                        obj['album'] = albums.items[i].name;
                        obj['release_date'] = albums.items[i].release_date;
                        obj['url'] = albums.items[i].href;
                        album.push(obj);
                        key_count++;
                    }
                }
                album = this.sortArrayByDate(album, 'date-desc');

                // Code for Track Filtering
                let promiseArray = [];
                for (let i = 0; i < res.tracks.items.length; i++) {
                    promiseArray.push(this.getTrackDetails(i, res.tracks.items[i], track));
                }
                Promise.all(promiseArray).then(function() {
                    track = this.sortArrayByDate(track, sort);                    
                    this.setState({
                        track: track,
                        album: album,
                        searchCompleted: true
                    });
                }.bind(this));
            })            
        }
    }
    getTrackDetails(i, trackObj, track) {
        let tPromise = new Promise(function(resolve, reject) {
            let obj = {};
            obj['key'] = i;
            obj['popularity'] = trackObj.popularity;
            obj['release_date'] = trackObj.album.release_date;
            obj['artist'] = trackObj.artists[0].name;
            obj['id']=trackObj.album.id;
            obj['track'] = trackObj.name;
            obj['artwork'] = trackObj.album.images[1].url;
            obj['preview'] = trackObj.preview_url;
            if(trackObj.preview_url === null){
                let reformatedURL = `${trackObj.album.href}?access_token=${this.token}`;
                fetch(reformatedURL).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    let filtered = data.tracks.items.filter(i => {
                        return i.name === obj['track'];
                    });
                    if (filtered.length > 0) {
                        obj['preview'] = filtered[0].preview_url
                        track.push(obj)
                    }
                    resolve();
                });
            } else {
                track.push(obj);
                resolve();
            }
        }.bind(this));

        return tPromise;
    }
    handlePause(e){
        var audio_player = document.getElementsByClassName('track-preview');
        var track_player = document.getElementsByClassName('album-preview');
        for(let i = 0, len = audio_player.length; i < len;i++){
            if(audio_player[i] !== e.target){
                audio_player[i].pause();
            }
        }
        for(let i = 0, len = track_player.length; i < len;i++){
            if(track_player[i] !== e.target){
                track_player[i].pause();
                document.getElementsByTagName('i')[i].className = 'fa fa-play-circle';
                document.getElementsByClassName('track-item')[i].style.color = "black";
            }
        }
    }
    handleOption(event){
        var sort = event.target.value;
        this.setState({selectedOption: event.target.value});
        this.handleSubmit(event, sort);
    }
    handleOpenTracklist(apiURL, releaseDate){
        var reformatedURL = `${apiURL}?access_token=${this.token}`;
        var trackArray = [], duration_ms = 0, duration;
        fetch(reformatedURL).then((res)=>{
            return res.json();
        }).then((data)=>{
            for(var i = 0; i<data.tracks.items.length; i++){
                let obj = {};
                obj['key'] = i;
                obj['tracklist'] = data.tracks.items[i].name;
                obj['preview'] = data.tracks.items[i].preview_url;
                duration_ms += data.tracks.items[i].duration_ms;
                trackArray.push(obj);
            }
            // If duration is less than an hour, display minute and seconds
            if(duration_ms < (1 * 60 * 60 * 1000)){
                let seconds = Math.floor((duration_ms / 1000)%60),
                    minutes = Math.floor((duration_ms / (1000 * 60)));
                duration  = `${minutes} min ${seconds}s`;
            }else{
                let minutes = Math.floor((duration_ms / (1000 * 60)) % 60),
                    hours = Math.floor((duration_ms / (1000 * 60 * 60)) % 24);
                duration = `${hours} hours ${minutes} min`;
            }
            this.setState({
                tracklist: trackArray,
                trackArtist: [data.artists[0].name, data.name],
                albumArtwork: data.images[1].url,
                releaseDate: releaseDate,
                duration: duration,
                show: true,
                isAlbumPlaying: false,
            });
        });
    }
    playTrack(player, preview){
        var audio_player = document.querySelector('audio');
        var classlist = document.querySelectorAll('i')[player].className;
        var list_item = document.querySelectorAll('.track-item')[player];

        if(this.state.currentlyPlaying !== null){
            // eslint-disable-next-line
            let currentPlayer = document.querySelectorAll('i')[this.state.currentlyPlaying].className;
            currentPlayer = currentPlayer.replace('pause', 'play');
            audio_player.pause();
            document.getElementsByClassName('track-item')[this.state.currentlyPlaying].style.color = "black";
        }
        var playPromise = audio_player.play();

        if(classlist.includes('play')){
            classlist = classlist.replace('play', 'pause');
            if (playPromise !== undefined) {
                playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    // console.log("audio played auto");
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    // console.log("playback prevented");
                });
            }
            list_item.style.color = "red";
        }else{
            classlist = classlist.replace('pause', 'play');
            audio_player.pause();
            list_item.style.color = "black";
        }
        document.getElementsByTagName('i')[player].className = classlist;


        this.setState({
            preview: preview,
            currentlyPlaying: player
        });
    }
    render() {
        var playPreview = (num, preview)=>{
            if(!preview){
                alert('No Preview Found.');
            } else{
                var audios = document.getElementsByTagName('audio');
                audios[num].play();
                audios[num].volume = 0.5;
            }
        }
        return (
            <div className="search-container">
                <h1 id="header" className="text-center">Search</h1>
                <form className="text-center" onSubmit={(e)=>this.handleSubmit(e, this.state.selectedOption)}>
                    <input placeholder="Search" type="text" className="form-control" ref="searchText"></input>
                    <button type="button" className="btn btn-info">Let's Get It!</button>
                </form>
                {this.state.searchCompleted && this.state.track.length > 0 &&
                <div className="search-result">
                    <div>
                        <h1 className="text-center">Albums</h1>
                        <div id="album-container">
                            <Modal show={this.state.show}>
                                <div className="artwork-container">
                                    <img className="track-artwork" src={this.state.albumArtwork} alt="not available"></img>
                                    <div className="track-info">
                                        <h2>{this.state.trackArtist[1]}</h2>
                                        <hr/>
                                        <p>By {this.state.trackArtist[0]}</p>
                                        <p>{this.state.releaseDate}</p>
                                        <p>{this.state.tracklist.length} Songs - {this.state.duration}</p>
                                        <audio autoPlay controls src={this.state.preview}></audio>
                                    </div>
                                </div>
                                <div className="track-list-container">
                                    <h1>Tracklist</h1>
                                    <ol>{this.state.tracklist.map((track)=>{
                                        return(
                                            <div className="track-item-container" key={track.key} onClick={()=>this.playTrack(track.key, track.preview)}>
                                                <li className="track-item">
                                                    <i className="fa fa-play-circle"></i>
                                                    {`${track.tracklist}`}
                                                </li>
                                            </div>
                                        )
                                    })}</ol>
                                </div>
                                {/* <button className="modal-close-button" onClick={this.hideModal}>X</button> */}
                                <span><i className="fa fa-window-close modal-close-button" onClick={this.hideModal}></i></span>
                            </Modal>
                            {this.state.album.map((album)=>{
                                return(
                                    <div key={album.key} style={{margin: '2rem 1rem'}}>
                                        <img onClick={()=>this.handleOpenTracklist(album.url, album.release_date)} className="image-artwork" alt="NoPreview" src={album.artwork}></img>
                                        <h6 style={{paddingTop: '10px', fontWeight: 'bold'}} className="text-center">{album.artist}</h6>
                                        <h6 className="text-center" style={{fontWeight: 'bold'}}>{album.album}</h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-center">Tracks</h1>
                        <div className="form-group">
                            <p>Sort By:</p>
                            <select className="form-control" value={this.state.selectedOption} onChange={this.handleOption}>
                                <option value="popularity">Popularity</option>
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                            </select>
                        </div>
                        <div style={{position: 'relative', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', padding: '0 2rem'}}>
                        {this.state.track.map((track, index)=>{
                            return(
                                <div key={index} style={{margin: '2rem 1rem'}}>
                                    <audio className="track-preview" src={track.preview} />
                                    <img className="image-artwork" onClick={()=>playPreview(index, track.preview)} alt="NoPreview" src={track.artwork}></img>
                                    <h6 style={{paddingTop: '10px'}} className="text-center">{track.artist}</h6>
                                    <h6 className="text-center">{track.track}</h6>
                                </div>
                            )
                        })}</div>
                    </div>
                </div>}
                {this.state.searchCompleted && this.state.track.length === 0 && 
                    <h1 className="text-center">No Result Found</h1>
                }
            </div>
        );
    }
}

export default Search;