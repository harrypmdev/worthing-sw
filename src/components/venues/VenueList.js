import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import { toast } from 'react-toastify';

import { axiosReq } from '../../api/axiosDefaults';
import Venue from './Venue'
import useFetchVenues from '../../hooks/useFetchVenues';
import ComponentSpinner from '../spinner/ComponentSpinner';
import DeleteVenueModal from '../delete/DeleteVenueModal';

/**
 * Render a list of venues with a button to add venues if editable.
 * 
 * @param {number} id The id of the user these venues should render for.
 * 
 * @param {boolean} [editable=false] Whether or not this venue list should be editable.
 * 
 * @returns {ReactNode} - An element displaying a list of venues belonging to a particular user. 
 */
const VenueList = ({id, editable=false}) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [venueOptions, setVenueOptions] = useState([]);
  const [favouriteVenues, setFavouriteVenues] = useState([]);

  const [inputLoading, setInputLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userVenueToDelete, setUserVenueToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pageHasLoaded = useFetchVenues(
    {id: id, setVenueOptions, setFavouriteVenues}
  );

  /**
   * Handle the clicking of the 'add venue' button.
   * POSTs a new UserVenue to the back-end for this user.
   * Remove the venue option from the selector.
   * Adds the venue option to 'favouriteVenues' so it is immediately rendered.
   * Sets a loading state for duration of process to prevent input conflicts.
   */
  const handleAddVenue = async () => {
    if (!selectedVenue) return;
    setInputLoading(true);
    try {
        const {data: newVenue} = await axiosReq.post('/user_venues/', {
        user: id,
        venue: selectedVenue,
      });
      setVenueOptions(prev => 
        prev.filter(venue => venue.name !== newVenue.name)
      );
      setFavouriteVenues(prev => [newVenue, ...prev]);
      toast.success('Venue added!', {position: 'bottom-left'});
      setInputLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        'We encountered an issue adding this venue. Sorry!', 
        {position: 'bottom-left'}
      );
      setInputLoading(false);
    }
  }

  return (<>
    { pageHasLoaded ? (
      <Container className='flex-grow-1 d-flex flex-column text-center mb-4'>
        { (favouriteVenues?.length > 0 || editable) && <h2 className='h5 mb-2'>Favourite Venues</h2>}
        { editable && venueOptions?.length > 0 && (<>
        <Form.Select 
          name='venue-selector'
          aria-label='Venue Selector' 
          className='rounded-bottom-0'
          value={selectedVenue}
          onChange={event => setSelectedVenue(event.target.value)}
          disabled={inputLoading}
        >
          <option>Add a favoured venue</option>
          { venueOptions?.map(venue => (
            <option key={venue.id} value={venue.id}>
              {venue.name}
            </option>
          ))}
        </Form.Select>
        <Button 
          variant='primary'
          className='mb-3 w-100 rounded-top-0'
          onClick={handleAddVenue}
          disabled={inputLoading}
        >
          {inputLoading && !deleteLoading ? 'Adding...' : 'Add Venue'}
        </Button>

        </>)}
        { favouriteVenues?.map(venue => (
          <Venue
            key={venue.name}
            setUserVenueToDelete={setUserVenueToDelete}
            venue={venue}
            editable={editable}
            setShowModal={setShowModal}
            inputLoading={inputLoading}
          />
        ))}
      </Container>
    ) : (
      <ComponentSpinner />
    )}
    <DeleteVenueModal
      showModal={showModal}
      setShowModal={setShowModal}
      userVenueToDelete={userVenueToDelete}
      setVenueOptions={setVenueOptions}
      setFavouriteVenues={setFavouriteVenues}
      setInputLoading={setInputLoading}
      deleteLoading={deleteLoading}
      setDeleteLoading={setDeleteLoading}
    />
  </>)
}

export default VenueList
