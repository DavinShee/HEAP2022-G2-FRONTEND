import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { UserContext } from '../UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  const [showSignupModal, setSignupModal] = useState(false);
  const handleShowSignup = () => setSignupModal(true);
  const [showLoginModal, setLoginModal] = useState(false);
  const handleShowLogin = () => setLoginModal(true);

  return (
    <>
      {/* TEST */}
      USER EMAIL: {user ? user.email : 'NO USER'}
      <br />
      USER PASSWORD: {user ? user.password : 'NO USER'}
      {/* TEST */}
      <br />
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
};

export default Home;
