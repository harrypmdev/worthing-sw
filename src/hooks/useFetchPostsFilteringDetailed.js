import { useEffect, useState } from "react";

import { axiosReq } from "../api/axiosDefaults";


const useFetchDetailedPostList = (props) => {
  const {
    setPosts,
    filterByOwnershipId=null,
    filterByFollowingId=null,
    searchQuery='',
  } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  if (filterByFollowingId && filterByOwnershipId) {
    throw new Error('Props conflict: filter by ownership and filter by id cannot be used together.');
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setHasLoaded(false);
      try {
        let userFilter = filterByOwnershipId ? `user=${filterByOwnershipId}` : '';
        let followingFilter = filterByFollowingId ? `user__followed__user=${filterByFollowingId}` : '';
        let search = searchQuery ? `&search=${searchQuery}` : '';
        const { data: posts } = await axiosReq.get(`/posts/?${userFilter}&${followingFilter}${search}`);
        setPosts(posts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setPosts, filterByOwnershipId, filterByFollowingId, searchQuery]);
  
  
  return hasLoaded;
}

export default useFetchDetailedPostList
