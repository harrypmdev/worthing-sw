import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';
import { Container } from 'react-bootstrap';
import Song from './Song';
import FullPageSpinner from './FullPageSpinner';

const SongList = ({profile}) => {
  const [songList, setSongList] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchSongList = async () => {
      try {
        const {data} = await axiosReq.get(`/songs/?ordering=-net_votes&user=${profile.id}`);
        setHasLoaded(true);
        setSongList(data);
      } catch (err) {
        console.log(err);
      }
    }
    setHasLoaded(false);
    fetchSongList();
  }, [profile.id]);
    
  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { songList?.results?.length && (
        <h2 className='h6 text-center fw-bold'>Songs ({profile.songs_count}/3)</h2>
      )}
      { hasLoaded ? (<>
        { songList.results.map((song, index) => (
          <div key={song.id}>
          <Song song={song} number={index+1} includeDetails editable/>
          <br />
          </div>
        ))}
        { !songList.results.length && (
          <div className='text-center my-3 fst-italic'>No songs yet.</div>
        )}
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default SongList
