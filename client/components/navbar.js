import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Button } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav className="nav-container">
      <Link to="/home">
        <h2 className="logo-text">STOCKIFY</h2>
      </Link>
      {isLoggedIn ? (
        <div className="login-group">
          {/* Buttons visible after log in */}
          <Link to="/home">
            <Button color="orange">Portfolio</Button>
          </Link>
          <Link to="/transactions">
            <Button color="orange">Transactions</Button>
          </Link>
          <Button color="teal" onClick={handleClick}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="login-group">
          {/* Buttons visible before log in */}
          <Link to="/login">
            <Button color="teal">Login</Button>
          </Link>

          <Link to="/signup">
            <Button color="orange">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
