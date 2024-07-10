"use client";

import React, { Fragment, useEffect, useState } from "react";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useRouter } from "next/navigation";
import SliderList from "@/components/slider";

export default function Kitchencollection({}) {
  const { push } = useRouter();

  const [collectionTitle, setcollectionTitle] = useState();
  const [collectionSubTitle, setcollectionSubTitle] = useState();
  const [collectionBanners, setcollectionBanners] = useState<any>();
  useEffect(() => {
    pcMiddleCenter();
  }, []);
  const pcMiddleCenter = async () => {
    try {
      const response = await Api.get(
        `${Endpoints.getCollection}?page=home&pageReference=middle-center`,
        {
          headers: {},
        }
      );
      // console.log(
      //   "the pcTopBottom is:-",
      //   JSON.stringify(response.data, null, 2)
      // );
      setcollectionTitle(response?.data?.requestedData[0]?.collectionTitle);
      setcollectionSubTitle(
        response?.data?.requestedData[0]?.collectionSubTitle
      );
      setcollectionBanners(
        response?.data?.requestedData[0]?.collectionsCategories
      );
    } catch (err) {
      console.log("the error", err);
    }
  };
  const handleClickOnshopNow = (linkId: any) => {
    // console.log("THe id is:-", linkId);
    push(`/products/products-listing?id=${linkId}&linkType=category`);
  };
  return (
    <div>
      <section className="px-3 mx-auto mt-5 container-fluid sm:px-6">
        <div className="py-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl lg:text-3xl">{collectionTitle}</h2>
            <span className="text-sm lg:text-xl opacity-60">
              {collectionSubTitle}
            </span>
          </div>

          <SliderList collectionBanners={collectionBanners} />
        </div>
      </section>
    </div>
  );
}
