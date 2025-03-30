import React from 'react'
import Feed from '../../components/Feed';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';

const MyFeed = () => {
  const currentUser = useCurrentUser();

  return <>
    { currentUser?.pk ? (
      <Feed filterByFollowingId={currentUser.pk} />
    ) : (
      <FullPageSpinner />
    )}
  </>
}

export default MyFeed
