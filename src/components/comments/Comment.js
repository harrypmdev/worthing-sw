import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

import Avatar from '../Avatar'
import { axiosRes } from '../../api/axiosDefaults';
import EditComment from './EditComment';


const Comment = (props) => {
  const {
    id,
    content,
    user, 
    profile_image, 
    profile_id, 
    created_at, 
    updated_at,
    is_user,
    setComments} = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  
  const handleDelete = async () => {
    if (buttonLoading) return;
    try {
      setButtonLoading(true);
      await axiosRes.delete(`/comments/${id}/`)
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id)
      }))
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  }

  return showEdit ? ( 
    <EditComment 
      id={id}
      profile_id={profile_id}
      username={user}
      content={content}
      profileImage={profile_image}
      setComments={setComments}
      setShowEdit={setShowEdit}
    />
  ) : (
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
            {created_at}{(created_at !== updated_at) && ` (updated ${updated_at})`}
          </span>
          { is_user && <div className='ms-auto'>
            <Button 
              variant='warning' 
              className='py-1 px-2 mx-1'
              disabled={buttonLoading}
              onClick={setShowEdit}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button 
              variant='danger' 
              className='py-1 px-2 mx-1'
              disabled={buttonLoading}
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
            </div>}
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
