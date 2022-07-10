import { useState, useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import SearchModal from '../SearchModal';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

function NavigationBar() {
  const { user } = useContext(UserContext);

  const [showSearchModal, setSearchModal] = useState(false);

  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);

  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  let loggedOut = (
    <>
      <Button variant="" onClick={handleShowSignup}>
        <div className="nav-signup">Signup</div>
      </Button>
      <Button variant="" onClick={handleShowLogin}>
        <div className="nav-login">Login</div>
      </Button>

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
      <Button variant="">
        <div className="nav-upload-text">Upload</div>
      </Button>
      <NavDropdown title={!user ? null : user.email} id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/">
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/">
          Purchase History
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/">
          Active Listings
        </NavDropdown.Item>
        <NavDropdown.Item
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

          <Nav>
            <Button variant="" onClick={() => setSearchModal(true)}>
              <div className="search-button-text">Search</div>
            </Button>
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
