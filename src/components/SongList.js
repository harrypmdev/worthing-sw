import React from 'react'
import { Container } from 'react-bootstrap';

import Song from './Song';


const SongList = ({profile, songData}) => {

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { songData.length && (
        <h2 className='h6 text-center fw-bold'>Songs ({profile.songs_count}/3)</h2>
      )}
      { songData.map((song, index) => (
        <div key={song.id}>
        <Song song={song} number={index+1} includeDetails editable/>
        <br />
        </div>
      ))}
      { !songData.length && (
        <div className='text-center my-3 fst-italic'>No songs yet.</div>
      )}
    </Container>
  )
}

export default SongList
