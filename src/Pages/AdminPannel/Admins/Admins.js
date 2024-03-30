import React, { useEffect, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { API } from '../../../Services/Api';
import './admins.scss';



const Admins = () => {
    const [adminsData, setAdminsData] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            setIsLoading(true);
            const response = await API.getAllAdmins();
            if (response.isSuccess) {
                setAdminsData(response.data);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }
        }
        fetchAdmins();
    }, [toggle]);

    const handlePromote = async (id, role) => {
        const updateData = { role: role === 'admin' ? 'pladmin' : 'admin' };
        const response = await API.updateAdmin({ id, updateData });
        if (response.isSuccess) {
            setToggle(!toggle);
        }
    }

    const handleDeleteAdmin = async (id) => {

        if (window.confirm("Do You Really Want To Delete Admin") === true) {
            const response = await API.deleteAdmin({ id });

            if (response.isSuccess) {
                setToggle(!toggle);
            }

        }


    }



    return (
        <div className='Admins'>
            <div className="admins-wrap">

                <div className="admin-heading">
                    <h1>Admins</h1>
                    <Link to={'/admin/dashboard/createadmin'} className='adm-main-btn'>Add&nbsp;<MdGroupAdd /></Link>
                </div>

                <div className="admin-list">
                    <ul>
                        {adminsData && adminsData.length > 0 ? adminsData.map((admin, indx) => {
                            return (
                                <li key={indx}>
                                    <span>{admin.fullname}</span>
                                    <span>{admin.role}</span>
                                    <span>
                                        <button onClick={() => handlePromote(admin._id, admin.role)}>{admin.role === 'admin' ? 'Promote' : 'Demote'}</button>
                                        &nbsp;&nbsp;<button onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>

                                    </span>

                                </li>
                            )
                        }) : <li>{isLoading ? <p>Fetching Data <Loader/></p> : null}</li>}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Admins;