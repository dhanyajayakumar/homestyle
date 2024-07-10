"use client";

import React, { useEffect, useState } from "react";
import Api from "@/lib/url";
import Endpoints from "@/lib/endpoints";

interface BannerImage {
  bannerImageUrl: string;
}

interface Product {
  bannerSubTitle: string;
  id: number;
  title: string;
  description: string;
  bannerTitle: string;
  bannerImages: BannerImage[];
  position: number;
}

interface ProductCardProps {
  product: Product;
  reverse: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, reverse }) => {
  return (
    <div
      className={`flex flex-col collection-area md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <img
          className="object-cover h-full"
          src={`${Api.defaults.baseURL}${product.bannerImages[0].bannerImageUrl}`}
          crossOrigin="anonymous"
          alt={product.title}
        />
      </div>
      <div className="flex-1">
        <div
          className={`flex flex-col items-start justify-center h-full px-6 py-8 text-left sm:px-8 md:px-10 md:py-8 ${
            reverse ? "md:items-end md:text-right" : ""
          }`}
        >
          <h3 className="mb-4 text-2xl">{product.bannerTitle}</h3>
          <p>{product.description.replace(/<[^>]*>/g, "")}</p>
          <button className="mt-4 border-2 transition-all duration-300 hs-btn shop-btn-black w-fit hover:bg-black hover:text-white">
            <div className="flex flex-row p-2">
              <span>SHOP NOW</span>
              <svg
                className="-rotate-45 w-[17px] mt-[4px] fill-black group-hover:fill-white ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15 14"
              >
                <polygon
                  className="fill-current"
                  points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

interface BannerInfo {
  title: string;
  subtitle: string;
}

const CustomizedCollection: React.FC = () => {
  const [customCollection, setCustomCollection] = useState<Product[]>([]);
  const [bannerInfo, setBannerInfo] = useState<BannerInfo>({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    pcTopBottom();
  }, []);

  const pcTopBottom = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getBanners}?page=home&pageReference=middle-bottom`,
        {
          headers: {},
        }
      );
      console.log(
        "the pcTopBottom is:-",
        JSON.stringify(response.data, null, 2)
      );
      const requestedData = response.data.requestedData as Product[];
      setCustomCollection(requestedData);
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

  return (
    <section id="customized-collection">
      <div className="py-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl lg:text-3xl">{bannerInfo.title}</h2>
          <span className="text-sm lg:text-xl opacity-60">
            {bannerInfo.subtitle}
          </span>
        </div>
        {customCollection.map((value, index) => (
          <ProductCard
            key={value.id}
            product={value}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomizedCollection;
