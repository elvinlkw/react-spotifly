import React from 'react';
import classes from './style/TopTrack.module.css';

const TopArtist = ({ top_artist: { image, name, top_track, preview_url, uri }, onclick, icon }) => {
  return (
    <div className={`${classes.TopTrack} ${classes.Artist} row`}>
      <div className="col-md-6">
        <h4>{name}</h4>
        <h6 style={{textDecoration: 'underline'}}>{`${name} - ${top_track}`}</h6>
        <audio src={preview_url}></audio>
        <div className={classes.Clickables}>
          <i id="artist" className={`fa fa-${icon ? 'play' : 'pause'}-circle-o fa-2x`} onClick={() => onclick(1)}></i>
          <form action={uri}>
            <input type="submit" className="btn btn-success" value="Spotify"/>
          </form>
        </div>
      </div>
      <div className="col-md-6">
        <h1 className="text-center">Top Artist</h1>
        <img src={image} alt="No Artwork Found"/>
      </div>
    </div>
  )
}

export default TopArtist;
