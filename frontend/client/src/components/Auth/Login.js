import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/sign-in.css';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from context

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before login attempt

    try {
      await login(formData.email, formData.password); // Call login function from context
    } catch (err) {
      if (!err.response) {
        // Network error or connection issue
        setError('Network error. Please check your connection and try again.');
      } else if (err.response.status === 401) {
        // Invalid credentials
        setError('Invalid credentials. Please try again.');
      } else {
        // Other server errors
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={onSubmit}>
          <img className="mb-4" src={logo} alt="Logo" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={onChange}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-body-secondary">© 2024</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
