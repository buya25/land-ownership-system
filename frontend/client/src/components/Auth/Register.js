import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'landowner' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted');
    try {
        
      const res = await axios.post(`http://localhost:4000/api/auth/register`, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
      <select name="role" value={formData.role} onChange={onChange}>
        <option value="landowner">Landowner</option>
        <option value="buyer">Buyer</option>
        <option value="official">Official</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;