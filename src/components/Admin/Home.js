import React from 'react'
import Navbar from './Navbar';

import {
  Link
} from "react-router-dom";


const Home = () => {
  return (
    <>
    <Navbar />
    <div className='container  mt-5'>
        <h1 className='text-center mb-5'>Welcome to OBEAS!</h1>
      
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card" style={{width: "18 rem"}}>
  <img src="https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148691702.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=ais" className="card-img-top" alt="..."/>
  <div className="card-body">
  <h3 className="card-title my-3">36 Departments</h3>

  <Link className="btn btn-dark " aria-current="page" to="/admin/studentsinfo">View More Info</Link>
  </div>
</div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card" style={{width: "18 rem"}}>
  <img src="https://img.freepik.com/free-vector/illustration-university-graduates_53876-28468.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=sph" className="card-img-top h-200" alt="..."/>
  <div className="card-body">
    <h3 className="card-title my-3">8000 Students</h3>
    
    <Link className="btn btn-dark " aria-current="page" to="/admin/studentsinfo">View More Info</Link>
  </div>
</div>
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card" style={{width: "18 rem"}}>
  <img src="https://img.freepik.com/free-vector/college-class-concept-illustration_114360-10544.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=sph" className="card-img-top" alt="..."/>
  <div className="card-body">
        <h3 className="card-title my-3">07 Exams Ongoing</h3>

        <Link className="btn btn-dark " aria-current="page" to="/admin/examdetails">View More Info</Link>
  </div>
</div>
        </div>
       
      </div>
      
    </div>
    </>
  )
}

export default Home
