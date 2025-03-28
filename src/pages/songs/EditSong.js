import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Modal } from 'react-bootstrap';

import createSongImage from '../../assets/create_song_image.webp';
import styles from '../../styles/RegisterLogin.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/FullPageSpinner';


function EditSong() {
  useRedirect('loggedOut')
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [songData, setSongData] = useState({
    title: '',
    link_to_song: '',
    artist_name: currentUser?.username,
    audio_file: null,
  })
  const {title, link_to_song, artist_name, audio_file} = songData;
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await axiosReq.get(`/songs/${id}/`);
        if (!data.is_user) {
          navigate(`/profile/${currentUser.profile_id}`); // Redirect unauthorized users
          return;
        }
        setSongData({
          title: data.title,
          link_to_song: data.link_to_song,
          artist_name: data.artist_name,
          audio_file: null, // File fields can't be pre-filled; it needs to be replaced if edited
        });
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    
    setHasLoaded(false);
    fetchSong();
  }, [id, currentUser?.username, currentUser.profile_id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist_name", artist_name);
    if (link_to_song) formData.append("link_to_song", link_to_song);
    if (audio_file) formData.append("audio_file", audio_file);
    try {
      await axiosReq.put(`/songs/${id}`, formData);
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 404 || err.response?.status === 403) {
        navigate(`/profile/${currentUser.profile_id}`); // Redirect to profile if song is not found or unauthorized
      }
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      setIsSubmitting(false);
    }
  };


  const handleChange = event => {
    setSongData({
      ...songData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSongChange = event => {
    if (event.target.files.length) {
      setSongData({
      ...songData,
      audio_file: event.target.files[0],
      });
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosReq.delete(`/songs/${id}/`);
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      setDeleteLoading(false);
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
      > {/* Col for all actual form box content */}
        <h1 className="h2 mb-3">Edit Song</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='d-none'>Artist Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Artist's Name*"
              name="artist_name"
              className='mt-3 mb-1'
              value={artist_name}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.link_to_song?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
          ))}
          <Form.Group>
            <Form.Label className='d-none'>Song Title</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Song Title*"
              name="title"
              className='mt-2'
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.title?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
          ))}
          <Form.Group>
            <Form.Label className='d-none'>Link To Full Song</Form.Label>
            <Form.Control 
              type="url"
              placeholder="Link To Full Song (Optional)"
              name="link_to_song"
              className='mt-2 mb-1'
              value={link_to_song}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              You can only upload song clips of about 15 seconds. This option gives you a chance
              to give a link to the full version of your song.
            </Form.Text>
          </Form.Group>
          {errors.link_to_song?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
          ))}
          <Form.Group>
            <Form.Label className="d-none">Upload WAV File</Form.Label>
            <Form.Control
              type="file"
              name="audio_file"
              accept=".wav"
              className="mt-2"
              onChange={handleSongChange}
            />
            <Form.Text className="text-muted">
              Upload a new WAV file only if you wish to replace the current song file.
            </Form.Text>
          </Form.Group>
          <Button 
              type="submit" 
              className='w-100 mt-2'
              disabled={isSubmitting}
            >
              { isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
          ))}
        </Form>
        <hr />
        <Button
          variant="danger"
          className="w-100 mt-1"
          onClick={() => setShowModal(true)} // Open the modal
          disabled={isSubmitting}
        >
          Delete Song
        </Button>
        <small className={`form-text mx-auto my-2 ${styles.dangerHelper}`}>This cannot be undone.</small>
      </Col>
      <Col
          xs='12'
          lg='1'
          className='d-none d-lg-block'
        /> {/* Col purely for layout formatting */}
      <Col xs="12" lg="6" className="text-center d-none d-lg-block">
        <Image fluid rounded src={createSongImage} className={styles.registerImage} />
      </Col>
    </Row>
    ) : (
      <FullPageSpinner />
    )}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this song? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          disabled={deleteLoading}
          onClick={deleteLoading ? null : handleDelete}
        >
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

export default EditSong
