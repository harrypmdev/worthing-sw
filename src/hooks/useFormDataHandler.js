import { useState } from "react";

/**
 * Custom hook for managing form data state. Helps prevent otherwise frequent
 * reuse of the handleChange function to update form data.
 * 
 * @param {Object} initialState The data with which to initialise formData.
 * @returns {[Object, Function]} An array containing the state in the form of
 *                               an object, and secondly the function to handle 
 *                               the updating of the state so it can be used 
 *                               for forms' 'onChange' events.
 */
const useFormDataHandler = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  /**
   * Handle the updating of form data, ensures 'formData' is
   * always an accurate reflection of the form contents.
   * 
   * @param {Event} event - The event triggered by the calling element.
   */
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return [formData, handleChange];
}

export default useFormDataHandler
