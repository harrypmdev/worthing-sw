import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Post from './Post';
import FullPageSpinner from './FullPageSpinner';

const Feed = (props) => {
  const {
    profile=null, 
    limit=10, 
    trailingText='No more posts.', 
    useAvatars=true, 
    editable=false, 
    followButtons=false,
    filter=false,
  } = props;
  const [posts, setPosts] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setHasLoaded(false);
      try {
        let dataToSet;
        if (filter) {
          const { data } = await axiosReq.get(`/posts/${filter}`);
          dataToSet = data;
        } else if (profile) {
          const { data } = await axiosReq.get(`/posts/?user=${profile?.id}`);
          dataToSet = data;
        } else {
          const { data } = await axiosReq.get('/posts/');
          dataToSet = data;
        }
        setPosts(dataToSet);
        setHasLoaded(profile != null);
      } catch (err) {
        console.log(err);
      }
    };

    if (typeof filter === 'undefined' || filter === '') return;
    fetchPosts();
  }, [profile, filter]);


  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
        { posts.results.slice(0, limit).map((post) => (
          <Post useAvatar={useAvatars} post={post} key={post.id} editable={editable} followButton={followButtons}/>
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
