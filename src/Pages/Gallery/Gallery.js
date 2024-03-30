import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdZoomOutMap } from 'react-icons/md';
import { Link } from "react-router-dom";
import { galleryData } from '../../Constants/OurConst';
import "./gallery.scss";



const Gallery = () => {
 

  const [imgSrc, setImgSrc] = useState('');
  const [itemType,setItemType]=useState('');
  const [displayZoom, setDisplayZoom] = useState(false);

  const handleZoomOut = (src,type) => {

    setImgSrc(src);
    setItemType(type);
    setDisplayZoom(true);

  }
  return (
    <>
      {
        displayZoom ? (
          <div className="zoom-out-wrap" >
            <div className="btns">
              <button onClick={()=>setDisplayZoom(false)}><FaTimes/></button>
            </div>
            <div className="img-display">
              {itemType === 'img' ?  <img src={imgSrc} alt="zoomed out"  loading='lazy'/>: <video controls muted autoPlay src={imgSrc}></video>}  
            </div>
          </div >

        ) : (

          <div className='gallery'>
            {/* Gallery wrap */}
            <div className="gallery-wrap">
              <div className="gallery-description">
               <div className="gallery-size">
               <div className="home-btn-wrap">
                <Link to={"/"} >Home</Link>
                </div>
                <div className="gallery-des-content">
                <h1>Our Gallery</h1>
                <p> Kaleidoscope Of Memories</p>
                  </div>
                </div>                
              
              </div>
              <div className="literal-gallery">
                <div className="gallery-container">
                  {galleryData.map((items, index) => {
                    return (
                      <div className="gallery-item" key={index}>

                        {items.type==='img' ? <img src={items.link} alt="gallery" loading='lazy' /> : <video controls muted autoPlay src={items.link}></video>}

                        
                        <div className="over-lay">
                          <button onClick={() => handleZoomOut(items.link,items.type)} ><MdZoomOutMap /></button>
                        </div>
                      </div>

                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Gallery;