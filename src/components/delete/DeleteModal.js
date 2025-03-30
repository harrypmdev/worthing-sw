import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';


const DeleteModal = (props) => {
  const {
    showModal, 
    setShowModal, 
    text,
    deleteEndpoint,
    navigateAfterDelete
  } = props;

  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosReq.delete(deleteEndpoint);
      navigate(navigateAfterDelete);
    } catch (err) {
      console.log(err);
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
          variant="secondary" 
          onClick={() => setShowModal(false)}
          disabled={deleteLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="danger" 
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
