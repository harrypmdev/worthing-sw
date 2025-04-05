import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axiosReq } from '../../api/axiosDefaults';

/**
 * Render a delete modal which shows conditionally dependant on the showModal prop.
 * Primarily for use alongside the 'DeleteButton' component.
 * 
 * @param {boolean} showModal A boolean that determines when the modal should show.
 * 
 * @param {Function} setShowModal The setter function for the modal screen. Should be the
 *                                same setter function passed to 'DeleteButton' if the
 *                                components are being used together.
 * 
 * @param {string} text A string describing what is being deleted.
 * 
 * @param {string} deleteEndpoint The backend endpoint that the DELETE request should be
 *                                sent to - e.g `/posts/1/`.
 * 
 * @param {string} [navigateAfterDelete=null] The URL route the app should navigate to after the
 *                                     deletion has finished.
 * 
 * @returns {ReactNode} - An element that conditionally displays a delete modal.
 */
const DeleteModal = (props) => {
  const {
    showModal, 
    setShowModal, 
    text,
    deleteEndpoint,
    navigateAfterDelete=null
  } = props;

  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  /**
   * Handle deletion using the 'deleteEndpoint' prop provided.
   * Redirects to 'navigateAfterDelete' URL route after deletion.
   * Sets 'deleteLoading' to true for duration of deletion.
   */
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosReq.delete(deleteEndpoint);
      if (navigateAfterDelete) navigate(navigateAfterDelete);
      let capitalised = text.charAt(0).toUpperCase() + text.slice(1);
      toast.success(`${capitalised} deleted!`, {position: 'bottom-left'});
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error(
        `We encountered a problem deleting your ${text}. Sorry!`,
         {position: 'bottom-left'}
      );
      setDeleteLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this {text}? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant='secondary'
          onClick={() => setShowModal(false)}
          disabled={deleteLoading}
        >
          Cancel
        </Button>
        <Button 
          variant='danger'
          disabled={deleteLoading}
          onClick={deleteLoading ? null : handleDelete}
        >
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
