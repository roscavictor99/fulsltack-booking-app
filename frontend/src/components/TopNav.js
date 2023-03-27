import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const TopNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector(state => state);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('auth');
    history.push('/');
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      {auth && (
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      )}

      {auth && (
        <button
          style={{ border: 'none', backgroundColor: 'inherit' }}
          className="nav-link"
          onClick={logout}
        >
          Logout
        </button>
      )}

      {!auth && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
