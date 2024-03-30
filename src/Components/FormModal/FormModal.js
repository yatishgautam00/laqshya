import React, { useContext, useEffect, useState } from 'react';
import "./formmodal.scss";
import AutoComplete from '../AutoComplete/AutoComplete';
import { FaChevronLeft, FaSeedling, FaTimes, FaTrash } from 'react-icons/fa';
import { SiGooglepay, SiPaytm, SiPhonepe } from 'react-icons/si';
import { DataContext } from '../../Context/Dataprovider';
import Loader from '../Loader/Loader';
import { API } from '../../Services/Api';
import { Toaster } from '../Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { playErrorsound, playSuccesssound, playclicksound } from '../../Utils/commonutil';



const FormModal = (props) => {
    const { account } = useContext(DataContext);

    const initialGroupFormData = {
        groupname: "",
        members: [],
        eventname: "",
        registrationfee: "",
        status: false,
    }

    const [groupedClicked, setGroupedClicked] = useState("S1");
    const [s3FormType, setS3FormType] = useState(null);
    const [paticipants, setParticipants] = useState([]);
    const [indiFormData, setIndiFormData] = useState({});
    const [groupFormData, setGroupFormData] = useState(initialGroupFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [finalFee, setFinalFee] = useState(props.eventNameFee.fixed ? props.eventNameFee.registrationfee : props.eventNameFee.registrationfee);



    const navigate = useNavigate();

    // setIndiFormData(initialIndiFormData);
    useEffect(() => {
        const fetchUser = async () => {
            const userId = sessionStorage.getItem("isLogined");
            const response = await API.getParticipantWithId({ id: userId });
            if (response.isSuccess) {

                let { _id, fullname, email, phonenumber, institution, stream } = response.data;
                setIndiFormData({
                    id: userId || "CSIT",
                    fullname: fullname || "Anonymous",
                    email: email || "Anonymous@gmail.com",
                    phonenumber: phonenumber || "XXXXXXXXXX",
                    institution: institution || "Anonymous",
                    stream: stream || "Anonymous",
                    eventname: props.eventNameFee.eventname || "undifined",
                    eventid: props.eventNameFee.eventid,
                    registrationfee: props.eventNameFee.registrationfee || 0,
                    status: false
                });

                setGroupFormData({ ...initialGroupFormData, eventname: props.eventNameFee.eventname, eventid: props.eventNameFee.eventid, registrationfee: props.eventNameFee.registrationfee })

                setParticipants([response.data])

            }
        }
        fetchUser();
    }, []);


    const handleSelectPaticipants = (paticipant) => {
        const userexist = paticipants.find((user) => user._id === paticipant._id);
        const maxParticipants = props.eventNameFee.maxParticipants;
        const minParticipants = props.eventNameFee.minParticipants;
        if (!userexist) {
            if (paticipants.length < maxParticipants) {
                setParticipants([...paticipants, paticipant]);
                setGroupFormData({ ...groupFormData, members: paticipants });
            } else {
                setShowError(true);
                setErrorMessage("Participant Limit Reached");
                setTimeout(() => setShowError(false), 4000);
            }
        } else {
            setShowError(true);
            setErrorMessage("Member Is Already Present");
            setTimeout(() => setShowError(false), 4000);
        }
    }
    const handleDeleteMembers = (participantid) => {
        const updatedusers = paticipants.filter((user) => user._id !== participantid);
        setParticipants(updatedusers);
        setGroupFormData({ ...groupFormData, members: updatedusers });
    }

    const handleGroupNameChange = (ev) => {
        const { name, value } = ev.target;
        setGroupFormData({ ...groupFormData, groupname: value });
    }
    const handleMakeGroup = () => {
        if (paticipants.length < props.eventNameFee.minParticipants) {
            setShowError(true);
            setErrorMessage(`Choose Atleast ${props.eventNameFee.minParticipants} Participants`);
            setTimeout(() => setShowError(false), 4000);

        } else {
            playclicksound()
            setGroupFormData({ ...groupFormData, members: paticipants });
            setS3FormType('group');
            setGroupedClicked('S3');
            setFinalFee(props.eventNameFee.fixed ? props.eventNameFee.registrationfee : props.eventNameFee.registrationfee * paticipants.length);
        }
    }

    const handleGroupSubmit = async (groupformData) => {
        setIsLoading(true)

        const response = await API.registerGroups(groupFormData);

        if (response.isSuccess) {
            setIsLoading(false);
            setGroupedClicked('S4');
            setShowSuccess(true);
            playSuccesssound();
            setTimeout(() => { setShowSuccess(false) }, 4000);
        } else {
            setIsLoading(false)
            setShowError(true);
            playErrorsound();
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => { setShowError(false) }, 4000);
        }
    }

    const handleIndividalSubmit = async (formData) => {

        setIsLoading(true);

        const response = await API.registerIndividuals(formData);

        if (response.isSuccess) {
            setIsLoading(false);
            setGroupedClicked('S4');
            setShowSuccess(true);
            playSuccesssound();
            setTimeout(() => setShowSuccess(false), 4000);
        } else {
            setIsLoading(false);
            setShowError(true);
            playErrorsound();
            setErrorMessage(response.valerror || "Error!, Check Your Network Connection");
            setTimeout(() => setShowError(false), 4000);
        }

    }

    const handleUpiPay = (e) => {
        playclicksound()
        let deepLink = `upi://pay?pa=${props.eventNameFee.upiid}&am=${finalFee}&pn=${'Laqshya'}&cu=INR&tn=${props.eventNameFee.eventname}`;
        window.location.href = deepLink;
        setGroupedClicked('S1');
        props.setOpenFormModal(false);
    }





    return (

        <div className='formModal'>
            <div className="formModal-wrap">
                {showSuccess && <Toaster message={`Registered Successfully For ${props.eventNameFee.eventname}`} type={"success"} />}
                {showError && <Toaster message={errorMessage} type={"error"} />}
                <button onClick={() => { props.setOpenFormModal(false); playclicksound() }} className='cls-btn'><FaTimes /></button>

                <div className="form-wrap">
                    {/* first-step */}
                    {groupedClicked === "S1" ? (
                        <div className="form-step-1">
                            <h1> {props.eventNameFee.isGrouped && props.eventNameFee.isIndividual ? "Do you want to Perform" : "You are performing"} </h1>
                            <div className="row">
                                {props.eventNameFee.isGrouped && props.eventNameFee.isIndividual ? (
                                    <>
                                        <button onClick={() => { setS3FormType('indi'); setGroupedClicked("S3"); playclicksound() }}>Individual</button>
                                        <span>OR</span>
                                        <button onClick={() => { setS3FormType('group'); setGroupedClicked("S2"); playclicksound() }}>Grouped</button>
                                    </>

                                ) : props.eventNameFee.isGrouped && !props.eventNameFee.isIndividual ? (
                                    <button onClick={() => { setS3FormType('group'); setGroupedClicked("S2"); playclicksound() }}>Grouped</button>

                                ) : !props.eventNameFee.isGrouped && props.eventNameFee.isIndividual ? (
                                    <button onClick={() => { setS3FormType('indi'); setGroupedClicked("S3"); playclicksound() }}>Individual</button>
                                ) : null}

                            </div>
                        </div>
                    ) : groupedClicked === "S2" ? (
                        // second step
                        <div className="form-step-2">
                            <h1> Group Registration </h1>
                            <div className="row">
                                <div className="input-icon-wrap">
                                    <span className='input-icon'><FaSeedling /></span>
                                    <input value={groupFormData.groupname} onChange={handleGroupNameChange} type="text" name='groupname' placeholder='Group Name' id='groupname' />
                                </div>
                            </div>
                            <AutoComplete maxParticipants={props.eventNameFee.maxParticipants} minParticipants={props.eventNameFee.minParticipants} onSelect={handleSelectPaticipants} />
                            <div className="row2">
                                <div className="list-wrap">
                                    <ul>
                                        {paticipants && paticipants.length>0 ? paticipants.map((paticipant, index) => {
                                            return (

                                                <li key={index}>
                                                    <h1>{paticipant.fullname}</h1>
                                                    <button onClick={() => handleDeleteMembers(paticipant._id)}><FaTrash /></button>
                                                </li>
                                            )
                                        }):<li style={{color:"white"}}>No Participant Added</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="row2">
                                <div className="back-cross-btn">
                                    <button onClick={() => { setGroupedClicked("S1"); playclicksound() }}><FaChevronLeft />Back</button>
                                    <button onClick={handleMakeGroup}>Make Group</button>
                                </div>
                            </div>
                        </div>
                    ) : groupedClicked === "S3" ? (
                        <div className="form-step-3">
                            <h1>Registering For</h1>
                            <h2>Event Name : {props.eventNameFee.eventname}</h2>
                            <h2>Registration Fee :{s3FormType === 'indi' ? (props.eventNameFee.registrationfee) : (props.eventNameFee.fixed ? props.eventNameFee.registrationfee : props.eventNameFee.registrationfee * paticipants.length)}&nbsp;₹</h2>
                            {s3FormType === "indi" ? <button onClick={() => { handleIndividalSubmit(indiFormData); playclicksound() }}>{isLoading ? <Loader /> : "Pay"}</button> : s3FormType === "group" ? <button onClick={() => { handleGroupSubmit(groupFormData); playclicksound() }}>{isLoading ? <Loader /> : "Pay"}</button> : null}

                            <button onClick={() => { setGroupedClicked("S1"); playclicksound() }}><FaChevronLeft />Back</button>
                        </div>
                    ) : groupedClicked === "S4" ? (
                        <div className="form-step-4">
                            <h1>Scan Or Click To Pay</h1>
                            <img src={props.eventNameFee.qrimage} alt="qrcode" width={300} />
                            <hr width={'100%'} />
                            <p className='note-mark'>Firstly Pay using either of the options, kindly provide the <span>Transaction Id in the My events Page</span> for the comfirmation of the payment because after payment there is no refund options.</p>

                            <h3>Do you agree our terms & conditions <input type="checkbox" onClick={(e) => { e.target.checked ? setTermsAgreed(true) : setTermsAgreed(false) }} /></h3>
                            <button onClick={handleUpiPay} disabled={termsAgreed ? false : true}><SiPaytm /> &nbsp; <SiPhonepe /> &nbsp; <SiGooglepay /></button>

                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default FormModal;