import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';

import Post from './Post';
import FullPageSpinner from './FullPageSpinner';
import styles from '../styles/Search.module.css';

/**
 * Render a feed of posts.
 * 
 * @param {number} [filterByOwnershipId=null] A user id to filter posts by - returns only posts owned by this user.
 * @param {number} [filterByFollowingId=null] A user id to filter posts by - returns only posts from users 
 *                                            the given user follows.
 * @param {number} [limit=10] The maximum number of posts the feed should return.
 * @param {boolean} [useAvatars=true] Whether profile avatars should appear on posts if the screen is large enough.
 * @param {boolean} [editable=false] Whether posts belonging to the user should be editable.
 * @param {boolean} [followButtons=false] Whether follow buttons should appear on posts other than the user's.
 * @returns {ReactNode} An element containing a feed of post components.
 */
const Feed = (props) => {
  const {
    filterByOwnershipId=null,
    filterByFollowingId=null,
    limit=10,
    useAvatars=true, 
    editable=false, 
    followButtons=false,
  } = props;

  const [posts, setPosts] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (filterByFollowingId && filterByOwnershipId) {
    throw new Error('Props conflict: filter by ownership and filter by id cannot be used together.');
  }

  /**
   * Fetch posts, using the filters provided by props if given.
   * Updates the 'posts' state and toggles the loading spinner once fetched.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      setHasLoaded(false);
      try {
        let userFilter = filterByOwnershipId ? `user=${filterByOwnershipId}` : '';
        let followingFilter = filterByFollowingId ? `user__followed__user=${filterByFollowingId}` : '';
        let search = searchQuery ? `&search=${searchQuery}` : '';
        const { data: posts } = await axiosReq.get(`/posts/?${userFilter}&${followingFilter}${search}`);
        setPosts(posts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filterByOwnershipId, filterByFollowingId, searchQuery]);

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      <i className={`fas fa-search mt-3 ${styles.SearchIcon}`}></i>
      <Form
        className={styles.SearchBar}
        onSubmit={event => event.preventDefault()}
      >
        <Form.Control
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          type='text'
          className='mr-sm-2 mt-3'
          placeholder='Search posts'
        />
      </Form>
      { hasLoaded ? (<>
        { posts.results.slice(0, limit).map((post) => (
          <Post
            useAvatar={useAvatars}
            post={post}
            key={post.id}
            editable={editable}
            followButton={followButtons}
          />
        ))}
        <div className='text-center my-3 fst-italic'>
          {posts.results.length ? 'No more posts.' : 'No posts yet.'}
        </div>        
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default Feed
