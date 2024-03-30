import axios from 'axios';
import React, { useState } from 'react'
import { MdGroupAdd } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { Toaster } from '../../../Components/Toaster/Toaster';
import { API } from '../../../Services/Api';
import './createpost.scss';

const initialPostData = {
  title: '',
  category: '',
  description: '',
  picture: '',
  username: '',
  imgkey:''
}

const Createpost = (props) => {
  const [file, setFile] = useState(null);
  const [imageurl, setImageUrl] = useState('https://ik.imagekit.io/dexo68yudb/Node_Lock.gif?updatedAt=1679306878257');
  const [postData, setPostData] = useState(initialPostData);
  const [fronterros, setFronterrors] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleInputChange = async (e) => {

    const { name, value } = e.target;
    setPostData((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })

  }

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();
    if (!postData.title || !postData.category || !postData.description) {
      setShowError(true);
      setErrorMessage("Fill All Required Fields");
      setTimeout(() => setShowError(false), 4000);
      setFronterrors(true);
      setIsLoading(false);
    } else {
      setFronterrors(false);
      const formData = new FormData();
      formData.append('file', file);

      // const res = await API.uploadImg(formData);
      await axios.post('http://localhost:8001/image/upload', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      }).then(async (response) => {
        setImageUrl(response.data.imageUrl);
        setFile(null);
        postData.picture = await response.data.imageUrl;
        postData.username = await props.adminData.fullname;
        postData.imgkey=await response.data.key;
        let resp = await API.addPost(postData);
        if (resp.isSuccess) {
          setIsLoading(false);
          setShowSuccess(true);
          setPostData(initialPostData);
          setTimeout(() => setShowSuccess(false), 4000);
          setImageUrl('https://ik.imagekit.io/dexo68yudb/Node_Lock.gif?updatedAt=1679306878257');
          navigate('/admin/dashboard/showposts')

        } else {
          setIsLoading(false);
          setShowError(true);
          setErrorMessage(resp.valerror || resp.data.msg);
          setTimeout(() => setShowError(false), 4000);
        }

      }).catch((error) => {
        console.log("error", error);
        setIsLoading(false);
        setShowError(true);
        setErrorMessage(error.response.data.msg || error.message);
        setTimeout(() => setShowError(false), 4000);

      })


    }
  };
  return (
    <div className='createpost'>
      {showSuccess && <Toaster message={"Post Added Successfully"} type={"success"} />}
      {showError && <Toaster message={errorMessage} type={"error"} />}
      <div className="createpost-wrap">

        <div className="createpost-heading">
          <h1>Add Post</h1>
        </div>


        <div className="addpost-form">
          <form action="">
            <div className="left-form">
              <label htmlFor="postimg">
                {isLoading ? <Loader /> : " Click or Drag To Upload"}<br />
                {file ? <p>{file.name}</p> : null}
                <input style={{ display: "none" }} type="file" id='postimg' onChange={handleFileChange} />
              </label>

            </div>
            <div className="right-form">
              <p className='error-mark'>* Means Field Is Required</p>
              {showSuccess && <p className='note-mark'>Post Added Successfully</p>}
              {showError && <p className='error-mark'>{errorMessage}</p>}
              <div className="row">
                <input value={postData.title} onChange={handleInputChange} type="text" name='title' placeholder='Title *' />
                {fronterros && <p className='error-mark'>Title Is Required</p>}
              </div>
              <div className="row">
                <input value={postData.category} onChange={handleInputChange} type="text" name='category' placeholder='Category *' />
                {fronterros && <p className='error-mark'>Category Is Required</p>}
              </div>
              <div className="row">
                <input value={postData.description} onChange={handleInputChange} type="text" name='description' placeholder='Description *' />
                {fronterros && <p className='error-mark'>Description Is Required</p>}
              </div>
              <div className="row">
                <button onClick={handleSubmit}>{isLoading ? <Loader /> : "Post"}</button>
              </div>
            </div>
          </form>
        </div>

        <div className="image-show">
          <img style={{ objectFit: "cover" }} width={150} height={150} src={imageurl} alt="showcase" />

        </div>



      </div>
    </div>
  )
}

export default Createpost;