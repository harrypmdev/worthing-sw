import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'

import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import Song from './Song';
import Vote from './Vote';

const Post = ({post, link=true, songDetails=false, useAvatar=true, editable=false}) => {
  const [song, setSong] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/songs/${post.song}/`);
        setHasLoaded(true);
        setSong(data);
      } catch (err) {
        console.log(err);
      }
    }
    setHasLoaded(false);
    if (post.song) {
      fetchPosts();
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
                <Col xs='auto'>
                <Vote post={post} />
                </Col>
                {useAvatar && (
                  <Col className='d-none d-lg-inline flex-shrink-0 flex-grow-0'>
                    <Avatar 
                      src={post.user_image} 
                      text={post.user}
                      height='30'
                      color='secondary'
                      to={`/profile/${post.profile_id}`}
                    />
                  </Col>  
                )}

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
                ) : null}
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
