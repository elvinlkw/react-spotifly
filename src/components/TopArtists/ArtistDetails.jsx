import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Layout/Spinner';
import withToast from '../../hoc/withToast';
import classes from './style/ArtistDetails.module.css';

const ArtistDetails = ({ loading, myArtist: { artist, my_ArtistTracks, artistTopTracks }, addToast, displayModal}) => {
  const [ preview, setPreview ] = useState('');

  // Stops currently playing track
  useEffect(() => {
    setPreview('');
  }, [displayModal]);

  const handlePlaySong = async (e, index, type) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let device = {};
      if(res.data.devices.length > 0){
        device.id = res.data.devices[0].id;
        device.name = res.data.devices[0].name;
      } else {
        window.open(type[index].uri, '_self');
      }
      await axios({
        method: 'PUT',
        url: 'https://api.spotify.com/v1/me/player/play',
        params: { 'device_id' : device.id },
        data: { 'uris': [type[index].uri] },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      addToast(`${type[index].name} playing in ${device.name}`, {
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
                <button className="btn btn-success" onClick={(e) => handlePlaySong(e, index, my_ArtistTracks)}>Spotify</button>
              </div>
            )
          })}
        </ol>
      </div>
      <div className="col-md-4">
        <h4>Top Tracks</h4>
        <ol>
          {artistTopTracks.map((track, index) => {
            return (
              <div key={`my_artist_${index}`} className={classes.MyArtistList}>
                <li onClick={() => setPreview(track.preview_url)}>{track.name}</li>
                <button className="btn btn-success" onClick={(e) => handlePlaySong(e, index, artistTopTracks)}>Spotify</button>
              </div>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default withToast(ArtistDetails);
