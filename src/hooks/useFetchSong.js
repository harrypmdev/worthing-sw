import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { axiosReq } from '../api/axiosDefaults';


const useFetchSong = (props) => {
  const { 
    setSongData,
    id=null, 
    filter='',
    redirectUnauthorized=false,
  } = props;
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);

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
