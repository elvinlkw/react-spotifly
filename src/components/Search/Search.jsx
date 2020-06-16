import React, { Component } from 'react';
import withToast from '../../hoc/withToast';
import SearchForm from './SearchForm';
import SearchFilter from './SearchFilter';
import Spinner from '../Layout/Spinner';
import ArtworkDisplay from './ArtworkDisplay';
import AlbumTracklist from './AlbumTracklist';
import Modal from './Modal';
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
      inputFilter:{
        limit: 50,
        album: true,
        track: true
      }
    }
  }
  fetchData = async () => {
    const { inputFilter } = this.state;
    let type = '';
    if(inputFilter.album && inputFilter.track) type = 'track,album';
    else if (inputFilter.album && !inputFilter.track) type = 'album';
    else if (!inputFilter.album && inputFilter.track) type = 'track';
    else {
      this.props.addToast('Nothing selected', {
        appearance: 'error',
        autoDismiss: true
      })
    }
    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: this.state.searchText,
        type: type,
        limit: this.state.inputFilter.limit,
      },
      headers: { 'Authorization' : `Bearer ${this.token}` }
    });
    
    let albumList = [];
    let trackList = [];
    const data = res.data;
    if(inputFilter.album){
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
    }

    if (inputFilter.track){
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
    }

    if(albumList.length === 0 && trackList.length === 0){
      this.props.addToast(`No Results Found`, {
        appearance: 'warning',
        autoDismiss: true
      });
    } else {
      // Sort album list by newest first
      albumList = this.sortList(albumList);
      trackList = this.sortList(trackList, 'popular');
    }

    this.setState({ 
      albumList,
      trackList,
      loading: false
    });
    } catch (error) {
      this.props.addToast(`${error.response.status}: ${error.response.data.error.message}`, {
        appearance: 'error',
        autoDismiss: true
      });
      this.setState({ loading: false });
    }
  }
  // function that sort list according to Select option
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
  // function that handle clicking on Search button
  handleSearch = (e) => {
    e.preventDefault();
    let header = this.state.header;
    if(this.state.searchText.length < 1){
      this.props.addToast('Search Field is Empty', {
          appearance: 'info',
          autoDismiss: true
      })
    } else {
      header = `Results: ${this.state.searchText}`;
      this.setState({ loading: true });
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
      this.props.addToast(`${error.response.status}: ${error.response.data.error.message}`, {
        appearance: 'error',
        autoDismiss: true
      });
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

      this.setState({ 
        albumTracklist,
        searchCompleted: true, 
        modalLoading: false 
      });
    } catch (error) {
      this.props.addToast(`${error.response.status}: ${error.response.data.error.message}`, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }
  handleAlbumClick = (index) => {
    this.setState({ displayModal: true });
    
    this.fetchTracklist(index);
  }
  handleTrackClick = (index) => {
    this.setState({ 
      audio_src: this.state.trackList[index].track_preview,
    })
  }
  handleOptionChange = (option) => {
    const sortedList = this.sortList(this.state.trackList, option);
    this.setState({ 
      trackList: sortedList,
      selected_option: option
    });
  }
  handleCheckbox = (e) => {
    // Calling event.persist() on the event removes the synthetic event
    // from the pool and allows references to the event to be 
    // retained asynchronously
    e.persist();
    if(e.target.name === 'album'){
      this.setState( prevState => {
        return {
          ...prevState,
          inputFilter: {
            album: !prevState.inputFilter.album,
            track: prevState.inputFilter.track,
            limit: prevState.inputFilter.limit
          }
        }
      });
    } else if (e.target.name === 'track') {
      this.setState( prevState => {
        return {
          ...prevState,
          inputFilter: {
            album: prevState.inputFilter.album,
            track: !prevState.inputFilter.track,
            limit: prevState.inputFilter.limit
          }
        }
      });
    } else {
      this.setState( prevState => {
        return {
          ...prevState,
          inputFilter: {
            album: prevState.inputFilter.album,
            track: prevState.inputFilter.track,
            limit: e.target.value
          }
        }
      })
    }
  }

  handlePlayingStatus = () => this.setState({ audio_src: '' });
  handleCloseModal = () =>  this.setState({ displayModal: false }) 
  
  render() {
    const { 
      loading, 
      header, 
      albumList, 
      trackList, 
      displayModal, 
      albumTracklist, 
      audio_src, 
      modalLoading, 
      selected_option, 
      inputFilter
    } = this.state;
    
    // Displays loading icon when fetching tracks and albums
    const loadSpinner = loading ? <Spinner /> : null;

    // Render Album List Component on DOM
    const loadAlbumList = () => {
      if(!loading && albumList.length > 0) {
        return (
          <ArtworkDisplay 
            header="Albums"
            albumList={albumList} 
            onAlbumClick={this.handleAlbumClick}/>
        )
      }
    }
    // Render Track List Component on DOM
    const loadTrackList = () => {
      if(!loading && trackList.length > 0){
        return( 
          <ArtworkDisplay 
            header="Tracks"
            albumList={trackList} 
            selected={selected_option} 
            onAlbumClick={this.handleTrackClick} 
            onchange={this.handleOptionChange}/>
        )
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
        <SearchFilter onchange={this.handleCheckbox} filter={inputFilter}/>
        {loadSpinner}
        {loadAlbumList()}
        {loadTrackList()}
      </div>
    )
  }
}

export default withToast(Search2);
