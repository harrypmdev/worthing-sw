import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

import Avatar from '../profile/Avatar'
import DeleteCommentModal from '../delete/DeleteCommentModal';
import EditComment from './EditComment';

/**
 * Render a comment, displaying a profile avatar for its poster, the comment contents 
 * and when the comment was posted (with the last updated time also if applicable).
 * Props in snake case for easy destructuring of the comment object returned from the
 * backend.
 * 
 * @param {number} id The id for the comment to be rendered.

 * @param {string} content The content of the comment.
 * 
 * @param {string} user The username of the user that posted the comment.
 * 
 * @param {string} profile_image The URL of the profile image for the user that posted
 *                               the comment.
 * 
 * @param {number} profile_id The id of the profile of the user that posted the comment.
 * 
 * @param {string} created_at A string describing the date/time the comment was posted.
 * 
 * @param {string} updated_at A string describing the date/time the comment was last updated.
 * 
 * @param {boolean} is_user Whether or not the comment was posted by the current user.
 * 
 * @param {Function} setComments the setter function for the list of comments in the parent
 *                               page so the page to be dynamically altered when comments 
 *                               are deleted.
 * 
 * @returns {ReactNode} - An element displaying the details of a comment.
 */
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
    setComments
  } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  
  /**
   * Handle deletion of the current comment.
   * Updates the parents comments list as to dynamically render the
   * deletion.
   */
  // const handleDelete = async () => {
  //   if (buttonLoading) return;
  //   try {
  //     setButtonLoading(true);
  //     await axiosRes.delete(`/comments/${id}/`)
  //     setComments(prevComments => ({
  //       ...prevComments,
  //       results: prevComments.results.filter(comment => comment.id !== id)
  //     }))
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setButtonLoading(false);
  //   }
  // }

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
  ) : (<>
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
              onClick={() => {setShowModal(true)}}
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
  <DeleteCommentModal
    id={id}
    showModal={showModal}
    setShowModal={setShowModal}
    buttonLoading={buttonLoading}
    setButtonLoading={setButtonLoading}
    setComments={setComments}
  />
  </>)
}

export default Comment
