import { useState, useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserIcon from './UserIcon';

function NavigationBar() {
  const { user } = useContext(UserContext);

  const [showSearchModal, setSearchModal] = useState(false);

  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);

  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  let loggedOut = (
    <>
      <Nav.Item>
        <Button
          variant=""
          className="nav-signup-btn"
          onClick={handleShowSignup}
        >
          <div className="nav-signup-text">Signup</div>
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Button variant="" className="nav-login-btn" onClick={handleShowLogin}>
          <div className="nav-login-text">Login</div>
        </Button>
      </Nav.Item>

      <SignupModal
        showSignupModal={showSignupModal}
        setSignupModal={setSignupModal}
        handleShowLogin={handleShowLogin}
      />

      <LoginModal
        showLoginModal={showLoginModal}
        setLoginModal={setLoginModal}
        handleShowSignup={handleShowSignup}
      />
    </>
  );

  let loggedIn = (
    <>
      <Nav.Item className="my-auto">
        <Button variant="" className="nav-upload-btn">
          <div className="nav-upload-text">Upload</div>
        </Button>
      </Nav.Item>
      <NavDropdown
        className="nav-dropdown"
        title={!user ? null : <UserIcon name={user.email} />}
        id="nav-dropdown"
        align="end"
      >
        <NavDropdown.Item className="first-dropdown-box" as={Link} to="/">
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Item className="dropdown-box" as={Link} to="/">
          Download History
        </NavDropdown.Item>
        <NavDropdown.Item className="dropdown-box" as={Link} to="/">
          My Listings
        </NavDropdown.Item>
        <NavDropdown.Item
          className="dropdown-box"
          onClick={() => {
            window.localStorage.removeItem('user');
            window.location.reload(false);
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  return (
    <>
      <Navbar className="color-nav" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div className="brand-text">
              <h1>NotesNow</h1>
            </div>
          </Navbar.Brand>
          <Nav style={{ verticalAlign: 'middle' }}>
            <Nav.Item className="my-auto">
              <Button
                variant=""
                className="search-btn"
                onClick={() => setSearchModal(true)}
              >
                <div className="search-btn-text">Search</div>
              </Button>
            </Nav.Item>
            {user ? loggedIn : loggedOut}
          </Nav>
        </Container>
      </Navbar>

      <SearchModal
        showSearchModal={showSearchModal}
        setSearchModal={setSearchModal}
      />
    </>
  );
}

export default NavigationBar;
