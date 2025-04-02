import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Post from '../../components/posts/Post';
import CreateComment from '../../components/comments/CreateComment';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import infiniteScrollStyles from '../../styles/InfiniteScrollStyles.module.css';
import Comment from '../../components/comments/Comment';
import { fetchMoreData } from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetchPostData from '../../hooks/useFetchPostData';
import ComponentSpinner from '../../components/spinner/ComponentSpinner';

/**
 * Render the Post page, which displays a single post in more detail than
 * the feed pages provide.
 * Displays the posts song (if applicable) which more detail, and all comments
 * on the post with a form to add a comment.
 * 
 * @returns {ReactNode} - An element displaying the full post page.
 */
const PostPage = () => {
  const {id} = useParams();
  const currentUser = useCurrentUser();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState({results: []});
  const hasLoaded = useFetchPostData({id, setPost, setComments});

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
          <Post post={post} link={false} songDetails followButton={true} />
          <hr />
          {currentUser ? (
          <CreateComment post={id} setComments={setComments}/>
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children=
                {comments.results.map(comment => 
                  <Comment 
                    key={comment.id}
                    {...comment}
                    setComments={setComments}
                  />
                )}
                className={infiniteScrollStyles.scroller}
                dataLength={comments.results.length}
                loader={<ComponentSpinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
                scrollThreshold={0.93}
            />
          ) : currentUser ? (
            <span className='mt-4 ms-1'>No comments yet - why not be the first?</span>
          ) : (
            <span className='mt-4 ms-1'>No comments yet. Log in to write the first.</span>
          )}
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default PostPage
