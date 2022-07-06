import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Seller from './components/pages/Seller';
import Buyer from './components/pages/Buyer';
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import ErrorPage from './components/pages/ErrorPage';
import NavigationBar from './components/pages/NavigationBar';
import { UserContext } from './components/UserContext';
import { useState, useMemo } from 'react';
import background from './Images/opensea.jpg';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        // width: '100vw',
        // maxWidth: '1080px',
        backgroundSize: 'cover',
        height: '100vh',
        backgroundAttachment: 'fixed' // how to make the img max size fixed??
      }}
    >
      <Router>
        <UserContext.Provider value={providerValue}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/buyer" element={<Buyer />} />
            <Route path="/buyer/details" element={<Details />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
