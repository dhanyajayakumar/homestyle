"use client";

import React, {
  useCallback,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ProductCardProps {
  product: any;
  handleClickOnProduct: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClickOnProduct,
}) => {
  return (
    <div className="relative before:bg-gradient-to-t before:from-black before:to-transparent before:h-50 before:absolute before:inset-0 before:opacity-60 group">
      <img
        className="object-cover h-full"
        src={`${Api.defaults.baseURL}${product?.categoryImageUrl}`}
        alt="productImg"
        crossOrigin="anonymous"
      />

      <div className="absolute bottom-0 w-full p-5 text-white transition-all duration-300 ease-in-out translate-y-0 sm:translate-y-14 group-hover:-translate-y-1">
        <p className="mb-4 text-lg capitalize">{product?.categoryTitle}</p>
        <a
          onClick={() => {
            handleClickOnProduct(product?._id);
          }}
          // href="products.html"
          className="flex gap-3 px-3 py-2 transition-all border border-white opacity-100 sm:opacity-0 w-fit group-hover:opacity-100 hover:bg-white hover:border-white hover:text-black"
        >
          Shop All
          <svg
            className="-rotate-45 w-[17px] mt-0 fill-white group-hover:fill-black"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 15 14"
            // style="enable-background: new 0 0 15 14"
            // xml:space="preserve"
          >
            <polygon
              className="fill-current"
              points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default function Exculusiveproduct({}) {
  const { push } = useRouter();

  const carouselRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!carouselRef.current) return;
    (carouselRef.current as any).swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!carouselRef.current) return;
    (carouselRef.current as any).swiper.slideNext();
  }, []);

  const [topRightData, settopRightData] = useState();
  const [topRightBanners, settopRightBanners] = useState<any>();
  const [titleIs, settitleIs] = useState();
  const [subTittle, setsubTittle] = useState();
  const [sliderTopRight, setsliderTopRight] = useState<any>();

  useEffect(() => {
    getTopRight();
    getTopRightSlide();
  }, []);

  const getTopRight = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getCollection}?page=home&pageReference=top-right`,
        {
          headers: {},
        }
      );
      console.log(
        "the pcTopBottom is:-",
        JSON.stringify(response.data, null, 2)
      );
      settopRightData(response.data.requestedData);
      settitleIs(response?.data?.requestedData[0]?.collectionTitle);
      setsubTittle(response?.data?.requestedData[0]?.collectionSubTitle);
      console.log(
        "outs:-",
        JSON.stringify(response.data.requestedData, null, 2)
      );
      console.log(
        "ins:-",
        JSON.stringify(
          response.data.requestedData[0].collectionsCategories,
          null,
          2
        )
      );
      settopRightBanners(response.data.requestedData[0].collectionsCategories);
    } catch (err) {
      console.log("the error", err);
    }
  };

  const getTopRightSlide = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getSliders}?page=home&pageReference=top-left`,
        {
          headers: {},
        }
      );
      console.log(
        "the pcTopBottom is:-",
        JSON.stringify(response.data, null, 2)
      );
      setsliderTopRight(response.data.requestedData);
    } catch (err) {
      console.log("the error", err);
    }
  };

  const handleClickOnSlides = (linkType: any, linkValue: any) => {
    console.log("The Type of slide is:-", linkType);
    console.log("The Value of slide is:-", linkValue);
    if (linkType == "category" || linkType == "brand") {
      console.log("it is:", linkType);
      // push(`/products/products-listing?id=${linkValue}`);

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

  const handleClickOnProduct = (linkId: any) => {
    console.log("THe id is:-", linkId);
    push(`/products/products-listing?id=${linkId}&linkType=category`);
  };
  return (
    <div>
      <section id="exclusive-products" className="">
        <div className="py-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl lg:text-3xl">{titleIs}</h2>
            <span className="text-sm lg:text-xl opacity-60">{subTittle}</span>
          </div>
          <div className="flex flex-col gap-5 px-3 sm:px-6 md:flex-col lg:flex-row">
            <div className="w-full h-[500px] md:h-[600px] lg:h-[450px] xl:h-[600px] 2xl:h-[800px]">
              <div className="relative w-full h-full">
                <div className="absolute block object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 h-100 top-1/2 left-1/2">
                  <Swiper
                    className="absolute block object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 h-100 top-1/2 left-1/2"
                    ref={carouselRef}
                    spaceBetween={50}
                    slidesPerView={4}
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
                    {sliderTopRight?.map((value: any, index: any) => (
                      <SwiperSlide key={index}>
                        <div className="">
                          <img
                            src={`${Api.defaults.baseURL}${value?.sliderImageUrl}`}
                            className="absolute block object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 h-100 top-1/2 left-1/2"
                            alt={value?.sliderTitle || "Slide image"}
                            crossOrigin="anonymous"
                          />
                          <div className="absolute inset-0 bg-black opacity-40"></div>
                          <div className="absolute border-2 inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="mb-3 text-2xl">
                              {value?.sliderTitle}
                            </h3>
                            <div className="flex flex-row border-2 p-2 text-white transition-all duration-300  hover:bg-white hover:text-black hover:border-white">
                              <a
                                onClick={() => {
                                  handleClickOnSlides(
                                    value?.linkType,
                                    value?.link
                                  );
                                }}
                                // href="products.html"
                                className="z-10 flex-row text-white transition-all duration-300 hs-btn h-fit w-fit  hover:text-black group"
                              >
                                {value?.description.replace(/<[^>]*>/g, "")}
                              </a>
                              <svg
                                className="-rotate-45 ml-2 w-[17px] mt-[4px] fill-white group-hover:fill-black"
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
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* <!-- Slider controls --> */}
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
            </div>
            <div className="grid w-auto lg:w-[140%] xl:w-auto grid-cols-2 gap-5 md:grid-cols-3 sm:grid-cols-3">
              {topRightBanners?.map((value: any, index: any) => (
                <ProductCard
                  key={value.id}
                  product={value}
                  handleClickOnProduct={handleClickOnProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
