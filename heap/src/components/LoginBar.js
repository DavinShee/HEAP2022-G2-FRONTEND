import React from 'react'
import { Link } from 'react-router-dom';


function LoginBar() {
  return (
    <div className='LoginBar'>
    <button>
        <Link to='/login'>Login</Link>
    </button>
    </div>
  )
}

export default LoginBar