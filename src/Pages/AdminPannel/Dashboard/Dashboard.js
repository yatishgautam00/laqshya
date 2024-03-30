import React, { useEffect, useState } from 'react';
import { FaBars, FaImage, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./dashboard.scss";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiUser6Line, RiUserStarLine } from "react-icons/ri";
import Participants from '../Paticipants/Participants';
import Group from '../Group/Group';
import Individual from '../Individual/Individual';
import CreateIndi from '../CreateIndividual/CreateIndi';
import { API } from '../../../Services/Api';
import { checkAdminsession } from '../../../Utils/commonutil';
import Admins from '../Admins/Admins';
import Createpost from '../CreatePost/Createpost';
import Postsshow from '../PostsShow/Postsshow';
import Createadmin from '../CreateAdmins/Createadmin';


const Dashboard = (props) => {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false);
    const [adminData, setAdminData] = useState({});
    const { dashid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('adminId');
        const fetchadmin = async () => {
            const response = await API.getLoggedInAdmin({ id: isAdmin });
            if (response.isSuccess) {
                setAdminData(response.data)
            }
        }

        if (checkAdminsession()) {
            props.setIsAdminAuthenticated(true);
            fetchadmin();
        } else {

            props.setIsAdminAuthenticated(false);
            navigate('/admin');
        }
        const timer = setInterval(() => {
            const token = sessionStorage.getItem('adminId');
            if (token) {
                fetchadmin();
                props.setIsAdminAuthenticated(true);
            } else {
                props.setIsAdminAuthenticated(false);
                navigate('/admin');
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [])



    return (
        <div className='dashboard'>
            {/* bottom navbar */}
            <div className="bottom-navbar">
                <div className="bottom-nav-wrap">

                    <ul className="bottom-menu">
                        <li title='Overview'><Link to="/admin/dashboard/overview">{isSideBarOpened ? "OverView" : <IoAnalyticsOutline />}</Link></li>
                        <li title='Participants'><Link to="/admin/dashboard/participants">{isSideBarOpened ? "Participants" : <RiUserStarLine />}</Link></li>
                        <li title='Individuals'><Link to="/admin/dashboard/individuals">{isSideBarOpened ? "Individuals" : <RiUser6Line />}</Link></li>
                        <li title='Groups'><Link to="/admin/dashboard/groups">{isSideBarOpened ? "Groups" : <FaUsers />}</Link></li>
                        <li title='Posts'><Link to="/admin/dashboard/showposts">{isSideBarOpened ? "Posts" : <FaImage />}</Link></li>
                        {adminData.role && adminData.role === 'superadmin' ? (<li title='Posts'><Link to="/admin/dashboard/admins">{isSideBarOpened ? "Admins" : <FaShieldAlt />}</Link></li>) : null}
                    </ul>

                </div>
            </div>
            <div className="dashboard-wrap">

                {/* CONTENT SECTION */}

                <div className="content-section">
                    <div className="content-wrap">

                        {/* LEFT SIDE */}

                        <div className={isSideBarOpened ? "side-bar opened" : "side-bar"}>
                            <button onClick={(e) => { setIsSideBarOpened(!isSideBarOpened) }}><FaBars /></button>
                            <ul className="side-menu">
                                <li title='Overview'><Link to="/admin/dashboard/overview">{isSideBarOpened ? "OverView" : <IoAnalyticsOutline />}</Link></li>
                                <li title='Participants'><Link to="/admin/dashboard/participants">{isSideBarOpened ? "Participants" : <RiUserStarLine />}</Link></li>
                                <li title='Individuals'><Link to="/admin/dashboard/individuals">{isSideBarOpened ? "Individuals" : <RiUser6Line />}</Link></li>
                                <li title='Groups'><Link to="/admin/dashboard/groups">{isSideBarOpened ? "Groups" : <FaUsers />}</Link></li>
                                <li title='Posts'><Link to="/admin/dashboard/showposts">{isSideBarOpened ? "Posts" : <FaImage />}</Link></li>
                                {adminData.role && adminData.role === 'superadmin' ? (<li title='Posts'><Link to="/admin/dashboard/admins">{isSideBarOpened ? "Admins" : <FaShieldAlt />}</Link></li>) : null}
                            </ul>
                        </div>

                        {/* RIGHT SIDE */}

                        <div className="main-content">

                            {/* HEAD BAR */}

                            <div className="head-bar">
                                <div className="head-bar-left">

                                    <div className="logo">
                                        <h1>LAQSHYA</h1>
                                    </div>
                                    <div className="greet">Welcome {adminData.fullname}</div>
                                </div>
                                <div className="head-bar-right">
                                    <button className='adm-main-btn' onClick={() => { sessionStorage.clear(); navigate('/admin') }}>Logout</button>
                                </div>
                            </div>
                            {/* RIGHT SIDE SECTION START */}

                            <div className="main-content">
                                <div className="main-content-wrap">
                                    {dashid === "overview" ? (
                                        <>overview</>
                                    ) : dashid === "participants" ? (
                                        <Participants adminData={adminData} />
                                    ) : dashid === "groups" ? (<Group adminData={adminData} />)
                                        : dashid === "individuals" ? (<Individual adminData={adminData} />)
                                            : dashid === "createIndi" ? (<CreateIndi adminData={adminData} />)
                                                : dashid === "admins" && adminData.role === "superadmin" ? (<Admins />)
                                                    : dashid === 'createpost' ? (<Createpost adminData={adminData} />)
                                                        : dashid === 'showposts' ? (<Postsshow adminData={adminData} />)
                                                            : dashid === 'createadmin' && adminData.role === "superadmin" ? (<Createadmin adminData={adminData} />) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard