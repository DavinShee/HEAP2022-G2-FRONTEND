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
      <div className="home-1">Notes.</div>
      <div className="home-2">Your one-stop marketplace to all things great.</div>


    {/*}
      <br />
      HOME
      <br />home<br />home<br />home<br />home<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      {/* Recently uploaded?
          Sort by date: https://www.delftstack.com/howto/javascript/sort-array-based-on-some-property-javascript/
          Get first X items: https://www.geeksforgeeks.org/how-to-get-first-n-number-of-elements-from-an-array-using-reactjs/ */}
      {/* TEST */}
      USER EMAIL: {user ? user.email : 'NO USER'}
      <br />
      USER PASSWORD: {user ? user.password : 'NO USER'}
      {/* TEST */}
      <br />
      <Button variant className='home-signup-button' onClick={handleShowSignup}>
        <div className='home-signup-text'>
        Signup
        </div>
      </Button>
      <Button  variant className='home-login-button' onClick={handleShowLogin}>
        <div className='home-login-text'>
        Login
        </div>
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
