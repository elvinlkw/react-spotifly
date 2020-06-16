import React, { useState, useEffect } from 'react';
import withToast from '../../hoc/withToast';
import classes from './style/AlbumTracklist.module.css';
import Spinner from '../Layout/Spinner';

const AlbumTracklist = ({ albumTracklist: { tracklist, release_date, album, artwork, artist }, isPlaying, loading, displayModal, addToast }) => {
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
      isPlaying(true);
    }
  }

  if(loading) return <Spinner />

  return (
    <div className={`row ${classes.AlbumTracklist}`}>
      <div className="col-4">
        <img src={artwork} alt="No Previews Found"/>
        <div className={classes.description}>
          <h2>{album}</h2>
          <hr/>
          <p>By {artist}</p>
          <p>{release_date}</p>
          <p>{tracklist.length} Songs - {'duration'}</p>
          <audio controls autoPlay src={preview} className="player-album"></audio>
          <p className="text-center">{currentTrack}</p>
        </div>
      </div>
      <div className="col-8">
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
