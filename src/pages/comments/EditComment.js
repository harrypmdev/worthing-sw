import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";

function EditComment(props) {
  const { 
    post, 
    setPost, 
    id, 
    setComments, 
    profileImage, 
    profileId, 
    username, 
    content,
    setShowEdit} = props;

  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saveButtonLoading) return;
    try {
      setSaveButtonLoading(true);
      const { data } = await axiosRes.put(`/comments/${id}`, {
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
      setSaveButtonLoading(false);
      setShowEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2 border border-secondary-subtle rounded bg-light" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className='mt-2'>
          <div className="ps-2">
            <Avatar
              image={profileImage}
              username={username}
              id={profileId}
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
        >
        Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default EditComment;