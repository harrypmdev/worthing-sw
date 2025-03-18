import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import { Container } from 'react-bootstrap';

const PostPage = () => {
  const {id} = useParams();
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
        } catch(err){
            console.log(err)
        }
    }
    fetchPost();
  }, [id])

  return (
    <Container>
      <Post post={post}/>
    </Container>
  )
}

export default PostPage
