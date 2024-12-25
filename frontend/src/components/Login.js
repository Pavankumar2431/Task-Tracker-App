import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/tasks');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
  
    setIsLoading(true); // Show loading spinner
    try {
      const response = await axios.post(`${apiUrl}/login`, formData);
      const token = response.data?.token; // Use optional chaining to safely access token
      if (token) {
        localStorage.setItem('authToken', token); // Store token in localStorage
        onLogin(token); // Notify parent component of login
        navigate('/tasks'); // Redirect to tasks page
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex align-items-center">
          {isLoading ? (
            <div className="spinner-border text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          )}
        </div>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
