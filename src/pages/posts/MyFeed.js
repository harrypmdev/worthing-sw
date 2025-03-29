import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/FullPageSpinner';

const MyFeed = () => {
  const currentUser = useCurrentUser();

  return <>
    { currentUser?.pk ? (
      <Feed
        filterByFollowingId={currentUser.pk}
        followButtons={true}
      />
    ) : (
      <FullPageSpinner />
    )}
  </>
}

export default MyFeed
