import React from 'react';
import { Alert } from 'react-bootstrap';


/**
 * Render error messages conditionally.
 * 
 * @param {Array.<string>} messages An array of error messages to be displayed.
 * 
 * @returns {ReactNode} A fragment containing as many Alert elements as there are messages.
 */
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
