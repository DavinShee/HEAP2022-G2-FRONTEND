import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

const LoginModal = ({ showLoginModal, setLoginModal, handleShowSignup }) => {
  const handleCloseLogin = () => setLoginModal(false);

  return (
    <Modal show={showLoginModal} onHide={handleCloseLogin} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h3>Login to start sharing!</h3>
        <Form>
          <FloatingLabel label="Email address" className="my-3">
            <Form.Control
              type="email"
              placeholder="name@example.com"
            ></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" className="my-3">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button>Login!</Button>
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
