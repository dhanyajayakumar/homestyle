"use client";

import React, { Fragment, useEffect, useState } from "react";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useRouter } from "next/navigation";

export default function Fullbanner({}) {
  const { push } = useRouter();

  const [bannerImage, setbannerImage] = useState();
  const [bannerData, setbannerData] = useState<any>();
  useEffect(() => {
    topCenterBanner();
  }, []);
  const topCenterBanner = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getBanners}?page=home&pageReference=top-center`,
        {
          headers: {},
        }
      );
      console.log(
        "the top center banner is:-",
        JSON.stringify(response.data, null, 2)
      );
      setbannerImage(
        response?.data?.requestedData[0]?.bannerImages[0]?.bannerImageUrl
      );
      setbannerData(response?.data?.requestedData[0]);
      console.log(
        "",
        `${Api.defaults.baseURL}${response?.data?.requestedData[0]?.bannerImages[0]?.bannerImageUrl}`
      );

      // if (response.data.status) {
      //   settrueFalse("true");
      //   setOpen(true);
      //   setstatusMessage(response.data.message);
      //   setloadingStatus(false);
      // } else {
      //   setstatusMessage(response.data.message);
      //   settrueFalse("false");
      //   setOpen(true);
      //   setloadingStatus(false);
      // }
    } catch (err) {
      console.log("the error", err);

      // setError(err);
    }
  };

  const handleBannerClick = (linkTypes: any, linkValues: any) => {
    console.log("the type is", linkTypes);
    console.log("the value is", linkValues);
    if (linkTypes == "category" || linkTypes == "brand") {
      console.log("it is:", linkTypes);
      if (linkTypes == "category") {
        push(`/products/products-listing?category=${linkValues}`);
      } else {
        push(`/products/products-listing?brand=${linkValues}`);
      }
    } else if (linkTypes == "custom") {
      console.log("it is:", linkTypes);
      push(linkValues);
    } else {
      console.log("it is:", linkTypes);
    }
  };
  return (
    <div>
      {/* <section className="bg-center bg-cover xl:min-h-[720px] lg:min-h-[600px] md:min-h[800px] min-h-[420px] bg-[url('https://hsadmin.staging-ecom.com/public/uploads/banner/bannerImages%5B0%5D%5BbannerImage%5D-1718188449894-157122276.jpg')] bg-no-repeat "></section> */}
      <button
        onClick={() => {
          handleBannerClick(bannerData?.linkType, bannerData?.link);
        }}
      >
        <img
          src={`${Api.defaults.baseURL}${bannerImage}`}
          // src="/images/feature-img-1.png"
          crossOrigin="anonymous"
          alt="Banner Image"
        ></img>
      </button>
    </div>
  );
}
