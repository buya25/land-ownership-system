import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import HomePage from './components/Dashboard/Home';
import RegisterLandPage from './components/LandManagement/RegisterLandParcel';
import UpdateLandPage from './components/LandManagement/UpdateLandParcel';
import TransferOwnershipPage from './components/LandManagement/TransferOwnershipPage';
import ParcelDetailsPage from './components/LandManagement/ParcelDetailsPage';
import ViewAllLandParcels from './components/LandManagement/ViewAllLandParcel';
import ContactList from './components/Examples/Example';
import NavBar from './components/Navigation/NavBar';
import { isAuthenticated } from './utils/auth';
import { AuthProvider } from './context/AuthContext';
import UserDetailsPage from './components/LandManagement/UserDetails';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isAuthenticated();

      setIsLoggedIn(loggedIn);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  return (
    <AuthProvider>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/land/register" element={<RegisterLandPage />} />
        <Route path="/land/update" element={<UpdateLandPage />} />
        <Route path="/land/transfer" element={<TransferOwnershipPage />} />
        <Route path="/land/details" element={<ParcelDetailsPage />} />
        <Route path="/land/view-all" element={<ViewAllLandParcels />} />
        <Route path="/user-details" element={<UserDetailsPage />} />
        <Route path="/hero" element={<ContactList />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
