import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/FullPageSpinner';

const MyFeed = () => {
  const currentUser = useCurrentUser();
  const [profileForFeed, setProfileForFeed] = useState(null);

  useEffect(() => {
    setProfileForFeed({
      id: currentUser?.profile_id,
      user: currentUser?.username,
    });
  }, [currentUser])

  return (
    <>
    { profileForFeed?.id ? (
      <Feed 
        profile={profileForFeed} 
        followButtons={true}
        filter={`?user__followed__user=${profileForFeed?.id}`}
      />
    ) : (
      <FullPageSpinner />
    )}
  </>)
}

export default MyFeed
