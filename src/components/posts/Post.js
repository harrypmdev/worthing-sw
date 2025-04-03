import React, { useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import Avatar from '../profile/Avatar';
import Song from '../songs/Song';
import Vote from '../Vote';
import Follow from '../Follow';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import useFetchSong from '../../hooks/useFetchSong';


/**
 * Render a post, displaying its title, contents, poster and if applicable attached song.
 * 
 * @param {Object} post An object containing post details as retrieved from the '/posts' endpoint.
 * 
 * @param {boolean} [link=true] Whether the post should function as a link to a separate post page.
 * 
 * @param {boolean} [songDetails=false] Whether song details should be shown for the attached song (true), 
 *                              or only the audio player (false).
 * 
 * @param {boolean} [useAvatar=true] Whether a profile avatar should appear on the post if the
 *                                   screen is large enough.
 * 
 * @param {boolean} [editable=false] Whether the post should be editable if it belongs to the current user.
 * 
 * @param {boolean} [followButton=false] Whether a follow button should appear if the post does not
 *                                       belong to the current user.
 * 
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
  const [songData, setSongData] = useState('');
  const currentUser = useCurrentUser();
  const hasLoaded = useFetchSong({setSongData, id: post.song});

  const avatarAndFollow = <>
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
  </>

  return <>
    <Card className={`bg-light mt-2  ${post.is_user && editable && 'rounded-bottom-0 border-bottom-0'}`}>
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
              <Col className='d-none d-md-flex align-items-center justify-content-center flex-shrink-0 flex-grow-0'>
                {avatarAndFollow}
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
              {useAvatar && (
                <Col className='d-flex d-md-none align-items-center justify-content-end flex-shrink-0 flex-grow-0'>
                  {avatarAndFollow}
                </Col>
              )}
            </Col>
            <Col xs='12' lg='4' className='mt-3'>
              {post.song && hasLoaded ? (
                <Song song={songData} includeDetails={songDetails}/>
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
      {/* <div className={`${songDetails && 'd-lg-none mt-2'}`}>
    {post.song && hasLoaded && songDetails ? (
        <Song song={songData} includeDetails={songDetails}/>
      ) : post.song && !hasLoaded && songDetails? (
        <div className='d-flex justify-content-center'>
          <Spinner />
        </div>
        ) : null
    }
    </div> */}
    </Card>
    { post.is_user && editable && (
      <Link
        to={`/edit-post/${post.id}`}
        className='btn btn-warning w-100 rounded-top-0 text-center mb-3'>
        Edit&ensp;
        <i className="fa-solid fa-pen-to-square"></i>
      </Link>
    )}
  </>
}

export default Post
