import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowNarrowRight } from 'react-icons/tb';
import { RiLockPasswordLine, RiMailSendLine } from 'react-icons/ri';
import { DataContext } from '../../Context/Dataprovider';
import { API } from '../../Services/Api';
import './loginpage.scss';
import Loader from '../../Components/Loader/Loader';
import { Toaster } from '../../Components/Toaster/Toaster';
import { playErrorsound, playSuccesssound } from '../../Utils/commonutil';


const initialLoginValues = {
    email: '',
    password: ''
}


const Loginpage = ({ setIsUserAuthenticated }) => {
    const [isEyeOpened, setIsEyeOpened] = useState(false);
    const [formData, setFormData] = useState(initialLoginValues);
    const [isLoading, setIsLoading] = useState(false);
    
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();


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

        let response = await API.userSignin(formData);

        if (response.isSuccess) {
            setIsLoading(false);
            const { id, name, email, phonenumber, institution, standard } = response.data.data;
            setFormData(initialLoginValues);
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            sessionStorage.setItem('isLogined', id);
            setIsUserAuthenticated(true);
            await setAccount({ id: id, username: name, email: email, phonenumber: phonenumber, institution: institution, standard: standard });
            navigate('/events');
        } else {
            console.log(response);
            setIsLoading(false);
            setShowError(true);
            playErrorsound();
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => setShowError(false), 4000);


        }


    }


    return (
        <div className='Loginpage'>
            {showError && <Toaster message={errorMessage} type={"error"} />}

            <div className="loginpage-wrap">
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
                    <h1>SIGN IN</h1>

                    <form action="">
                        <div className="row">
                            <div className="icon-input-wrap">
                                <RiMailSendLine />
                                <input onChange={handleInputChange} value={formData.email} type="email" name='email' placeholder='Email' />

                            </div>
                        </div>
                        <div className="row">
                            <div className="password-wrap">
                                <RiLockPasswordLine />
                                <input onChange={handleInputChange} value={formData.password} type={isEyeOpened ? "text" : "password"} name='password' placeholder='Password' />
                                <button onClick={(e) => { e.preventDefault(); setIsEyeOpened(!isEyeOpened) }}>{isEyeOpened ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={handleLogin} className='register-btn'>{isLoading ? <Loader /> : "Choose Events"}</button>
                        </div>
                    </form>
                    {showError && <p className='error-mark' >{errorMessage} </p>}
                    <p>Don't Have An Account ? <Link to={"/register"}>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Loginpage;