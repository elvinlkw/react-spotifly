import React from 'react';
import classes from './style/Pagination.module.css';

const Pagination = ({ totalTracks, tracksPerPage, paginate }) => {
  const pageNumber = [];

  // Calculate the amount of pages required for the tracklist array
  // number of pages = total_tracks / number of tracks per page
  for(var i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++){
    pageNumber.push(i);
  }
  
  return (
    <div className={classes.Pagination}>
      <ul className="pagination">
        {pageNumber.map(page => {
          return (
            <li key={page} className="page-item">
              <a href="!#" onClick={(e) => paginate(e, page)} className="page-link">
                {page}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination;