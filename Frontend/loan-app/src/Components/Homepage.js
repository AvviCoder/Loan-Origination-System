import React from 'react'
import "./Homepage.css"
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div className='homepage'>
        <h1>Welcome to the Homepage</h1>
        <div className='nav-links'>
            <Link to="/login" className='nav-link'>Log In</Link>
            <Link to="/signup" className='nav-link'>Sign Up</Link>
            <Link to="/Loan" className='nav-link'>Loan form application</Link>
        </div>
    </div>
  );
};

export default Homepage