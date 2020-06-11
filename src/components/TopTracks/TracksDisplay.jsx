import React, { Component } from 'react';

class TracksDisplay extends Component {
  render() {
    var { indexOfFirstPage, currentTracks, handleClick } = this.props;
    return (
      <ol start={indexOfFirstPage+1}>
        {currentTracks.map(track => {
          return (
            <li 
              key={track.key} 
              className="track-list" 
              onClick={() => handleClick(track.key, track.value)}>
                {` ${track.value}`}
            </li>
          )
        })}
      </ol>
    )
  }
}

export default TracksDisplay;