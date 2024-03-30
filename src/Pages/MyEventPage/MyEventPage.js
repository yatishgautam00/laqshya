import React, { useEffect, useState } from 'react'
import "./myeventpage.scss";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh, BiShuffle } from "react-icons/bi";
import { API } from '../../Services/Api';
import { FaEdit, FaInfinity, FaSave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

const MyEventPage = () => {
  const [userData, setUserData] = useState({});
  const [enrolledIndiData, setEnrolledIndiData] = useState([]);
  const [enrolledGroupData, setEnrolledGroupData] = useState([]);
  const [editingid, setEditingId] = useState(null);
  const [indiEditingId, setIndiEditingId] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [showFlag, setShowFlag] = useState(true);
  const [transactionid, setTransactionId] = useState('');
  const [indiTransactionId, setIndiTransactionID] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchAllDatas = async () => {
      setIsLoading(true);
      if (sessionStorage.getItem('isLogined')) {
        const userResponse = await API.getParticipantWithId({ id: sessionStorage.getItem('isLogined') });

        if (userResponse.isSuccess) {
          setUserData(userResponse.data);

          const groupResponse = await API.getAllGroupsWithUser({ id: userResponse.data._id });
          const indiResponse = await API.getAllIndividualsWithUser({ id: userResponse.data._id });

          if (groupResponse.isSuccess) {
            setEnrolledGroupData(groupResponse.data);
            setTransactionId(groupResponse.data.transactionid);
            setIsLoading(false);
          }else{
            setIsLoading(false);
          }
          if (indiResponse.isSuccess) {
            setEnrolledIndiData(indiResponse.data);
            setIsLoading(false);
          }else{
            setIsLoading(false);
          }
        }
      }
    }
    fetchAllDatas();
  }, [toggle]);


  // Individual Handler Functions 

  const handleIndiInputChange = async (e) => {
    setIndiTransactionID(e.target.value);
  }
  const handleDeleteIndividual = async (id) => {
    if (window.confirm("Do You Really Want To Delete This Registration There Is No Refund") === true) {
      const response = await API.deleteIndividual({ id });
      if (response.isSuccess) {
        setToggle(!toggle);
      }
    }
  }

  const handleIndividualUpdate = async (id, updateData) => {

    const response = await API.updateIndividuals({ id, updateData });

    if (response.isSuccess) {
      setToggle(!toggle);
      setIndiEditingId(null)
    }
  }


  // Goup Handler Functions


  const handleInputChange = async (e) => {
    setTransactionId(e.target.value);
  }
  const handleDeleteGroup = async (id) => {


    if (window.confirm("Do You Really Want To Delete This Registration No Refund Available") === true) {
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
    <div className='myEventPage'>
      <div className="myEventPage-wrap">
        <div className="heading">
          <h1>My Events</h1>
          <Link to={'/events'}>Back</Link>
        </div>
        <div className="myevent-heading">
          {!userData || userData === null ? (
            <ul className="user-details">
              {isLoading ? (
                <li><Loader /></li>
              ) : (
                <>
                  <li>User</li>
                  <li>Is</li>
                  <li>Loged Out</li>
                </>

              )}
            </ul>
          ) : (

            <ul className="user-details">
              <li>Name : {userData.fullname || ""}</li>
              <li>Email : {userData.email || ""}</li>
              <li>Number : {userData.phonenumber || ""}</li>
            </ul>
          )}
        </div>

        <div className="myevent-details-cards">
          <h1>{showFlag ? "Indi" : "Group"} Registrations<button className={ isLoading ? 'refrsh-btn active' : 'refrsh-btn'} onClick={() => setToggle(!toggle)}><BiRefresh /></button><button className={showFlag ? 'shuff-btn' : 'shuff-btn active'} onClick={() => { setShowFlag(!showFlag); setToggle(!toggle) }}><BiShuffle /></button></h1>
          <div className="myevent-group-grid">

            {showFlag ? (
              enrolledIndiData && enrolledIndiData.length > 0 ? enrolledIndiData.map((indi, indx) => {
                return (
                  <div key={indx} className="myeve-card">
                    <ul>
                      <li>Event Name : {indi.eventname}</li>
                      <li>Individual ID : {indi.uid}</li>
                      <li>
                        Transaction Id : {indiEditingId === indi._id ? (
                          <>
                            <input value={indiTransactionId} onChange={handleIndiInputChange} type="text" name='transactionid' placeholder='Transaction Id' />
                            <button onClick={() => handleIndividualUpdate(indi._id, { transactionid: indiTransactionId })}><FaSave /></button>
                          </>
                        ) : (
                          <>
                            {indi.transactionid}&nbsp;<button onClick={() => setIndiEditingId(indi._id)}><FaEdit /></button>
                          </>
                        )}

                      </li>
                      <li>Registration Status :&nbsp;{indi.status ? <span className='success-dot'></span> : <span> Pending &nbsp;<p className='error-dot'></p></span>}</li>
                      <li>Selection For Next Round :&nbsp;{indi.selected ? <span className='success-dot'></span> : <span> Not Selected &nbsp;<span className='error-dot'></span></span>}</li>
                      <li><button onClick={() => handleDeleteIndividual(indi._id)}>Withdraw</button></li>
                    </ul>
                  </div>
                )

              }) : <p className='error-mark'>Not Registerd For Any Of The Events Yet</p>

            ) : (
              enrolledGroupData && enrolledGroupData.length > 0 ? enrolledGroupData.map((group, indx) => {
                return (
                  <div key={indx} className="myeve-card">
                    <ul>
                      <li>Event Name : {group.eventname}</li>
                      <li>Group Name : {group.groupname}</li>
                      <li>Group ID : {group.groupid}</li>
                      <li>
                        Transaction Id : {editingid === group._id ? (
                          <>
                            <input value={transactionid} onChange={handleInputChange} type="text" name='transactionid' placeholder='Transaction Id' />
                            <button onClick={() => handleGroupUpdate(group._id, { transactionid: transactionid })}><FaSave /></button>
                          </>
                        ) : (
                          <>
                            {group.transactionid}&nbsp;<button onClick={() => setEditingId(group._id)}><FaEdit /></button>
                          </>
                        )}

                      </li>
                      <li>Registration Status :&nbsp;{group.status ? <span className='success-dot'></span> : <span> Pending &nbsp;<p className='error-dot'></p></span>}</li>
                      <li>Selection For Next Round :&nbsp;{group.selected ? <span className='success-dot'></span> : <span> Not Selected &nbsp;<span className='error-dot'></span></span>}</li>
                      <li><button onClick={() => handleDeleteGroup(group._id)}>Withdraw</button></li>
                    </ul>
                  </div>
                )
              }) : (
                <p className='error-mark'>Not Registerd For Any Of The Events Yet</p>

              )
            )}


          </div>
        </div>
      </div>
    </div>
  )
}

export default MyEventPage;