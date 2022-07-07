import axios from 'axios';
import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { databaseURLs } from '../URLConstants';

const SignupModal = ({ showSignupModal, setSignupModal, handleShowLogin }) => {
  const handleCloseSignup = () => setSignupModal(false);

  const [signupFormValues, setSignupFormValues] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setSignupFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

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

    let newNote = {
      authorName: 'test',
      comments: [],
      description: 'test',
      image: ['test1', 'test2'],
      modId: 'test',
      price: 5,
      profName: 'test',
      year: 'test'
    };

    axios
      .post(
        databaseURLs.buyer,
        JSON.stringify(newNote),
        // {
        //   authorName: 'test',
        //   comments: [],
        //   description: 'test',
        //   image: ['test1', 'test2'],
        //   modId: 'test',
        //   price: 5,
        //   profName: 'test',
        //   year: 'test'
        // },
        { headers: requestHeader }
      )
      .then((response) => {
        console.log('Success=======>', response);
      })
      .catch((error) => {
        console.log('Error=========>', error);
      });
  };

  return (
    <Modal show={showSignupModal} onHide={handleCloseSignup} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h3>Create an account to start sharing!</h3>
        <Form onSubmit={handleSignup}>
          <Row>
            <Col>
              <FloatingLabel label="First Name" className="my-3">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Last Name" className="my-3">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Group>
            <FloatingLabel label="Email address" className="my-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                name="emailAddress"
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Row>
            <Col>
              <FloatingLabel label="Password" className="my-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Confirm Password" className="my-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Button type="submit">Create my account!</Button>
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
