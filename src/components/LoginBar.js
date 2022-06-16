import React from 'react';
import { Link } from 'react-router-dom';

function LoginBar() {
  return (
    <div className="LoginBar">
      <Link to="/">
        <h1>Notes</h1>
      </Link>
      <div className="search">
        <form>
          <label>
            Mod:
            <input type="text" />
          </label>
          <br />
          <label>
            Prof:
            <input type="text" />
          </label>
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

export default LoginBar;
