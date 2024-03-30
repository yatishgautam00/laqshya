import React, { useEffect, useState } from 'react';
import "./navbar.scss";
import { CgUserlane } from "react-icons/cg";
import { FaBars, FaDiceSix, FaSignOutAlt, FaTimes, FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom';
import { logoutUser, playclicksound } from '../../Utils/commonutil';

const Navbar = (props) => {
  // MAKING STATE (states are nothing but its variable ; we can sture dunamic data to be stored)
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);

  const location = useLocation();


  useEffect(() => {

    const isLogined = sessionStorage.getItem('isLogined');
    if (isLogined) {
      setIsUserLogined(true);
    } else {
      setIsUserLogined(false);
    }
  }, [location])





  window.onscroll = () => {
    setIsScrolled(window.pageYOffset > 80 ? true : false);
    return () => (window.onscroll = null);
  }

  const playSound = (ev) => {
    if (audioPlayed) {
      setAudioPlayed(false);
      document.getElementById('ouraudio').pause();
    } else {
      setAudioPlayed(true);
      document.getElementById('ouraudio').play();
    }
  }







  return (
    <div className={isScrolled ? 'navbar scroll-effect' : 'navbar'}>
      <div className="main-navbar">
        <div className="left-navbar">
          <div className="logo"><h1>LAQSHYA</h1></div>
          <button className='audio-btn' onClick={(e) => playSound(e)}>{audioPlayed ? <FaVolumeMute /> : <FaVolumeUp />}</button>
          <ul className="menu">
            <li><a href="/">HOME</a></li>
            <li><a href="/events">EVENTS</a></li>
            <li><a href="/gallery">GALLERY</a></li>
            {/* <li><a href="/posts">POSTS</a></li> */}
            <li><a href="/contact">CONTACT</a></li>
          </ul>


        </div>
        <div className="right-navbar">
          {isUserLogined ? (
            <>
              <Link to={'/myevents'}><span>My Events<FaDiceSix /></span></Link>
              <button  onClick={() => {logoutUser();playclicksound()}}><FaSignOutAlt /></button>
            </>
          ) : (
            <a href='https://forms.gle/xCPkGz1KDacRz5Gc8' target='blank'><span>Register<CgUserlane /></span></a>

          )}
          <button onClick={() => { setIsSideBarOpened(!isSideBarOpened);playclicksound() }} className='side-bar-btn'>
            <FaBars />
          </button>


        </div>
      </div >

      {/* side bar */}

      < div className={isSideBarOpened ? "side-bar opened" : "side-bar"} >
        <ul className="side-menu">
          <li><button onClick={() => { setIsSideBarOpened(false);playclicksound()}} className='side-bar-btn'><FaTimes /></button></li>
          <li><Link className={isSideBarOpened ? "anim1" : ""} to={"/"}>HOME</Link></li>
          <li><Link className={isSideBarOpened ? "anim2" : ""} to={"/events"}>EVENTS</Link></li>
          <li><Link className={isSideBarOpened ? "anim3" : ""} to={"/gallery"}>GALLERY</Link></li>
          <li><Link className={isSideBarOpened ? "anim4" : ""} to={"/contact"}>CONTACT</Link></li>
          {/* <li><Link className={isSideBarOpened ? "anim4" : ""} to={"/posts"}>POSTS</Link></li> */}

          {isUserLogined ? (
            <li><Link className={isSideBarOpened ? "anim5" : ""} to={'/myevents'}>MY EVENTS</Link></li>
          ) : (
            <li><a className={isSideBarOpened ? "anim5" : ""} href='https://forms.gle/xCPkGz1KDacRz5Gc8' target='blank'>Register</a></li>

          )}

        </ul>
      </div >

    </div >
  )
}

export default Navbar;