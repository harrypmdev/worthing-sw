import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { Container } from 'react-bootstrap';

import Post from '../../components/Post';
import CreateComment from '../../components/comments/CreateComment';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import infiniteScrollStyles from '../../styles/InfiniteScrollStyles.module.css';
import Comment from '../../components/comments/Comment';
import { fetchMoreData } from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/spinner/Asset';

const PostPage = () => {
  const {id} = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [post, setPost] = useState({});

  const currentUser = useCurrentUser();
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
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }
    setHasLoaded(false);
    fetchPost();
  }, [id])

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { hasLoaded ? (<>
          <Post post={post} link={false} songDetails followButton={true} />
          <hr />
          {currentUser ? (
          <CreateComment
            profileId={currentUser.profile_id}
            profileImage={currentUser.profile_image}
            username={currentUser.username}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />
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
                loader={<Asset spinner/>}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
                scrollThreshold={0.93}
            />
          ) : currentUser ? (
            <span className='mt-2'>No comments yet - why not be the first?</span>
          ) : (
            <span className='mt-2'>No comments yet. Log in to write the first.</span>
          )}
      </>) : (<>
        <FullPageSpinner />
      </>)}
    </Container>
  )
}

export default PostPage
