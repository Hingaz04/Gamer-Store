import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import HomeCarousel from "./HomeCarousel";

function HomeSwiper({ games }) {
  console.log("Games in HomeSwiper:", games);

  if (!Array.isArray(games) || games.length === 0) {
    return <p>No games available</p>;
  }

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      navigation={true}
      loop={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 35,
        stretch: 200,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Navigation, Autoplay]}
      className="home-swiper"
      onSwiper={(swiper) => (window.swiperInstance = swiper)}
    >
      {games.map((game) => (
        <SwiperSlide key={game._id}>
          <HomeCarousel game={game} swiperInstance={window.swiperInstance} />{" "}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeSwiper;
