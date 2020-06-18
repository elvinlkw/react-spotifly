import React from 'react';
import classes from './style/SearchFilter.module.css';

const SearchFilter = ({ onchange, filter: { album, track, limit } }) => {
  return (
    <div className={classes.SearchFilter}>
      <a href="!#" data-toggle="collapse" data-target="#filter-panel" aria-expanded="false">Advanced Options</a>
      <div id="filter-panel" className="collapse">
        <div className="card">
          <div className={`${classes.CardBody} card-body`}>
            <form>
              <label htmlFor="opt-limit">Limit :</label>
              <input type="text" name="limit" value={limit} onChange={onchange}/>
            </form>
            <div>
              <form>
                <input type="checkbox" name="album" checked={album} onChange={onchange}/>
                <label htmlFor="opt-album">Album</label>
              </form>
              <form>
                <input type="checkbox" name="track" checked={track} onChange={onchange}/>
                <label htmlFor="opt-track">Track</label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter;
