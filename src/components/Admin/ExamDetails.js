

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const CreateExam = () => {
  const [courses, setCourses] = useState([]);
  const [text, setText] = useState('');
  const [examList, setExamList] = useState([]);
  const [examDetails, setExamDetails] = useState({
    department: "",
    batch: "",
    startingDate: "",
    endingDate: "",
    courseList: [],
  });

  const changes = (e) => {
    setText(e.target.value);
  };

  const addCourse = () => {
    const updatedCourses = [...courses, text];
    setCourses(updatedCourses)
    setExamDetails({
      ...examDetails,
      courseList:updatedCourses,
    });
    console.log(courses);
  };

  const handleChanges = (e) => {
    setExamDetails({
      ...examDetails, 
      [e.target.id]: e.target.value,
    });
  };

  const allExams = async () => {
    const response = await fetch('http://localhost:5000/api/exam/examlists', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setExamList(json);
  };

  useEffect(() => {
    allExams();
  }, []);

  const createExams = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/exam/createexam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(examDetails),
    });
    const json = await response.json();
    setExamList(examList.concat(json));
    setExamDetails({
      department: "",
      batch: "",
      startingDate: "",
      endingDate: "",
      courseList: [],
    });
    console.log(examDetails)
 setCourses([])
 setText("")
    toast.success('New Exam is Added!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   
  };
 
  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
            <div className='' style={{ width: "22rem" }}>
              <input type="text" required className="form-control inputs" value={text} onChange={changes} />
              <button disabled={text.length===0} className="btn btn-dark mt-3 mb-3" onClick={addCourse}>Add Courses</button>

              <table className="table table-sm  table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Course Code</th>
                  
                </tr>
              </thead>
              <tbody>
                {courses.map((index, id) => {
                  return (
                    <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>
                      <td>{index}</td>
                      
                    </tr>
                  )
                })}
              </tbody>
            </table>

              <form onSubmit={createExams}>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label fw-semibold">Department</label>
                  <input className="form-control inputs" list="datalistOptions" id="department" placeholder="Department Name" onChange={handleChanges} value={examDetails.department} required />
                  <datalist id="datalistOptions">
                    <option value="IIT" />
                    <option value="CSE" />
                    <option value="Mathematics" />
                    <option value="Physics" />
                    <option value="Statistics" />
                  </datalist>
                </div>
                <div className="mb-3">
                  <label htmlFor="batch" className="form-label fw-semibold">Batch</label>
                  <select onChange={handleChanges} className="form-control inputs" id="batch" placeholder="Batch" value={examDetails.batch} required>
                    <option>Select Batch</option>
                    <option>47</option>
                    <option>48</option>
                    <option>49</option>
                    <option>50</option>
                    <option>51</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="startingDate" className="form-label fw-semibold">Application Starting Date</label>
                  <input type="date" onChange={handleChanges} className="form-control inputs" id="startingDate" placeholder="Starting Date " required value={examDetails.startingDate} />
                </div>
                <div className="mb-3">
                  <label htmlFor="endingDate" className="form-label fw-semibold">Application Ending Date</label>
                  <input type="date" onChange={handleChanges} required className="form-control inputs" id="endingDate" placeholder="Ending Date " value={examDetails.endingDate} />
                </div>
                <button type="submit" className="btn btn-dark">Create Exam</button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <h2>Upcoming Exam List</h2>
            <table className="table table-sm  table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Department</th>
                  <th scope="col" >Batch</th>
                  <th scope="col" >Starting Date</th>
                  <th scope="col" >Ending Date</th>
                </tr>
              </thead>
              <tbody>
                {examList.map((index, id) => {
                  return (
                    <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>
                      <td>{index.department}</td>
                      <td>{index.batch}</td>
                      <td>{index.startingDate}</td>
                      <td>{index.endingDate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default CreateExam;
 