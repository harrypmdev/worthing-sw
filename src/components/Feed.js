import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/posts/`);
        setHasLoaded(true);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    }

    setHasLoaded(false);
    fetchPosts();
  }, []);

  return (
    <Container>
      { posts.results.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </Container>
  )
}

export default Feed
