import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../Services/Api';
import "./mypost.scss";

const MyPost = () => {

    const [onePost, setOnePost] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await API.getOnePost({ id });

            if (response.isSuccess) {
                setOnePost(response.data);
            }
        }
        fetchPost();
    }, [])

    return (

        <div className='myPost'>
            <div className="mypost-wrap">
                <div className="mypost-container">
                    <div className="mypost-cnt-left">
                        <div className="left-wrap">

                            <div className="img-cnt1">
                                <img src={onePost.picture || ''} alt="" />
                            </div>
                            <div className="img-cnt2">
                                {onePost.picture && onePost.picture.length > 0 ? onePost.picture.map((pic, indx) => {
                                    return (
                                        <img key={indx} src={pic} alt="post" />
                                    )
                                }) : null}
                            </div>
                        </div>
                    </div>
                    <div className="mypost-cnt-right">
                        <div className="details">
                            <ul className="cnt-det">
                                <li>{onePost.category || ""}</li>
                                <li>{onePost.title || ""}</li>
                                <li>{onePost.description || ""}</li>
                                <li>Author: {onePost.username || ""}</li>
                                <li>Date: {onePost.createdAt || ""}</li>
                                <li><Link to={'/posts'}>Back</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default MyPost;



