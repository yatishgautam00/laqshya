import React, { useState } from 'react';
import './forgotpass.scss';
import { RiLockPasswordLine, RiMailSendLine } from 'react-icons/ri';
import Loader from '../../Components/Loader/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Forgotpass = () => {
    const [isEyeOpened, setIsEyeOpened] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        
      };


    return (
        <div className='forgotpass'>
            <div className="forgotpass-wrap">
                <div className="login-form">
                    <form action="">
                        <h1>Forgot Password ? </h1>
                        <h3>Enter your registered Email Address In the Below Field</h3>
                        <div className="row">
                            <div className="icon-input-wrap">
                                <input onChange={(e) => setEmail(e.target.value)}  type="email" name='email' placeholder='Enter Your Email Here' />
                            </div>
                        </div>

                        <div className="row">
                            <button  className='register-btn'>{isLoading ? <Loader /> : "LOGIN"}</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Forgotpass;