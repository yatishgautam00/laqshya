import React from 'react';
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "./footer.scss";


const Footer = (props) => {
  return (
    <div className='main-footer'>
      <div className="footer-wrap">
        <div className="coloumn-wrap">
          <div className="col">
            <div className="wdth-wrap">
              <img src="https://ik.imagekit.io/dexo68yudb/Picsart_23-04-05_00-59-59-876.png?updatedAt=1680671498745" alt="logo" />
              <p>Copyright © CSIT 2024<br />Techno Management Sports & Cultural Fest</p>
            </div>
          </div>
          <div className="col">
            <ul className="social-link">
              {props.windowSize[0] <= 990 ? null : <li>Social</li>}
              <li><Link to=" https://instagram.com/laqshya2023?igshid=YmMyMTA2M2Y=" >{props.windowSize[0] <= 990 ? <FaInstagram color='#ff2bae' /> : <>Instagram &nbsp; <FaInstagram /></>}</Link></li>
              <li><Link to="https://m.facebook.com/story.php?story_fbid=pfbid02tsRSxXviF5hmsyanwoxnan4wNngVYeaYFdkcEMWdzzoGgPxeD9VRLxsdeZ65thpyl&id=1392219277708303">{props.windowSize[0] <= 990 ? <FaFacebook /> : <>Facebook &nbsp;  <FaFacebook /></>}</Link></li>
              <li><Link to="https://youtube.com/@CSGIDURG">{props.windowSize[0] <= 990 ? <FaYoutube /> : <>Youtube &nbsp; <FaYoutube /></>}</Link></li>
            </ul>
          </div>
          <div className="col">
            <div className="register-link">
              <h4>Click Here To Register</h4>
              <a href='https://forms.gle/xCPkGz1KDacRz5Gc8' target='blank'>Register</a>
              {/* <Link to="/register">Register</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;