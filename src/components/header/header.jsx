import React from 'react';
// import { FaUser } from 'react-icons/fa'; // Import the login icon
import './header.css'; // Import CSS for styling

const Header = ({ loggedIn, onLogin, onLogout }) => {
  return (
    <header style={{zIndex:'1000'}}>
      <h1>Website Header</h1>
      {loggedIn ? (
        <div className="login-icon" onClick={onLogout}>
          Logout
        </div>
      ) : (
        <div className="login-icon" onClick={onLogin}>
           <span>&#128100;</span> {/* Render the login icon */}
        </div>
      )}
    </header>
  );
};

export default Header;