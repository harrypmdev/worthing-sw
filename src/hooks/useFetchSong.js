import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { axiosReq } from '../api/axiosDefaults';

/**
 * Hook to fetch a particular song or list of songs from the backend
 * as an object and pass this into a given setter function.
 * 
 * @param {Function} setSongData The setter which the data from the backend
 *                               should be passed into.
 * 
 * @param {number} [id=null] The id of the song which should be fetched if just
 *                           one specific song is to be fetched.
 * 
 * @param {string} [filter=''] The filter which should be used if multiple songs
 *                             are to be fetched. Mutually exclusive with id -
 *                             an error will be thrown if both are given.
 * 
 * @param {boolean} [redirectUnauthorized=false] Whether the user should be redirected
 *                                               if the returned song does not belong
 *                                               to the current user.
 * 
 * @returns {boolean} Whether or not the hook functionality has finished processing yet -
 *                    false if it is still processing, true once it has finished.
 */
const useFetchSong = (props) => {
  const { 
    setSongData,
    id=null, 
    filter='',
    redirectUnauthorized=false,
  } = props;
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);

  if (id && filter) {
    throw new Error('Props conflict: fetch by id and fetch by filter cannot be used together.');
  }

  useEffect(() => {
    const fetchSong = async () => {
      try {
        let endpoint;
        if (id) endpoint = `/songs/${id}`;
        if (filter) endpoint = `songs/?${filter}`
        const { data } = await axiosReq.get(endpoint);
        if (!data.is_user && redirectUnauthorized) {
          navigate('/general-feed/'); // Redirect unauthorized users
          return;
        }
        setSongData(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    if (id || filter ) fetchSong();
  }, [id, navigate, setSongData, filter, redirectUnauthorized]);

  return hasLoaded;
}

export default useFetchSong
