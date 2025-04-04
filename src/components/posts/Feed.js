import React, { useState } from 'react'
import { Container, Form} from 'react-bootstrap';

import Post from './Post';
import styles from '../../styles/Search.module.css';
import infiniteScrollStyles from '../../styles/InfiniteScrollStyles.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import useFetchDetailedPostList from '../../hooks/useFetchDetailedPostList';
import ComponentSpinner from '../spinner/ComponentSpinner';

/**
 * Render a feed of posts.
 * 
 * @param {number} [filterByOwnershipId=null] A user id to filter posts by - returns only posts owned by this user.
 * 
 * @param {number} [filterByFollowingId=null] A user id to filter posts by - returns only posts from users 
 *                                            the given user follows.
 * 
 * @param {boolean} [useAvatars=true] Whether profile avatars should appear on posts if the screen is large enough.
 * 
 * @param {boolean} [editable=false] Whether posts belonging to the user should be editable.
 * 
 * @param {boolean} [followButtons=false] Whether follow buttons should appear on posts other than the user's.
 * 
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
  const [orderBy, setOrderBy] = useState('');
  const hasLoaded = useFetchDetailedPostList({
    setPosts, filterByOwnershipId, filterByFollowingId, searchQuery, orderBy
  });

  return (
    <Container className='flex-grow-1 d-flex flex-column mb-3'>
      <i className={`fas fa-search mt-3 ${styles.SearchIcon}`}></i>
      <Form
        id='search-bar'
        className={styles.SearchBar}
        onSubmit={event => event.preventDefault()}
      >
        <Form.Control
          name='search-bar'
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          type='text'
          className='mr-sm-2 mt-3'
          placeholder='Search posts'
        />
        <div className='d-flex align-items-center flex-no-wrap mt-1 mb-2'>
          <Form.Label id="order-by" htmlFor='order-by-input' className='flex-shrink-0 pe-2 pt-2'>
            Order By:
          </Form.Label>
          <Form.Control 
            aria-labelledby="order-by"
            id='order-by-input'
            as='select'
            onChange={event => setOrderBy(event.target.value)}
          >
            <option value='&ordering=-created_at'>
              Newest First
            </option>
            <option value='&ordering=created_at'>
              Oldest First
            </option>
            <option value='&ordering=-net_votes'>
              Net Votes (Highest First)
            </option>
            <option value='&ordering=net_votes'>
              Net Votes (Lowest First)
            </option>
          </Form.Control>
        </div>
      </Form>

      { hasLoaded ? (
        posts.results.length ? (
          <InfiniteScroll 
            className={infiniteScrollStyles.scroller}
            dataLength={posts.results.length}
            loader={<ComponentSpinner />}
            hasMore={!!posts.next}
            next={() => fetchMoreData(posts, setPosts)}
            scrollThreshold={0.93}
          >
            {posts.results.map((post) => (
              <Post
                useAvatar={useAvatars}
                post={post}
                key={post.id}
                editable={editable}
                followButton={followButtons}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <div className='text-center'>
            <p className='mt-3'>No posts! <i className="fa-solid fa-heart-crack"></i></p>
          </div>
          )
      ) : (<>
        <ComponentSpinner />
      </>)}
    </Container>
  )
}

export default Feed
