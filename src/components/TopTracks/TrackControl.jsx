import React from 'react';
import axios from 'axios';
import withToast from '../../hoc/withToast';
import classes from './style/TrackControl.module.css';

const TrackControl = ({songFocus, currentTrack: { name, preview, image_src, uri }, addToast }) => {
  const handleClick = async (e) => {
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
      document.querySelector('audio').pause();
      document.querySelector('audio').autoplay = false;
      await axios({
        method: 'PUT',
        url: 'https://api.spotify.com/v1/me/player/play',
        params: { 'device_id' : device_id },
        data: { 'uris': [uri] },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      addToast(`${name} playing in Spotify client`, {
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
  return (
    <div className={`col-lg-8 ${classes.TrackOrder}`}>
      {songFocus &&
      <div className={classes.TrackControl}>
        <img src={image_src} alt="no artwork found" className="track-img"/>
        <div>
          <p>Now Playing: </p>
          <p><strong>{name}</strong></p>
          <audio controls autoPlay src={preview}></audio>
          <button className="btn btn-success" onClick={handleClick}>Play in Spotify</button>
        </div>
      </div>}
    </div>
  )
}

export default withToast(TrackControl);
