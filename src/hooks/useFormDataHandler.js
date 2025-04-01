import { useState } from "react";

/**
 * Hook for managing form data state. Helps prevent otherwise frequent
 * reuse of identical handleChange functions.
 * 
 * @param {Object} initialState The data with which to initialise formData.
 * 
 * @returns {[Object, Function, Function]} An array containing:
 *                                         1) The state in the form of an object. 
 *                                         2) The function to handle the updating
 *                                         of the state so it can be used for forms' 
 *                                         "onChange" events.
 *                                         3) Optionally, the setter function for the
 *                                         state, in case additional custom functionality
 *                                         is also required.
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

  return {formData, handleChange, setFormData};
}

export default useFormDataHandler
