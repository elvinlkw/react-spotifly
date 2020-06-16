import React, { Fragment } from 'react'

const SearchFilter = () => {
  return (
    <Fragment>
      <span data-toggle="collapse" data-target="#filter-panel">Advanced Options</span>
      <div id="filter-panel" className="collapse">
        <div class="card">
          <div class="card-body">
            This is some text within a card body.
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SearchFilter;
