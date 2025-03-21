import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Post from './Post';
import FullPageSpinner from './FullPageSpinner';

const Feed = ({user_id=null, limit=10}) => {
  const [posts, setPosts] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let filter = user_id ? `?user=${user_id}` : ''
        const {data} = await axiosReq.get(`/posts/${filter}`);
        setHasLoaded(true);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    }

    setHasLoaded(false);
    fetchPosts();
  }, [user_id]);

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
        { posts.results.slice(0, limit).map((post) => (
          <Post post={post} key={post.id}/>
        ))}
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default Feed
