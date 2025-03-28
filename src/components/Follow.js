import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { axiosReq } from '../api/axiosDefaults';
import FullPageSpinner from './FullPageSpinner';


const Follow = ({ profile, id=null }) => {
  const [hasLoaded, setHasLoaded] = useState(!!profile);
  const [buttonLoaded, setButtonLoaded] = useState(true);
  const [profileData, setProfileData] = useState(profile);
  const [followed, setFollowed] = useState(!!profile?.following_id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await axiosReq.get(`/profiles/${id}/`);
        setHasLoaded(true);
        setProfileData(data);
        setFollowed(!!data.following_id);
      } catch (err) {
        console.log(err);
      }
    }
    if (!profile) {    
      setHasLoaded(false);
      fetchProfile();
    }
  }, [id, profile]);

  const handleUnfollow = async event => {
    event.preventDefault();
    setButtonLoaded(false);
    try {
      setFollowed(false);
      await axiosReq.delete(`/followers/${profileData.following_id}`);
    } catch (err) {
      console.log(err);
      setFollowed(true);
    } finally {
      setButtonLoaded(true);
    }
  }

  const handleFollow = async event => {
    event.preventDefault();
    setButtonLoaded(false);
    try {
      setFollowed(true);
      const {data} = await axiosReq.post("/followers/", {followed: profileData.user_id});
      setProfileData({
        ...profileData,
        following_id: data.id,
      })
    } catch (err) {
      console.log(err);
      setFollowed(false);
    } finally {
      setButtonLoaded(true);
    }
  };

  return (<>
    { hasLoaded ? (
      ( followed ? (
        <Button variant='outline-success' className='me-2' onClick={handleUnfollow} disabled={!buttonLoaded}>
          <span className="d-flex align-items-center">
            Unfollow <i className="fa-solid fa-user-plus ms-1"></i>
          </span>
        </Button>                 
      ) : (
        <Button variant='success' className='me-2' onClick={handleFollow} disabled={!buttonLoaded}>
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


