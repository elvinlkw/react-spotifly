import React, { Fragment } from 'react';
import SortOption from './SortOption';
import classes from './style/ArtworkDisplay.module.css';


const ArtworkDisplay = ({ albumList, onAlbumClick, header, onchange, selected }) => {

  const isSelectOption = header === 'Tracks' ? <SortOption onchange={onchange} selected={selected} /> : null;

  return (
    <Fragment>
      <div className={classes.AlbumHeader}>
        <h1 style={{textAlign: 'center', marginBottom: '1rem'}}>{header}{' '}</h1>
        {isSelectOption}
      </div>
      <div className={classes.AlbumDisplay}>
        {albumList.map((album, index) => {
          return (
            <div key={index}>
              <img src={album.artwork} alt="no artwork found" onClick={() => onAlbumClick(index)}/>
              <h6><strong>{album.artist}</strong></h6>
              <h6>{album.name}</h6>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default ArtworkDisplay;
