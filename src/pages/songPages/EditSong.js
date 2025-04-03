import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import createSongImage from '../../assets/create-song-image.webp';
import styles from '../../styles/formPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import DeleteModal from '../../components/delete/DeleteModal';
import DeleteButton from '../../components/delete/DeleteButton';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useFetchSong from '../../hooks/useFetchSong';

/**
 * Render the Edit song page, including an editable form which auto-fills
 * with the pre-existing data for the song in question.
 * 
 * @returns {ReactNode} - An element displaying the full edit song page.
 */
function EditSong() {
  useRedirect('loggedOut')
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    formData: songData, 
    handleChange, 
    setFormData: setSongData
  } = useFormDataHandler({
    title: '',
    link_to_song: '',
    artist_name: '',
  })
  const {title, link_to_song, artist_name} = songData;
  const hasLoaded = useFetchSong({id, setSongData, redirectUnauthorized: true});

  /**
   * Handle the submitting of the edit song form.
   * Sends a PUT request to the '/songs/:id' endpoint with the
   * new song data, including the song file.
   * Sets a loading state for the submit button whilst processing.
   * Redirects to the profile page where the changes are viewable.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      edit song form button.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist_name", artist_name);
    formData.append("link_to_song", link_to_song);
  
    try {
      await axiosReq.put(`/songs/${id}`, formData);
      toast.success('Changes saved!', {position: 'bottom-left'});
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      setErrors(err.response?.data);
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="flex-grow-1 d-flex flex-column">
    { hasLoaded ? (
    <Row className="d-flex flex-grow-1 align-items-center pb-6 pt-2">
      <Col
      xs="12" 
      lg="5"
      className="bg-light p-3 text-center rounded shadow-sm"
      >
        <h1 className="h2 mb-3">Edit Song</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='d-none'>Artist Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Artist's Name*"
              name="artist_name"
              className='mt-3'
              value={artist_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <ErrorAlert messages={errors?.artist_name} />
          <Form.Group>
            <Form.Label className='d-none'>Song Title</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Song Title*"
              name="title"
              className='mt-3'
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          <ErrorAlert messages={errors?.title} />
          <Form.Group>
            <Form.Label className='d-none'>Link To Full Song</Form.Label>
            <Form.Control 
              type="url"
              placeholder="Link To Full Song (Optional)"
              name="link_to_song"
              className='mt-3 mb-1'
              value={link_to_song}
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              Your audio clips will only be 15 seconds or less. This option gives you a chance
              to give a link to the full version of your song.
            </Form.Text>
          </Form.Group>
          <ErrorAlert messages={errors?.link_to_song} />
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
          text='song' 
          disabled={isSubmitting} 
          setShowModal={setShowModal}
        />
        <small className={`form-text mx-auto my-2 ${styles.dangerHelper}`}>This cannot be undone.</small>
      </Col>
      <Col
          xs='12'
          lg='1'
          className='d-none d-lg-block'
        /> {/* Col purely for layout formatting */}
      <Col xs="12" lg="6" className="text-center d-none d-lg-block">
        <Image 
          fluid 
          rounded 
          src={createSongImage} 
          className={styles.formImage} 
          alt='Edit Song Image - abstract artwork representing written music'
        />
      </Col>
    </Row>
    ) : (
      <FullPageSpinner />
    )}
    <DeleteModal
      showModal={showModal}
      setShowModal={setShowModal}
      text='song'
      deleteEndpoint={`/songs/${id}/`}
      navigateAfterDelete={`/profile/${currentUser?.profile_id}`}
    />
    </Container>
  );
}

export default EditSong
