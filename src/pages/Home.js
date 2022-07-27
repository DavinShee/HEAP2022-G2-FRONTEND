import { useContext, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import useFetch from '../hooks/useFetch.js';
import signOutBackground from '../images/Home_bg.png';
import signInBackground from '../images/Search_bg.png';

const Home = () => {
  const { data, loading, error } = useFetch(databaseURLs.search);
  const { user } = useContext(UserContext);
  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);
  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  // Logged out view
  let loggedOutHome = (
    <div
      className="home"
      style={{
        backgroundImage: `url(${signOutBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: '750px',
        height: '85vh',
        marginRight: '100px'
      }}
    >
      <div className="home-ctn1">
        <div className="home-1">NotesNow.</div>
        <div className="home-2">
          Your one-stop marketplace to all things great.
        </div>
      </div>

      <div className="home-ctn2">
        <Button
          variant
          className="home-signup-button"
          onClick={handleShowSignup}
        >
          <div className="home-signup-text">Signup</div>
        </Button>
        <Button variant className="home-login-button" onClick={handleShowLogin}>
          <div className="home-login-text">Login</div>
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
      </div>
    </div>
  );

  // Logged in view
  let loggedInHome = (
    <div
      style={{
        backgroundImage: `url(${signInBackground})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="search-results">
        {/* To be displayed while loading */}
        {loading && (
          <div className="loading">
            <Container>
              <Spinner animation="grow" variant="info" />
            </Container>
          </div>
        )}
        {/* To be displayed when an error has occurred fetching data */}
        {error && <div>{error}</div>}
        {/* Display once data has been fetched */}
        {data && data.data && data.data.notes && !loading && !error && (
          <>
            {data && data.data && data.data.notes.length !== 0 ? (
              // To be displayed when there are notes in the DB
              <>
                <div className="recent-ctn">
                  <div className="recently-uploaded">
                    Recently uploaded (
                    <Link to="/search" style={{ textDecoration: 'none' }}>
                      View all
                    </Link>
                    )
                  </div>
                </div>
                <CardList notes={data.data.notes.slice(0, 6)} />
              </>
            ) : (
              // To be displayed when there are NO notes in the DB
              <Container>
                <h1>
                  <Row>
                    <Col xs={3}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7465/7465691.png"
                        alt="No Results!"
                        height={'100px'}
                      />
                    </Col>
                    <Col>
                      Be the first to share your notes!
                      <br />
                      Upload now by clicking{' '}
                      <Link
                        to="/account/upload"
                        style={{ textDecoration: 'none' }}
                      >
                        this
                      </Link>
                      !
                    </Col>
                  </Row>
                </h1>
              </Container>
            )}
          </>
        )}
      </div>
    </div>
  );

  return <>{user ? loggedInHome : loggedOutHome}</>;
};

export default Home;
