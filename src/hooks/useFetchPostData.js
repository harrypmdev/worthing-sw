import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { axiosReq } from '../api/axiosDefaults';

/**
 * A hook to fetch a particular post from the backend as an object and 
 * pass this into a given setter function.
 * Optionally also fetches the comments associated with that post if provided 
 * with a setter function for the comments data.
 * If multiple posts needs to be fetched including with detailed filter options,
 * useFetchDetailedPostList should be used.
 * 
 * @param {number} id The id of the post which should be fetched.
 * 
 * @param {Function} setPost The setter which the data from the '/posts'
 *                           endpoint should be passed into.
 * 
 * @param {Function} [setComments=null] The setter which the data from the '/comments' endpoint
 *                                      should be passed into. No comments data will be fetched
 *                                      if no function is provided.
 * 
 * @returns {boolean} Whether or not the hook functionality has finished processing yet -
 *                    false if it is still processing, true once it has finished.
 */
const useFetchPostData = ({id, setPost, setComments}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async() => {
        try {
          const commentsFetch = setComments 
          ? axiosReq.get(`/comments/?post=${id}`)
          : null;
          const [postResponse, commentsResponse] = await Promise.all([
              axiosReq.get(`/posts/${id}`),
              commentsFetch
          ])
          setPost(postResponse.data)
          if (commentsFetch && commentsResponse) {
            setComments(commentsResponse.data)
          }
          setHasLoaded(true);
        } catch(err){
          toast.error(
            'We encountered an error retrieving your data, sorry!'
            + ' Try refreshing the page or relogging.', 
            {position: 'bottom-left', toastId: 'postDataError'}
          );
        }
    }
    setHasLoaded(false);
    fetchPost();
  }, [id, setComments, setPost])
  
  return hasLoaded;
}

export default useFetchPostData
