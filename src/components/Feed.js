import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Post from './Post';
import FullPageSpinner from './FullPageSpinner';

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
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
        { posts.results.map((post) => (
          <Post post={post} key={post.id}/>
        ))}
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default Feed
