import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import createPostImage from '../../assets/add-post.webp';
import styles from '../../styles/formPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useFetchSong from '../../hooks/useFetchSong';
import { toast } from 'react-toastify';

/**
 * Render the create post page, including a form in which to input the
 * information for the new post.
 * 
 * @returns {ReactNode} - An element displaying the full create post page.
 */
function CreatePost() {
  useRedirect('loggedOut')
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {formData: postData, handleChange} = useFormDataHandler({
    title: '',
    content: '',
  })
  const {title, content} = postData;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [songData, setSongData] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');
  const [errors, setErrors] = useState({});

  const filter = currentUser?.pk 
  ? `ordering=-net_votes&user=${currentUser?.pk}`
  : false;
  const hasLoaded = useFetchSong({setSongData, filter});

  /**
   * Handle the submitting of the create post form data.
   * Sends a POST request to the '/posts' endpoint to create a new post.
   * Sets the submit button to a loading state for duration of process.
   * Redirects to the profile page where the new post is viewable.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      post form buttom.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {   
      await axiosReq.post("/posts/", {
        title,
        content,
        user: currentUser.pk,
        song: selectedSong,
      });
      toast.success('Post created!', {position: 'bottom-left'});
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
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
        > {/* Col for all actual form box content */}
          <h1 className="h2 mb-3">Create Post</h1>
          <p>Create a new post for all to see.</p>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Title</Form.Label>
              <Form.Control 
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
              <Form.Label className='d-none'>Content</Form.Label>
              <Form.Control 
                as='textarea'
                rows={4}
                placeholder="Content*"
                name="content"
                className={`mt-3 ${styles.noResize}`}  
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            <ErrorAlert messages={errors?.content} />
            <Form.Group>
              <Form.Label id="song-label" className='d-none'>Song</Form.Label>
              <Form.Control 
                aria-labelledby="song-label"
                as='select'
                className='mt-2 mb-1'
                value={selectedSong}
                onChange={e => setSelectedSong(e.target.value)}
              >
                <option value=''>
                  No Song
                </option>
                {songData.results?.map(song => (
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
            alt='New Post Image - a post-it note on a corkboard.'
          />
        </Col>
      </Row>
    ) : (
      <FullPageSpinner />
    )}

    </Container>
  );
}

export default CreatePost
