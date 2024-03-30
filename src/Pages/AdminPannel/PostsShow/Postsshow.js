import React, { useEffect, useState } from 'react';
import { FaPen, FaSearch, FaTrash } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { API } from '../../../Services/Api';
import './postshow.scss';

const initialpostfiltervalue = {
    searched: "",
    events: ""
}

const Postsshow = (props) => {
    const [tableData, setTableData] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState(initialpostfiltervalue);
    const [pageNumbers, setPageNumbers] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [username, setUserName] = useState(props.adminData.fullname);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await API.getPostWithLimit({ limit: itemPerPage, page: currentPage, username: props.adminData.role === "superadmin" ? null : username });
            if (response.isSuccess) {
                setTableData(response.data.data || []);
                setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
                setIsLoading(false);

            }else{
                setIsLoading(false)
            }
        }
        fetchData();
    }, [itemPerPage, currentPage, toggle, username]);




    const handleSearch = (e) => {
        const { name, value } = e.target;
        setFilteredTerm((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }

    const searchedTerms = filteredTerm.searched.toLowerCase().split(' ');
    const filteredData = tableData.filter((item) => {
        return searchedTerms.every((term) =>
            item.title.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.username.toLowerCase().includes(term)
        )
    }
    );



    const handlePostDelete = async (id, key) => {
        if (window.confirm("Do You Really Want To Delete This Post") === true) {
            const response = await API.deletePost({ id });
            if (response.isSuccess) {
                const resp = await API.deleteImageFromIMK({ id: key });
                if (resp.isSuccess) {
                    setToggle(!toggle);
                }
            }
        }
    }



    const handleItemPerpage = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1);
    }









    return (
        <div className='postshow'>
            <div className="postshow-wrap">
                <div className="postshow-heading">
                    <h1>Posts</h1>
                    <Link to={'/admin/dashboard/createpost'} className='adm-main-btn'>Add&nbsp;<MdGroupAdd /></Link>
                </div>


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
                        <div className="filter-col">
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
                </div>



                <div className="postshow-cont">
                    <div className="postshow-grid">
                        {filteredData && filteredData.length > 0 ? filteredData.map((post, indx) => {
                            return (
                                <div className="postshow-cards">
                                    <div className="ps-head">
                                        <span>{post.username}</span>
                                        <button onClick={() => handlePostDelete(post._id, post.imgkey)}><FaTrash /></button>
                                    </div>
                                    <div className="ps-img">
                                        <img src={post.picture} alt="postcarddata" />
                                    </div>
                                    <div className="ps-content">
                                        <div className="edit-cat">
                                            <span className='badge'>{post.category}</span>
                                            <button><FaPen /></button>
                                        </div>
                                        <span>{post.title.split('').length > 20 ? post.title.split('').slice(0, 19).join('') + "..." : post.title}</span>
                                        <p>{post.description.split('').length > 20 ? post.description.split('').slice(0, 19).join('') + "..." : post.description}</p>
                                        <span className='dat-time'>{post.createdAt}</span>
                                    </div>
                                </div>
                            )

                        }) : <p>NO POSTS AVAILABLE </p>}
                    </div>
                </div>




            </div>
        </div>
    )
}

export default Postsshow;