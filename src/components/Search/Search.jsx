import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import './../../style/Search.css';
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
            selectedOption: 'popularity',
            searchCompleted: false,
            showTracklist: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOption = this.handleOption.bind(this);
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
            })
        } else{
            trackArray.sort((a, b)=>{
                return new Date(a.release_date) - new Date(b.release_date)
            })
        }
        for(var i=0; i<trackArray.length; i++){
            trackArray[i].key = i
        }
        return trackArray;
    }
    handleSubmit(e, sort){
        e.preventDefault();
        this.setState({
            searchCompleted: false
        })
        var input = this.refs.searchText.value;
        var track = [], album = [];
        if (input && input.length > 1){
            document.getElementById('header').innerHTML = `Search: ${input}`;
            spotifyApi.search(input, ['track', 'album'], {limit:50}).then((res)=>{
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

                // fetch("https://api.spotify.com/v1/albums/4f9voI47wfAZIp0UgwGy6o?access_token=BQAnsv_02ccmVEtwBPTKp58JgSxqNrb9UMuChFG8ces9KQv52buVcxUsJGyTPnmiIAZsfb8-J9k4Y4VkLtq0QOv5rZJIAzMy6I5pednMRe2QYPHV7K5qO5ap1SVxOv4Jf4BimpYM4OvP_kh2iJXvJWyCdGFt1f_wfIx0k2ZRzSrybO_MI37TzIpKQw")

                // Code for Track Filtering
                for(let i=0; i<res.tracks.items.length; i++){
                    let obj = {};
                    obj['key'] = i;
                    obj['release_date'] = res.tracks.items[i].album.release_date;
                    obj['artist'] = res.tracks.items[i].artists[0].name;
                    obj['track'] = res.tracks.items[i].name;
                    obj['artwork'] = res.tracks.items[i].album.images[1].url;
                    obj['preview'] = res.tracks.items[i].preview_url;
                    track.push(obj);
                }
                if(sort.includes("date")){
                    track = this.sortArrayByDate(track, sort);
                }
                this.setState({
                    track: track,
                    album: album,
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
    handleOption(event){
        var sort = event.target.value;
        this.setState({selectedOption: event.target.value});
        this.handleSubmit(event, sort);
    }
    handleOpenTracklist(apiURL){
        var reformatedURL = `${apiURL}?access_token=${this.token}`;
        fetch(reformatedURL).then((res)=>{
            return res.json();
        }).then((data)=>{
            for(var i = 0; i<data.tracks.items.length; i++){
                console.log(data.tracks.items[i].name);
            }
            
        })
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
                        <div id="album-container" style={{position: 'relative', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', padding: '0 2rem'}}>
                        {this.state.album.map((album)=>{
                            return(
                                <div key={album.key} style={{margin: '2rem 1rem'}}>
                                    <img onClick={()=>this.handleOpenTracklist(album.url)} className="image-artwork" alt="NoPreview" src={album.artwork}></img>
                                    <h6 style={{paddingTop: '10px', fontWeight: 'bold'}} className="text-center">{album.artist}</h6>
                                    <h6 className="text-center" style={{fontWeight: 'bold'}}>{album.album}</h6>
                                </div>
                            )
                        })}</div>
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
                        {this.state.track.map((track)=>{
                            return(
                                <div key={track.key} style={{margin: '2rem 1rem'}}>
                                    <audio src={track.preview} />
                                    <img className="image-artwork" onClick={()=>playPreview(track.key, track.preview)} alt="NoPreview" src={track.artwork}></img>
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