import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("./testomonials.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="my-20 px-3 xl:px-0">
      <SectionTitle title="Testimonials Section"></SectionTitle>
      <div className="bg-slate-600 p-20 rounded-md text-white">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data?.map((item) => (
            <SwiperSlide key={item.testimonial_id}>
              <div className="flex gap-6 flex-col md:flex-row justify-center text-center items-center">
                <div className="w-full">
                  <img
                    className="border w-32 h-32 sm:w-52 sm:h-52 rounded-full outline-dashed mx-auto"
                    src={item.user_image_url}
                    alt="Todo"
                  />
                  <h2 className="text-center mt-4 text-lg sm:text-3xl font-semibold">
                    <q>{item.user_name}</q>
                  </h2>
                </div>
                <div className="w-full">
                  <blockquote>
                    <q>{item.testimonial_text}</q>
                  </blockquote>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
