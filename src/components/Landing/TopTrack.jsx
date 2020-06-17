import React from 'react';
import classes from './style/TopTrack.module.css';

const TopTrack = ({ top_track: { image, name, artist, preview_url, uri }, onclick, icon }) => {
  return (
    <div className={`${classes.TopTrack} row`}>
      <div className="col-md-6">
        <h1 className="text-center">Top Track</h1>
        <img src={image} alt="No Artwork Found"/>
      </div>
      <div className="col-md-4">
        <h4>{name}</h4>
        <h6>{`By ${artist}`}</h6>
        <audio src={preview_url}></audio>
        <div className={classes.Clickables}>
          <i id="track" className={`fa fa-${icon ? 'play' : 'pause'}-circle-o fa-2x`} onClick={() => onclick(0)}></i>
          <form action={uri}>
            <input type="submit" className="btn btn-success" value="Spotify"/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TopTrack
