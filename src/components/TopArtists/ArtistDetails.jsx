import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Layout/Spinner';
import withToast from '../../hoc/withToast';
import classes from './style/ArtistDetails.module.css';

const ArtistDetails = ({ loading, myArtist: { artist, my_ArtistTracks }, addToast}) => {
  const [ preview, setPreview ] = useState('');

  const handlePlaySong = async (e, index) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let device_id = '';
      if(res.data.devices.length > 0){
        device_id = res.data.devices[0].id;
      } else {
        await window.open(my_ArtistTracks[index].uri, '_self');
      }
      await axios({
        method: 'PUT',
        url: 'https://api.spotify.com/v1/me/player/play',
        params: { 'device_id' : device_id },
        data: { 'uris': [my_ArtistTracks[index].uri] },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      addToast(`${my_ArtistTracks[index].name} playing in Spotify client`, {
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

  if( loading ) return <Spinner />

  return (
    <div className={`${classes.ArtistDetails} row`}>
      <div className={`col-md-4 ${classes.ArtistContainer}`}>
        <img src={artist.images} alt="No Images Found"/>
        <h3 className="text-center">{artist.name}</h3>
        <audio autoPlay controls src={preview}></audio>
      </div>
      <div className="col-md-4">
        <h4>Top Listened by you</h4>
        <ol>
          {my_ArtistTracks.map((track, index) => {
            return (
              <div key={`my_artist_${index}`} className={classes.MyArtistList}>
                <li onClick={() => setPreview(track.preview_url)}>{track.name}</li>
                <button className="btn btn-success" onClick={(e) => handlePlaySong(e, index)}>Spotify</button>
              </div>
            )
          })}
        </ol>
      </div>
      <div className="col-md-4">
        Top Tracks
      </div>
    </div>
  )
}

export default withToast(ArtistDetails);