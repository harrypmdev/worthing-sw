import React from 'react'
import { Button } from 'react-bootstrap'


const DeleteButton = ({text, disabled, setShowModal}) => {
  return (
    <Button
    variant="danger"
    className="w-100 mt-1"
    onClick={() => setShowModal(true)} // Open the modal
    disabled={disabled}
  >
    Delete {text}
  </Button>
  )
}

export default DeleteButton
