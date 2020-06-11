import React, { Component } from 'react';

class TracksDisplay extends Component {
  render() {
    var { indexOfFirstPage, currentTracks, onclick } = this.props;
    return (
      <ol start={indexOfFirstPage+1}>
        {currentTracks.map(track => {
          return (
            <li 
              key={track.key} 
              className="track-list" 
              onClick={() => onclick(track.key, track.value)}>
                {` ${track.value}`}
            </li>
          )
        })}
      </ol>
    )
  }
}

export default TracksDisplay;