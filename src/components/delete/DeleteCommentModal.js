import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';

/**
 * Render a delete modal which shows conditionally dependant on the showModal prop.
 * Separate to 'DeleteModal' as handles the unique functionality demanded by the Comment
 * component to allow dynamic re-rendering of the page comments upon comment deletion.
 * 
 * @param {number} id The id of the comment that should be deleted if the user confirms deletion.
 * 
 * @param {boolean} showModal A boolean that determines when the modal should show.
 * 
 * @param {Function} setShowModal The setter function for the modal screen. Should be the
 *                                same setter function passed to 'DeleteButton' if the
 *                                components are being used together.
 * 
 * @param {boolean} buttonLoading Whether the page buttons are currently loading.
 * 
 * @param {Function} setButtonLoading The setter for button loading.
 * 
 * @param {Function} setComments The setter for the comments list of the post page so it can be dynamically
 *                               re-rendered upon comment deletion.
 * 
 * @returns {ReactNode} - An element that conditionally displays a delete comment modal.
 */
const DeleteModal = (props) => {
  const {
    id,
    showModal, 
    setShowModal, 
    buttonLoading,
    setButtonLoading,
    setComments,
  } = props;

  /**
   * Handle deletion of the current comment.
   * Updates the parents comments list as to dynamically render the deletion.
   * Sets 'buttonLoading' to true for duration of deletion process.
   */
  const handleDelete = async () => {
    if (buttonLoading) return;
    try {
      setButtonLoading(true);
      await axiosRes.delete(`/comments/${id}/`)
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id)
      }))
      toast.success('Comment deleted!', {position: 'bottom-left'});
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error(
        'We encountered a problem deleting your comment. Sorry!', 
        {position: 'bottom-left'}
      );
    } finally {
      setButtonLoading(false);
    }
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this comment? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={() => setShowModal(false)}
          disabled={buttonLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="danger" 
          disabled={buttonLoading}
          onClick={buttonLoading ? null : handleDelete}
        >
          {buttonLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
