import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Search from './pages/Search';
import NoteDetails from './pages/NoteDetails';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import NavigationBar from './components/NavigationBar';
import { UserContext } from './components/UserContext';
import { useEffect, useState, useMemo } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    let fetchedUser = JSON.parse(localStorage.getItem('user'));
    if (fetchedUser) {
      setUser(fetchedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="App">
      <div className="push"></div>
      <Router>
        <UserContext.Provider value={providerValue}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<Search />} />
            <Route path="/note/:id" element={<NoteDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
