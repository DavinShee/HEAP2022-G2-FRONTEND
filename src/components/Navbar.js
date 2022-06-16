import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/">
        <h1>Notes</h1>
      </Link>
      <div className="search">
        <form action="/buyer" method="get">
          <label>
            Mod:
            <input type="text" name="mod-id" />
          </label>
          <label>
            Prof:
            <input type="text" name="prof-id" />
          </label>
          <button>Submit</button>
        </form>
      </div>
      <div className="links">
        <Link to="/login" className="buttons">
          Upload
        </Link>
        <Link to="/login" className="buttons">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
