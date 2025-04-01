import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import { axiosReq } from '../api/axiosDefaults';


/**
 * Render a follow or unfollow button depending on whether the user is following a given user.
 * 
 * @param {number} userToFollow The user ID to be followed or unfollowed.
 * 
 * @param {number} [currentFollower=null] The database ID of the follower instance, if already following.
 * 
 * @returns {ReactNode} An element displaying either a follow or unfollow button.
 */
const Follow = ({ userToFollow, currentFollower=null }) => {
  const [buttonLoaded, setButtonLoaded] = useState(true);
  const [currentFollowerState, setCurrentFollowerState] = useState(currentFollower); // ID of the current follower
  const [following, setFollowing] = useState(!!currentFollower); // Boolean of whether the user is following

  /**
   * Handle the 'Unfollow' button click.
   * Sends a DELETE request to delete the existing database follower instance.
   * Updates local state based on API success or failure.
   *
   * @param {Event} event - The event triggered by the button click.
   */
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

  /**
   * Handle the 'Follow' button click.
   * Sends a POST request to add a new instance to the follower database.
   * Updates local state based on API success or failure.
   *
   * @param {Event} event - The event triggered by the button click.
   */
  const handleFollow = async event => {
    event.preventDefault();
    setButtonLoaded(false);
    try {
      setFollowing(true);
      const {data} = await axiosReq.post("/followers/", {followed: userToFollow});
      setCurrentFollowerState(data.id);
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


