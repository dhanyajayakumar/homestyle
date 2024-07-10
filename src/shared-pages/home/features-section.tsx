"use client";

import React, { useState, useEffect } from "react";
import endpoints from "@/lib/endpoints";
import Apiurl from "@/lib/url";

export default function Featuressection({}) {
  const [loadingStatus, setloadingStatus] = useState(false);
  const [featureBannerIs, setfeatureBannerIs] = useState();

  useEffect(() => {
    featureBanner();
  }, []);

  const featureBanner = async () => {
    try {
      const response = await Apiurl.get(
        `${endpoints.getBanners}?page=home&pageReference=top`,
        {
          headers: {},
        }
      );
      console.log(
        "the feature banner is:-",
        JSON.stringify(response.data, null, 2)
      );
      setfeatureBannerIs(
        response?.data?.requestedData[0]?.bannerImages[0]?.bannerImageUrl
      );
      console.log(
        "it thissss@#:-",
        `${Apiurl.defaults.baseURL}${response?.data?.requestedData[0]?.bannerImages[0]?.bannerImageUrl}`
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
      setloadingStatus(false);

      // setError(err);
    } finally {
      // setLoading(false);
      setloadingStatus(false);
    }
  };

  return (
    <section
      className="px-3 py-4 mx-auto sm:px-6 container-fluid"
      id="hs-features"
    >
      {/* <div className="flex flex-wrap justify-center gap-4 p-3 sm:p-6"> */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 mx-auto">
        <div className="bg-secondary py-1 px-2 flex items-center justify-center">
          <img
            className="flex-1  mx-auto"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />
        </div>
        <div className=" bg-secondary py-1 px-2 flex items-center justify-center">
          <img
            className="flex-1    mx-auto"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />
        </div>

        <div className=" bg-secondary py-1 px-2 flex items-center justify-center">
          <img
            className="flex-1    mx-auto"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />
        </div>

        <div className=" bg-secondary py-1 px-2 flex items-center justify-center">
          <img
            className="flex-1    mx-auto"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />
        </div>

        <div className="bg-secondary py-1 px-2 flex items-center justify-center ng">
          <img
            className="flex-1   mx-auto"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />
        </div>
      </div>
      {/* </div> */}

      {/* <div className="flex flex-wrap justify-center gap-4 p-3 sm:p-6">
        <div className="p-6 bg-[#F2EEE6] text-left flex-1 min-w-[200px] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-center">
          <img
            className="flex-1 min-w-[33]  h-[33px] mx-auto mb-5"
            src={`${Apiurl.defaults.baseURL}${featureBannerIs}`}
            crossOrigin="anonymous"
            alt="Feature Image"
          />



          <div>
            <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
            <p className="opacity-70">*Terms & Conditions Apply</p>
          </div>
        </div>
      </div> */}
    </section>
  );
}
