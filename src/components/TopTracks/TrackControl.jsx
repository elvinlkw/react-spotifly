import React from 'react';

const TrackControl = ({songFocus, currentTrack: { name, preview, image_src } }) => {
  return (
    <div className="col-lg-8">
      {songFocus &&
      <div className="image-container">
        <img src={image_src} alt="no artwork found" className="track-img"/>
        <div>
          <p>{name}</p>
          <audio controls autoPlay src={preview}></audio>
        </div>
      </div>}
    </div>
  )
}

export default TrackControl
