import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import createPostImage from '../../assets/add-post.webp';
import styles from '../../styles/RegisterLogin.module.css';
import postStyles from '../../styles/CreateEditPost.module.css';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import DeleteModal from '../../components/delete/DeleteModal';
import DeleteButton from '../../components/delete/DeleteButton';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useFetchPostData from '../../hooks/useFetchPostData';
import useFetchSong from '../../hooks/useFetchSong';


function EditPost() {
  useRedirect('loggedOut')
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [post, handleChange, setPost] = useFormDataHandler({
    title: '',
    content: '',
    song: '',
  })
  const {title, content} = post;

  const [songData, setSongData] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const postLoading = useFetchPostData({id, setPost});
  const filter = currentUser?.pk 
  ? `ordering=-net_votes&user=${currentUser?.pk}`
  : null;
  const songsLoading = useFetchSong({setSongData, filter})
  const matchingSong = songData.find(song => song.id === post.song);
  setSelectedSong(matchingSong ? matchingSong.id : '');
  const isLoading = postLoading || songsLoading

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
      setErrors(err.response?.data);
      setIsSubmitting(false);
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
        >
          <h1 className="h2 mb-3">Edit Post</h1>
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
                className={`mt-2 ${postStyles.noResize}`}  
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            <ErrorAlert messages={errors?.content} />
            <Form.Group>
              <Form.Label className='d-none'>Song</Form.Label>
              <Form.Control 
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
          <Image fluid rounded src={createPostImage} className={styles.registerImage} />
        </Col>
      </Row>
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
