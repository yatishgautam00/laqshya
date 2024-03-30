import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { API } from '../../Services/Api';
import "./postpage.scss";


const initialPostPagefiltervalue = {
  searched: "",
}

const PostPage = (props) => {
  const [filteredTerm, setFilteredTerm] = useState(initialPostPagefiltervalue);
  const [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const response = await API.getPostWithLimit({ limit: itemPerPage, page: currentPage });

      if (response.isSuccess) {
        setPosts(response.data.data || []);
        setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

    }
    fetchPosts();

  },[itemPerPage,currentPage]);

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
  const filteredData = posts.filter((item) => {
    return searchedTerms.every((term) =>
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.username.toLowerCase().includes(term)
    )
  }
  );


  const handleItemPerpage = (e) => {

    setItemPerPage(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className='postPage'>
      <div className="postPage-wrap">
        <Navbar />
        <div className="post-header">
          <div className="post-header-wrap">
            <div className="left-head">
              <h1>Catch The</h1>
              <span> Latest</span>
            </div>

          </div>
        </div>



        <div className="filters-group">
          <p>Filter&nbsp;&nbsp;<FaFilter/></p>
          <input onChange={handleSearch} type="text" placeholder='Search' name='searched' id='searched' />
          <select value={itemPerPage} onChange={handleItemPerpage} name="noitem" id="status">
            <option value={6} >6</option>
            <option value={12} >12</option>
            <option value={18} >18</option>
            <option value={24} >24</option>
            <option value={30} >30</option>
          </select>
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


        <div className="post-container">
          <div className="cont-grid">
            {filteredData && filteredData.length > 0 ? filteredData.map((post,indx) => {
              return (
                <div className="post-item-card" key={indx}>
                  <img src={post.picture[0]} alt="post" />
                  <div className="overlay">
                    <span>{post.category}</span>
                    <span>{post.title.length>15 ? post.title.slice(0,14)+'...' : post.title}</span>
                    <Link to={`/mypost/${post._id}`}>Read More</Link>
                  </div>
                </div>

              )
            }):(
              <p>Every Thing Is Imagination</p>
            )}
          </div>
        </div>

        <Footer windowSize={props.windowSize} />

      </div>

    </div>

  )
}

export default PostPage