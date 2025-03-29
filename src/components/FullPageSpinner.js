import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

/**
 * Renders a loading spinner that will fill the whole page.
 * 
 * @returns {ReactNode} An element displaying a full screen loading spinner.
 */
const FullPageSpinner = () => {
  return (
    <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" />
    </Container>
  )
}

export default FullPageSpinner
