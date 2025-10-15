import React, { useState } from 'react';
import '../css/Register.css';
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <form className="register-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="register-footer">
          Already have an account?{' '}
          <span
            className="login-text"
            onClick={() => navigate('/')}
          >
            Log in
          </span>
        </div>

        <p className="more-methods">Or register with</p>

        <div className="social-icons">
          <FaGoogle className="icon" />
          <FaApple className="icon" />
          <FaFacebookF className="icon" />
          <FaTwitter className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Register;
