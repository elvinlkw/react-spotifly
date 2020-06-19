import React from 'react';
import classes from './style/TracksDisplay.module.css';

const TracksDisplay = ({ indexOfFirstPage, currentTracks, onclick }) => {
  return (
    <ol start={indexOfFirstPage+1} className={classes.TracksDisplay} >
      {currentTracks.map((track) => {
        return (
          <li 
            key={track.key} 
            onClick={() => onclick(track.key, track.name)}>
              {` ${track.name}`}
          </li>
        )
      })}
    </ol>
  )
}

export default TracksDisplay;