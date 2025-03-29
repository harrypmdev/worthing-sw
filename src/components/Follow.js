import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { axiosReq } from '../api/axiosDefaults';


const Follow = ({ currentFollower, userToFollow }) => {
  const [buttonLoaded, setButtonLoaded] = useState(true);
  const [currentFollowerState, setCurrentFollowerState] = useState(currentFollower);
  const [following, setFollowing] = useState(!!currentFollower);

  const handleUnfollow = async event => {
    event.preventDefault();
    setButtonLoaded(false);
    try {
      setFollowing(false);
      await axiosReq.delete(`/followers/${currentFollowerState}`);
      setCurrentFollowerState(null);
    } catch (err) {
      console.log(err);
      setFollowing(true);
    } finally {
      setButtonLoaded(true);
    }
  }

  const handleFollow = async event => {
    event.preventDefault();
    setButtonLoaded(false);
    try {
      setFollowing(true);
      const {data} = await axiosReq.post("/followers/", {followed: userToFollow});
      setCurrentFollowerState(data.id);
      console.log(data.id);
    } catch (err) {
      console.log(err);
      setFollowing(false);
    } finally {
      setButtonLoaded(true);
    }
  }

  return (<>
    { following ? (
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
    )}
  </>)
}

export default Follow


