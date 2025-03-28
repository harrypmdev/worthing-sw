import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import FullPageSpinner from './FullPageSpinner';

const Follow = ({ profile, id=null }) => {
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(!!profile);
  const [profileData, setProfileData] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await axiosReq.get(`/profiles/${id}/`);
        setHasLoaded(true);
        setProfileData(data.results);
      } catch (err) {
        console.log(err);
      }
    }
    if (!profile) {    
      setHasLoaded(false);
      fetchProfile();
    }
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await axiosReq.post("/followed/", {
  //       user: currentUser.pk,
  //       followed: 
  //     });
  //     navigate(`/profile/${currentUser.profile_id}`);
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response?.status !== 401) {
  //       setErrors(err.response?.data);
  //     }
  //   }
  // };

  return (<>
    { hasLoaded ? (
      ( profile?.following_id ? (
        <Button variant='success-subtle' className='me-2'>
          <span className="d-flex align-items-center">
            Unfollow <i className="fa-solid fa-user-plus ms-1"></i>
          </span>
        </Button>                 
      ) : (
        <Button variant='success' className='me-2'>
          <span className="d-flex align-items-center">
            Follow <i className="fa-solid fa-user-plus ms-1"></i>
          </span>
        </Button>
      ))
    ) : (
      <FullPageSpinner />
    )
    }
  </>)
}

export default Follow


