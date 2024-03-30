import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordLine, RiMailSendLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { Toaster } from '../../../Components/Toaster/Toaster';
import { API } from '../../../Services/Api';
import './adminlogin.scss';

const initialAdminLoginValues = {
    email: '',
    password: ''
}

const Adminlogin = (props) => {

    const [isEyeOpened, setIsEyeOpened] = useState(false);
    const [formData, setFormData] = useState(initialAdminLoginValues);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    const navigate = useNavigate();

    useEffect(() => {


    }, [])


    const handleInputChange = (ev) => {
        const { name, value } = ev.target;

        setFormData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const handleLogin = async (ev) => {
        setIsLoading(true);
        ev.preventDefault();

        let response = await API.adminSignin(formData);

        if (response.isSuccess) {
            setIsLoading(false);
            const { id, name, role } = response.data.data;
            setFormData(initialAdminLoginValues);
            sessionStorage.setItem('adminId',id);
            sessionStorage.setItem('adminname',name);
            sessionStorage.setItem('adminrole',role);
            props.setIsAdminAuthenticated(true);
            navigate('/admin/dashboard/participants');
        } else {

            setIsLoading(false);
            setShowError(true);
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => setShowError(false), 4000);


        }


    }


    return (
        <div className='Adminlogin'>
            {showSuccess && <Toaster message={"Registered Successfully"} type={"success"} />}
            {showError && <Toaster message={errorMessage} type={"error"} />}
            <div className="adminlogin-wrap">
                <div className="nav">
                    <h1>LAQSHYA DASH</h1>
                </div>
                <div className="login-form">
                    <form action="">
                        <h1>ADMINS </h1>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <RiMailSendLine />
                                <input onChange={handleInputChange} value={formData.email} type="email" name='email' placeholder='Email' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="password-wrap">
                                <RiLockPasswordLine/>
                                <input onChange={handleInputChange} value={formData.password} type={isEyeOpened ? "text" : "password"} name='password' placeholder='Password' />
                                <button onClick={(e) => { e.preventDefault(); setIsEyeOpened(!isEyeOpened) }}>{isEyeOpened ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={handleLogin} className='register-btn'>{isLoading ? <Loader /> : "LOGIN"}</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Adminlogin;