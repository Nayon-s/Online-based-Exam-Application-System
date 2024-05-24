import React from 'react'
import {
  Link
} from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark" >
  <div className="container-fluid">
    <Link className="navbar-brand mx-4 fs-3 fw-semibold" to="/admin/home"> <i class="fa-sharp fa-solid fa-graduation-cap"></i>  OBEAS</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item"> 
          <Link className="nav-link active mx-2 fs-5" aria-current="page" to="/admin/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active mx-2 fs-5" aria-current="page" to="/admin/studentsinfo">Student Info </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active mx-2 fs-5" aria-current="page" to="/admin/examdetails">Exam Details</Link>
        </li>
        
       
        <li className="nav-item">
          <Link  className="nav-link active mx-2 fs-5" aria-current="page" to="/">LogOut</Link>
        </li>

        
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
