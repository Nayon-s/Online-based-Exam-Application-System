import React from 'react'
import departments from './department'
import Navbar from './Navbar';

import {
  Link
} from "react-router-dom";

const StudentsInfo = () => {
    

  return (
    <>
    <Navbar />
    <div className='container mt-5'>
        <div className="row">
        {departments.map((index,id)=>{
            return(
                
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={id}>
        <div class="card" style={{width: "18 rem", height: "27rem"}} >
  <img src={index.image} class="card-img-top h-200" alt="..."/>
  <div className="card-body">
    <h5 className="card-title my-3">{index.name}</h5>
    <h5 className="card-title my-3">Total No. of Students: {index.numberOfStudents}</h5>
    <Link className="btn btn-dark " aria-current="page" to="/admin/studentlist">View More Info</Link>

  </div>
</div>
        </div>
        
            )
        })}
      </div>
    </div>
    </>
  )
}

export default StudentsInfo
