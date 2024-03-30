import React, { useEffect, useState } from 'react'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";


import "./postCarousel.scss";
import { Autoplay, EffectCoverflow, EffectCreative, Pagination } from "swiper"
import { Link } from 'react-router-dom';
import { API } from '../../Services/Api';

const PostCarousel = (props) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {

      const response = await API.getPostWithLimit({ limit: 10 });

      if (response.isSuccess) {
        console.log(response.data.data);
        setPosts(response.data.data || []);
      }

    }
    fetchPosts();

  }, [])
  return (


    <div className='post-carousel'>
      <Swiper
        effect={props.windowSize[0] <= 990 ? "creative" : "coverflow"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={props.windowSize[0] <= 990 ? "auto" : 3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        loop={true}
        direction={'horizontal'}
        loopedSlides={3}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={props.windowSize[0] <= 990 ? [EffectCreative, Autoplay] : [EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper"
      >
        {/* Here the Image Section */}

        {posts && posts.length > 0 ? posts.map((item, index) => {

          return (
            <SwiperSlide key={index}>

              <div className="my-post-card">
                <Link to={`/mypost/${item._id}`} className="overlay">
                  <div className="numberi">{index + 1}</div>
                  <div className="over-details">
                    <div className="badge"><span>{item.category}</span></div>
                    <h1>{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</h1>
                  </div>

                </Link>
                <img src={item.picture[0]} alt='dbdb' />
              </div>

            </SwiperSlide>
          )
        }) : (
          <SwiperSlide key={-1}>

            <div className="my-post-card">
              <div className="overlay">
                <div className="numberi">{0}</div>
                <div className="over-details">
                  <div className="badge"><span>Recent Posts</span></div>
                  <h1>Swipe To See More Posts</h1>
                </div>

              </div>
              <img src='https://ik.imagekit.io/laqshya/posters/a3%20(20240327024630)%20(2)%20(2).png?updatedAt=1711786862564' alt='slider demo' />
            </div>

          </SwiperSlide>

        )}
      </Swiper>
    </div >
  )
}

export default PostCarousel;