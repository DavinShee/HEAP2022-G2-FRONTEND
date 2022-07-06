import { useState, useContext } from 'react';
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Modal from 'react-bootstrap/Modal';

function NavigationBar() {
  const { user, setUser } = useContext(UserContext);
  const [modID, setModID] = useState('');
  const [profName, setProfName] = useState('');
  const [authorName, setAuthorName] = useState('');

  let navigate = useNavigate();

  const [showSearchModal, setSearchModal] = useState(false);
  const handleCloseSearch = () => setSearchModal(false);
  const handleShowSearch = () => setSearchModal(true);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCloseSearch();
    navigate(
      `/buyer?mod-id=${modID}&prof-id=${profName}&author-name=${authorName}`
    );
    setModID('');
    setProfName('');
    setAuthorName('');
  };

  const [showSignupModal, setSignupModal] = useState(false);
  const handleCloseSignup = () => setSignupModal(false);
  const handleShowSignup = () => setSignupModal(true);

  const [showLoginModal, setLoginModal] = useState(false);
  const handleCloseLogin = () => setLoginModal(false);
  const handleShowLogin = () => setLoginModal(true);

  let loggedOut = (
    <>
      <Button variant="info" onClick={handleShowSignup}>
        Signup
      </Button>
      <Button variant="info" onClick={handleShowLogin}>
        Login
      </Button>

      <Modal show={showSignupModal} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>
            <h3>Create an account to start sharing!</h3>
          </p>
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
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Button>Create my account!</Button>
          </Form>
          <br />
          Already have an account?{' '}
          <a
            onClick={() => {
              handleCloseSignup();
              handleShowLogin();
            }}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Login here
          </a>
        </Modal.Body>
      </Modal>

      <Modal show={showLoginModal} onHide={handleCloseLogin} centered size='sm'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>
            <h3>Login to start sharing!</h3>
          </p>
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
          <a
            onClick={() => {
              handleCloseLogin();
              handleShowSignup();
            }}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Signup here
          </a>
        </Modal.Body>
      </Modal>
    </>
  );

  let loggedIn = (
    <>
      <Button variant="info">Upload</Button>
      <NavDropdown title={`ACCOUNT NAME HERE`} id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/">
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/">
          View Purchased Notes
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/">
          Active Listings
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/">
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  return (
    <>
      <Navbar bg="light" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h1>Notes</h1>
          </Navbar.Brand>
          <Nav>
            <Button variant="info" onClick={handleShowSearch}>
              Search
            </Button>
            {user ? loggedIn : loggedOut}
          </Nav>
        </Container>
      </Navbar>

      <Modal show={showSearchModal} onHide={handleCloseSearch} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>
            <h3>What are you looking for today?</h3>
          </p>
          <Form>
            <FloatingLabel label="Module" className="my-3">
              <Form.Control
                type="text"
                placeholder="Module"
                value={modID}
                onChange={(e) => setModID(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Prof" className="my-3">
              <Form.Control
                type="text"
                placeholder="Prof"
                value={profName}
                onChange={(e) => setProfName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Author" className="my-3">
              <Form.Control
                type="text"
                placeholder="Author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="info" onClick={handleSubmitSearch}>
              Search!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar;
