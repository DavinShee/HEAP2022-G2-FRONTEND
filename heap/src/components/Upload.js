import React from 'react'
import { Link } from 'react-router-dom';


function Upload() {
  return (
    <div className='Upload'>
        <nav>
            <Link to='/seller'><button href=''>Upload</button></Link>
        </nav>
    </div>
  )
}

export default Upload