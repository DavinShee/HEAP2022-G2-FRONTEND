import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row
} from 'react-bootstrap';
import { databaseURLs } from '../URLConstants';

const SignupModal = ({ showSignupModal, setSignupModal, handleShowLogin }) => {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    variant: '',
    message: ['']
  });
  const [signupFormValues, setSignupFormValues] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });

  // Closes the sign up modal
  const handleCloseSignup = () => {
    setShowAlert(false);
    setSignupModal(false);
  };

  // On every change in the signup form, update the state to reflect the new changes
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setSignupFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });

    if (
      !signupFormValues.firstName ||
      !signupFormValues.lastName ||
      !signupFormValues.emailAddress ||
      !signupFormValues.password ||
      !signupFormValues.confirmPassword
    ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  // Handles the signup, posts data to the backend
  const handleSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (signupFormValues.password !== signupFormValues.confirmPassword) {
      setAlertDetails({
        variant: 'danger',
        message: ['Password and confirm password do not match']
      });
      setShowAlert(true);
    } else {
      const requestHeader = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      };

      const signupData = {
        email: signupFormValues.emailAddress,
        fullname: signupFormValues.firstName + ' ' + signupFormValues.lastName,
        password: signupFormValues.password
      };

      axios
        .post(databaseURLs.signUp, JSON.stringify(signupData), {
          headers: requestHeader
        })
        .then((_response) => {
          setAlertDetails({
            variant: 'success',
            message: [
              'Account successfully created!',
              'Redirecting to login page in 3 seconds.'
            ]
          });
          setShowAlert(true);
          setSubmitDisabled(true);
          setTimeout(() => {
            handleCloseSignup();
            handleShowLogin();
          }, 3000);
        })
        .catch((_error) => {
          setAlertDetails({
            variant: 'danger',
            message: ['Failed to signup, please try again later.']
          });
          setShowAlert(true);
        });
    }
  };

  return (
    <Modal
      className="forms"
      show={showSignupModal}
      onHide={handleCloseSignup}
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert key={alertDetails.variant} variant={alertDetails.variant}>
            {alertDetails.message.map((line, index) => (
              <p style={{ marginBottom: 0 }} key={index}>
                {line}
              </p>
            ))}
          </Alert>
        )}
        <h3>Create an account to start sharing!</h3>
        <Form onSubmit={handleSignup}>
          <Row>
            <Col>
              <FloatingLabel label="First Name" className="my-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={signupFormValues.firstName}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Last Name" className="my-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={signupFormValues.lastName}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <FloatingLabel label="Email address" className="my-3">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  name="emailAddress"
                  value={signupFormValues.emailAddress}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <FloatingLabel label="Password" className="my-3">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={signupFormValues.password}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Confirm Password" className="my-3">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                  value={signupFormValues.confirmPassword}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Button
              variant
              className="form-buttons"
              type="submit"
              disabled={submitDisabled}
            >
              Create!
            </Button>
          </Row>
        </Form>
        <br />
        Already have an account?{' '}
        <button
          type="button"
          className="link-button"
          onClick={() => {
            handleCloseSignup();
            handleShowLogin();
          }}
        >
          Login here
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
