import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';
import { Button, Container } from 'react-bootstrap';
import Song from './Song';
import FullPageSpinner from './FullPageSpinner';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const SongList = ({profile}) => {
  const [songList, setSongList] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchSongList = async () => {
      try {
        console.log(`request: /songs/?ordering=-net_votes&user=${profile.id}`);
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
      { hasLoaded ? (<>
        { songList.results.map((song) => (
          <div key={song.id}>
          <Song song={song} includeDetails/>
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
