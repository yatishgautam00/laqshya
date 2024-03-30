import React from 'react';
import { FaFacebook, FaFacebookF, FaInstagram, FaRegAddressCard } from 'react-icons/fa';
import { BsChatRightText } from 'react-icons/bs';
import { FiYoutube } from 'react-icons/fi'
import Navbar from '../../Components/Navbar/Navbar';
import './contactPage.scss'
import Footer from '../../Components/Footer/Footer';

const ConatctPage = (props) => {
  return (
    <div className='contact-page'>
      <div className='contact-wrap'>
        <Navbar />
        <div className='contact-banner'>

          <div className='greet'>
            <h1> We'd like to hear from you!</h1>
          </div>
          <div className='contact-detail'>
            <div className='address'>
              <div className='address-card'>
                <FaRegAddressCard className='con-icon' />
                <h3>Address:Shivaji nagar Balod road Durg</h3>
                <h3>chhattisgarh - 491001</h3>
                <h3>Contact no : 9669978555 , 7999507973</h3>
              </div>
            </div>
            <div className='social-media'>
              <div className="social-card">
                <BsChatRightText className='con-icon' />
                <a href="https://m.facebook.com/1392219277708303/"><FaFacebookF />&nbsp; Facebook</a>
                <a href="https://instagram.com/csgidurg?igshid=YmMyMTA2M2Y="><FaInstagram />&nbsp; Instagram</a>
                <a href="https://youtube.com/@CSGIDURG"><FiYoutube />&nbsp; youtube</a>
              </div>
            </div>
          </div>
        </div>

      
      </div>
      <Footer  windowSize={props.windowSize.length > 0 && props.windowSize ? props.windowSize : undefined}/>
    </div>
  )
}

export default ConatctPage;