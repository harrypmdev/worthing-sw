import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Avatar from '../../components/Avatar'

const Comment = ({content, user, profile_image, profile_id, created_at, updated_at}) => {
  return (
    <Card className={`bg-light mt-2`}>
      <Card.Body>
        <Row>
          <Col xs={12} className='d-flex align-items-center'>
            <Avatar
              image={profile_image}
              id={profile_id}
              username={user}
              dimensions={30}
            />
            <span className='ms-2 fst-italic'>
              {created_at}{(created_at != updated_at) && ` (updated ${updated_at})`}
            </span>
          </Col>
          <Col>
            <p className='mt-2'>{content}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Comment
