import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../profile/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from "react-toastify";

/**
 * Render a form for the editing of an existing comment.
 * 
 * @param {number} id The id for the comment which is being edited.
 * 
 * @param {Function} setComments the setter function for the list of comments in the parent
 *                               page so the page to be dynamically altered when comments 
 *                               are edited.
 * 
 * @param {string} content The existing content of the comment prior to editing.
 * 
 * @param {Function} setShowEdit The setter function from the parent element to determine whether
 *                               this component should be displayed or the regular Comment component.
 * 
 * @returns {ReactNode} - An element displaying the edit comment form.
 */
function EditComment({id, setComments, content, setShowEdit}) {
  const currentUser = useCurrentUser();

  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [formContent, setFormContent] = useState(content);

  /**
   * Handle the changing of the content text.
   * 
   * @param {Event} event The event triggered by the changing of the content text.
   */
  const handleChange = (event) => setFormContent(event.target.value);

  /**
   * Handle the submitting of the changed comment content.
   * Sends a PUT request with new data to the backend for the comment in question.
   * Sets 'saveButtonLoading' to 'true' for the duration of the updating process.
   * 
   * @param {Event} event The event triggered by the edited comment submission.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saveButtonLoading) return;
    try {
      setSaveButtonLoading(true);
      await axiosRes.put(`/comments/${id}`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment => {
          return comment.id === id
          ? {
            ...comment,
            content: formContent.trim(),
            updated_at: 'now',
          }
          : comment;
        }))
      }));
      toast.success('Changes saved!', {position: 'bottom-left'});
      setSaveButtonLoading(false);
      setShowEdit(false);
    } catch (err) {
      toast.error(
        'We encountered a problem saving your changes. Sorry!', 
        {position: 'bottom-left', toastId: "commentEditError"}
      );
      console.log(err);
    }
  };

  return (
    <Form className="mt-2 border border-secondary-subtle rounded bg-light" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className='mt-2'>
          <div className="ps-2">
            <Avatar
              image={currentUser?.profile_image}
              username={currentUser?.username}
              id={currentUser?.profile_id}
              dimensions={40}
            />
          </div>
          <Form.Control
            className={`${styles.Form} bg-light`}
            placeholder="Edit your comment..."
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={4}
          />
        </InputGroup>
      </Form.Group>
      <div className="text-end my-2 me-2">
        <Button
          disabled={saveButtonLoading}
          variant="warning" 
          type="submit"
          aria-label='Save Changes'
        >
        Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default EditComment;