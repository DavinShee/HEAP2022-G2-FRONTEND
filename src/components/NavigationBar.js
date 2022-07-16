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
        <Button variant="" className="navbar-btn" onClick={handleShowSignup}>
          Signup
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Button variant="" className="navbar-btn" onClick={handleShowLogin}>
          Login
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
      <Nav.Item>
        <Button variant="" className="navbar-btn" as={Link} to="/upload">
          Upload
        </Button>
      </Nav.Item>
      <NavDropdown
        className="nav-dropdown"
        title={!user ? null : <UserIcon name={user.fullname} />}
        id="nav-dropdown"
        align="end"
      >
        <NavDropdown.Item
          className="first-dropdown-box"
          as={Link}
          to="/account/manage"
        >
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Item
          className="dropdown-box"
          as={Link}
          to="/account/downloaded"
        >
          Download History
        </NavDropdown.Item>
        {user && user.fullname && user.email && (
          <NavDropdown.Item
            className="dropdown-box"
            as={Link}
            to={`/search?email=${user.email}`}
          >
            My Listings
          </NavDropdown.Item>
        )}
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
            <div className="brand-text">NotesNow</div>
          </Navbar.Brand>
          <Nav style={{ verticalAlign: 'middle' }}>
            <Nav.Item>
              <Button
                variant=""
                className="navbar-btn"
                onClick={() => setSearchModal(true)}
              >
                Search
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
