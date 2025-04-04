import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Venue = ({ locationName, setFavouriteVenues, editable=false }) => {
  return (<>
    <Card>
      <Card.Body className={editable ? 'rounded-bottom-0' : 'mb-3'}>
        <Card.Title>{locationName}</Card.Title>
        <Card.Text>
          Favourite number
        </Card.Text>
      </Card.Body>
    </Card>
    <Button variant='danger' className={editable ? 'rounded-top-0 mb-3' : 'd-none'}>
      Delete
    </Button>
  </>)
}

export default Venue
