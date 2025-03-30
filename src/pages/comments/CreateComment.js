import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profileId, username} = props;
  const [postButtonLoading, setPostButtonLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postButtonLoading) return;
    try {
      setPostButtonLoading(true);
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    } finally {
      setPostButtonLoading(false);
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
            placeholder="Write your comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={4}
          />
        </InputGroup>
      </Form.Group>
      <div className="text-end my-2 me-2">
        <Button
          disabled={postButtonLoading}
          variant="primary" 
          type="submit" 
        >
        Post
        </Button>
      </div>
    </Form>
  );
}

export default CommentCreateForm;