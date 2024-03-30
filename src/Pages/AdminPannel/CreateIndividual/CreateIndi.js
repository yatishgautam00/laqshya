import React, { useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AutoComplete from '../../../Components/AutoComplete/AutoComplete';
import "./createindi.scss";

const CreateIndi = () => {


    const [paticipants, setParticipants] = useState([]);
    const [indiFormData, setIndiFormData] = useState({});


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const userId = sessionStorage.getItem("isLogined");
    //         const response = await API.getParticipantWithId({ id: userId });
    //         if (response.isSuccess) {
                

    //             let { _id, fullname, email, phonenumber, institution, standard } = response.data;
    //             setIndiFormData({
    //                 id: userId || "CSIT",
    //                 fullname: fullname || "Anonymous",
    //                 email: email || "Anonymous@gmail.com",
    //                 phonenumber: phonenumber || "XXXXXXXXXX",
    //                 institution: institution || "Anonymous",
    //                 standard: standard || "Anonymous",
    //                 eventname: props.eventNameFee.eventname || "undifined",
    //                 eventid: props.eventNameFee.eventid,
    //                 registrationfee: props.eventNameFee.registrationfee || 0,
    //                 status: false
    //             });

    //             setGroupFormData({...initialGroupFormData,eventname:props.eventNameFee.eventname,eventid:props.eventNameFee.eventid,registrationfee:props.eventNameFee.registrationfee})

    //             setParticipants([response.data])

    //         }
    //     }
    //     fetchUser();
    // }, []);

    // const handleSelectPaticipants = (paticipant) => {
    //     const userexist = paticipants.find((user) => user._id === paticipant._id);
    //     const maxParticipants = props.eventNameFee.maxParticipants;
    //     if (!userexist && paticipants.length <= maxParticipants) {
    //         setParticipants([...paticipants, paticipant]);
    //         setGroupFormData({...groupFormData,members:paticipants});
    //         console.log("participants", paticipants);
    //     } else {
    //         setShowError(true);
    //         setErrorMessage("Participant Limit Reached");
    //         setTimeout(() => setShowError(false), 4000);
    //     }
    // }
    return (
        <div className='createIndi'>
            <div className="createIndi-wrap">
                <div className="createIndi-heading">
                    <h1>Create Participants</h1>
                    <Link className='adm-main-btn'>Add&nbsp;<MdGroupAdd /></Link>
                </div>

                <div className="add-individual">
                    <form action="">
                        <div className="row">
                        {/* <AutoComplete maxParticipants={this.props.first.eventNameFee}  /> */}
                        </div>

                        <div className="row">
                            <select name="status" id="status">
                                <option value={true}>Paid</option>
                                <option value={false}>Unpaid</option>
                            </select>
                        </div>
                        <div className="row">
                            <select name="event" id="event">
                                <option disabled hidden >Choose Event</option>
                                <option value="" >All</option>
                                <option value="XXcelerate">XXcelerate</option>
                                <option value="Robo Go Carting">Robo Go Carting</option>
                                <option value="Robo Score Laegue">Robo Score Laegue</option>
                                <option value="Robo sumo">Robo sumo</option>
                                <option value="Deep Blue">Deep Blue</option>
                                <option value="Robo Fire Fight">Robo Fire Fight</option>
                                <option value="Drone Race">Drone Race</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Arm Wrestling">Arm Wrestling</option>
                                <option value="Futsal">Futsal</option>
                                <option value="Angry Bird">Angry Bird</option>
                                <option value="E-Sports">E-Sports</option>
                                <option value="Face Of Laqshya">Face Of Laqshya</option>
                                <option value="Artifex Show">Artifex Show</option>
                                <option value="Cinematics">Cinematics</option>
                                <option value="Bottle Jet">Bottle Jet</option>
                                <option value="Code Crunch">Code Crunch</option>
                                <option value="Tech Farmacia">Tech Farmacia</option>
                                <option value="Lets Play With Bond">Lets Play With Bond</option>
                                <option value="Quiz Master">Quiz Master</option>
                                <option value="Treasure Hunt">Treasure Hunt</option>
                                <option value="Make Your Move">Make Your Move</option>
                                <option value="Ad Mad Show">Ad Mad Show</option>
                                <option value="Digit MArketing">Digit MArketing</option>
                                <option value="Cyber Securiyt">Cyber Securiyt</option>
                                <option value="Drug Awareness">Drug Awareness</option>
                                <option value="Carrer Counseling">Carrer Counseling</option>
                            </select>
                        </div>
                        <div className="row">
                            <input type="text" placeholder='Registration Fee' name='registrationfee' id='registrationfee' />
                        </div>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateIndi;