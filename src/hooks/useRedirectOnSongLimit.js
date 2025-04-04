import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';


/**
 * Hook to redirect the user if they (currentUser) already have 
 * 3 songs attached to their account.
 * 
 * @returns {boolean} A boolean to indicate whether the process of checking the
 *                    user's account is finished. Can be used for loading states
 *                    to prevent erroneous data input during the hook's API call.
 */
const useRedirectOnSongLimit = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [limitVerified, setLimitVerified] = useState(true);
  
  /**
   * Make API call to retrieve number of songs the user has and
   * redirect if over limit (3).
   */
  useEffect(() => {
    const fetchSongNumber = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${currentUser?.profile_id}/`);
        return data.songs_count;
      } catch (err) {
        console.log(err);
      }
    };
    const redirectIfLimit = async () => {
      if (await fetchSongNumber() >= 3) {
        navigate(`/profile/${currentUser.profile_id}`);
      } else {
        setLimitVerified(false);
      }
    }

    if (currentUser?.profile_id) redirectIfLimit();
  }, [currentUser?.profile_id, navigate]);

  return limitVerified;
}

export default useRedirectOnSongLimit
