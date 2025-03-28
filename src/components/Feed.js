import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Post from './Post';
import FullPageSpinner from './FullPageSpinner';

const Feed = ({profile=null, limit=10, trailingText='No more posts.', useAvatars=true, editable=false}) => {
  const [posts, setPosts] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setHasLoaded(false);
      try {
        let filter = profile ? `?user=${profile?.id}` : '';
        const { data } = await axiosReq.get(`/posts/${filter}`);
        setPosts(data);
        setHasLoaded(profile != null);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchPosts();
  }, [profile]);


  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
        { posts.results.slice(0, limit).map((post) => (
          <Post useAvatar={useAvatars} post={post} key={post.id} editable={editable}/>
        ))}
        <div className='text-center my-3 fst-italic'>
          {posts.results.length ? trailingText : `No posts from ${profile.user} yet.`}
        </div>        
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default Feed
