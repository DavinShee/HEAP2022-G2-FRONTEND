import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Search from './pages/Search';
import NoteDetails from './pages/NoteDetails';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import NavigationBar from './components/NavigationBar';
import { UserContext } from './components/UserContext';
import { useEffect, useState, useMemo } from 'react';
import Downloaded from './pages/Downloaded';
import PrivateRoutes from './components/PrivateRoutes';
import Update from './pages/Update';

function App() {
  // Provides the other Routes the user state
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // Anytime the page is refreshed, adds the user state back into the Context
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
      <Router>
        <UserContext.Provider value={providerValue}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<PrivateRoutes />}>
              <Route path="/account/downloaded" element={<Downloaded />} />
              <Route path="/account/upload" element={<Upload />} />
            </Route>
            <Route path="/note/:id" element={<NoteDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
