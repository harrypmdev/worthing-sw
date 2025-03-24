import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';
import { Container } from 'react-bootstrap';
import Song from './Song';
import FullPageSpinner from './FullPageSpinner';

const SongList = ({user_id}) => {
  const [songList, setSongList] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchSongList = async () => {
      try {
        const {data} = await axiosReq.get(`/songs/?ordering=-net_votes&user=${user_id}`);
        setHasLoaded(true);
        setSongList(data);
      } catch (err) {
        console.log(err);
      }
    }
    setHasLoaded(false);
    fetchSongList();
  }, [user_id]);
    
  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
        { songList.results.map((song) => (
          <>
          <Song song={song} includeDetails/>
          <br />
          </>
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
