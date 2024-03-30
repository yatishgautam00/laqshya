import React, { useEffect, useState } from 'react';
import './eventcarousel.scss';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { SlGameController } from "react-icons/sl";
import { playclicksound } from '../../Utils/commonutil';


const Eventcarousel = (props) => {

    const [isLogined, setIsLogined] = useState(props.isUserAuthenticated);

    useEffect(() => {
        setIsLogined(props.isUserAuthenticated);
    }, [props.isUserAuthenticated]);


    return (
        <div className='event-carousel'>
            <OwlCarousel className='owl-theme' autoplayHoverPause autoplay autoplaySpeed={5000} loop={false} margin={15} nav items={props.windowSize[0] <= 1025 ? 2 : 4}>
                {props.events ? props.events.map((event, index) => {
                    return (
                        <div key={index} class='item myevent-card'>
                            <div className='event-card-wrap'>
                                <div className="card-top">
                                    <img src={event.img} alt="gallery" loading='lazy' />
                                    <div className="overlay">
                                        {props.isUserAuthenticated ? <button onClick={() => {
                                            props.setOpenFormModal(true); playclicksound(); props.setEventNameFee(
                                                { eventname: event.title, registrationfee: event.registrationfee, isGrouped: event.isGrouped, isIndividual: event.isIndividual, eventid: event.eventid, maxParticipants: event.maxParticipants,minParticipants:event.minParticipants, upiid: event.upiid, qrimage: event.qrimage,fixed:event.fixed }
                                            )
                                        }}>Register</button> : null}

                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <h2 className='card-title'><span className='icon-title'><SlGameController /></span>{event.title}</h2>
                                    <button onClick={() => {props.openModal(event.ourIndex);playclicksound()}}>Read More</button>
                                </div>
                            </div>
                        </div>

                    )
                }) : (
                    <div class='item myevent-card'>
                        <div className='event-card-wrap'>
                            <div className="card-top">
                                <img src="https://ik.imagekit.io/dexo68yudb/625581fdda54f874b9152a6b_shutterstock_1683847615.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1676362306320" alt="card" />
                                <div className="overlay">
                                    <a aria-disabled href="#">Register</a>
                                </div>
                            </div>
                            <div className="card-bottom">
                                <h1 className='card-title'>Nothing is Here</h1>
                                <a aria-disabled href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                )}

            </OwlCarousel >
        </div >
    )
}

export default Eventcarousel;