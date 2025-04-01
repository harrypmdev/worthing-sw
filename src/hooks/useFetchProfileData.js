import { useEffect, useState } from 'react'

import { axiosReq } from '../api/axiosDefaults';

/**
 * Fetch a particular profile from the backend as an object and pass this 
 * into a given setter function.
 * Optionally also fetches the songs associated with that profile if provided 
 * with a setter function for the song data.
 * 
 * @param {number} id The id of the profile which should be fetched.
 * 
 * @param {Function} setProfileData The setter which the data from the '/profiles'
 *                                  endpoint should be passed into.
 * 
 * @param {Function} [setSongData=null] The setter which the data from the '/songs' endpoint
 *                                      should be passed into. No song data will be fetched
 *                                      if no function is provided.
 * 
 * @returns {boolean} Whether or not the hook functionality has finished processing yet -
 *                    false if it is still processing, true once it has finished.
 */
const useFetchProfileData = ({id, setProfile, setSongData=null}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
          const songFetch = setSongData 
          ? axiosReq.get(`/songs/?ordering=-net_votes&user=${id}`)
          : null;
          const [profileResponse, songResponse] = await Promise.all([
              axiosReq.get(`/profiles/${id}`),
              songFetch,
          ])
          setProfile(profileResponse.data);
          if (songFetch && songResponse) {
            setSongData(songResponse.data.results)
          }
          setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }

    if (id) fetchProfileData();
  }, [id, setProfile, setSongData])

  return hasLoaded;
}

export default useFetchProfileData
