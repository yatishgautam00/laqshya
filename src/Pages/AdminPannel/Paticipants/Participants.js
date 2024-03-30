import React, { useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Link } from 'react-router-dom';
import "./participants.scss";
import { MdDeleteForever, MdLoop} from "react-icons/md";
import { FaEdit, FaSave, FaSearch } from 'react-icons/fa';
import { FcRefresh } from 'react-icons/fc';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { API } from '../../../Services/Api';
import Loader from '../../../Components/Loader/Loader';



const initialfiltervalue = {
    searched: "",
    events: ""
}

const initialUserUpdateData = {
    fullname: "",
    email: "",
    phonenumber: "",
    status: false
}


const Participants = (props) => {
    const [tableData, setTableData] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState(initialfiltervalue);
    const [sortBy, setSortBy] = useState("fullname");
    const [status, setStatus] = useState(false);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc");
    let [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [editingid, setEditingId] = useState(null);
    const [updateData, setUpdateData] = useState(initialUserUpdateData);
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);




    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await API.getParticipantsWithLimit({ limit: itemPerPage, page: currentPage, status: status });
            if (response.isSuccess) {
                setTableData(response.data.data);
                setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
                setIsLoading(false);

            }else{
            setIsLoading(false);

            }
        }
        fetchData();
    }, [itemPerPage, currentPage, status, toggle]);


    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })




    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setStatus(value);
        }
        setFilteredTerm((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }
    const handleSort = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
        else {
            setSortBy(field);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    }

    const searchedTerms = filteredTerm.searched.toLowerCase().split(' ');
    const filteredData = tableData.filter((item) =>
        searchedTerms.every((term) =>
            item.fullname.toLowerCase().includes(term) ||
            item.email.includes(term)
        )
    );

    const handleItemPerpage = (e) => {

        setItemPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handleUserDelete = async (id) => {


        if (window.confirm("Do You Really Want To Delete The User") === true) {
            const response = await API.deleteUser({ id });
            if (response.isSuccess) {
                setToggle(!toggle);
            }
        }
    }

    const handleUserEdit = async (rowdata) => {
        setEditingId(rowdata._id);
        setUpdateData({
            fullname: rowdata.fullname,
            email: rowdata.email,
            phonenumber: rowdata.phonenumber,
            status: rowdata.status
        });
    }

    const handleInputChange = async (e) => {

        const { name, value } = e.target;
        setUpdateData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const handleUpdateUser = async (id, updateData) => {

        const response = await API.updateUsers({ id, updateData });

        if (response.isSuccess) {
            setToggle(!toggle);
            setEditingId(null)
        }
    }

    return (
        <div className='participants'>
            <div className="participants-wrap">

                <div className="participants-heading">
                    <h1>Participants</h1>
                    <button onClick={()=>setToggle(!toggle)} className='adm-main-btn'>Refresh&nbsp;<MdLoop/></button>
                </div>

                {/*FILTER GROUP */}
                <div className="filter-group">
                    <div className="filter-group-wrap">
                        <div className="search-bar">
                            <label htmlFor="searched">Search for participants</label>
                            <div className="input-wrap">
                                <input onChange={handleSearch} type="text" placeholder='Search' name='searched' id='searched' />
                                <button><FaSearch /></button>
                            </div>

                        </div>

                        <div className="filter-col">
                            <label htmlFor="status">Status</label>
                            <div className="adm-input-wrap">
                                <select value={status} onChange={handleSearch} name="status" id="status">
                                    <option disabled hidden >Choose Status</option>
                                    <option value={true}>Paid</option>
                                    <option value={false}>Unpaid</option>
                                </select>
                            </div>
                        </div>

                        <div className="filter-col">
                            <label htmlFor="status">Number of items</label>
                            <div className="adm-input-wrap">
                                <select value={itemPerPage} onChange={handleItemPerpage} name="noitem" id="status">
                                    <option value={5} >5</option>
                                    <option value={20} >20</option>
                                    <option value={40} >40</option>
                                    <option value={80} >80</option>
                                    <option value={100} >100</option>
                                    {(props.adminData.role && props.adminData.role === 'pladmin') || props.adminData.role === 'superadmin' ? <option value={2000}>All</option> : null}

                                </select>
                            </div>
                        </div>

                        {/* export to excel */}

                        <div className="filter-col">
                            <label htmlFor="export">Export to Excel</label>
                            <div className="adm-input-wrap">
                                <input onClick={onDownload} type="button" value={"Export"} name="export" id='export' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATABASE TABLE */}

                <div className="participants-table">
                    <div className="participants-table-wrap" style={{ overflowX: 'scroll' }}>
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("id")}>Id</th>
                                    <th>UniqueId</th>
                                    <th onClick={() => handleSort("fullname")}>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Institution</th>
                                    <th>Stream</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData && filteredData.length > 0 ? filteredData.map((data, indx) => {

                                    return (
                                        <tr key={indx}>
                                            <td>{indx}</td>
                                            <td>{data.uid}</td>
                                            {editingid === data._id ? (
                                                <td>
                                                    <input onChange={handleInputChange} name='fullname' type="text" value={updateData.fullname} />
                                                </td>
                                            ) : (
                                                <td>
                                                    {data.fullname}
                                                </td>
                                            )}
                                            {editingid === data._id ? (
                                                <td>
                                                    <input onChange={handleInputChange} name='email' type="email" value={updateData.email} />
                                                </td>
                                            ) : (
                                                <td>
                                                    {data.email}
                                                </td>
                                            )}
                                            {editingid === data._id ? (
                                                <td>
                                                    <input onChange={handleInputChange} name='phonenumber' type="text" value={updateData.phonenumber} />
                                                </td>
                                            ) : (
                                                <td>
                                                    {data.phonenumber}
                                                </td>
                                            )}

                                            <td>{data.institution}</td>
                                            <td>{data.stream}</td>
                                            {editingid === data._id ? (
                                                <td>
                                                    <select onChange={handleInputChange} value={updateData.status} name="status" id="">
                                                        <option value={true}>Paid</option>
                                                        <option value={false}>UnPaid</option>
                                                    </select>
                                                </td>
                                            ) : (
                                                <td>
                                                    {data.status ? "Paid" : "Unpaid"}
                                                </td>
                                            )}
                                            <td className='action-btn'>
                                                {/* <input type="checkbox" /> */}
                                                {editingid === data._id ? <button onClick={() => handleUpdateUser(data._id, updateData)}><FaSave /></button> : <button onClick={() => handleUserEdit(data)}><FaEdit /></button>}
                                                {(props.adminData.role && props.adminData.role === 'pladmin') || props.adminData.role === 'superadmin' ? <button onClick={() => handleUserDelete(data._id)}><MdDeleteForever /></button> : null}

                                            </td>
                                        </tr>
                                    )
                                }) : <tr>{isLoading ? <p>Fetching Data <Loader /></p> : null}</tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Table Configuration Button */}

                <div className="table-config">
                    <div className="table-config-wrap">
                        <div className="pagination-btn">
                            <p>Pagination</p>
                            <button onClick={() => { currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(--currentPage) }}><TbArrowWaveLeftDown /></button>
                            <h1> {currentPage}</h1>
                            <button onClick={() => { filteredData.length < currentPage || currentPage === pageNumbers ? setCurrentPage(currentPage) : setCurrentPage(++currentPage) }}><TbArrowWaveRightUp /></button>
                        </div>
                    </div>
                </div>




            </div>

        </div>
    )
}

export default Participants;