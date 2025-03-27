import React from 'react'
import { Button } from 'react-bootstrap';

const Vote = () => {
  return (
    <div className='d-flex align-items-center justify-content-center rounded p-1 bg-light '>
      <Button variant="light" className="border-0 p-0">
        <i className="fa-solid fa-square-minus px-1 fa-lg text-danger"></i>
      </Button>
      <div className="text-center fw-bold mx-2">
        0
      </div>
      <Button variant="light" className="border-0 p-0">
        <i className="fa-solid fa-square-plus px-1 fa-lg text-success"></i>
      </Button>
    </div>
  );
}

export default Vote
