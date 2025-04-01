import React, { useState } from 'react'
import { Container, Form} from 'react-bootstrap';

import Post from './Post';
import styles from '../styles/Search.module.css';
import infiniteScrollStyles from '../styles/InfiniteScrollStyles.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../utils/utils';
import Asset from './spinner/Asset';
import useFetchDetailedPostList from '../hooks/useFetchPostsFilteringDetailed';

/**
 * Render a feed of posts.
 * 
 * @param {number} [filterByOwnershipId=null] A user id to filter posts by - returns only posts owned by this user.
 * @param {number} [filterByFollowingId=null] A user id to filter posts by - returns only posts from users 
 *                                            the given user follows.
 * @param {boolean} [useAvatars=true] Whether profile avatars should appear on posts if the screen is large enough.
 * @param {boolean} [editable=false] Whether posts belonging to the user should be editable.
 * @param {boolean} [followButtons=false] Whether follow buttons should appear on posts other than the user's.
 * @returns {ReactNode} An element containing a feed of post components.
 */
const Feed = (props) => {
  const {
    filterByOwnershipId=null,
    filterByFollowingId=null,
    useAvatars=true, 
    editable=false, 
    followButtons=false,
  } = props;

  const [posts, setPosts] = useState({results: []});
  const [searchQuery, setSearchQuery] = useState('');
  const hasLoaded = useFetchDetailedPostList({
    setPosts, filterByOwnershipId, filterByFollowingId, searchQuery
  });

  return (
    <Container id='page' className='flex-grow-1 d-flex flex-column mb-3'>
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
        <InfiniteScroll 
          children=
            {posts.results.map((post) => (
              <Post
                useAvatar={useAvatars}
                post={post}
                key={post.id}
                editable={editable}
                followButton={followButtons}
              />
            ))}
            className={infiniteScrollStyles.scroller}
            dataLength={posts.results.length}
            loader={<Asset spinner/>}
            hasMore={!!posts.next}
            next={() => fetchMoreData(posts, setPosts)}
            scrollThreshold={0.93}
        />
      </>) : (<>
        <Asset spinner />
      </>)}
    </Container>
  )
}

export default Feed
