import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

const SignupModal = ({ showSignupModal, setSignupModal, handleShowLogin }) => {
  const handleCloseSignup = () => setSignupModal(false);

  return (
    <Modal show={showSignupModal} onHide={handleCloseSignup} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h3>Create an account to start sharing!</h3>
        <Form>
          <Row>
            <Col>
              <FloatingLabel label="First Name" className="my-3">
                <Form.Control type="text" placeholder="First Name" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Last Name" className="my-3">
                <Form.Control type="text" placeholder="Last Name" />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Group>
            <FloatingLabel label="Email address" className="my-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Row>
            <Col>
              <FloatingLabel label="Password" className="my-3">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Confirm Password" className="my-3">
                <Form.Control type="password" placeholder="Confirm Password" />
              </FloatingLabel>
            </Col>
          </Row>
          <Button>Create my account!</Button>
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
