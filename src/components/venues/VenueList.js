import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import Venue from './Venue'

const VenueList = ({editable=false}) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [venueOptions, setVenueOptions] = useState([
    'The Broadwater',
    'The Cornerhouse',
    'The Cricketers',
    'The Mulberry',
    'The New Amsterdam',
    `O'Connor's on Warwick Street`,
    'The Thieves Kitchen',
    'The Brewhouse',
    'The Park View',
    'Slug and Lettuce Bar',
  ]);
  const [favouriteVenues, setFavouriteVenues] = useState([]);

  const handleAddVenue = event => {
    if (!selectedVenue || !venueOptions.includes(selectedVenue)) return;
    setVenueOptions(prev => (
      prev.filter(item => item !== selectedVenue )
    ));
    setFavouriteVenues((prev) => [...prev, selectedVenue]);
  }

  return (<>
    <Container className="flex-grow-1 d-flex flex-column text-center mb-4">
      { (favouriteVenues?.length > 0 || editable) && <h2 className='h5'>Favourite Venues</h2>}
      { editable && (<>
      <Form.Select 
        aria-label="Venue Selector" 
        className='rounded-bottom-0'
        value={selectedVenue}
        onChange={event => setSelectedVenue(event.target.value)}
      >
        <option>Open this select menu</option>
        { venueOptions.map(optionText => (
          <option key={optionText} value={optionText} >{optionText}</option>
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
          key={venue} 
          locationName={venue} 
          setFavouriteVenues={setFavouriteVenues} 
          editable={editable}
        />
      ))}
    </Container>
  </>)
}

export default VenueList
