import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import withToast from '../../hoc/withToast';
import classes from './style/AlbumTracklist.module.css';
import Spinner from '../Layout/Spinner';

const AlbumTracklist = ({ albumTracklist: { tracklist, duration_s, release_date, album, artwork, artist, uri }, isPlaying, loading, displayModal, addToast }) => {
  // Instantiate states
  let [ preview, setPreview ] = useState('');  // preview_href
  let [ currentTrack, setCurrentTrack ] = useState('');  // 
  
  // Stops the playing audio when the Modal hides
  // ComponentDidUpdate on displayModal prop
  useEffect(() => {
    setPreview('');
    setCurrentTrack('');
  }, [displayModal]);

  const playPreview = ( index, preview_url ) => {
    if(preview_url === null){
      addToast('No Previews Found', {
        appearance: 'warning',
        autoDismiss: true
      })
    }else{ 
      const string = `${artist} - ${tracklist[index].name}`
      setPreview(preview_url);
      setCurrentTrack(string);
      isPlaying();
    }
  }
  
  const displayNowPlaying = () => {
    if( currentTrack.length > 0 ){
      return (
        <Fragment>
          <p className="text-center">Now Playing: </p>
          <p className="text-center"><strong>{currentTrack}</strong></p>
        </Fragment>
      )
    }
  }

  const displayDuration = () => {
    if(duration_s < 3600){
      return `${Math.floor(duration_s / 60)} min`;
    } else {
      const hours = Math.floor(duration_s / 3600);
      let minutes = Math.floor((duration_s % 3600) / 60);

      return `${hours} hr ${minutes} min`;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = sessionStorage.getItem('token');

    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let device_id = '';
      if(res.data.devices.length > 0){
        device_id = res.data.devices[0].id;
      } else {
        await window.open(uri, '_self');
      }
      await axios({
        method: 'PUT',
        url: 'https://api.spotify.com/v1/me/player/play',
        params: { 'device_id' : device_id },
        data: { 'context_uri': uri },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      addToast(`${album} playing in Spotify client`, {
        appearance: 'success',
        autoDismiss: true
      });
    } catch (error) {
      addToast(`${error.response.status}: ${error.response.data ? error.response.data.error.message : 'Error Encountered'}`, {
        appearance: 'error',
        autoDismiss: true
      });
      if(error.response.data.error.message === "Device not found"){
        addToast(`Please open Spotify client`, {
          appearance: 'error',
          autoDismiss: true
        });
      }
    }
  }

  if(loading) return <Spinner />

  return (
    <div className={`row ${classes.AlbumTracklist}`}>
      <div className="col-md-4">
        <img src={artwork} alt="No Previews Found"/>
        <div className={classes.description}>
          <div className={classes.AlbumName}>
            <h3>{album}</h3>
            <form onSubmit={handleSubmit}>
              <input type="submit" className="btn btn-success" value={`Play album in Spotify`}/>
            </form>
          </div>
          <hr/>
          <div className={classes.SearchMobile}>
            <p>By {artist}</p>
            <p>{release_date}</p>
            <p>{tracklist.length} Songs - {displayDuration()}</p>
          </div>  
          <audio controls autoPlay src={preview} className="player-album"></audio>
          {displayNowPlaying()}
        </div>
      </div>
      <div className={`col-md-8 ${classes.TrackListContainer}`}>
        <h2 style={{marginBottom: '1rem'}}>{album} Tracklist</h2>
        <ol>
          {tracklist.map((track, index) => {
            return (
            <li key={index} onClick={(() => playPreview(index, track.preview))} className="track-item">
              <i className={`fa fa-play-circle`} ></i>
              {track.name}
            </li>)
          })}
        </ol>
      </div>
    </div>
  )
}

export default withToast(AlbumTracklist);
