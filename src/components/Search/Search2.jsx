import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Spinner from '../Layout/Spinner';
import ArtworkDisplay from './ArtworkDisplay';
import AlbumTracklist from './AlbumTracklist';
import Modal from './Modal2';
import axios from 'axios';

class Search2 extends Component {
  constructor(props){
    super(props);
    let url = window.location.href;
    if(url.indexOf("token=") > -1){ 
        this.token = url.split("token=")[1].split("&")[0].trim();
    }
    this.state = {
      loading: false,
      modalLoading: false,
      searchText: '',
      header: 'Search',
      audio_src: '',
      selected_option: 'popular',
      queryParams: {
        type: 'track,album',
        limit: 50
      },
      albumList: [],
      trackList: [],
      albumTracklist: {},
      displayModal: false,
      searchCompleted: false,
      isPlaying: false
    }
  }
  fetchData = async () => {
    const res = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: this.state.searchText,
        type: this.state.queryParams.type,
        limit: this.state.queryParams.limit,
      },
      headers: { 'Authorization' : `Bearer ${this.token}` }
    });
    
    let albumList = [];
    let trackList = [];
    const data = res.data;
    // Storing Albums
    for(let i = 0; i < data.albums.items.length; i++){
      let albumData = data.albums.items[i];
      // Check if album type is 'album'
      if(albumData.album_type === 'album'){
        let store = {
          name: albumData.name,
          artwork: albumData.images[1].url,
          artist: albumData.artists[0].name,
          album_href: albumData.href,
          release_date: albumData.release_date
        }
        albumList.push(store);
      }
    }
    // Sort album list by newest first
    albumList = this.sortList(albumList);

    // Storing Tracks
    for(let i = 0; i < data.tracks.items.length; i++){
      let trackData = data.tracks.items[i];
      let store = {
        name: trackData.name,
        artist: trackData.artists[0].name,
        track_preview: trackData.preview_url,
        track_href: trackData.href,
        artwork: trackData.album.images[1].url,
        release_date: trackData.album.release_date,
        popularity: trackData.popularity
      }
      if(store.track_preview === null){
        store.track_preview = await this.getPreview(store.track_href);
      }
      trackList.push(store);
    }

    trackList = this.sortList(trackList, 'popular');

    this.setState({ 
      albumList,
      trackList,
      loading: false
    });
  }
  sortList = (list, sortOption) => {
    switch(sortOption){
      case 'oldest':
        return list.sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
      case 'popular':
        return list.sort((a, b) => {
          return b.popularity - a.popularity;
        })
      default:
        return list.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    let header = this.state.header;
    this.setState({ loading: true });

    if(this.state.searchText.length < 1){
      alert('Search is empty')
    } else {
      header = `Results: ${this.state.searchText}`;
      this.fetchData();
    }
    this.setState({ 
      header: header 
    });
  }
  // Fetches Preview if initial fetch returns empty
  getPreview = async (href) => {
    try {
      const res = await axios.get(href, {
        headers: { 'Authorization' : `Bearer ${this.token}` }
      });
      return res.data.preview_url;
    } catch (error) {
      alert(error);
    }
  }
  fetchTracklist = async (index) => {
    try{
      this.setState({ modalLoading: true })
      const res = await axios.get(this.state.albumList[index].album_href, {
        headers: { 'Authorization' : `Bearer ${this.token}` }
      });
      let tracklist = [];
      const trackData = res.data.tracks.items;

      // Stores Tracklist
      for(let i = 0; i < trackData.length; i++){
        let store = {
          name: trackData[i].name,
          preview: trackData[i].preview_url
        }
        tracklist.push(store);
      }
      
      const albumTracklist = {
        tracklist: tracklist,
        release_date: res.data.release_date,
        album: res.data.name,
        artwork: res.data.images[1].url,
        artist: res.data.artists[0].name
      }

      this.setState({ albumTracklist: albumTracklist, searchCompleted: true, modalLoading: false });
    } catch (err) {
      alert(err);
    }
  }
  handleAlbumClick = (index) => {
    this.setState({ displayModal: true });
    
    this.fetchTracklist(index);
  }
  handleTrackClick = (index) => {
    this.setState({ 
      audio_src: this.state.trackList[index].track_preview,
      isPlaying: true
    })
  }
  handleOptionChange = (option) => {
    const sortedList = this.sortList(this.state.trackList, option);
    this.setState({ trackList: sortedList });
  }

  handlePlayingStatus = isPlaying => this.setState({ isPlaying });
  handleCloseModal = () =>  this.setState({ displayModal: false, isPlaying: false }) 
  
  render() {
    const { loading, header, albumList, trackList, displayModal, albumTracklist, audio_src, modalLoading, selected_option } = this.state;
    
    // Displays loading icon when fetching tracks and albums
    const loadSpinner = loading ? <Spinner /> : null;

    // Render Album List Component on DOM
    const loadAlbumList = () => {
      if(!loading && albumList.length > 0) {
        return <ArtworkDisplay albumList={albumList} onAlbumClick={this.handleAlbumClick} header="Albums"/>
      }
    }

    // Render Track List Component on DOM
    const loadTrackList = () => {
      if(!loading && trackList.length > 0){
        return <ArtworkDisplay albumList={trackList} selected={selected_option} onAlbumClick={this.handleTrackClick} onchange={this.handleOptionChange} header="Tracks"/>
      }
    }
    return (
      <div>
        <audio alt="No Tracks Found" src={audio_src} autoPlay></audio>
        <Modal displayModal={displayModal} hideModal={this.handleCloseModal}>
          {this.state.searchCompleted && <AlbumTracklist loading={modalLoading} albumTracklist={albumTracklist} isPlaying={this.handlePlayingStatus} displayModal={displayModal}/>}
        </Modal>
        <h1 className="text-center" style={{textTransform: 'capitalize'}}>{header}</h1>
        <SearchForm onSearch={this.handleSearch} onChange={(e) => this.setState({ searchText: e.target.value })}/>
        {loadSpinner}
        {loadAlbumList()}
        {loadTrackList()}
      </div>
    )
  }
}

export default Search2
