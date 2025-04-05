import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { axiosReq } from '../api/axiosDefaults';

/**
 * Fetch posts from the backend as an object and pass this into a given setter function.
 * Provides detailed optional filter functionality. If only one post needs to be fetched,
 * including alongside its comments, useFetchPostData should be used.
 * 
 * @param {Function} setPosts The setter which the data from the '/posts'
 *                            endpoint should be passed into.
 * 
 * @param {number} [filterByOwnershipId=null] The user id which should optionally be used to filter posts
 *                                            by post ownership. If the id '13' is provided, only 
 *                                            posts from the user with the id '13' will be retrieved.
 * 
 * @param {number} [filterByFollowingId=null] The user id which should optionally be used to filter posts
 *                                            by following. If the id '13' is provided, only posts
 *                                            from users that the user with the id '13' is following
 *                                            will be retrieved. Mutually exclusive with filterByOwnershipId
 *                                            - an error will be thrown if both are given.
 * 
 * @param {string} [searchQuery=''] The search string which should optionally be used to filter the posts.
 * 
 * @param {string} [orderBy=''] The ordering filter which should optionally be used.
 * 
 * @returns {boolean} Whether or not the hook functionality has finished processing yet -
 *                    false if it is still processing, true once it has finished.
 */
const useFetchDetailedPostList = (props) => {
  const {
    setPosts,
    filterByOwnershipId=null,
    filterByFollowingId=null,
    searchQuery='',
    orderBy='',
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
        const { data: posts } = await axiosReq.get(`/posts/?${userFilter}&${followingFilter}${search}${orderBy}`);
        setPosts(posts);
        setHasLoaded(true);
      } catch (err) {
        toast.error(
          'We encountered an error retrieving your data, sorry!'
          + ' Try refreshing the page or relogging.', 
          {position: 'bottom-left', toastId: 'detailedPostListError'}
        );
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setPosts, filterByOwnershipId, filterByFollowingId, searchQuery, orderBy]);
  
  
  return hasLoaded;
}

export default useFetchDetailedPostList
