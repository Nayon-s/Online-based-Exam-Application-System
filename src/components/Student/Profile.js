
import React, { useEffect, useState } from 'react'; 
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
// import AdmitCard from './AdmitCard';
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
const Profile = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [examList, setExamlist]=useState([])
  const [courseStates, setCourseStates] = useState([]); 
  const [applicant, setApplicant] = useState(
    {
      department: "",
      batch: "",
      name: "",
      classRoll: "", 
      registrationNo:"",
      paymentStatus:"" 
    });
    const [allSelected, setAllSelected] = useState(false);
  const checkCourse = (courseId) => {
    const updatedStates = [...courseStates];
    updatedStates[courseId] = !updatedStates[courseId]; 
    setCourseStates(updatedStates);
  };

  const totalCourses = courseStates.filter((isChecked) => isChecked).length;

  const allExams=async()=>{
    const response= await fetch('http://localhost:5000/api/exam/examlistStudent',{
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department: location.state.id.department,
          batch: location.state.id.batch
      })

          })
    const json=await response.json()
    // console.log(json)
    
    setExamlist(json)

  }

  useEffect(() => {
    if (location.state && location.state.id) {
      setUserInfo(location.state.id);
      console.log(location.state.id)
      localStorage.setItem('studentState', JSON.stringify({ id: location.state.id }));
      setApplicant( 
        {
          department: location.state.id.department,
          batch: location.state.id.batch,
          name: location.state.id.name,
          classRoll: location.state.id.classRoll,
          registrationNo:location.state.id.registrationNo,
          paymentStatus:"false"
        }
      )
      
    } else {
      const savedState = JSON.parse(localStorage.getItem('studentState'));
      if (savedState && savedState.id) {
        setUserInfo(savedState.id);
      }
    }
    allExams()
     
  }, [location.state]);
  
  const toggleSelectAll = () => {
    const updatedStates = examList.reduce((acc, index) => {
      if (index.department === userInfo.department) {
        index.courseList.forEach((course, courseId) => {
          acc[courseId] = !allSelected;
        });
      }
      return acc;
    }, []);
    setCourseStates(updatedStates);
    setAllSelected(!allSelected);
  };
// console.log(userInfo)  
const apply= async ()=>{
  // setApplicant(
  //   {
  //     department: "userInfo.name",
  //     batch: "49",
  //     name: "userInfo.name",
  //     classRoll: "userInfo.classRoll"
  //   }
  // )
  const response = await fetch('http://localhost:5000/api/exam/addapplicants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department: userInfo.department,
          batch: "49",
          name: userInfo.name,
          classRoll: userInfo.classRoll,
          registrationNo:userInfo.registrationNo,
          paymentStatus:"false" 
      }),
    }); 
    const json = await response.json();
    //  setApplicant(json) 
    console.log(json)

  
    const data={
      name: userInfo.name,
      registrationNo: userInfo.registrationNo,
      classRoll: userInfo.classRoll,
      department: userInfo.department,
      batch:"49",
        total_amount: totalCourses*50 +120+650+320,
      paymentStatus:false
    
      
    }
       await fetch('http://localhost:5000/done', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( data )
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          window.open(result.url, '_blank');
        });


}


return (
    <div className=''>
      <Navbar />
      <div className="container  mt-4">
<div className="alert alert-info alert-dismissible fade show fs-5 fw-semibold text-center" role="alert">
  WELCOME, {userInfo ? userInfo.name : 'Guest'}!

</div>
 
        {userInfo && ( <div className="row mt-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-4 text-center">

    <div className="card studentCard d-block m-auto mb-5 text-center " style={{width: "22rem"}}>           

  <img src="https://img.freepik.com/free-vector/business-people-working-laptop-development_1262-18907.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=ais" className="card-img-top" alt="..."/>
  <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18514.jpg?w=2000" className='card-img-top img-fluid rounded-circle studentProfile' alt="" />
      <h5 className="card-title mt-3">{userInfo.name}</h5>

  <div className="card-body"> 
  
  <ul className="list-group list-group-flush">
    <li className="list-group-item bg-dark text-light">Department: {userInfo.department}</li> 
    <li className="list-group-item bg-light">Class Roll: {userInfo.classRoll}</li>
    <li className="list-group-item bg-dark text-light">Registration No. : {userInfo.registrationNo}</li>
  </ul> 
 </div>
</div>
  
    </div>
    <div className="col-lg-1"></div>
    <div className="col-lg-5"> 
      {examList.map((index,id)=>{
        return(
          <div key={id}>
          {index.department===userInfo.department?
          <> 

          
           <div className="card studentCard mt-5 d-block m-auto text-center mb-5" style={{width: "22rem"}}>
           <h5 className="card-title mt-4">Your Upcoming Exam</h5>

  <div className="card-body">

      <ul className="list-group list-group-flush">
    <li className="list-group-item bg-dark text-light">Department: {userInfo.department}</li> 
    <li className="list-group-item bg-light">Batch: {index.batch}</li>
    <li className="list-group-item bg-dark text-light">Application Starting Date : {index.startingDate}</li>
    <li className="list-group-item bg-light">Application Ending Date : {index.endingDate}</li>

  </ul> 

           <div className='d-block m-auto mt-2'><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className=" btn btn-dark mx-2">Apply for Exam</button></div>

  </div>
</div> 

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Exam Application Form</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
  <input type="text" className="form-control"  value={userInfo.name}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Father's Name</label>
  <input type="text" className="form-control"  value={userInfo.fatherName}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Mother's Name</label>
  <input type="text" className="form-control"  value={userInfo.motherName}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Date of Birth</label>
  <input type="text" className="form-control"  value={userInfo.dateOfBirth}id="exampleFormControlInput1" />
</div>


<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"   className="form-label">Class Roll</label>
  <input type="text" className="form-control"  value={userInfo.classRoll}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"   className="form-label">Registration No.</label>
  <input type="text" className="form-control"  value={userInfo.registrationNo}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"   className="form-label">Department</label>
  <input type="text" className="form-control"  value={userInfo.department}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"   className="form-label">Hall Name</label>
  <input type="text" className="form-control"  value={userInfo.hallName}id="exampleFormControlInput1" />


</div>    

<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Mobile No.</label>
  <input type="text" className="form-control"  value={userInfo.mobileNo}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Religion</label>
  <input type="text" className="form-control"  value={userInfo.religion}id="exampleFormControlInput1" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Nationality</label>
  <input type="text" className="form-control"  value={userInfo.nationality}id="exampleFormControlInput1" />
</div>
 <label htmlFor="exampleFormControlInput1"   className="form-label">Course List</label>
 


             {examList.map((index,id)=>{
              return(
                index.department===userInfo.department?
                (<div className='row mx-2' key={id}>
                  { index.courseList.map((course,courseId)=>{ 
                    return(
                      <div className="form-check col-4" key={courseId}>
                        
                        <input
                    className="form-check-input"
                    style={{ border: "1px solid black" }}
                    type="checkbox"
                    value=""
                    id={`flexCheckDefault-${courseId}`}
                    checked={courseStates[courseId] || false}
                    onChange={() => checkCourse(courseId)}
                  />
                  <label className="form-check-label" htmlFor={`flexCheckDefault-${courseId}`}>
                    {course}
                  </label>
                      </div>
                      
                    )
                  })

                  }
                 


                </div> ): ""
              )
            })}    
            <input type="checkbox" className="form-check-input"
                    style={{ border: "1px solid black" ,marginLeft: "8px"}}  onClick={toggleSelectAll}/>                                  {allSelected ? 'Deselect All' : 'Select All'}
  
          
                  <table className="table table-sm mt-3 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Fees Type</th>
                  <th scope="col" >Amount</th>
                </tr>
              </thead> 
              <tbody>
              <tr className='bg-dark text-light'>
                      <td>Registration Fees</td>
                      <td> 650 Tk </td>
                    </tr>
                    <tr className=''>
                      <td>Library Fees</td>
                      <td> 320 Tk </td>
                    </tr>
                    <tr className='bg-dark text-light'>
                      <td>Course Fees</td>
                      <td> {totalCourses*50} Tk </td>
                    </tr>
                    <tr className=''>
                      <td>Hall Fees</td>
                      <td> 120 Tk </td>
                    </tr>
                    <tr className='bg-dark text-light'>
                      <td>Total Fees</td>
                      <td> {totalCourses*50 +120+650+320} Tk </td>
                    </tr>
              </tbody>
            </table>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
        {/* <PDFDownloadLink document={<AdmitCard user={userInfo} />} fileName="admitCard.pdf"> */}
      <button data-bs-dismiss="modal" onClick={apply} className="btn btn-dark" >Apply Now</button>
      {/* </PDFDownloadLink> */}


      </div>
    </div>

  </div>
</div>
 
            </>: ""
         }
          
          </div>

        )
      })}
    </div>
    
    </div> )}
      </div>
      <ToastContainer />
      
    </div>
  );
};

export default Profile;
