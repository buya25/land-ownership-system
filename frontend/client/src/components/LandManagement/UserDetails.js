import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/UserDetailsPage.css';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('/edit-user');
  };

  if (!user) {
    return (
      <div className="container mt-4 vh-100 fade-in">
        <div className="alert alert-danger">
          No user data available. Please navigate from the appropriate page.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 vh-100 fade-in">
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-light me-2 shadow-sm" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
        <h2 className="flex-grow-1 text-center">User Details</h2>
        <button className="btn btn-primary shadow-sm" onClick={handleEditClick}>
          <FaEdit /> Edit
        </button>
      </div>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Username:</strong> {user.username}</p>
          <p className="card-text"><strong>Date Registered:</strong> {new Date(user.dateRegistered).toLocaleDateString()}</p>
          <p className="card-text"><strong>Location:</strong> {user.location.length > 30 ? `${user.location.substring(0, 30)}...` : user.location}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
