import { useEffect, useState } from 'react'

import { axiosReq } from '../api/axiosDefaults';


const useFetchProfileData = ({id, setProfile, setSongData}) => {
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
