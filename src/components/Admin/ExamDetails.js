import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const CreateExam = () => {
  const [courses, setCourses] = useState([]);
  // const [text, setText] = useState("hg");
  const [examList, setExamList] = useState([]);
  const [examDetails, setExamDetails] = useState({
    department: "",
    batch: "",
    year: "",
    semester: "",
    startingDate: "",
    endingDate: "",
    courseList: [],
  });
const {department,batch,year,semester,startingDate,endingDate,courseList}=examDetails
  // const changes = (e) => {
  //   setText(e.target.value);
  // };

  const addCourse = async () => {
    const response = await fetch("http://localhost:5000/api/exam/courselist", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department:  department,
        year:  year,
        semester:  semester
      })
    });
    const json = await response.json();
    const updatedCourses = json;

    setCourses(json);
    setExamDetails({
      ...examDetails,
      courseList: updatedCourses,
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
    const response = await fetch("http://localhost:5000/api/exam/examlists", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
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

    const response = await fetch("http://localhost:5000/api/exam/createexam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examDetails),
    });
    const json = await response.json();
    setExamList(examList.concat(json));
    setExamDetails({
      department: "",
      batch: "", 
      year:"",
      semester:"",
      startingDate: "", 
      endingDate: "",
      courseList: [],
    });
    console.log(examDetails);
    setCourses([]);
    // setText("");
    toast.success("New Exam is Added!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
            <div className="" style={{ width: "22rem" }}>
              {/* <input
                type="text"
                required
                className="form-control inputs"
                value={text}
                onChange={changes}
              /> */}
              

              <form onSubmit={createExams}>
                <div className="mb-3">
                  <label
                    htmlFor="department"
                    className="form-label fw-semibold"
                  >
                    Department
                  </label>
                  <input
                    className="form-control inputs"
                    list="datalistOptions"
                    id="department"
                    placeholder="Department Name"
                    onChange={handleChanges}
                    value={ department}
                    required
                  />
                  <datalist id="datalistOptions">
                    <option value="IIT" />
                    <option value="CSE" />
                    <option value="Mathematics" />
                    <option value="Physics" />
                    <option value="Statistics" />
                  </datalist>
                </div>
                <div className="mb-3">
                  <label htmlFor="batch" className="form-label fw-semibold">
                    Batch
                  </label>
                  <select
                    onChange={handleChanges}
                    className="form-control inputs"
                    id="batch"
                    placeholder="Batch"
                    value={ batch}
                    required
                  >
                    <option>Select Batch</option>
                    <option>47</option>
                    <option>48</option>
                    <option>49</option>
                    <option>50</option>
                    <option>51</option>
                  </select>
                </div>
                <div class=" mt-4 mb-3">
                  <li class="list-group-item fs-5">
                    <label
                      for="coursespleFormControlInput1"
                      className="form-label fw-semibold fs-5"
                    >
                      Year:&nbsp;&nbsp;{" "}
                    </label>
                    <input
                      type="radio"
                      onChange={handleChanges}
                      id="year"
                      name="year"
                      value="1st"
                    />
                    &nbsp;
                    <label for="1st">1st&nbsp;&nbsp;</label>
                    <input
                      type="radio"
                      id="year"
                      onChange={handleChanges}
                      name="year"
                      value="2nd"
                    />
                    &nbsp;
                    <label for="2nd">2nd&nbsp;&nbsp;</label>
                    <input
                      type="radio"
                      id="year"
                      name="year"
                      onChange={handleChanges}
                      value="3rd"
                    />
                    &nbsp;
                    <label for="3rd">3rd&nbsp;&nbsp;</label>
                    <input
                      type="radio"
                      id="year"
                      name="year"
                      onChange={handleChanges}
                      value="4th"
                    />
                    &nbsp;
                    <label for="4th">4th&nbsp;&nbsp;</label>
                  </li>
                  <li class="list-group-item fs-5">
                    {" "}
                    <label
                      for="coursespleFormControlInput1"
                      className="form-label fw-semibold "
                    >
                      Semester:&nbsp;&nbsp;{" "}
                    </label>
                    <input
                      type="radio"
                      onChange={handleChanges}
                      id="semester"
                      name="semester"
                      value="1st"
                    />
                    &nbsp;
                    <label for="1st">1st&nbsp;&nbsp;</label>
                    <input
                      type="radio"
                      id="semester"
                      onChange={handleChanges}
                      name="semester"
                      value="2nd"
                    />
                    &nbsp;
                    <label for="2nd">2nd&nbsp;&nbsp;</label>{" "}
                  </li>
                </div>
                <button
                disabled={ year==="" || department===""}
                className="btn btn-dark mb-4 w-100"
                onClick={addCourse}
              >
                Add Courses
              </button>

              <table
                className="table table-sm  table-responsive-sm mb-3 text-center fw-semibold"
                style={{ border: "2px solid" }}
              >
                <thead>
                  <tr className="bg-light">
                    <th scope="col">Course Code</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((index, id) => {
                    return (
                      <tr
                        className={`${
                          id % 2 === 0
                            ? "bg-dark text-light"
                            : "bg-light text-dark"
                        }`}
                        key={id}
                      >
                        <td>{index}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

                <div className="mb-3 mt-4">
                  <label
                    htmlFor="startingDate"
                    className="form-label fw-semibold"
                  >
                    Application Starting Date
                  </label>
                  <input
                    type="date"
                    onChange={handleChanges}
                    className="form-control inputs"
                    id="startingDate"
                    placeholder="Starting Date "
                    required
                    value={ startingDate}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="endingDate"
                    className="form-label fw-semibold"
                  >
                    Application Ending Date
                  </label>
                  <input
                    type="date"
                    onChange={handleChanges}
                    required
                    className="form-control inputs"
                    id="endingDate"
                    placeholder="Ending Date "
                    value={ endingDate}
                  />
                </div>
                <button type="submit" disabled={department===""||year===""||batch===""||semester===""||startingDate===""||endingDate===""||courseList.length===0} className="btn btn-dark w-100">
                  Create Exam
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <h2>Upcoming Exam List</h2>
            <table
              className="table table-sm  table-responsive-sm text-center fw-semibold"
              style={{ border: "2px solid" }}
            >
              <thead>
                <tr className="bg-light">
                  <th scope="col">Department</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Starting Date</th>
                  <th scope="col">Ending Date</th>
                </tr>
              </thead>
              <tbody>
                {examList.map((index, id) => {
                  return (
                    <tr
                      className={`${
                        id % 2 === 0
                          ? "bg-dark text-light"
                          : "bg-light text-dark"
                      }`}
                      key={id}
                    >
                      <td>{index.department}</td>
                      <td>{index.batch}</td>
                      <td>{index.startingDate}</td>
                      <td>{index.endingDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateExam;
