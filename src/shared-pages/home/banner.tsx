"use client";

import React, {
  useCallback,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUser } from "@/contexts/MyContext";

import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useRouter } from "next/navigation";

import BannerSkelton from "@/components/animations/bannerSkelton";

export default function Banner({}) {
  const { push } = useRouter();
  const { uniqueId, token, setToken } = useUser();

  const carouselRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!carouselRef.current) return;
    (carouselRef.current as any).swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!carouselRef.current) return;
    (carouselRef.current as any).swiper.slideNext();
  }, []);

  const [getSliders, setgetSliders] = useState<boolean | any>();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    getTopSliders();
  }, []);
  const getTopSliders = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getSliders}?page=home&pageReference=top`,
        {
          headers: {},
        }
      );
      console.log(
        "the pcTopBottom is:-",
        JSON.stringify(response.data, null, 2)
      );
      setgetSliders(response.data.requestedData);
      setTimeout(() => {
        setShowSkeleton(false);
      }, 500); // Delay hiding the skeleton by 1 second
    } catch (err) {
      console.log("the error", err);
    }
  };

  const handleSlideClick = (linkType: any, linkValue: any) => {
    // console.log("linkType:", linkType);
    // console.log("linkValue:", linkValue);
    // Your function logic here
    console.log("the Uid:-", uniqueId);
    if (linkType == "category" || linkType == "brand") {
      console.log("it is:", linkType);
      if (linkType == "category") {
        push(`/products/products-listing?category=${linkValue}`);
      } else {
        push(`/products/products-listing?brand=${linkValue}`);
      }
    } else if (linkType == "custom") {
      console.log("it is:", linkType);
      push(linkValue);
    } else {
      console.log("it is:", linkType);
    }
  };

  return (
    <>
      <section className="relative z-0 mx-auto">
        {showSkeleton ? (
          <BannerSkelton />
        ) : (
          <div className=" w-full lg:block md:block">
            {/* <div className=""> */}
            <Swiper
              ref={carouselRef}
              spaceBetween={50}
              slidesPerView={2}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
              }}
              loop
              autoplay={{
                delay: 1000, // 1 second
                disableOnInteraction: true,
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {getSliders?.map((value: any, index: any) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[400px] sm:h-[500px] md:h-[500px] overflow-hidden object-fill">
                    <button
                      onClick={() => {
                        console.log("the slide clicked");
                        handleSlideClick(value?.linkType, value?.link);
                      }}
                    >
                      <img
                        src={`${Api.defaults.baseURL}${value?.sliderImageUrl}`} // Adjust based on your API response structure
                        className="absolute object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 h top-1/2 left-1/2"
                        alt={value?.sliderTitle || "Slide image"} // Adjust based on your API response structure
                        crossOrigin="anonymous"
                      />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type="button"
              className="absolute left-10 top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={handlePrev}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30/30 hover:bg-white/50  focus:ring-4 group-focus:ring-white  group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
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
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={handleNext}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30/30 group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
