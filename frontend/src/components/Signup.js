import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before new request

    try {
        const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/signup`, formData);
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        {message && <p className="text-success">{message}</p>}
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
