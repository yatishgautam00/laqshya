import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bannercarousel from '../../Components/Bannercarousel/Bannercarousel';
import Eventcarousel from '../../Components/Eventcarousel/Eventcarousel';
import Eventmodal from '../../Components/Eventmodal/Eventmodal';
import Footer from '../../Components/Footer/Footer';
import FormModal from '../../Components/FormModal/FormModal';
import Navbar from '../../Components/Navbar/Navbar';
import { bannerslide, bouddhiki, kaushalya, Kautilya, natraja, parakram, Shauryas, workshop } from '../../Constants/OurConst';
import { checkTokenExpiration, logoutUser } from '../../Utils/commonutil';
import './Eventpage.scss';
import { FaSignOutAlt } from 'react-icons/fa';

const initialEventData = {
  eventname: "",
  registrationfee: "",
  eventid: "",
  maxParticipants: "",
  minParticipants: "",
  isGrouped: true,
  isIndividual: true,
  upiid: '',
  qrimage: '',
  fixed:true,

}

const Eventpage = (props) => {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [ourIndex, setOurIndex] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [eventNameFee, setEventNameFee] = useState(initialEventData);
  let [logoutTimer,setLogoutTimer]=useState(5);
  const [logoutText,setLogoutText]=useState('Logout');





  const openModal = async (ourIndex) => {
    setOurIndex(ourIndex);
    setIsModalOpened(true);
  }

  const handleLogout=()=>{
    setLogoutText(`You Will Be Logged Out In ${logoutTimer}s `)
    let interval = setInterval(()=>{
      setLogoutTimer(--logoutTimer);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval); // stop running the function after 5 seconds
    }, 5000);
    logoutUser();
  }

  useEffect(() => {
    if (checkTokenExpiration()) {
      setIsUserAuthenticated(false);
    } else {
      setIsUserAuthenticated(true);
    }
    const timer = setInterval(() => {
      if (checkTokenExpiration()) {
        setIsUserAuthenticated(false);
      } else {
        setIsUserAuthenticated(true);
      }
    }, 100);

    return () => clearInterval(timer);

  }, [])

  return (
    <div className='Eventpage'>
      {isModalOpened ? <Eventmodal openModal={setIsModalOpened} ourIndex={ourIndex} /> : null}

      {openFormModal ? (
        <FormModal eventNameFee={eventNameFee} setOpenFormModal={setOpenFormModal} />
      ) : null}
      {isUserAuthenticated ? <button className='clktosignout' onClick={handleLogout} >{logoutText} &nbsp;<FaSignOutAlt/></button> : (
        <a href='https://forms.gle/xCPkGz1KDacRz5Gc8' target='blank' className='clktosignin'>Sign to enroll for the events</a>
      )
      }
      <div className="eventpage-wrap">
        {/* Navbar  */}
        <Navbar />


        <div className="event-banner">
          <Bannercarousel
            bannerSlides={bannerslide}
          />
        </div>


        <div className=' event-detail'>
          <div className="event-wrapdetail">
            {/* event shaurya stars here */}
            <a href="/" id='Shaurya'></a>
            <div className='event-row'>
              <h1> <span className='diff-font'>ROBOTICS</span> </h1>
              {/* <h2>ROBOTICS</h2> */}
              <div className='row-details'>
                <p>It is an exciting event that brings together various competitions, including Robo Go-karting, and Sand Rover. Participants showcase their innovative designs and programming skills as they compete in these challenging and thrilling events. Whether you're a robotics enthusiast or just looking for some high-tech entertainment, it is an event that's sure to impress.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={Shauryas}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div>
            {/* event kaushalya starts here */}
            <a href="" id='kaushalya'></a>
            <div className='event-row' >
              <h1><span className='diff-font'>SPORTS</span></h1>
              {/* <h2>SPORTS</h2> */}
              <div className='row-details'>
                <p>Multi-sport event that brings together athletes and enthusiasts from various backgrounds to compete in four exciting disciplines - cricket, futsal, BGMI, Escape Room and Angry Bird. This event promises to be a thrilling display of strength, skill, and strategy, as participants battle it out in each sport to claim the coveted Kautilya trophy. Whether you're a seasoned athlete or a casual fan, it is sure to provide an unforgettable experience for all who participate.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={kaushalya}
                  setEventNameFee={setEventNameFee}
                  openModal={openModal}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div>
            {/* event bouddhiki starts here */}
            {/* <a href="" id='Bouddhiki'></a>
            <div className='event-row'>
              <h1><span className='diff-font'>Bouddhiki</span></h1>
              <h2>Brain Teaser</h2>
              <div className='row-details'>
                <p>Bouddhiki is an exciting brain teaser event that challenges participants to showcase their intelligence and creativity through a series of mental challenges. This event features a Face of Laqshya competition, where participants are judged on their ability to showcase their personality and confidence. Additionally, the event includes an Artifex show, which highlights the artistic skills of the participants, and a Cinematics challenge, where participants create and present short films on a given theme. Bouddhiki is a thrilling event that combines multiple talents and skills to create a unique and exciting experience for all involved.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={bouddhiki}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div> */}
            {/* event parakram starts here */}
            <a href="" id='Parakram'></a>
            <div className='event-row'>
              <h1><span className='diff-font'>TECHNICAL</span></h1>
              {/* <h2>Technical</h2> */}
              <div className='row-details'>
                <p>Technical event that showcases a range of cutting-edge competitions. The event features four exciting competitions, including Bottle Jet, D Bugger, Lets Play with Bond, and TEch Formulation. Each competition challenges participants to demonstrate their technical expertise and problem-solving skills in different areas such as debugging, and pharmaceuticals. With a high-energy atmosphere and talented participants, it is a must-attend event for anyone interested in the latest technological advancements.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={parakram}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div>
            {/* event natraj starts here */}
            <a href="" id='Natraja'></a>
            <div className='event-row' >
              <h1><span className='diff-font'>Cultural</span></h1>
              {/* <h2>Cultural</h2> */}
              <div className='row-details'>
                <p>Event that celebrates the art of dance. This event brings together dancers from different genres and backgrounds to showcase their skills and creativity in front of an enthusiastic audience. The participants are challenged to perform impromptu dances to various themes and music styles, while also being tested on their ability to articulate their thoughts in a minute or less. It promises to be a vibrant and entertaining evening that celebrates the beauty and diversity of dance and the power of words.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={natraja}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div>
            {/* event kautilya */}
            {/* <a href="" id='Kautilya'></a>
            <div className='event-row'>
              <h1><span className='diff-font'>Kautilya</span></h1>
              <h2>Academic</h2>
              <div className='row-details'>
                <p>Kautilya is an academic event that offers a diverse range of activities to engage and challenge participants. The event includes workshops and quiz masters to provide an immersive learning experience. Additionally, there is a hematology camp to promote awareness and education about blood disorders. For those seeking a more adventurous experience, a treasure hunt is also part of the event. Overall, Kautilya promises to be an exciting and educational event for all participants.</p>
              </div>
              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={Kautilya}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div> */}

            {/* workshop */}
            <a href="" id='Workshop'></a>

            {/* <div className='event-row'>
              <h1><span className='diff-font'>Workshop</span></h1>
              <h2>Academic</h2>
              <div className='row-details'>
                <p>A workshop is a collaborative learning experience where a group of individuals come together to actively participate and engage in a particular topic or skill. Workshops can be conducted in-person or online and can range in length from a few hours to several days.</p>
              </div>

              <div className='row-events'>
                <Eventcarousel
                  setOpenFormModal={setOpenFormModal}
                  isUserAuthenticated={isUserAuthenticated}
                  events={workshop}
                  openModal={openModal}
                  setEventNameFee={setEventNameFee}
                  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}
                />
              </div>
            </div> */}




          </div>


        </div>
        <Footer windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined} />

      </div>

    </div >

  )

}

export default Eventpage;
