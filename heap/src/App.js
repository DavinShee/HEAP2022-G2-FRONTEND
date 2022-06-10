import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Seller from './components/pages/Seller';
import Buyer from './components/pages/Buyer';
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import ErrorPage from './components/pages/ErrorPage';
/*import ModBar from './components/ModProfBar';
import LoginBar from './components/LoginBar';
import Upload from './components/Upload';*/
import Login from './components/pages/Login';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/buyer/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
