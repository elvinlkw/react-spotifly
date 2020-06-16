import React from 'react';
import classes from './style/SearchForm.module.css';

const SearchForm = ({ onSearch, onChange }) => {
  return (
    <form className={classes.SearchForm} onSubmit={onSearch}>
      <input type="text" className="form-control" placeholder="Search" onChange={onChange} />
      <button type="submit" className="btn btn-info" data-toggle="collapse" data-target="#filter-panel">Let's Get It!</button>
    </form>
  )
}

export default SearchForm
