"use client";

import React, { useEffect, useState, useRef } from "react";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

// SwiperCore.use([Autoplay]);

interface BannerImage {
  bannerImageUrl: string;
}

interface Item {
  id: number;
  linkType: string;
  link: string;
  bannerTitle: string;
  bannerSubTitle: string;
  position: number;
  bannerImages: BannerImage[];
}

interface ItemCardProps {
  item: Item;
  handleClickOnProduct: (linkType: string, link: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, handleClickOnProduct }) => {
  return (
    <div className="flex-shrink-0 w-full text-center">
      <div className="p-3 bg-[#E9D0B7]">
        <button
          onClick={() => {
            handleClickOnProduct(item.linkType, item.link);
          }}
        >
          <div className="h-[200px] grid place-content-center">
            <img
              className="object-cover mx-auto"
              src={`${Api.defaults.baseURL}${item.bannerImages[1]?.bannerImageUrl}`}
              crossOrigin="anonymous"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full p-2"
              src={`${Api.defaults.baseURL}${item.bannerImages[0]?.bannerImageUrl}`}
              crossOrigin="anonymous"
              alt=""
            />
          </div>
        </button>
      </div>
    </div>
  );
};

interface BannerInfo {
  title: string;
  subtitle: string;
}

const Brands: React.FC = () => {
  const { push } = useRouter();

  const [brandBanners, setBrandBanners] = useState<Item[]>([]);
  const [bannerInfo, setBannerInfo] = useState<BannerInfo>({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    getBrandBanners();
  }, []);

  const getBrandBanners = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getBanners}?page=home&pageReference=footer-top`,
        {
          headers: {},
        }
      );
      const requestedData = response.data.requestedData as Item[];
      setBrandBanners(requestedData);
      requestedData.forEach((item) => {
        if (item.position === 1) {
          setBannerInfo({
            title: item.bannerTitle,
            subtitle: item.bannerSubTitle,
          });
        }
      });
    } catch (err) {
      console.log("the error", err);
    }
  };

  const handleClickOnProduct = (linkType: string, linkValue: string) => {
    if (linkType === "category" || linkType === "brands") {
      // push(`/products/products-listing?id=${linkValue}&linkType=${linkType}`);
      if (linkType == "category") {
        push(`/products/products-listing?category=${linkValue}`);
      } else {
        push(`/products/products-listing?brand=${linkValue}`);
      }
    } else if (linkType === "custom") {
      push(linkValue);
    }
  };

  return (
    <section>
      <div className="px-3 mx-auto mt-5 mb-5 container-fluid sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl lg:text-3xl">{bannerInfo.title}</h2>
          <span className="text-sm lg:text-xl opacity-60">
            {bannerInfo.subtitle}
          </span>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          loop
          autoplay={{
            delay: 1000, // Adjust the interval timing as needed
            disableOnInteraction: false,
          }}
        >
          {brandBanners.map((item) => (
            <SwiperSlide key={item.id}>
              <ItemCard
                item={item}
                handleClickOnProduct={handleClickOnProduct}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
