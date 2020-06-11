import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import TrackList from './TrackList';
import Spinner from '../Layout/Spinner';
import '../../style/TopTracks.css';
const spotifyApi = new SpotifyApi();

class TopTracks extends Component {
    constructor(){
        super();
        let url = window.location.href;
        this.state = {
            term: "short_term",
            loading: false,
            tracklist: []
        };
        if(url.indexOf("token=") > -1){ 
            this.token = url.split("token=")[1].split("&")[0].trim();
        }
        spotifyApi.setAccessToken(this.token);
    }
    getTrackInfo(i, trackObj, tempArray){
        let tPromise = new Promise(function(resolve, reject) {
            var obj = {};
            var artist = '';
            for (var j=0; j<trackObj.artists.length;j++){
                if(artist.length > 1){
                    artist += ', ' + trackObj.artists[j].name;
                }else{
                    artist += trackObj.artists[j].name;
                }
            }
            obj['key'] = i;
            obj['value'] = artist + ' - ' + trackObj.name;
            obj['preview'] = trackObj.preview_url;
            obj['image'] = trackObj.album.images[0].url;
            if(trackObj.preview_url === null){
                let reformatedURL = `${trackObj.album.href}?access_token=${this.token}`;
                fetch(reformatedURL).then(res=>{
                    return res.json();
                }).then(data => {
                    // console.log(data);
                })
            }
            tempArray.push(obj);
        }.bind(this));
        return tPromise;
    }
    fetchTracklist(term){
        var tempArray = [];
        spotifyApi.getMyTopTracks({ limit: 50, time_range: term })
            .then(res => {
                var promiseArray = [];
                for(let i = 0; i < res.items.length; i++){
                    promiseArray.push(this.getTrackInfo(i, res.items[i], tempArray));
                }
                Promise.all(promiseArray);
            })
            .then(() => {
                spotifyApi.getMyTopTracks({ limit: 50, time_range: term, offset: '49' })
                    .then(res => {
                        for(let i = 1; i < res.items.length; i++){
                            var obj = {};
                            var artist = '';
                            for (let j = 0; j < res.items[i].artists.length; j++){
                                if(artist.length > 1){
                                    artist += ', ' + res.items[i].artists[j].name;
                                }else{
                                    artist += res.items[i].artists[j].name;
                                }
                            }
                            obj['key'] = i+49;
                            obj['value'] = artist + ' - ' + res.items[i].name;
                            obj['preview'] = res.items[i].preview_url;
                            obj['image'] = res.items[i].album.images[0].url;
                            tempArray.push(obj);
                        }
                        this.setState({
                            tracklist: tempArray,
                            loading: false 
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    componentWillMount(){
        this.setState({ loading: true });
        this.fetchTracklist('short_term');
    }
    handleOption(e){
        this.setState({
            term: e.target.value,
            loading: true
        });
        this.fetchTracklist(e.target.value);
    }
    render() { 
        var { term, tracklist, loading } = this.state;

        if(loading) return <Spinner />

        return (
            <div className="top-track-container">
                <h1 className="text-center">Top Tracks</h1>
                <div className="form-group">
                    <p>View:</p>
                    <select className="form-control" value={term} onChange={(e)=>this.handleOption(e)}>
                        <option value="short_term">4 Weeks</option>
                        <option value="medium_term">6 Months</option>
                        <option value="long_term">All Time</option>
                    </select>
                </div>
                <div className="top-tracks-wrapper row">
                    <TrackList term={term} tracklist={tracklist}/>
                </div>
            </div>
        );
    }
}

export default TopTracks;