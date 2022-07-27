import { useContext, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import useFetch from '../hooks/useFetch.js';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import signoutbackground from '../images/Home_bg.png';
import signinbackground from '../images/Search_bg.png';

const Home = () => {
  const { data, loading, error } = useFetch(databaseURLs.search);
  const { user } = useContext(UserContext);
  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);
  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  let loggedOutHome = (
    <div
      className="home"
      style={{
        backgroundImage: `url(${signoutbackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: '750px',
        // backgroundSize:'contain', //tochoose
        height: '85vh',
        marginRight: '100px'
      }}
    >
      <div className="home-ctn1">
        <div className="home-1">Notes.</div>
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

  let loggedInHome = (
    <div
      style={{
        backgroundColor: 'red',
        backgroundImage: `url(${signinbackground})`,
        backgroundSize: '750px',
      }}
    >
      <div className="search-results">
        {loading && (
          <div className="loading">
            <Container>
              <Spinner animation="grow" variant="info" />
            </Container>
          </div>
        )}
        {error && <div>{error}</div>}
        {data && data.data && data.data.notes && !loading && !error && (
          <>
            {data && data.data && data.data.notes.length !== 0 ? (
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
              <>
                <h1>
                  Be the first to share your notes! Upload now by clicking{' '}
                  <Link to="/account/upload" style={{ textDecoration: 'none' }}>
                    this
                  </Link>
                  !
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );

  return <>{user ? loggedInHome : loggedOutHome}</>;
};

export default Home;
