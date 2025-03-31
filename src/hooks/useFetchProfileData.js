import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';

const useFetchProfileData = ({id, setProfile, setSongData}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfileAndSongData = async () => {
        try {
            const [{data: profile}, {data: songs}] = await Promise.all([
                axiosReq.get(`/profiles/${id}`),
                axiosReq.get(`/songs/?ordering=-net_votes&user=${id}`)
            ])
            setProfile(profile);
            setSongData(songs.results);
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }

    fetchProfileAndSongData();
  }, [id])

  return hasLoaded;
}

export default useFetchProfileData
