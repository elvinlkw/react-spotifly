import React from 'react'

const TopTracks = ({ topTrackArtwork, topTrack, topTrackLoaded, topTrackPreview, topArtist, topArtistTrack }) => {
  let preview = <p>No Preview Available</p>
  if(topTrackLoaded && topTrackPreview){
    preview = (
      <div>
          <audio controls src={topTrackPreview}></audio>
      </div>
    )
  }else if (!topTrackPreview){
    preview = <p>No Preview Available</p>
  }
  return (
    <div className="container-current-top">
      <div className="wrapper-top-header">
        <h1>All Time Song</h1>
        <img src={topTrackArtwork} alt="Not Loaded" className="img-artwork"/>
      </div>
      <div className="wrapper-top-preview">
        <h4>{topTrack}</h4>
        <h6 style={{textDecoration: 'underline'}}>{`${topArtist} - ${topArtistTrack}`}</h6>
        {preview}
      </div>
    </div>
  )
}

export default TopTracks
