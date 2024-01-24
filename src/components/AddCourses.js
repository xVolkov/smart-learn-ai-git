import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import settings from './assets/settings.png';
import profile from './assets/profile.png';
import '../styles.css'; // Import the CSS file

const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  //const [instructorName, setInstructorName] = useState('');
  const [yearSemester, setYearSemester] = useState('');
  const [totalStudents, setTotalStudents] = useState('');
// Error Checking / Input Validation:
  const [courseNameError, setCourseNameError] = useState('');
  const [courseCodeError, setCourseCodeError] = useState('');
  //const [instructorNameError, setInstructorNameError] = useState('');
  const [yearSemesterError, SetYearSemesterError] = useState('');
  const [totalStudentsError, setTotalStudentsError] = useState('');

  const [serverResponse, setServerResponse] = useState(''); // Displays python flask server response
  const navigate = useNavigate(); // Hook for navigation

  function validateForm() {
    let isValid = true;
    if (!courseName) {
      setCourseNameError('Please enter the course name');
      isValid = false;
    } else {setCourseNameError('');}

    if (!courseCode) {
      setCourseCodeError('Please enter the course code');
      isValid = false;
    } else {setCourseCodeError('');}

    /*if (!instructorName) {
      setInstructorNameError('Please enter the instructor name');
      isValid = false;
    } else {setInstructorNameError('');}
    */

    if (!yearSemester){
      SetYearSemesterError("Please enter the year & semester");
      isValid = false;
    } else {SetYearSemesterError('');}

    if (!totalStudents) {
      setTotalStudentsError('Please enter the total number of students');
      isValid = false;
    } else {setTotalStudentsError('');}

    return isValid;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    const teacherID = sessionStorage.getItem('userID');
    alert('Logged-in User ID: ' + sessionStorage.getItem('userID'));
    if (!teacherID) {
      alert('No user ID found in session storage');
      return;
    }

    if (validateForm()) {
        const courseData = {
            teacherID,
            courseName,
            courseCode,
            //instructorName,
            yearSemester,
            totalStudents,
          };

        try{ // Contacting the flask server and sending the user data
            const response = await fetch('http://localhost:5000/add-course', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok) {
            // Handle successful registration
            const jsonResponse = await response.json();
            console.log(jsonResponse.message);
            setServerResponse(jsonResponse.message);
            alert('Course successfully added to the database.');
            navigate('/home-teacher'); // Redirect user to RegisterConfirmation page
          } else {
            // Handle HTTP errors
            const jsonResponse = await response.json();
            console.log(jsonResponse.message);
            setServerResponse(jsonResponse.message);
            //alert('Registration failed. Please try again.');
            console.error('Failed to add course.');
            }
        } catch (error) {
            // Handle network errors
            setServerResponse('An error occurred while adding the course to the database.');
            //alert('An error occurred during registration.');
            console.error('Network error:', error);
        }
    } else {
        setServerResponse('Please fill out all fields correctly');
        
    };
  };

  return (
    <div>
      <header className="AppHeader">
        <div className="AppHeaderLeft">
          <img src={logo} alt="logo" className="LogoIcon" />
          <p>SmartLearnAI</p>
        </div>
        <div className="AppHeaderRight">
          <img src={profile} alt="profile" className="ProfileIcon" />
          <p className="HiTeacherText">Hi Teacher_Name!</p>
          <img src={settings} alt="settings" className="SettingIcon" />
        </div>
      </header>
      <header className="SecondHeader">
        <p>Add a Course</p>
      </header>
      <div className="add-course-form">
        <h1>Adding a Course</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Course Name:
            <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            <span className="error-message">{courseNameError}</span>
          </label>
          <label>
            Course Code:
            <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
            <span className="error-message">{courseCodeError}</span>
          </label>

          <label>
            Year & Semester (YYYY/SEMESTER):
            <input type="text" value={yearSemester} onChange={(e) => setYearSemester(e.target.value)} />
            <span className="error-message">{yearSemesterError}</span>
          </label>
          <label>
            Total Number of Students:
            <input type="number" value={totalStudents} onChange={(e) => setTotalStudents(e.target.value)} />
            <span className="error-message">{totalStudentsError}</span>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;