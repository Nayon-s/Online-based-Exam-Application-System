import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Link
  } from "react-router-dom";
  
  
const AdminLogin = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false); 

  const navigate = useNavigate();
    const emailCheck=(e)=>{
      setEmail(e.target.value)
      }
  

  const otp_val = Math.floor(Math.random() * 100000).toString();
    const [code, setCode]=useState(otp_val)
const changes = (e) => {
setOtp(e.target.value);
};

const sendEmail = (e) => {
e.preventDefault();

const emailBody = `Your OTP: ${code}`;
if(email==="nayonkarmoker3@gmail.com"){
  setShowOTPInput(true);
emailjs.send('service_q5exv6q', 'template_n9lgn2t', {
  to_email: "nayonkarmoker3@gmail.com",
  from_email: "nayonkarmoker3@gmail.com",
  subject: "OTP Verification",
  message: emailBody,
}, 'hEX8QDdIdlV8fShPe')
.then((response) => {
  if (response.status === 200) {
    toast.success(' OTP sent to your Email!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
  }
})
.catch((error) => {
  console.error("Error sending email:", error);
});
}
else{
  toast.error(' Invalid Admin Email!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

};

const verifyOTP = () => {
console.log("otp:", otp);
console.log("otp_val:", otp_val);

if (otp === code) {
  navigate('/admin/home');
  setCode()

} else {
  toast.error(' Invalid OTP!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
};
  return (

    <div className='background'>


<div className=" container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="card shadow-lg" style={{width: "22rem", backgroundColor:"#F5F5F5", border:""}}>

      <div className=" card-body">
      <h3 className="card-title text-center mt-3 mb-3">Admin Login</h3>
      {!showOTPInput&&( <> <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label fw-semibold">Email Address</label>
  <input type="email" required class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={emailCheck} />
</div>
 <button className="btn btn-dark" disabled={email===""} onClick={sendEmail}>Log In
      </button></>)}
{showOTPInput&&(
<>
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label fw-semibold">Enter OTP</label>
  <input type="text"
        value={otp}
        onChange={changes}
        placeholder="Enter OTP" class="form-control" id="exampleFormControlInput1" />

</div>    
   
      <button className="btn btn-dark" disabled={otp===""} onClick={verifyOTP}>Verify OTP
      </button></>)}


    <p className="mt-4 fw-semibold">Are you a Student? <Link className="fw-bold " aria-current="page" to="/">  LogIn Here</Link> </p> 
      </div>

      </div>
      

      
      <ToastContainer /> 
    </div>
    </div>
  )
}

export default AdminLogin
