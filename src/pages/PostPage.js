import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import { Container } from 'react-bootstrap';
import FullPageSpinner from '../components/FullPageSpinner';

const PostPage = () => {
  const {id} = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [post, setPost] = useState({});

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({results: []});

  useEffect(() => {
    const fetchPost = async() => {
        try {
            const [{data: post}, {data: comments}] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
                axiosReq.get(`/comments/?post=${id}`)
            ])
            setPost(post)
            setComments(comments)
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }
    setHasLoaded(false);
    fetchPost();
  }, [id])

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
          <Post post={post} link={false} song_details={true}/>
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default PostPage
