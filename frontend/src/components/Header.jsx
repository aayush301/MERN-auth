import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoutUser } from '../api';

const Header = () => {
  const auth = useSelector(state => state.authReducer);
  const { user, isLoggedIn } = auth;

  const handleLogout = async () => {
    const res = await logoutUser();
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  }

  return (
    <header>
      <div>
        <h1><Link to="/">MERN auth</Link></h1>
      </div>

      <ul>
        {isLoggedIn ? (
          <ul className="drop-nav">
            <li><Link to="/dashboard">{user.name}</Link></li>
            <ul className="dropdown">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </ul>
        ) : (
          <li><Link to="/auth/login"><i className="fas fa-user"></i>Login</Link></li>
        )}
      </ul>
    </header>
  )
}

export default Header;