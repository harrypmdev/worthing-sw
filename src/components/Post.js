import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Avatar from './Avatar';

const Post = ({post}) => {
  return (
    <Row>
      <Col className='p-3 m-3 bg-light'>
        <Row>
          <Col md='10' className='d-flex align-items-center'>
            <h2 className='h4'>{post.title}</h2>
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
        <p>{post.content}</p>
        <p className='text-info fst-italic d-lg-none'>
          by {post.user}
        </p>
      </Col>
    </Row>
  )
}

export default Post
