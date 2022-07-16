import { useContext, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Home = () => {
  const { data, loading, error } = useFetch(databaseURLs.search);
  const { user } = useContext(UserContext);

  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);
  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  let loggedOutHome = (
    <>
      <div className="home-1">Notes.</div>
      <div className="home-2">
        Your one-stop marketplace to all things great.
      </div>

      <Button variant className="home-signup-button" onClick={handleShowSignup}>
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
    </>
  );

  let loggedInHome = (
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
          {data && data.data && data.data.notes.length && (
            <>
              <h1>
                Recently uploaded (
                <Link to="/search" style={{ textDecoration: 'none' }}>
                  View all
                </Link>
                )
              </h1>
              <CardList notes={data.data.notes.slice(0, 6)} />
            </>
          )}
        </>
      )}
    </div>
  );

  return <>{user ? loggedInHome : loggedOutHome}</>;
};

export default Home;
