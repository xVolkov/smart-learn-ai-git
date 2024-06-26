import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import '../styles.css'; // Import the CSS file

function isValidEmail(email) {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

const LoginStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState(''); // Displays python flask server response
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async(event) => {
    event.preventDefault();
    const userType = "Student" // Set user type as "teacher" to allow access to teacher portal
    const inputEmail = event.target.email.value;

    if (isValidEmail(inputEmail)) {

      const userData = {
          email,
          password,
          userType,
        };

      try{ // Contacting the flask server and sending the user data
          const response = await fetch('http://localhost:5000/login-student', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      const server_userData = await response.json();

      if (response.status === 200) {
          // Handle successful login
          console.log(server_userData.message);
          setServerResponse(server_userData.message);
          sessionStorage.setItem('userType', userType); // Stores in session storage the type of user
          sessionStorage.setItem('userID', server_userData.userID); // Storing userID for logged in user
            //alert('Logged-in User ID: ' + sessionStorage.getItem('userID')); // #### DEBUG ####: PRINTS USER ID OF LOGGED-IN USER
          navigate('/home-student'); // Redirect user to RegisterConfirmation page
        } else {
          // Handle HTTP errors
          const server_userData = await response.json();
          console.log(server_userData.message);
          setServerResponse(server_userData.message);
          console.error('Failed to login.');
          }
      } catch (error) {
          // Handle network errors
          setServerResponse('An error occurred during login.');
          //alert('An error occurred during registration.');
          console.error('Network error:', error);
      }
  } else {
      setServerResponse('Please fill out all fields correctly');
      //alert('Please fill out all fields correctly');
  }
};

// Function to handle navigation to the Register page
const navigateToRegister = () => {
    navigate('/register-student'); // Navigate to the RegisterTeacher component
  };

// Function to handle navigation to forgot password page
const navigateToForgotPass = () => {
  navigate('/forgot-password');
}

  return (
    <div>
      <div className="header">
        <img src={logo} alt="logo" className="LogoIcon" />
        <h1>SmartLearnAI</h1>
      </div>

      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login as Student</h1>
          <input
            type="email"
            name="email" // Added name attribute to the input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            title="Please enter a valid email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-password-button" onClick={navigateToForgotPass}>Forgot Password?</button>
          <button type="button" className="register-button" onClick={navigateToRegister}>Register</button>
        </form>
      </div>
      <div className="server-response">
        {serverResponse && <p>{serverResponse}</p>}
      </div>
    </div>
  );
};

export default LoginStudent;