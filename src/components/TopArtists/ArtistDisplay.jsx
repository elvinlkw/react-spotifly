import React from 'react'

const ArtistDisplay = ({ indexFirstOfPage, artist_list, onclick }) => {
  return (
    <ol start={indexFirstOfPage + 1}>
      {artist_list.map(artist => {
        return (
          <li key={artist.key} onClick={() => onclick(artist)}>{artist.name}</li>
        )
      })}
    </ol>
  )
}

export default ArtistDisplay
