import React from 'react';

const SortOption = ({ onchange, selected }) => {
  // let [ optionState, setOptionState ] = useState('popular');

  // const handleChange = (event) => {
  //   console.log('event: ' + event.target.value);
  //   setOptionState(event.target.value);
  //   console.log('option:' + optionState);
  // }
  return (
    <div>
      <p className="text-center" style={{margin: '0'}}>Sort By:</p>
      <select className="form-control" value={selected} onChange={(e) => onchange(e.target.value)} >
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}

export default SortOption
