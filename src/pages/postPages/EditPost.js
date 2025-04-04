import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import createPostImage from '../../assets/add-post.webp';
import styles from '../../styles/formPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import DeleteModal from '../../components/delete/DeleteModal';
import DeleteButton from '../../components/delete/DeleteButton';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useEditPostData from '../../hooks/useEditPostData';

/**
 * Render the Edit post page, including an editable form which auto-fills
 * with the pre-existing data for the post in question.
 * 
 * @returns {ReactNode} - An element displaying the full edit post page.
 */
function EditPost() {
  useRedirect('loggedOut')
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {
    formData: post, 
    handleChange, 
    setFormData: setPost
  } = useFormDataHandler({
    title: '',
    content: '',
    song: '',
  })
  const {title, content} = post;

  const [selectedSong, setSelectedSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [songData, setSongData] = useState({});
  const [errors, setErrors] = useState({});
  const hasLoaded = useEditPostData(
    {id, setSongData, setSelectedSong, setPost}
  );
  
  /**
   * Handle the submitting of the edit post form data.
   * Sends a PUT request to the '/posts/:id' endpoint to edit an existing post.
   * Sets the submit button to a loading state for duration of process.
   * Redirects to the profile page where the edited post is viewable.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      edit post form buttom.
   */
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    try {
      await axiosReq.put(`/posts/${id}`, {
        title,
        content,
        song: selectedSong,
      });
      toast.success('Changes saved!', {position: 'bottom-left'});
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="flex-grow-1 d-flex flex-column">
    { hasLoaded ? ( 
      <Row className="d-flex flex-grow-1 align-items-center pb-6">
        <Col
        xs="12" 
        md="5"
        className="bg-light p-3 text-center rounded shadow-sm mt-2"
        >
          <h1 className="h2 mb-3">Edit Post</h1>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='title-entry' className='d-none'>Title</Form.Label>
              <Form.Control
                id='title-entry'
                type="text"
                placeholder="Title*"
                name="title"
                className='mt-3'
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            <ErrorAlert messages={errors?.title} />
            <Form.Group>
              <Form.Label htmlFor='content-entry' className='d-none'>Content</Form.Label>
              <Form.Control 
                as='textarea'
                id='content-entry'
                rows={4}
                placeholder="Content*"
                name="content"
                className={`mt-2 ${styles.noResize}`}  
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            <ErrorAlert messages={errors?.content} />
            <Form.Group>
              <Form.Label htmlFor='song-entry' id="song-label" className='d-none'>Song</Form.Label>
              <Form.Control 
                aria-labelledby="song-label"
                id='song-entry'
                as='select'
                className='mt-2'
                value={selectedSong}
                onChange={e => setSelectedSong(e.target.value)}
              >
                <option value=''>
                  No Song
                </option>
                {songData?.map(song => (
                  <option key={song.id} value={song.id}>
                    {song.title}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                You can link a song from your profile to your post. To add 
                new songs, visit your profile page.
              </Form.Text>
            </Form.Group>
            <ErrorAlert messages={errors?.song} />
            <Button 
              type="submit" 
              className='w-100 mt-2'
              disabled={isSubmitting}
            >
              { isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <ErrorAlert messages={errors?.non_field_errors} />
          </Form>
          <hr />
          <DeleteButton 
            text='post' 
            disabled={isSubmitting} 
            setShowModal={setShowModal}
          />
          <small className={`form-text mx-auto my-2 ${styles.dangerHelper}`}>This cannot be undone.</small>
        </Col>
        <Col
            xs='12'
            md='1'
            className='d-none d-md-block'
          /> {/* Col purely for layout formatting */}
        <Col xs="12" md="6" className="text-center d-none d-md-block">
          <Image 
            fluid 
            rounded 
            src={createPostImage} 
            className={styles.formImage} 
            alt='Edit Post Image - a post-it note on a corkboard.'
          />
        </Col>
      </Row>
    ) : (
      <FullPageSpinner />
    )}
    <DeleteModal 
      showModal={showModal}
      setShowModal={setShowModal}
      text='post'
      deleteEndpoint={`/posts/${id}/`}
      navigateAfterDelete={`/profile/${currentUser?.profile_id}`}
    />
    </Container>
  );
}

export default EditPost
