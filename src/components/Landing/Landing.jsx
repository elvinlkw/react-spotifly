import React, { Component } from 'react';
import axios from 'axios';
import withToast from '../../hoc/withToast';
import Spinner from '../Layout/Spinner';
import TopTrack from './TopTrack';
import TopArtist from './TopArtist';
import Chart from './Chart';

class Landing extends Component {
  constructor(props){
    super(props);
    let url = window.location.href;
    if(url.indexOf("token=") > -1){ 
        this.token = url.split("token=")[1].split("&")[0].trim();
    }
    this.state = {
      loading: true,
      isPlaying: true,
      favorite_genres: {},
      top_artist: {},
      top_track: {},
      player_1: true,
      player_2: true,
    }
  }
  async componentDidMount(){
    document.addEventListener('play', this.handleStop ,true);
    try{
      // Fetching for Top Artist and Artist Top Track
      let res = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        params: {
          time_range: 'long_term',
          limit: 50
        },
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const artistId = res.data.items[0].id;
      const res_topTrack = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        params: { country: 'US' },
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      // Storing Favorite Artist
      let data = res.data.items[0];
      const top_artist = {
        id: data.id,
        name: data.name,
        image: data.images[1].url,
        uri: data.uri,
        top_track: res_topTrack.data.tracks[0].name,
        preview_url: res_topTrack.data.tracks[0].preview_url
      }
      // Storing Genres of artist
      const items = res.data.items;
      let genres = {};
      for(let i = 0; i < items.length; i++) {
        for(let j = 0; j < items[i].genres.length; j++){
          // create an object with count of favorite genres
          if(genres[items[i].genres[j]]){
            genres[items[i].genres[j]] += 1
          } else {
            genres[items[i].genres[j]] = 1;
          }
        }
      }
      const sortedArray = this.sortGenres(genres);
      
      // Fetch Top Tracks for user
      res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        params: {
          time_range: 'long_term',
          limit: 1
        },
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      // Storing Favorite Track
      data = res.data.items[0];
      const top_track = {
        id: data.id,
        name: data.name,
        uri: data.uri,
        image: data.album.images[0].url,
        preview_url: data.preview_url,
        artist: data.artists[0].name
      }

      this.setState({
        top_artist,
        top_track,
        loading: false,
        favorite_genres: sortedArray
      });
    } catch(error) {
      this.props.addToast(`${error.response.status}: ${error.response.data ? error.response.data.error.message : 'Error Encountered'}`, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }
  componentWillUnmount(){
    document.removeEventListener('play' , this.handleStop, true);
  }
  sortGenres = (genres) => {
    let sortedGenres = {};
    let sortedArray = [];
    // Create an array with object keys and values for sorting
    for (let key in genres){
        sortedArray.push([key, genres[key]]);
    }
    // Sort Array in descending order
    sortedArray.sort((a, b) => {
        return b[1] - a[1];
    });
    // Push information into a sorted object
    for(let i = 0; i < 20; i++){
      sortedGenres[sortedArray[i][0]] = sortedArray[i][1];
    }
    return sortedGenres;
  }
  handleStop = (e) => {
    var checkEnded = (i)=>{
      document.getElementsByTagName('audio')[i].addEventListener('ended', ()=>{
          document.getElementsByTagName('i')[i].className = 'fa fa-play-circle-o fa-2x';
      })
    }
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        checkEnded(i);
        if(audios[i] !== e.target){
            audios[i].pause();
            document.getElementsByTagName('i')[i].className = 'fa fa-play-circle-o fa-2x';
        }
    }
  }
  handleClick = (player) => {
    const audio_player = document.querySelectorAll('audio');
    if(player === 0){
      if(this.state.player_1){
        audio_player[player].play();
        audio_player[1].pause();
      } else {
        audio_player[player].pause();
      }
      this.setState(prevState => ({ 
        player_1: !prevState.player_1,
        player_2: true 
      }));
    } else {
      if(this.state.player_2){
        audio_player[player].play();
        audio_player[0].pause();
      } else {
        audio_player[player].pause();
      }
      this.setState(prevState => ({
        player_1: true,
        player_2: !prevState.player_2 
      }));
    }
  }

  render() {
    const {
      loading,
      top_track,
      top_artist,
      player_1,
      player_2,
      favorite_genres
    } = this.state;

    if( loading ) return <Spinner />
    
    return (
      <div className="container">
        <TopTrack top_track={top_track} onclick={this.handleClick} icon={player_1}/>
        <TopArtist top_artist={top_artist} onclick={this.handleClick} icon={player_2}/>
        <Chart genres={favorite_genres} />
      </div>
    )
  }
}

export default withToast(Landing)
