import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'

import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import Song from './Song';
import Vote from './Vote';
import Follow from './Follow';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * Render a post, displaying its title, contents, poster and attached song if applicable.
 * 
 * @param {Object} post An object containing post details as retrieved from the '/posts' endpoint.
 * @param {boolean} [link=true] Whether the post should function as a link to a separate post page.
 * @param {boolean} [songDetails=false] Whether song details should be shown for the attached song (true), 
 *                              or only the audio player (false).
 * @param {boolean} [useAvatar=true] Whether a profile avatar should appear on the post if the
 *                                   screen is large enough.
 * @param {boolean} [editable=false] Whether the post should be editable if it belongs to the current user.
 * @param {boolean} [followButton=false] Whether a follow button should appear if the post does not
 *                                       belong to the current user.
 * @returns {ReactNode} - An element displaying the details of a post as returned from the '/posts' endpoint.
 */
const Post = (props) => {
  const {
    post,
    link=true, 
    songDetails=false, 
    useAvatar=true, 
    editable=false, 
    followButton=false 
    } = props;
  const [song, setSong] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  /**
   * Fetch a song from the server if the post has a song attached.
   * Sets the 'song' state with the API response data and sets a
   * loading state until the API call is finished.
   */
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const {data} = await axiosReq.get(`/songs/${post.song}/`);
        setHasLoaded(true);
        setSong(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (post.song) {
      fetchSongs();
    }
  }, [post.song]);

  return (
    <Row>
      <Card className={`bg-light me-2 mt-2  ${post.is_user && editable && 'rounded-bottom-0 border-bottom-0'}`}>
        <Card.Body>
          <Col>
            <Row className='align-items-center'>
              <Col>
                {link ? (<>
                  <Link to={`/posts/${post.id}`} className='text-decoration-none text-dark'>
                    <h2 className='h4'>{post.title}</h2>
                  </Link> 
                </>) : (<>
                  <span>
                    <h2 className='h4'>{post.title}</h2>
                  </span> 
                </>)}
              </Col>
              {useAvatar && (
                <Col className='d-flex align-items-center justify-content-center flex-shrink-0 flex-grow-0'>
                  {followButton && !post.is_user && currentUser && 
                    <Follow
                      currentFollower={post.following_id}
                      userToFollow={post.user_id}
                    />
                  }
                  <Avatar
                    image={post.user_image} 
                    username={post.user}
                    id={post.profile_id}
                    dimensions={30}
                  />
                </Col>
              )}
              <Col xs="auto" className="ms-auto">
                <Vote post={post} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col lg='8'>
                {link ? (<>
                  <Link to={`/posts/${post.id}`} className='text-decoration-none text-dark'>
                    <p>{post.content}</p>
                  </Link> 
                </>) : (<>
                  <span>
                    <p>{post.content}</p>
                  </span> 
                </>)}
                { useAvatar && (
                <p className='text-info fst-italic d-lg-none'>
                  by {post.user}
                </p>
                )}
              </Col>
              <Col lg='4' className='d-none d-lg-inline'>
                {post.song && hasLoaded ? (
                  <Song song={song} includeDetails={songDetails}/>
                ) : post.song && !hasLoaded ? (
                  <div className='d-flex justify-content-center'>
                    <Spinner />
                  </div>
                  ) : null
                }
              </Col>
            </Row>
          </Col>
        </Card.Body>
      </Card>
      { post.is_user && editable && (
              <Link
                to={`/edit-post/${post.id}`}
                className='btn btn-warning w-100 rounded-top-0 text-center mb-3'>
                Edit&ensp;
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
      )}
    </Row>
  )
}

export default Post
