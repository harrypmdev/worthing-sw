import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'

import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import Song from './Song';

const Post = ({post, link=true, song_details=false}) => {
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
  }, []);

  return (
    <Row>
      <Card className='bg-light m-2'>
        <Card.Body>
          <Col>
            <Row>
                <Col lg='10' className='d-flex align-items-center'>
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
                <Col lg='2' className='d-none d-lg-inline'>
                  <Avatar 
                    src={post.user_image} 
                    text={post.user}
                    height='30'
                    color='secondary'
                  />
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
                <p className='text-info fst-italic d-lg-none'>
                  by {post.user}
                </p>
              </Col>
              <Col lg='4' className='d-none d-lg-inline'>
                {post.song && hasLoaded ? (
                  <Song song={song} include_details={song_details}/>
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
    </Row>
  )
}

export default Post
