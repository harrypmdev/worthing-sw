import React from 'react'
import { Card } from 'react-bootstrap'
import Avatar from '../../components/Avatar'

const Comment = ({content, user}) => {
  return (
    <Card className={`bg-light mt-2`}>
      <Card.Body>
        <Avatar
          username={user}
          dimensions={30}
        />
        <span className='ms-2'>{content}</span>
      </Card.Body>
    </Card>
  )
}

export default Comment
