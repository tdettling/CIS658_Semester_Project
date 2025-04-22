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



import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';  
import { FaDoorOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { useLocation, useSearchParams } from 'react-router-dom';
import '../Forms.css'


import { LuEyeClosed } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState('password');

    const navigate = useNavigate();


    const validateForm = () => {
        if (!username || !password){
            setError("Username and password are required");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!validateForm()){
            return;
        }

        setLoading(true);

        const formDetails = new URLSearchParams();
        formDetails.append('username', username);
        formDetails.append('password', password);

        try {
            const response = await fetch('https://itp-backend-9b63ec0fd93f.herokuapp.com//token', {
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    },

                body: formDetails, 
            });

            setLoading(false)

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, token:", data.access_token); 
                localStorage.setItem('token', data.access_token);
                setTimeout(() => navigate('/Home'), 50); 
              } else {
                const errorData = await response.json();
                console.log("Login error data:", errorData);

                if (Array.isArray(errorData.detail)) {
                    setError(errorData.detail);
                } else {
                    setError(errorData.detail || 'Authentication failed!');
                }


              }
              
        } catch (error) {
            setLoading(false);
            setError("An error occurred. Please try again later. ");
        }
    };

    return (
      <div className="login-page-wrapper">
        <h1 className="login-page-title">Technology Acquisition <span className="turbo-wave">TURBO</span></h1>
    
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Login to Continue</h2>
    
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
                type={type}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                {type === 'password' ? <LuEyeClosed size={20} /> : <TbEyeCheck size={20} />}
              </span>
            </div>
    
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
    
            {error && (
              <div className="login-error">
                {Array.isArray(error)
                  ? error.map((err, idx) => <p key={idx}>{err.msg}</p>)
                  : <p>{error}</p>}
              </div>
            )}
          </form>

          <div className="register-wrapper">
            <button
              onClick={() => navigate('/Register')}
              className="register-link-button"
            >
              Register here
            </button>
          </div>

        </div>
      </div>
    );
    
}

export default Login
