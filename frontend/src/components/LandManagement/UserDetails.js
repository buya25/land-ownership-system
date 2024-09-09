import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/UserDetailsPage.css'; // Import custom CSS for animations

const UserDetailsPage = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    dateRegistered: "2024-09-09",
    location: "1234 Elm Street, Some City, Some Country",
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleEditClick = () => {
    navigate('/edit-user'); // Navigate to the edit user page
  };

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
