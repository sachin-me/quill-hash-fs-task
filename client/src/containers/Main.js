import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="main-wrapper">
      <Link to='/register'>Create an account</Link>
      <Link to='/login'>Login</Link>     
    </div>
  )
}

export default Main;