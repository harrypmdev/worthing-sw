import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Post = ({post}) => {
  return (
    <Row>
      <Col className='p-3 m-3 bg-light'>
        <h2 className='h4'>{post.title}</h2>
        <hr />
        <p>{post.content}</p>
        <p className='text-info fst-italic'>by {post.user}</p>
      </Col>
    </Row>
  )
}

export default Post
