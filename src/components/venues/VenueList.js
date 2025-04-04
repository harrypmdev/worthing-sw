import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'

import Venue from './Venue'
import useFetchVenues from '../../hooks/useFetchVenues';
import ComponentSpinner from '../spinner/ComponentSpinner';

const VenueList = ({editable=false}) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [venueOptions, setVenueOptions] = useState({});
  const [favouriteVenues, setFavouriteVenues] = useState({});
  const hasLoaded = useFetchVenues({setVenueOptions, setFavouriteVenues});

  const handleAddVenue = event => {
    if (!selectedVenue || !venueOptions.includes(selectedVenue)) return;
    setVenueOptions(prev => (
      prev.filter(item => item !== selectedVenue )
    ));
    setFavouriteVenues((prev) => [...prev, selectedVenue]);
  }

  return (<>
    { hasLoaded ? (
      <Container className="flex-grow-1 d-flex flex-column text-center mb-4">
        { (favouriteVenues?.length > 0 || editable) && <h2 className='h5'>Favourite Venues</h2>}
        { editable && (<>
        <Form.Select 
          aria-label="Venue Selector" 
          className='rounded-bottom-0'
          value={selectedVenue}
          onChange={event => setSelectedVenue(event.target.value)}
        >
          <option>Add a favoured venue</option>
          { venueOptions?.map(venue => (
            <option key={venue.id} value={venue.name}>
              {venue.name} {venue.user_count > 0 && `${venue.user_count} regulars`}
            </option>
          ))}
        </Form.Select>
        <Button 
          variant="primary" 
          className='mb-3 w-100 rounded-top-0'
          onClick={handleAddVenue}
        >
          Add Venue
        </Button>
        </>)}
        { favouriteVenues?.map(venue => (
          <Venue
            key={venue.id} 
            locationName={venue.venue_name} 
            setFavouriteVenues={setFavouriteVenues} 
            editable={editable}
          />
        ))}
      </Container>
    ) : (
      <ComponentSpinner />
    )}
  </>)
}

export default VenueList
