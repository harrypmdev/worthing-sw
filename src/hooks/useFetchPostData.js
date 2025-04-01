import { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';

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
            console.log(err)
        }
    }
    setHasLoaded(false);
    fetchPost();
  }, [id, setComments, setPost])
  
  return hasLoaded;
}

export default useFetchPostData
