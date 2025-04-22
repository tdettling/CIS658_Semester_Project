/*
L Dettling 
CIS 658 Project

Sources for this file:
https://dev.to/annaqharder/hideshow-password-in-react-513a

https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state

*/



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuEyeClosed } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmVisible, setConfirmVisible] = useState(false);


  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    } else if (!confirmPassword) {
      setError("Please confirm your password");
      return false;
    } else if (username === password) {
      setError("Username and Password need to be different");
      return false;
    } else if (password !== confirmPassword) {
      setError("Password and Confirmation Password do not match.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const userDetails = {
      username,
      password,
    };

    try {
      // Register the user (JSON)
      const registerRes = await fetch('https://itp-backend-9b63ec0fd93f.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!registerRes.ok) {
        const errorData = await registerRes.json();
        setError(errorData.detail || 'Registration failed.');
        setLoading(false);
        return;
      }

      // Auto-login (form-encoded)
      const formDetails = new URLSearchParams();
      formDetails.append('username', username);
      formDetails.append('password', password);

      const loginRes = await fetch('https://itp-backend-9b63ec0fd93f.herokuapp.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setError(loginData.detail || 'Login failed.');
      } else {
        localStorage.setItem('token', loginData.access_token);
        navigate('/Home');
      }

    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <h1 className="login-page-title">Technology Acquisition <span className="turbo-wave">TURBO</span></h1>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Sign up to Continue</h2>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <span onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <TbEyeCheck size={20} /> : <LuEyeClosed size={20} />}
            </span>
            </div>


          <label htmlFor="confirm_password">Confirm Password:</label>
          <div className="password-wrapper">
            <input
                type={confirmVisible ? 'text' : 'password'}
                id="confirm_password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
            />
            <span onClick={() => setConfirmVisible(!confirmVisible)}>
                {confirmVisible ? <TbEyeCheck size={20} /> : <LuEyeClosed size={20} />}
            </span>
            </div>


          <button type="submit" disabled={loading}>
            {loading ? 'Signing You Up...' : 'Sign Up!'}
          </button>

          {error && (
            <div className="login-error">
              {Array.isArray(error)
                ? error.map((err, idx) => <p key={idx}>{err.msg}</p>)
                : <p>{error}</p>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
