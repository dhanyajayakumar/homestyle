"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation"; // Import the navigation CSS correctly
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "@/styles/custom.css"; // Import custom styles

interface ProductSliderProps {
  productImages: string[];
}

const ImageSlides: React.FC<ProductSliderProps> = ({ productImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    console.log("Images are:", productImages);
  }, [productImages]);

  const handleInit = (instance: any) => {
    console.log("ZoomPanPinch initialized", instance);
    // Additional logic you want to execute on init
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(index);
    }
  };

  return (
    <div className="relative flex-1 md:w-2/4 lg:w-2/4">
      <div className="sticky lg:w-[95%] xl:w-[95%] top-[140px] flex-col lg:flex">
        <div className="lg:ml-3 lg:mr-1">
          <div className="product-main mb-[20px]">
            <div className="border border-gray-200 relative mr-[1px]">
              <div className="relative image-zoom bg-[length:840px]">
                <span className="absolute z-[11] px-2 py-1 rounded uppercase bg-primary top-3 left-3">
                  online exclusive
                </span>

                <a
                  href="#"
                  className="absolute z-50 right-4 top-4 w-[50px] h-[50px] shadow-md bg-white rounded-full grid place-content-center transition-all scale-100 hover:scale-110"
                >
                  <svg
                    className="w-[20px] h-fit"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 136.6 113.6"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
                    c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
                    c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
                    C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
                    c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
                    c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
                    c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                    ></path>
                  </svg>
                </a>

                <Swiper
                  modules={[Navigation, Thumbs]}
                  spaceBetween={10}
                  slidesPerView={1}
                  onSlideChange={(swiper) =>
                    setCurrentImageIndex(swiper.activeIndex)
                  }
                  thumbs={{ swiper: thumbsSwiper }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  allowTouchMove={false} // Disable dragging
                >
                  {productImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        minScale={0.5}
                        maxScale={5}
                        limitToBounds={true}
                        centerZoomedOut={true}
                        centerOnInit={true}
                        disablePadding={true}
                        zoomAnimation={{
                          size: 1,
                          animationTime: 2000,
                          animationType: "linear",
                        }}
                        alignmentAnimation={{
                          animationTime: 1000,
                          animationType: "easeOut",
                        }}
                        velocityAnimation={{
                          sensitivity: 1,
                          animationTime: 3000,
                          animationType: "easeInQuad",
                        }}
                        wheel={{
                          step: 0.2,
                          smoothStep: 0.001,
                          wheelDisabled: false,
                          touchPadDisabled: false,
                          activationKeys: [],
                          excluded: [],
                        }}
                        // pan={{
                        //   wheelPanning: false,
                        //   disabled: false,
                        //   velocityDisabled: false,
                        //   lockAxisX: false,
                        //   lockAxisY: false,
                        //   activationKeys: "",
                        //   excluded: [],
                        // }}
                        pinch={{
                          step: 0.2,
                          disabled: false,
                          excluded: [],
                        }}
                        doubleClick={{
                          step: 0.5,
                          disabled: false,
                          excluded: [],
                        }}
                        onInit={handleInit}
                      >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                          const handleSingleClickZoom = () => {
                            const currentScale =
                              rest.instance.transformState.scale;
                            if (currentScale < 2) {
                              zoomIn(2 - currentScale); // Zoom in to a scale of 2
                            }
                          };

                          return (
                            <div
                              className="relative cursor-move"
                              onClick={handleSingleClickZoom}
                            >
                              <TransformComponent wrapperClass="transform-component">
                                <img
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-crosshair"
                                  src={image}
                                  alt={`Product image ${index + 1}`}
                                  crossOrigin="anonymous"
                                />
                              </TransformComponent>
                              <div className="absolute z-20 bottom-4 right-4 flex space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    zoomIn();
                                  }}
                                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                >
                                  <svg
                                    width="30px"
                                    height="30px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    zoomOut();
                                  }}
                                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                >
                                  <svg
                                    width="30px"
                                    height="30px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetTransform();
                                  }}
                                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                >
                                  <svg
                                    width="30px"
                                    height="30px"
                                    viewBox="0 0 24 24"
                                    fill="#000"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z"
                                      fill="#1C274C"
                                    />
                                    <path
                                      d="M20.3139 11L20.8411 10.4666C20.549 10.1778 20.0788 10.1778 19.7867 10.4666L20.3139 11ZM18.1004 12.1333C17.8058 12.4244 17.8031 12.8993 18.0942 13.1939C18.3854 13.4885 18.8603 13.4913 19.1549 13.2001L18.1004 12.1333ZM21.4729 13.2001C21.7675 13.4913 22.2424 13.4885 22.5335 13.1939C22.8247 12.8993 22.822 12.4244 22.5274 12.1332L21.4729 13.2001ZM5.31794 16.6061C5.1004 16.2536 4.6383 16.1442 4.28581 16.3618C3.93331 16.5793 3.82391 17.0414 4.04144 17.3939L5.31794 16.6061ZM11.8827 21.75C16.9451 21.75 21.0639 17.6915 21.0639 12.6667H19.5639C19.5639 16.8466 16.1332 20.25 11.8827 20.25V21.75ZM21.0639 12.6667V11H19.5639V12.6667H21.0639ZM19.7867 10.4666L18.1004 12.1333L19.1549 13.2001L20.8411 11.5334L19.7867 10.4666ZM19.7867 11.5334L21.4729 13.2001L22.5274 12.1332L20.8411 10.4666L19.7867 11.5334ZM4.04144 17.3939C5.65405 20.007 8.56403 21.75 11.8827 21.75V20.25C9.10023 20.25 6.66584 18.7903 5.31794 16.6061L4.04144 17.3939Z"
                                      fill="#1C274C"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        }}
                      </TransformWrapper>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="order-second scrollbar-hide lg:w-full xl:w-full overflow-x-auto">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            breakpoints={{
              320: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 6,
              },
            }}
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`item border aspect-square p-[10px] mb-3 mx-[10px] cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    currentImageIndex === index
                      ? "border-[#e0880a]"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={`Thumbnail image ${index + 1}`}
                    crossOrigin="anonymous"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageSlides;
