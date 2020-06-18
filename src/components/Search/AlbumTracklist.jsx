import React, { useState, useEffect, Fragment } from 'react';
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

  if(loading) return <Spinner />

  return (
    <div className={`row ${classes.AlbumTracklist}`}>
      <div className="col-md-4">
        <img src={artwork} alt="No Previews Found"/>
        <div className={classes.description}>
          <div className={classes.AlbumName}>
            <h3>{album}</h3>
            <form action={uri}>
              <input type="submit" className="btn btn-success" value="Spotify"/>
            </form>
          </div>
          <hr/>
          <p>By {artist}</p>
          <p>{release_date}</p>
          <p>{tracklist.length} Songs - {displayDuration()}</p>
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
