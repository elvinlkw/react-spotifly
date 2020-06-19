import React from 'react';
import classes from './style/TrackControl.module.css';

const TrackControl = ({songFocus, currentTrack: { name, preview, image_src } }) => {
  return (
    <div className={`col-lg-8 ${classes.TrackOrder}`}>
      {songFocus &&
      <div className={classes.TrackControl}>
        <img src={image_src} alt="no artwork found" className="track-img"/>
        <div>
          <p>Now Playing: </p>
          <p><strong>{name}</strong></p>
          <audio controls autoPlay src={preview}></audio>
        </div>
      </div>}
    </div>
  )
}

export default TrackControl
