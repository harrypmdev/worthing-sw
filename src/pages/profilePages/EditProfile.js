import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import styles from '../../styles/EditProfile.module.css';
import ErrorAlert from '../../components/ErrorAlert';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import useFetchProfileData from '../../hooks/useFetchProfileData';

/**
 * Render the Edit Profile page.
 * Displays the user's current profile image; a new image can be uploaded upon clicking
 * the current image. Also displays a form to update the bio which pre-fills with the
 * existing bio.
 * 
 * @returns {ReactNode} - An element displaying the full edit profile page.
 */
const EditProfile = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const {
    formData: profile, 
    handleChange, 
    setFormData: setProfile
  } = useFormDataHandler({
    bio: '',
    image: ''
  });
  const hasLoaded = useFetchProfileData({
    id: currentUser?.profile_id,
    setProfile,
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({})
  const imageFile = useRef();

  /**
   * Handle the submitting of the edit profile form.
   * Sends a PUT request to the '/profiles/:id' endpoint with the
   * new data, including the new profile image if applicable.
   * Sets a loading state for the submit button whilst processing.
   * Redirects to the profile page where the changes are viewable.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      edit profile form button.
   */
  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('bio', profile.bio);
    if (imageFile?.current?.files[0]) {
      formData.append('image', imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${currentUser?.profile_id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      toast.success('Changes saved!', {position: 'bottom-left'});
      navigate(`/profile/${currentUser.profile_id}`);
    } catch (err) {
      if (err.response?.data?.bio) {
        toast.error(
          err.response?.data?.bio[0], 
          {position: 'bottom-left', toastId: 'bioError'}
        );
      }
      setErrors(err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Handle the changing of the image form section.
   * Updates the profile state if an image has been uploaded.
   * 
   * @param {Event} event The event triggered by the changing of the
   *                      image form section.
   */
  const handleImageChange = event => {
    if (event.target.files.length) {
      setProfile({
        ...profile,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

  return (
    <Container fluid className='flex-grow-1 d-flex flex-column mt-2 justify-content-center'>
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
                  alt={`${profile?.user}'s Profile Image`}
                  className={`
                    border border-dark-subtle 
                    object-fit-cover w-75 text-center
                    ${styles.profileImage}`}    
                  onClick={() => document.getElementById('imageUpload').click()}
                />
                <i className={`fa-solid fa-arrow-up-from-bracket fa-2xl ${styles.uploadIcon}`}></i>
              </div>
              <Form.Label className='d-none' htmlFor='imageUpload'>
                Change profile image
              </Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                id='imageUpload'
                name='image'
                onChange={handleImageChange}
                ref={imageFile}
                className='d-none'
              />
            </Form.Group>
            </Col>
            <Form.Text className='text-muted my-2'>
                Click or tap your profile image to change it.
            </Form.Text>
            <div className='d-flex justify-content-center'>
              <div className='w-50'>
                <ErrorAlert messages={errors?.image} />
              </div>
            </div>
            <Col xs='12' className='d-flex flex-column'>
            <Form.Group className='mb-4 d-flex flex-column flex-grow-1'>
              <Form.Label className='fw-bold' htmlFor='bio-form'>Bio</Form.Label>
              <Form.Control
                id='bio-form'
                as='textarea'
                rows={4}
                value={profile.bio}
                name='bio'
                className={`flex-grow-1 ${styles.noResize}`}
                placeholder='Write something about yourself...'
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
          </Row>
          <Col xs='12' className='text-center mt-2'>
            <Button 
              variant='primary' 
              type='submit'
              className='w-25'
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
