import { useState } from 'react';
import './App.css';
import AdminLogin from './components/Admin/AdminLogin';
import CreateExam from './components/Admin/ExamDetails';
import Home from './components/Admin/Home';
import StudentList from './components/Admin/StudentList';
import StudentsInfo from './components/Admin/StudentsInfo';
import Login from './components/Login';
import Apply from './components/Student/Apply';
import Contact from './components/Student/Contact';
import Profile from './components/Student/Profile';

import {
  BrowserRouter,
  Route,
  Routes
  
} from "react-router-dom";

function App() {
  const [details, setDetails] = useState(1);
  return (
    <div className="">
      
      <BrowserRouter>
      
      <Routes>
      <Route path='/' element={<Login details={details} setDetails={setDetails} />} />
      {/* //admin */}
      <Route path='/admin/login' element={<AdminLogin /> } />
        <Route path='/admin/home' element={<Home />} />
        <Route path='/admin/studentsinfo' element={ <StudentsInfo />} />
        <Route path='/admin/studentlist' element={<StudentList /> } />
        <Route path='/admin/examdetails' element={<CreateExam /> } />

        {/* student */}
        <Route path='/student/profile' element={ <Profile />} />
        {/* <Route
  path={`/student/userinfo/${details.registrationNo}`}
  element={<Profile details={details} />}/> */}


        <Route path='/student/apply' element={<Apply /> } />
        <Route path='/student/contact' element={<Contact /> } />
        {/* <Route path='/student/admitcard' element={<AdmitCard /> } /> */}
        {/* <Route path='/student/download' element={<Download /> } /> */}
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
