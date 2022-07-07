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

function App() {
  const [user, setUser] = useState(false);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  

  return (
    <div
      className="App"
    >
      <div className='push'></div>
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
