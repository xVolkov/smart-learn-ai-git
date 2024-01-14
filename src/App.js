import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import LoginTeacher from './components/LoginTeacher';
import LoginStudent from './components/LoginStudent';
import RegisterTeacher from './components/RegisterTeacher';
import RegisterStudent from './components/RegisterStudent';
import RegistrationConfirmation from './components/RegistrationConfirmation';
import Register from './components/Register';
import Home from './components/Home';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login-teacher" element={<LoginTeacher />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher/>} />
        <Route path="/register-student" element={<RegisterStudent/>} />
        <Route path="/registeration-confirmation" element={<RegistrationConfirmation/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
