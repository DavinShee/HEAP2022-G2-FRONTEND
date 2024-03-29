import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { databaseURLs } from '../URLConstants';

const LoginModal = ({ showLoginModal, setLoginModal, handleShowSignup }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    variant: '',
    message: ''
  });
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: ''
  });

  // Closes the login modal
  const handleCloseLogin = () => {
    setLoginModal(false);
    setShowAlert(false);
  };

  // On every change in the login form, update the state to reflect the new changes
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setLoginFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  // Handles the login, posts data to the backend if successful, then reload the page
  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const requestHeader = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    axios
      .post(databaseURLs.signIn, JSON.stringify(loginFormValues), {
        headers: requestHeader
      })
      .then((response) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: `${loginFormValues.email}`,
            fullname: `${response.data.data.user.fullname}`
          })
        );
        window.location.reload(false);
      })
      .catch((_error) => {
        setAlertDetails({
          variant: 'danger',
          message: 'Invalid email address or password. Please try again.'
        });
        setShowAlert(true);
      });
  };

  return (
    <Modal
      className="forms"
      show={showLoginModal}
      onHide={handleCloseLogin}
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert key={alertDetails.variant} variant={alertDetails.variant}>
            {`${alertDetails.message}`}
          </Alert>
        )}
        <h3>Login to start sharing!</h3>
        <Form onSubmit={handleLogin}>
          <FloatingLabel label="Email address" className="my-3">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              name="email"
            ></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" className="my-3">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
          </FloatingLabel>
          <Button variant className="form-buttons" type="submit">
            Login!
          </Button>
        </Form>
        <br />
        Don't have an account?{' '}
        <button
          type="button"
          className="link-button"
          onClick={() => {
            handleCloseLogin();
            handleShowSignup();
          }}
        >
          Signup here
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
