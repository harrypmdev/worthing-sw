import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { axiosReq } from '../../api/axiosDefaults';

/**
 * Render a delete modal which shows conditionally dependant on the showModal prop.
 * Separate to 'DeleteModal' as handles the unique functionality demanded by the VenuesList
 * component to allow dynamic re-rendering upon venue deletion.
 * 
 * @param {Object} userVenueToDelete The UserVenue to be deleted, as retrieved from the '/user_venues'
 *                                   endpoint.
 * 
 * @param {Function} setVenueOptions The setter function for 'venueOptions', the options that can be 
 *                                   selected when the user picks a new venue to add.
 * 
 * @param {Function} setFavouriteVenues The setter function for 'favouriteVenues', the list of
 *                                      venues to be rendered in the parent component.
 * 
 * @param {boolean} showModal A boolean that determines when the modal should show.
 * 
 * @param {Function} setShowModal The setter function for the modal screen. Should be the
 *                                same setter function passed to 'DeleteButton' if the
 *                                components are being used together.
 * 
 * @param {Function} setInputLoading The setter function for 'inputLoading', the loading state for
 *                                   new venue inputs.
 * 
 * @param {boolean} deleteLoading Whether or not a deletion is currently processing.
 * 
 * @param {Function} setDeleteLoading The setter function for deleteLoading.
 * 
 * @returns {ReactNode} - An element that conditionally displays a delete modal for venues.
 */
const DeleteVenueModal = (props) => {
  const {
    userVenueToDelete,
    setVenueOptions,
    setFavouriteVenues,
    showModal,
    setShowModal,
    setInputLoading,
    deleteLoading,
    setDeleteLoading,
  } = props;

  /**
   * Handle deletion of the UserVenue.
   * Sets loading states to true for the duration of the process.
   */
  const handleDelete = async () => {
    setDeleteLoading(true);
    setInputLoading(true);
    try {
      await axiosReq.delete(`/user_venues/${userVenueToDelete.id}`);
      setFavouriteVenues(prev => 
        prev.filter(venue => venue.name !== userVenueToDelete.name)
      );
      setVenueOptions(prev => [...prev, {
        'id': userVenueToDelete.venue,
        'name': userVenueToDelete.name,
        'user_count': userVenueToDelete.user_count,
      }]);
      toast.success(`Venue deleted!`, {position: 'bottom-left'});
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(
        `We encountered a problem deleting your venue. Sorry!`,
         {position: 'bottom-left'}
      );
    } finally {
      setDeleteLoading(false);
      setInputLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this venue?
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

export default DeleteVenueModal
