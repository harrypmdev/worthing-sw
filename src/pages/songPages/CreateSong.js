import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

import createSongImage from '../../assets/create-song-image.webp';
import styles from '../../styles/formPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { trimAudio } from '../../utils/utils';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useRedirectOnSongLimit from '../../hooks/useRedirectOnSongLimit';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';

/**
 * Render the create song page, including a form in which to input the
 * information for the new song.
 * 
 * @returns {ReactNode} - An element displaying the full create song page.
 */
function CreateSong() {
  useRedirect('loggedOut')
  const isLoading = useRedirectOnSongLimit();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {
    formData: songData, 
    handleChange, 
    setFormData: setSongData
  } = useFormDataHandler({
    title: '',
    link_to_song: '',
    artist_name: currentUser?.username,
    audio_file: null,
  })
  const {title, link_to_song, artist_name, audio_file} = songData;
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle the submitting of the create song form.
   * Sends a POST request to the '/songs' endpoint with the
   * song data, including the song file.
   * Sets a loading state for the submit button whilst processing.
   * Redirects to the profile page where the changes are viewable.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      create song form button.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    if (!audio_file) {
      setErrors({
        non_field_errors: ['Please upload a wav file.']
      });
      setIsSubmitting(false);
      return;
    }
    formData.append('title', title);
    formData.append('artist_name', artist_name);
    if (link_to_song) formData.append('link_to_song', link_to_song);
    if (audio_file) formData.append('audio_file', audio_file);
    try {
      await axiosReq.post('/songs/', formData);
      toast.success('Song created!', {position: 'bottom-left'});
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      setErrors(err.response?.data);
      setIsSubmitting(false);
    }
  };

  /**
   * Handle the changing of the song file form section.
   * Trims the audio file to a maximum of 15 seconds and updates the 
   * songData state with the trimmed file.
   * 
   * @param {Event} event The event triggered by the changing of the
   *                      song file form section.
   */
  const handleSongChange = async event => {
    let audioToSave;
    try {
      audioToSave = await trimAudio(event.target.files[0], 15);
    } catch (err) {
      setErrors({...err,
        non_field_errors: [
          'There was a problem trimming your file down to 15 seconds.' + 
          ' Please ensure it is a wav file under 10 minutes,' +
          ' or try another file.'
        ]
      });
      audioToSave = event.target.files[0];
    }
    setSongData({
    ...songData,
    audio_file: audioToSave,
    });
  }

  return (
    isLoading ? ( 
      <FullPageSpinner /> 
    ) : ( 
      <Container className='flex-grow-1 d-flex flex-column'>
      <Row className='d-flex flex-grow-1 align-items-center pb-6'>
        <Col
        xs='12' 
        md='5'
        className='bg-light p-3 text-center rounded shadow-sm'
        > {/* Col for all actual form box content */}
          <h1 className='h2 mb-3'>Create Song</h1>
          <p>Add a new song to your profile. You can have up to three.</p>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='artist-name-entry' className='d-none'>
                Artist Name
              </Form.Label>
              <Form.Control 
                id='artist-name-entry'
                type='text'
                placeholder="Artist's Name*"
                name='artist_name'
                className='mt-3 mb-1'
                value={artist_name || ''}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.link_to_song?.map((message, idx) => (
                <Alert key={idx} variant='warning'>
                  {message}
                </Alert>
            ))}
            <Form.Group>
              <Form.Label htmlFor='song-title-entry' className='d-none'>
                Song Title
              </Form.Label>
              <Form.Control 
                id='song-title-entry'
                type='text'
                placeholder='Song Title*'
                name='title'
                className='mt-2'
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert key={idx} variant='warning'>
                  {message}
                </Alert>
            ))}
            <Form.Group>
              <Form.Label htmlFor='link-to-full-entry' className='d-none'>
                Link To Full Song
              </Form.Label>
              <Form.Control
                id='link-to-full-entry'
                type='url'
                placeholder='Link To Full Song (Optional)'
                name='link_to_song'
                className='mt-2 mb-1'
                value={link_to_song || ''}
                onChange={handleChange}
              />
              <Form.Text className='text-muted'>
                You can only upload short clips. This option gives you a chance
                to give a link to the full version of your song.
              </Form.Text>
            </Form.Group>
            {errors.link_to_song?.map((message, idx) => (
                <Alert key={idx} variant='warning'>
                  {message}
                </Alert>
            ))}
            <Form.Group>
              <Form.Label 
                htmlFor='file-entry'  
                id='file-label'
                className='d-none'
              >
                Upload WAV File</Form.Label>
              <Form.Control
                id='file-entry'
                aria-labelledby='file-label'
                type='file'
                name='audio_file'
                accept='.wav'
                className='mt-2'
                onChange={handleSongChange}
              />
              <Form.Text className='text-muted'>
                Upload a short audio file in the WAV format. Song clips longer than 15 seconds
                will be trimmed down.
              </Form.Text>
            </Form.Group>
            <Button 
                type='submit'
                className='w-100 mt-2'
                disabled={isSubmitting}
              >
                { isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant='warning' className='mt-3'>
                  {message}
                </Alert>
            ))}
          </Form>
        </Col>
        <Col
            xs='12'
            md='1'
            className='d-none d-md-block'
          /> {/* Col purely for layout formatting */}
        <Col xs='12' md='6' className='text-center d-none d-md-block'>
          <Image 
            fluid 
            rounded 
            src={createSongImage} 
            className={styles.formImage} 
            alt='Create Song Image - abstract artwork representing written music'
          />
        </Col>
      </Row>
      </Container>
    ));
}

export default CreateSong
