import React, { Component } from 'react';

class Pagination extends Component {
  render(){
    var { totalTracks, tracksPerPage, paginate } = this.props;
    var pageNumber = [];

    for(var i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++){
      pageNumber.push(i);
    }
    
    return (
      <nav style={paginationStyle}>
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
      </nav>
    )
  }
}

const paginationStyle = {
  margin: '15px'
}

export default Pagination;