import React from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiLogIn, FiLogOut } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown } from 'react-bootstrap';

import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Access context
  const unreadNotifications = 2;
  const notifications = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
  ];

  
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
            {/* <li><Link to="/features" className="nav-link px-2 text-white">Features</Link></li> */}
            <li><Link to="/pricing" className="nav-link px-2 text-white">Contact</Link></li>
            <li><Link to="/faqs" className="nav-link px-2 text-white">FAQs</Link></li>
            <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="d-flex align-items-center text-end">
            {isLoggedIn ? (
              <>
              <Dropdown>
                  <Dropdown.Toggle
                    as="button"
                    className="btn btn position-relative me-2"
                    id="dropdown-custom-components"
                  >
                    <FiBell size={20} />
                    {unreadNotifications > 0 && (
                      <span className="position-absolute top-50 start-80 translate-middle badge rounded-pill bg-danger">
                        {unreadNotifications}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="dropdown-menu-custom"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <Dropdown.Item key={index} href="#">
                          {notification}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No notifications</Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item href="/notifications">
                      View All
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle as="a" className="d-block link-body-emphasis text-decoration-none">
                    <img src="https://github.com/mdo.png" alt="User Avatar" width="32" height="32" className="rounded-circle" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item href="#">New project...</Dropdown.Item>
                    <Dropdown.Item href="#">Settings</Dropdown.Item>
                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={logout}>Sign out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  <FiLogIn size={20} /> Login
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Sign-up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
