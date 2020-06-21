import React from 'react'

const SelectedOption = ({ term, onchange }) => {
  return (
    <select className="form-control" value={term} onChange={onchange} >
      <option value="short_term">4 Weeks</option>
      <option value="medium_term">6 Months</option>
      <option value="long_term">All Time</option>
    </select>
  )
}

export default SelectedOption;
