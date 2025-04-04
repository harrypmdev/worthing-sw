import React from 'react'
import { Button } from 'react-bootstrap'

/**
 * Render a delete button which triggers a confirmation modal.
 * Primarily for use alongside the 'DeleteModal' component.
 * 
 * @param {string} text A string describing what is being deleted.
 * 
 * @param {Function} setShowModal The setter function for the modal screen - will be set to
 *                                'true' when the button is pressed. A custom modal screen can
 *                                be designed or the 'DeleteModal' component can be used.
 * 
 * @param {boolean} [disabled=false] When the button should be disabled. If a loading state
 *                                   is utilised in the parent component during deletion, this
 *                                   can be provided to prevent multiple button presses.
 * 
 * @returns {ReactNode} - An element displaying a delete button.
 */
const DeleteButton = ({text, setShowModal, disabled}) => {
  return (
    <Button
    variant='danger'
    className='w-100 mt-1'
    onClick={() => setShowModal(true)} // Open the modal
    disabled={disabled}
  >
    Delete {text}
  </Button>
  )
}

export default DeleteButton
