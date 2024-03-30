import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { Toaster } from '../../../Components/Toaster/Toaster';
import { API } from '../../../Services/Api';
import './createadmin.scss';

const initialAdminData = {
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
    role: ''
}


const Createadmin = () => {
    const [adminData, setAdminData] = useState(initialAdminData);
    const [fronterros, setFronterrors] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleInputChange = async (e) => {

        const { name, value } = e.target;
        setAdminData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const response = await API.adminSignup(adminData);

        if (response.isSuccess) {
            setIsLoading(false);
            setShowSuccess(true);
            setAdminData(initialAdminData);
            setTimeout(() => setShowSuccess(false), 4000);
            navigate('/admin/dashboard/admins');
        } else {
            setIsLoading(false);
            setShowError(true);
            setErrorMessage(response.valerror || response.data.msg);
            setTimeout(() => setShowError(false), 4000);
        }



    }
    return (
        <div className='createadmin'>
            {showSuccess && <Toaster message={"Admin Added Successfully"} type={"success"} />}
            {showError && <Toaster message={errorMessage} type={"error"} />}
            <div className="createAdmin-wrap">
                <div className="createadmin-heading">
                    <h1>Add Admin</h1>
                </div>


                <div className="createadmin-form">
                    <form>

                        <p className='error-mark'>* Means Field Is Required</p>
                        {showSuccess && <p className='note-mark'>Post Added Successfully</p>}
                        {showError && <p className='error-mark'>{errorMessage}</p>}
                        <div className="row">
                            <input value={adminData.title} onChange={handleInputChange} type="text" name='fullname' placeholder='Fullname' />
                            {fronterros && <p className='error-mark'>Title Is Required</p>}
                        </div>
                        <div className="row">
                            <input value={adminData.category} onChange={handleInputChange} type="email" name='email' placeholder='Email' />
                            {fronterros && <p className='error-mark'>Category Is Required</p>}
                        </div>
                        <div className="row">
                            <input value={adminData.description} onChange={handleInputChange} type="tel" name='phonenumber' placeholder='Phone Number' />
                            {fronterros && <p className='error-mark'>Description Is Required</p>}
                        </div>
                        <div className="row">
                            <input value={adminData.description} onChange={handleInputChange} type="password" name='password' placeholder='Password' />
                            {fronterros && <p className='error-mark'>Description Is Required</p>}
                        </div>
                        <div className="row">
                            <select defaultValue={adminData.role} name="role" onChange={handleInputChange}>
                                <option hidden selected disabled>Choose Admin Role</option>
                                <option value="superadmin">Primary</option>
                                <option value="pladmin">Secondary</option>
                                <option value="admin">Tertiary</option>
                            </select>
                            {fronterros && <p className='error-mark'>Description Is Required</p>}
                        </div>
                        <div className="row">
                            <button onClick={handleSubmit}>{isLoading ? <Loader /> : "ADD ADMIN"}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Createadmin;