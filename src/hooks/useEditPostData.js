import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * A hook to fetch a post and its associated songs and pass the data into
 * the provided setters. Passes the song associated with the post into
 * the given 'setSelectedSong' setter.
 * Functionality intended for the EditPost page.
 * 
 * @param {number} id The id of the post that should be fetched.
 * 
 * @param {Function} setSongData The setter that the retrieved song data
 *                               results should be passed in to.
 * 
 * @param {Function} setSelectedSong The setter that the song currently associated
 *                                   with the post should be passed in to. 
 * 
 * @param {Function} setPost The setter that the retrieved post data
 *                           should be passed in to.
 * 
 * @returns {boolean} True if the process has finished loading, false if not.
 */
const useEditPostData = ({id, setSongData, setSelectedSong, setPost}) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);
  
  useEffect(() => {
    const fetchPostAndSongs = async () => {
      try {
        const [{ data: songs }, {data: post} ] = await Promise.all([
          axiosReq.get(`/songs/?ordering=-net_votes&user=${currentUser?.pk}`),
          axiosReq.get(`/posts/${id}`),
        ]);
        if (!post.is_user) {
          navigate('/general-feed/'); // Redirect unauthorized users
          return;
        }
        const matchingSong = songs.results.find((song) => song.id === post.song);
        setSelectedSong(matchingSong ? matchingSong.id : '');
        setPost(post);
        setSongData(songs.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    if ( currentUser ) fetchPostAndSongs();
  }, [id, navigate, setPost, setSongData, setSelectedSong, currentUser]);

  return hasLoaded;
}

export default useEditPostData
