import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const Post = ({post, link = true}) => {
  return (
    <Row>
      <Card className='bg-light m-2'>
        <Card.Body>
          <Col>
            <Row>
                <Col md='10' className='d-flex align-items-center'>
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
                <Col md='2' className='d-none d-lg-inline'>
                  <Avatar 
                    src={post.user_image} 
                    text={post.user}
                    height='30'
                    color='secondary'
                  />
                </Col>  
            </Row>
            <hr />
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
        </Card.Body>
      </Card>
    </Row>
  )
}

export default Post
