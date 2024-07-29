import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    navigate("/products")
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={"/signup"}>Create Account here___</Link>
      <ToastContainer />

    </div>
  );
};

export default LoginPage;
