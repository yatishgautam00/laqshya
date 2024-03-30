import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaSchool } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "./registerpage.scss";
import { API } from '../../Services/Api';
import Loader from '../../Components/Loader/Loader';
import { Toaster } from '../../Components/Toaster/Toaster';
import { TbArrowNarrowRight } from "react-icons/tb";
import { IoIosSchool } from "react-icons/io";
import { RiLockPasswordLine, RiMailSendLine, RiPhoneFill, RiUser6Line } from "react-icons/ri";
import { playErrorsound, playSuccesssound } from '../../Utils/commonutil';



const initialValue = {
    "fullname": "",
    "email": "",
    "phonenumber": "",
    "institution": "",
    "stream": "",
    "password": "",
    "confirmPassword": ""

}

const initialLoginValues={
    email:'',
    password:''
}

const RegisterPage = (props) => {
    const [formData, setFormData] = useState(initialValue)
    const [isEyeOpened, setIsEyeOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();
    console.log("chala");

    useEffect(() => {
        const handleBackButton = () => {
            navigate('/');
        };

        window.addEventListener('popstate', handleBackButton);
        window.history.pushState(null, '', window.location.href);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);



    const handleInputChange = async (e) => {

        const { name, value } = e.target;
        setFormData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    };

    const handleLogin = async (email,password) => {
        setIsLoading(true);
        let response = await API.userSignin({email:email,password:password});

        if (response.isSuccess) {
            setIsLoading(false);
            const { id} = response.data.data;
            setFormData(initialLoginValues);
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            sessionStorage.setItem('isLogined', id);
            props.setIsUserAuthenticated(true);
            navigate('/events');
        } else {

            setIsLoading(false);
            setShowError(true);
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => setShowError(false), 4000);
        }
    };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);



        let response = await API.registerParticipants(formData);
        if (response.isSuccess) {
            setFormData(initialValue);
            setIsLoading(false);
            setShowSuccess(true);
            playSuccesssound();
            setTimeout(() => setShowSuccess(false), 4000);
            handleLogin(formData.email,formData.confirmPassword);
        }
        else {
            setIsLoading(false);
            setShowError(true);            
            playErrorsound();
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => setShowError(false), 4000);  

        }
    };

   

    return (
        <div className='register-page'>
            {/* toaster */}

            {showSuccess && <Toaster message={"Registered Successfully"} type={"success"} />}
            {showError && <Toaster message={errorMessage} type={"error"} />}



            <div className="register-wrap">
                <div className="left-wrap">
                    <div className="logo">
                        <img src="https://ik.imagekit.io/egjzyz51e/IMG_20230307_200718.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678199895069" alt="" />
                    </div>
                    <div className="left-details">
                        <h1>
                            CSGI Welcomes You To Laqshya 2K23
                        </h1>
                        <h3>in Association with</h3>
                        <img src="https://ik.imagekit.io/egjzyz51e/Tec36_Logo_white_300x.png?updatedAt=1679145810521" alt="" />
                        <h3 className='divider'>Presents</h3>

                        <h3>
                            Central India's Bigest Techno-Management-Sports & Culture Fest
                        </h3>
                        <div className="home-link">
                            <Link to={'/'}>Go To Home  <TbArrowNarrowRight className='arw-icon' /></Link>
                        </div>

                    </div>
                </div>
                <div className="right-wrap">
                    <h1>REGISTRATION</h1>
                    {showSuccess && <p className='note-mark'> Registered Successfully  </p>}
                    {showError && <p className='error-mark' >{errorMessage} </p>}


                    <form action="">
                        <div className="row">
                            <div className="icon-input-wrap">
                                <RiUser6Line />
                                <input onChange={handleInputChange} type="text" value={formData.fullname} name='fullname' required placeholder='Full Name' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <RiMailSendLine />
                                <input onChange={handleInputChange} type="email" value={formData.email} name='email' placeholder='Email' />
                            </div>

                        </div>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <RiPhoneFill />
                                <input onChange={handleInputChange} type="tel" value={formData.phonenumber} name='phonenumber' placeholder='Contact' />
                            </div>


                        </div>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <FaSchool />
                                <input onChange={handleInputChange} type="text" value={formData.institution} name='institution' placeholder='Institution/Organization' />
                            </div>


                        </div>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <IoIosSchool />
                                <input onChange={handleInputChange} type="text" value={formData.stream} name='stream' placeholder='Stream(Eng,Pharma,Science,Others)' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="password-wrap">
                                <RiLockPasswordLine />
                                <input onChange={handleInputChange} type={isEyeOpened ? "text" : "password"} value={formData.password} name='password' placeholder='Password' />

                                <button onClick={(e) => { e.preventDefault(); setIsEyeOpened(!isEyeOpened) }}>{isEyeOpened ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="password-wrap">
                                <RiLockPasswordLine />
                                <input onChange={handleInputChange} type={isEyeOpened ? "text" : "password"} value={formData.confirmPassword} name='confirmPassword' placeholder='Confirm Password' />

                                <button onClick={(e) => { e.preventDefault(); setIsEyeOpened(!isEyeOpened) }}>{isEyeOpened ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={handleSubmit} className='register-btn'>{isLoading ? <Loader /> : "Register"}</button>
                        </div>


                    </form>
                    <p>Already Have An Account ? <Link to={'/signin'}>Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;