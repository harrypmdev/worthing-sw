import React from 'react'
import { Button, Card } from 'react-bootstrap'

/**
 * Render a venue.
 * 
 * @param {Object} venue An object containing venue details as retrieved from the '/venues' endpoint.
 * 
 * @param {Function} setShowModal The setter function for the delete venue modal.
 * 
 * @param {Function} setUserVenueToDelete The setter function for the userVenueToDelete state, so the modal
 *                                        window will know which venue to delete if confirmed.
 * 
 * @param {boolean} inputLoading Whether or not the venue list is currently in a loading state.
 * 
 * @param {boolean} [editable=false] Whether or not this venue should be editable.
 * 
 * @returns {ReactNode} - An element displaying the details of a venue as returned from the '/venue' endpoint.
 */
const Venue = (props) => {
  const { 
    venue, 
    setShowModal, 
    setUserVenueToDelete, 
    inputLoading,
    editable=false, 
  } = props;

  /**
   * Handle the clicking of the delete button.
   * Opens the delete confirmation modal window, sets the venue to be deleted to this venue.
   */
  const handleDeleteButton = () => {
    setShowModal(true)
    setUserVenueToDelete(venue)
  }

  return (<>
    <Card className={!editable && 'mb-3'}>
      <Card.Body className={editable && 'rounded-bottom-0'}>
        <Card.Title>{venue.name}</Card.Title>
        <Card.Text>
          {venue.user_count} Regular{venue.user_count > 1 && 's'}
        </Card.Text>
      </Card.Body>
    </Card>
    <Button 
      variant='danger' 
      className={editable ? 'rounded-top-0 mb-3' : 'd-none'}
      onClick={handleDeleteButton}
      disabled={inputLoading}
    >
      Delete
    </Button>
  </>)
}

export default Venue
