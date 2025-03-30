import React from 'react';
import { Alert } from 'react-bootstrap';


function ErrorAlert({ messages }) {
  return <>
      {messages?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
  </>;
}

export default ErrorAlert;
