import React from 'react'
import studentsData from './students'
import Navbar from './Navbar';

const StudentList = () => {
  return (
    <>
    <Navbar />
    <div className='container mt-5'>
<table className="table table-sm  table-responsive-sm text-center fw-semibold" style={{ border: "2px solid"}}>
    
    <thead>
      
       <tr className="bg-light">
        <th scope="col" >Class Roll</th>
        <th scope="col" >Reegistration No.</th>      
        <th scope="col" >Name</th>
        <th scope="col" >Gender</th>
        <th scope="col" >Department</th>      
        <th scope="col" >Hall Name</th>
      </tr> 
    </thead>
    <tbody>
      {studentsData.map((index,id)=>{
        return(
          <tr className={`${index.classRoll % 2 !== 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>

          <td>{index.classRoll}</td>
          <td>{index.registrationNo}</td>
          <td>{index.name}</td>
          <td>{index.gender}</td>
          <td>{index.department}</td>
          <td>{index.hallName}</td> 
        </tr>
        )
      })}
      
        
    </tbody>
    </table>
    </div> </>
      
  )
}

export default StudentList




  
