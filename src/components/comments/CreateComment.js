import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';

import styles from '../../styles/CommentForm.module.css';
import Avatar from '../profile/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { Button } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Render a form for the creation of a new comment.
 * 
 * @param {number} post The id of the post this comment will be associated with.
 * 
 * @param {Function} setComments the setter function for the list of comments in the parent
 *                               page so the page to be dynamically altered when comments 
 *                               are added.
 * 
 * @returns {ReactNode} - An element displaying the create comment form.
 */
function CommentCreate({post, setComments}) {
  const currentUser = useCurrentUser();
  const [postButtonLoading, setPostButtonLoading] = useState(false);
  const [content, setContent] = useState('');

  /**
   * Handle the changing of the content text.
   * 
   * @param {Event} event The event triggered by the changing of the content text.
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content) {
      toast.error('Comments require contents.', {position: 'bottom-left', toastId: 'commentError'});
      return;
    } else if (content.length > 300) {
      toast.error(
        'Comments must be under 300 characters.', 
        {position: 'bottom-left', toastId: 'commentErrorLength'}
      );
      return;
    }
    if (postButtonLoading) return;
    try {
      setPostButtonLoading(true);
      const { data } = await axiosRes.post('/comments/', {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setContent('');
      toast.success('Comment created!', {position: 'bottom-left'});
    } catch (err) {
      toast.error(
        'We encountered a problem creating this comment. Sorry!', 
        {position: 'bottom-left', toastId: 'commentDeleteError'}
      );
      console.log(err);
    } finally {
      setPostButtonLoading(false);
    }
  };

  return (
    <Form className='mt-2 border border-secondary-subtle rounded bg-light' onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className='mt-2'>
          <div className='ps-2'>
            <Avatar
              image={currentUser?.profile_image}
              username={currentUser?.username}
              id={currentUser?.profile_id}
              dimensions={40}
            />
          </div>
          <Form.Control
            className={`${styles.Form} bg-light`}
            placeholder='Write your comment...'
            name='comment-writing-text-area'
            as='textarea'
            value={content}
            onChange={handleChange}
            rows={4}
          />
        </InputGroup>
      </Form.Group>
      <div className='text-end my-2 me-2'>
        <Button
          disabled={postButtonLoading}
          variant='primary'
          type='submit'
        >
        Post
        </Button>
      </div>
    </Form>
  );
}

export default CommentCreate;