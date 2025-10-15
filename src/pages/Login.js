import React from 'react';
import '../css/Login.css';
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Account Log In</h2>

        <form className="login-form">
          <input type="text" placeholder="Username or Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>

        <div className="login-footer">
          <a href="#" className="help-text">Having problems?</a>
          <Link to="/register" className="register-text">Register now</Link>
        </div>

        <p className="more-methods">More Login Methods</p>

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

export default Login;
