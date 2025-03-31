import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import styles from '../../styles/EditProfile.module.css';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/ErrorAlert';


const EditProfile = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    bio: '',
    image: ''
  });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({})
  const imageFile = useRef();

  useEffect(() => {
    const fetchProfile = async() => {
        try {
            const {data} = await axiosReq.get(`/profiles/${currentUser?.profile_id}`);
            const { bio, image } = data;
            setProfile({ bio, image });
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }
    if (currentUser) {
      setHasLoaded(false);
      fetchProfile();
    }
  }, [currentUser])

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('bio', profile.bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${currentUser?.profile_id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = event => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    })
  }

  const handleImageChange = event => {
    if (event.target.files.length) {
      setProfile({
        ...profile,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column mt-2 justify-content-center">
      {hasLoaded && currentUser ? (
        <Row>
          <Form onSubmit={handleSubmit} className='mt-3'>
          <Row className='text-center'>
            <Col xs='12' className='d-flex justify-content-center'>
            <Form.Group className='mb-4 text-center'>
              <div className={styles.profileImageWrapper}>
                <Image
                  src={profile.image}
                  roundedCircle
                  alt="Profile"
                  className={`
                    border border-dark-subtle 
                    object-fit-cover w-75 text-center
                    ${styles.profileImage}`}    
                  onClick={() => document.getElementById('imageUpload').click()}
                />
                <i className={`fa-solid fa-arrow-up-from-bracket fa-2xl ${styles.uploadIcon}`}></i>
              </div>
              <Form.Label className='d-none' htmlFor="imageUpload">Change profile image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                id="imageUpload"
                name='image'
                onChange={handleImageChange}
                ref={imageFile}
                className="d-none"
              />
            </Form.Group>
            </Col>
            <Form.Text className="text-muted my-2">
                Click or tap your profile image to change it.
            </Form.Text>
            <div className='d-flex justify-content-center'>
              <div className='w-50'>
                <ErrorAlert messages={errors?.image} />
              </div>
            </div>
            <Col xs='12' className='d-flex flex-column'>
            <Form.Group className="mb-4 d-flex flex-column flex-grow-1">
              <Form.Label className='fw-bold'>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={profile.bio}
                name='bio'
                className={`flex-grow-1 ${styles.noResize}`}
                placeholder="Write something about yourself..."
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
          </Row>
          <Col xs='12' className='text-center mt-2'>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-25"
              disabled={isSubmitting}
            >
              { isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Col>
        </Form>
      </Row>
      ) : ( 
        <FullPageSpinner />
      )}
    </Container>
  )
}

export default EditProfile
