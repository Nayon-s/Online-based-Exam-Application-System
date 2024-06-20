

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import {
    Link
} from "react-router-dom";

const Login = (props) => {
    const [studentDetails, setStudentDetails] = useState();
    const [otp, setOtp] = useState('');
    const [credentials, setCredentials] = useState({
        registrationNo: "",
        email: ""
    });

    const { registrationNo, email } = credentials;

    const [showOTPInput, setShowOTPInput] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.id === "email") {
            setCredentials({
                email: e.target.value,
                registrationNo
            });
        } else {
            setCredentials({
                email,
                registrationNo: e.target.value
            });
        }
    };

    const otp_val = Math.floor(Math.random() * 100000).toString();
    const [code, setCode] = useState(otp_val);

    const changes = (e) => {
        setOtp(e.target.value);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, registrationNo: registrationNo })
        });
        const json = await response.json();
        console.log(json.status);
        if (json.status === "Success") {
            setStudentDetails(json.student);
            const emailBody = `Your OTP: ${code}`;
            setShowOTPInput(true);
            emailjs.send('service_q5exv6q', 'template_n9lgn2t', {
                to_email: email,
                from_email: "nayonkarmoker3@gmail.com",
                subject: "OTP Verification",
                message: emailBody,
            }, 'hEX8QDdIdlV8fShPe')
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('OTP sent to your Email!', {
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
        } else {
            toast.error('Student Not Found!', {
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
        console.log(studentDetails);
        if (otp === code) {
            navigate('/student/profile', { state: { id: studentDetails } });
            localStorage.setItem('studentState', JSON.stringify({ id: studentDetails }));
            setCode();
        } else {
            toast.error('Invalid OTP!', {
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
        <>
            <div className='background'>
            <div className="container text-center mt-5 fs-2 text fw-semibold">
          <i class="fas fa-graduation-cap"></i>Welcome to OBEAS
          <i class="fas fa-university"></i>{" "}
        </div>
                <div className="container d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                    <div className="card shadow-lg animate__animated animate__fadeInDown" style={{ width: "24rem", backgroundColor: "#F5F5F5", border: "" }}>
                        <div className="card-body">
                            <h3 className="card-title text-center mt-3 mb-3"> Student Login</h3>
                            {!showOTPInput && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="registrationNo" className="form-label fw-semibold">Registration No</label>
                                        <input type="text" className="form-control" value={registrationNo} required id="registrationNo" placeholder="Registration no" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                        <input type="email" value={email} className="form-control" id="email" required placeholder="name@example.com" onChange={handleChange} />
                                    </div>
                                    <button disabled={email === "" || registrationNo === ""} className="btn btn-dark" onClick={sendEmail}>Log In</button>
                                </>
                            )}
                            {showOTPInput && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label fw-semibold">Enter OTP</label>
                                        <input type="text" value={otp} onChange={changes} placeholder="Enter OTP" className="form-control" id="otp" />
                                    </div>
                                    <button className="btn btn-dark" disabled={otp === ""} onClick={verifyOTP}>Verify OTP</button>
                                </>
                            )}
                            <p className="mt-4 fw-semibold">Are you a Teacher? <Link className="fw-bold" aria-current="page" to="/admin/login"> LogIn Here</Link> </p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
