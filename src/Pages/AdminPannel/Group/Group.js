import React, { useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Link } from 'react-router-dom';
import "./group.scss";
import { MdDeleteForever, MdGroupAdd, MdLoop } from "react-icons/md";
import { FaCheckDouble, FaEdit, FaSave, FaSearch, FaTimes } from 'react-icons/fa';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { API } from '../../../Services/Api';
import Loader from '../../../Components/Loader/Loader';

const initialfiltervalue = {
    searched: "",
    events: ""
}
const initialGroupUpdateData = {
    status: false,
    selected: false
}

const Group = (props) => {

    const [tableData, setTableData] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState(initialfiltervalue);
    const [sortBy, setSortBy] = useState("fullname");
    const [status, setStatus] = useState(false);
    const [searchSelected, setSearchSelected] = useState(false);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc");
    let [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [editingid, setEditingId] = useState(null);
    const [updateData, setUpdateData] = useState(initialGroupUpdateData);
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);





    useEffect(() => {
        const fetchGroupsData = async () => {
            setIsLoading(true);
            const response = await API.getAllGroups({ limit: itemPerPage, page: currentPage, status: status, selected: searchSelected });
            if (response.isSuccess) {
                setTableData(response.data.data);
                setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
                setIsLoading(false);

            } else {
                setIsLoading(false);
            }
        }
        fetchGroupsData();
    }, [itemPerPage, currentPage, status, toggle, searchSelected]);


    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Groups table',
        sheet: 'Groups'
    })

    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setStatus(value);
        }
        if (name === 'selected') {
            setSearchSelected(value);
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
    };

    const searchedTerms = filteredTerm.searched.toLowerCase().split(' ');
    const filteredData = tableData.filter((item) => {
        return searchedTerms.every((term) =>
            item.groupname.toLowerCase().includes(term) ||
            item.groupid.includes(term)
        ) && item.eventname.toLowerCase().includes(filteredTerm.events.toLowerCase())
    }
    );

    const handleItemPerpage = (e) => {

        setItemPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handleGroupEdit = async (rowdata) => {
        setEditingId(rowdata._id);
        setUpdateData({
            status: rowdata.status,
            selected: rowdata.selected
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

    const handleDeleteGroup = async (id) => {


        if (window.confirm("Do You Really Want To Delete The Group") === true) {
            const response = await API.deleteGroup({ id });
            if (response.isSuccess) {
                setToggle(!toggle);
            }
        }
    }

    const handleGroupUpdate = async (id, updateData) => {

        const response = await API.updateGroup({ id, updateData });

        if (response.isSuccess) {
            setToggle(!toggle);
            setEditingId(null)
        }

    }
    return (
        <div className='group'>
            <div className="group-wrap">

                <div className="group-heading">
                    <h1>Groups Participant</h1>
                    <button onClick={() => setToggle(!toggle)} className='adm-main-btn'>Refresh&nbsp;<MdLoop /></button>
                </div>

                {/*FILTER GROUP */}
                <div className="filter-group">
                    <div className="filter-group-wrap">
                        <div className="search-bar">
                            <label htmlFor="searched">Search for group participants</label>
                            <div className="input-wrap">
                                <input onChange={handleSearch} type="text" placeholder='Search' name='searched' id='searched' />
                                <button><FaSearch /></button>
                            </div>

                        </div>

                        <div className="filter-col">
                            <label htmlFor="status">Status</label>
                            <div className="adm-input-wrap">
                                <select value={status} onChange={handleSearch} name="status" id="status">
                                    <option value={true}>Paid</option>
                                    <option value={false}>Unpaid</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter-col">
                            <label htmlFor="status">Selected</label>
                            <div className="adm-input-wrap">
                                <select value={searchSelected} onChange={handleSearch} name="selected" id="status">
                                    <option value={true}>Selected</option>
                                    <option value={false}>Not Selected</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter-col">
                            <label htmlFor="events">Events</label>
                            <div className="adm-input-wrap">
                                <select value={filteredTerm.events} onChange={handleSearch} name="events" id="events">
                                    <option disabled hidden >Choose Event</option>
                                    <option value="" >All</option>
                                    <option value="Xxcelerate">Xxcelerate</option>
                                    <option value="Robo Soccer League">Robo Soccer League</option>
                                    <option value="Robo Go Carting">Robo Go Karting</option>
                                    <option value="Robo Sumo">Robo Sumo</option>
                                    <option value="Deep Blue">Deep Blue</option>
                                    <option value="Robo Fire Fight">Robo Fire Fight</option>
                                    <option value="Drone Race">Drone Race</option>
                                    <option value="Cricket">Cricket</option>
                                    <option value="One Minute Show">One Minute Show</option>
                                    <option value="Arm Wrestling">Arm Wrestling</option>
                                    <option value="Futsal">Futsal</option>
                                    <option value="Angry Bird">Angry Bird</option>
                                    <option value="E-Sports">E-Sports</option>
                                    <option value="Face Of Laqshya">Face Of Laqshya</option>
                                    <option value="Artifex Show">Artifex</option>
                                    <option value="Cinematics">Cinematics</option>
                                    <option value="Cad Master">Cad Master</option>
                                    <option value="Lets Play With Bond">Lets Play With Bond</option>
                                    <option value="Bottle jet">Bottle Jet</option>
                                    <option value="Code Crunch">Code Crunch</option>
                                    <option value="Tech farmacia">Tech Farmactic</option>
                                    <option value="Make Your Move">Make Your Move</option>
                                    <option value="AD Mad Show">One Minute Show</option>
                                    <option value="Quiz Masters">Quiz Masters</option>
                                    <option value="Treasure hunt">Treasure hunt</option>
                                    <option value="Ad Mad Show">Ad Mad Show</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="Cyber Security & Digital Marketing">Cyber Security & Digital Marketing</option>
                                    <option value="AI In Durg Discovery and New Education policy And Its Carrer">AI In Durg Discovery and New Education policy And Its Carrer</option>
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

                <div className="group-table">
                    <p className='error-mark' >The Select button will be Avaiable Only for once Please Select the Participants After Full Analysis ,There Is No Turning Back Feature</p>
                    <div className="group-table-wrap">
                        <table ref={tableRef} >
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("id")}>Id</th>
                                    <th>UniqueId</th>
                                    <th onClick={() => handleSort("fullname")}>Group Name</th>
                                    <th>Event</th>
                                    <th>Group Members</th>
                                    <th>Registration Fee</th>
                                    <th>Transaction Id</th>
                                    <th>Status</th>
                                    <th>Selection Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredData && filteredData.length > 0 ? filteredData.map((data, indx) => {

                                    return (
                                        <tr key={indx} style={{ background: data.selected ? "#5eff89" : "" }}>
                                            <td>{indx}</td>
                                            <td>{data.groupid}</td>
                                            <td>{data.groupname}</td>
                                            <td>{data.eventname}</td>
                                            <td className='mem-list'>
                                                {data.members && data.members.length > 0 ? data.members.map((member, ind) => {
                                                    return (
                                                        <p>{member.fullname}&nbsp;|&nbsp;{member.email}&nbsp;|&nbsp;{member.phonenumber}</p>
                                                    )
                                                }) : <p>No members</p>}
                                            </td>

                                            <td>{data.members.length > 0 ? data.registrationfee * data.members.length : data.registrationfee}</td>
                                            <td>{data.transactionid}</td>
                                            {editingid === data._id ? (
                                                <td>
                                                    <select defaultValue={updateData.status} onChange={handleInputChange} name="status" id="">
                                                        <option value={true}>Paid</option>
                                                        <option value={false}>UnPaid</option>
                                                    </select>
                                                </td>
                                            ) : (
                                                <td>
                                                    {data.status ? "Paid" : "Unpaid"}
                                                </td>
                                            )}
                                            <td>{data.selected ? <p>Selected &nbsp;&nbsp;<FaCheckDouble /></p> : <p>Not Selected&nbsp;&nbsp;<FaTimes /></p>}</td>
                                            <td className='action-btn'>
                                                {/* <input type="checkbox" /> */}
                                                <button disabled={data.selected ? props.adminData.role === 'superadmin' ? false : true : false} onClick={() => handleGroupUpdate(data._id, { selected: !data.selected })}>{data.selected ? "Selected" : "Select"}</button>
                                                {editingid === data._id ? <button onClick={() => handleGroupUpdate(data._id, updateData)}><FaSave /></button> : <button disabled={data.status ? true : false} onClick={() => handleGroupEdit(data)}><FaEdit /></button>}
                                                {(props.adminData.role && props.adminData.role === 'pladmin') || props.adminData.role === 'superadmin' ? <button onClick={() => handleDeleteGroup(data._id)}><MdDeleteForever /></button> : null}
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        {isLoading ? <p>Fetching Data <Loader /></p> : null}
                                        <td>No</td>
                                        <td>Data</td>
                                        <td>Avaialable</td>
                                        <td>At</td>
                                        <td>This</td>
                                        <td>Moment</td>
                                        <td>-------</td>
                                        <td>-------</td>
                                        <td>-------</td>
                                    </tr>
                                )}
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

export default Group