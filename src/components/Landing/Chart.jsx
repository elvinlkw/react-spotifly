import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const Chart = ({ genres }) => {
  
  let valueArray = [];
  for( let key in genres){
    valueArray.push(genres[key]);
  }

  const data = {
    labels: Object.keys(genres),
    datasets: [
      {
        label: '% Genre',
        backgroundColor: '#36A2EB',
        borderColor: '#4BC0C0',
        borderWidth: 1,
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#36A2EB',
        data: valueArray
      }
    ]
  }

  return (
    <div>
      <h1 className="text-center">Top Genres</h1>
      <HorizontalBar data={data} />
    </div>
  )
};

export default Chart
