import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Modal } from 'react-bootstrap';

import createPostImage from '../../assets/add-post.webp';
import styles from '../../styles/RegisterLogin.module.css';
import postStyles from '../../styles/CreateEditPost.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/FullPageSpinner';


function EditPost() {
  useRedirect('loggedOut')
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    song: '',
  })
  const {title, content} = postData;
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [songsResponse, postResponse] = await Promise.all([
          axiosReq.get(`/songs/?ordering=-net_votes&user=${currentUser?.pk}`),
          axiosReq.get(`/posts/${id}`),
        ]);
        const songs = songsResponse.data.results;
        const post = postResponse.data;
        if (!post.is_user) {
          navigate(`/profile/${currentUser.profile_id}`);
          return;
        }
        setFetchedSongs(songs);
        setPostData({
          title: post.title,
          content: post.content,
          song: post.song,
        });
        const matchingSong = songs.find(song => song.id === post.song);
        setSelectedSong(matchingSong ? matchingSong.id : '');
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 404 || error.response?.status === 403) { 
          navigate(`/profile/${currentUser.profile_id}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser, id, navigate]);

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    try {
      await axiosReq.put(`/posts/${id}`, {
        title,
        content,
        song: selectedSong,
      });
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 404 || err.response?.status === 403) { 
        navigate(`/profile/${currentUser.profile_id}`);
      } 
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = event => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    })
  }

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosReq.delete(`/posts/${id}/`);
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      setDeleteLoading(false);
    }
  };

  return (
    <Container className="flex-grow-1 d-flex flex-column">
    { isLoading ? ( 
      <FullPageSpinner />
    ) : (
      <Row className="d-flex flex-grow-1 align-items-center pb-6">
        <Col
        xs="12" 
        md="5"
        className="bg-light p-3 text-center rounded shadow-sm mt-2"
        > {/* Col for all actual form box content */}
          <h1 className="h2 mb-3">Edit Post</h1>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Title</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Title*"
                name="title"
                className='mt-3 mb-1'
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
              <Form.Label className='d-none'>Content</Form.Label>
              <Form.Control 
                as='textarea'
                rows={4}
                placeholder="Content*"
                name="content"
                className={`mt-2 ${postStyles.noResize}`}  
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
            ))}
            <Form.Group>
              <Form.Label className='d-none'>Song</Form.Label>
              <Form.Control 
                as='select'
                className='mt-2 mb-1'
                value={selectedSong}
                onChange={e => setSelectedSong(e.target.value)}
              >
                <option value=''>
                  No Song
                </option>
                {fetchedSongs?.map(song => (
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
            {errors.song?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
            ))}
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
            Delete Post
          </Button>
          <small className={`form-text mx-auto my-2 ${styles.dangerHelper}`}>This cannot be undone.</small>
        </Col>
        <Col
            xs='12'
            md='1'
            className='d-none d-md-block'
          /> {/* Col purely for layout formatting */}
        <Col xs="12" md="6" className="text-center d-none d-md-block">
          <Image fluid rounded src={createPostImage} className={styles.registerImage} />
        </Col>
      </Row>
    )}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this post? This action cannot be undone.
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

export default EditPost
