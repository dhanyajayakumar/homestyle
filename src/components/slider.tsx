// "use client";
// import React, { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
// import Api from "@/lib/url";
// import { useRouter } from "next/navigation";
// import "swiper/css/effect-fade";
// import "@/styles/custom.css"; // Import custom styles

// SwiperCore.use([Navigation, Pagination, Autoplay]);

// export interface sliderProps {
//   collectionBanners: any;
// }

// const Slider: React.FC<sliderProps> = ({ collectionBanners }) => {
//   const { push } = useRouter();
//   const carouselRef = useRef(null);

//   const handleClickOnshopNow = (linkId: any) => {
//     console.log("The id is:", linkId);
//     push(`/products/products-listing?id=${linkId}&linkType=category`);
//   };

//   return (
//     <div className="relative mt-5 sm:gap-3 md:gap-5">
//       <Swiper
//         ref={carouselRef}
//         spaceBetween={20}
//         slidesPerView={1}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 5 },
//         }}
//         loop
//         autoplay={{
//           delay: 1000, // 1 second
//           disableOnInteraction: true,
//         }}
//         onSlideChange={() => console.log("slide change")}
//         onSwiper={(swiper) => console.log(swiper)}
//       >
//         {collectionBanners?.map((value: any) => (
//           <SwiperSlide key={value._id}>
//             <div className=" w-full sm:w-auto bg-white hover:shadow-lg group h-full" >
//               <div className="relative">
//                 <div className="relative overflow-hidden object-fill">
//                   <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
//                   <button
//                     onClick={() => handleClickOnshopNow(value._id)}
//                     className="absolute border-2 inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group"
//                   >
//                     <div className="flex flex-row p-2">
//                       <span className="">SHOP NOW</span>
//                       <svg className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 15 14">
//                         <polygon className="fill-current" points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 " />
//                       </svg>
//                     </div>
//                   </button>
//                   <img className="object-cover w-full h-full" src={`${Api.defaults.baseURL}${value.categoryImageUrl}`} crossOrigin="anonymous" alt="" />
//                 </div>

//                 <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
//                   <p className="text-xs tracking-widest capitalize sm:text-sm md:text-base">{value.categoryTitle}</p>
//                   <h3 className="text-sm font-medium text-gray-900 sm:text-base">
//                     <a href="#" title="">
//                       {value?.offer?.offerTitle}
//                       <span className="absolute inset-0" aria-hidden="true"></span>
//                     </a>
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <button type="button" className="absolute left-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => carouselRef.current.swiper.slidePrev()}>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
//           <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//             <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
//           </svg>
//         </span>
//       </button>

//       <button type="button" className="absolute right-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => carouselRef.current.swiper.slideNext()}>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
//           <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//             <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
//           </svg>
//         </span>
//       </button>
//     </div>
//   );
// };

// export default Slider;

import React, { Fragment, useEffect, useState, useRef } from "react";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useRouter } from "next/navigation";

export interface sliderProps {
  collectionBanners: any;
}

const Slider: React.FC<sliderProps> = ({ collectionBanners }) => {
  const { push } = useRouter();

  const scrollRef = useRef<any>(null); // Create a ref for scrolling

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" }); // Adjust scroll amount as needed
    }
  };

  const scrollToPrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" }); // Adjust scroll amount as needed
    }
  };
  const handleClickOnshopNow = (linkId: any) => {
    console.log("THe id is:-", linkId);
    push(`/products/products-listing?id=${linkId}&linkType=category`);
  };

  return (
    <div className="relative mt-5 sm:gap-3 md:gap-5">
      <div className="flex items-center justify-between mb-2 relative">
        <div
          className="flex overflow-x-auto no-scrollbar"
          ref={scrollRef}
          style={{ gap: "20px" }}
        >
          {collectionBanners?.map((value: any) => (
            <div
              key={value._id}
              className="flex-shrink-0 w-full sm:w-auto md:w-[20%] lg:w-[20%] xl:w-[20%] bg-white hover:shadow-lg group"
              style={{ minWidth: "250px", maxWidth: "300px" }} // Adjust width as needed
            >
              <div className="relative">
                <div className="relative aspect-w-1 aspect-h-1">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button
                    onClick={() => handleClickOnshopNow(value._id)}
                    className="absolute border-2 inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group"
                  >
                    <div className="flex flex-row p-2">
                      <span className="">SHOP NOW</span>
                      <svg
                        className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 15 14"
                      >
                        <polygon
                          className="fill-current"
                          points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                        />
                      </svg>
                    </div>
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src={`${Api.defaults.baseURL}${value.categoryImageUrl}`}
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-xs tracking-widest capitalize sm:text-sm md:text-base">
                    {value.categoryTitle}
                  </p>
                  <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                    <a href="#" title="">
                      {value?.offer?.offerTitle}
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute left-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollToPrevious}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="absolute right-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollToNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Slider;
