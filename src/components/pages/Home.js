import { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { databaseURLs } from '../../URLConstants';
import useFetchNotes from '../useFetchNotes';
import { UserContext } from '../UserContext';
import CardList from '../CardList';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

const Home = () => {
  const { data, loading, error } = useFetchNotes(databaseURLs.search);
  const { user } = useContext(UserContext);

  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);
  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  let notes = data;
  useEffect(() => {
    console.log('BEFORE:', notes.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    notes = data;
    console.log('AFTER :', notes.data);
  }, [data]);

  let loggedOutHome = (
    <>
      <div className="home-1">Notes.</div>
      <div className="home-2">
        Your one-stop marketplace to all things great.
      </div>
      <Button variant="info" onClick={handleShowSignup}>
        Signup
      </Button>
      <Button variant="info" onClick={handleShowLogin}>
        Login
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

  // ???
  let loggedInHome = (
    <div className="search-results">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {notes.data.notes.length && (
            <>
              <h1>
                Recently uploaded (
                <Link to="/search" style={{ textDecoration: 'none' }}>
                  View all
                </Link>
                )
              </h1>
              <CardList notes={notes.data.notes.slice(0, 6)} />
            </>
          )}
        </>
      )}
    </div>
  );
  // ???

  return <>{user ? loggedInHome : loggedOutHome}</>;
};

export default Home;
