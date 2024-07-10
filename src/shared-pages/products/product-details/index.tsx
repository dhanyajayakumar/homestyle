"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import ProductDetails from "@/shared-pages/products/product-details/product-details";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";

export default function Index({}) {
  const searchParams = useSearchParams();
  const [productVariant, setproductVariant] = useState<string | null>();
  const [productSku, setproductSku] = useState<string | null>();
  const [productDetailsIs, setproductDetailsIs] = useState();
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPriceIs, setproductPriceIs] = useState<any>();
  const [productDiscountIs, setproductDiscountIs] = useState<any>();
  useEffect(() => {
    const productVariant = searchParams.get("ProductVarient");
    const productSku = searchParams.get("ProductSku");
    const productPrice = searchParams.get("ProductPrice");
    const productDiscount = searchParams.get("ProductDiscountPrice");
    // console.log("id-1", productVariant);
    // console.log("id-2", productSku);
    setproductVariant(productVariant);
    setproductSku(productSku);
    getProductDetails(productVariant, productSku);
    setproductPriceIs(productPrice);
    setproductDiscountIs(productDiscount);
  }, [searchParams]);

  const getProductDetails = async (
    productVariant: string | null,
    productSku: string | null
  ) => {
    // console.log(
    //   "The url is:-",
    //   `${endpoints.productDetail}/${productVariant}/${productSku}`
    // );
    try {
      const response = await api.get(
        `${endpoints.productDetail}/${productVariant}/${productSku}?getspecification=1&getattribute=1&getseo=1&getimagegallery=1`,
        {
          headers: {
            // Custom headers if needed
          },
        }
      );

      if (response.data.status) {
        setproductDetailsIs(response.data.requestedData);
        const imageGallery = response.data.requestedData.product.imageGallery;
        const baseURL = `${api.defaults.baseURL}`;
        const imageUrls = imageGallery.map(
          (image: { galleryImageUrl: string }) =>
            `${baseURL}${image.galleryImageUrl}`
        );
        setProductImages(imageUrls);
        // console.log(
        //   "the menu data is:-",
        //   JSON.stringify(response.data, null, 2)
        // );
      } else {
        // console.log(
        //   "the menu data - error is:-",
        //   JSON.stringify(response.data.message, null, 2)
        // );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ProductDetails
        productDetailsIs={productDetailsIs}
        productImages={productImages}
        productPriceIs={productPriceIs}
        productDiscountIs={productDiscountIs}
      />

      {/* <!-- features section --> */}
      <section id="hs-features">
        <div className="flex flex-wrap justify-center gap-4 p-3 sm:p-6 border-y">
          <div className="p-7 bg-[#F2EEE6] text-center flex-1 min-w-[200px]">
            <img
              className="w-[33px] h-auto mx-auto mb-5"
              src="/images/feature-img-1.png"
              crossOrigin="anonymous"
              alt=""
            />
            <div>
              <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
              <p className="opacity-70">*Terms & Conditions Apply</p>
            </div>
          </div>
          <div className="p-7 bg-[#F2EEE6] text-center flex-1 min-w-[200px]">
            <img
              className="w-[33px] h-auto mx-auto mb-5"
              src="/images/feature-img-2.png"
              crossOrigin="anonymous"
              alt=""
            />
            <div>
              <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
              <p className="opacity-70">*Terms & Conditions Apply</p>
            </div>
          </div>
          <div className="p-7 bg-[#F2EEE6] text-center flex-1 min-w-[200px]">
            <img
              className="w-[33px] h-auto mx-auto mb-5"
              src="/images/feature-img-3.png"
              crossOrigin="anonymous"
              alt=""
            />
            <div>
              <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
              <p className="opacity-70">*Terms & Conditions Apply</p>
            </div>
          </div>
          <div className="p-7 bg-[#F2EEE6] text-center flex-1 min-w-[200px]">
            <img
              className="w-[33px] h-auto mx-auto mb-5"
              src="/images/feature-img-4.png"
              alt=""
            />
            <div>
              <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
              <p className="opacity-70">*Terms & Conditions Apply</p>
            </div>
          </div>
          <div className="p-7 bg-[#F2EEE6] text-center flex-1 min-w-[200px]">
            <img
              className="w-[33px] h-auto mx-auto mb-5"
              src="/images/feature-img-5.png"
              alt=""
            />
            <div>
              <h2 className="uppercase">FREE DELIVERY & INSTALLATION</h2>
              <p className="opacity-70">*Terms & Conditions Apply</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- reviews --> */}

      <section className="px-3 mx-auto mt-5 container-fluid sm:px-6">
        <div className="py-8">
          {/* <!-- section heading --> */}
          <div className="text-left mb-7">
            <h2 className="text-2xl lg:text-3xl">Reviews</h2>
          </div>

          <div className="flex flex-wrap p-5 border">
            {/* <!--  --> */}
            <div className="flex items-center justify-center min-w-full sm:min-w-[220px]  px-2 sm:px-10 md:px-14 border-r-0 sm:border-r">
              <div className="flex flex-col items-center gap-4">
                <span className="font-medium">Average Rating</span>
                <div className="text-6xl font-normal">4.7</div>
                <div className="ml-2 text-lg text-gray-400">Out of 5 stars</div>
              </div>
            </div>

            {/* <!--  --> */}
            <div className="flex flex-col flex-1 md:flex-auto items-end min-w-full sm:min-w-[320px] max-w-[360px] px-2 sm:px-10 md:px-8">
              <div className="flex items-center w-full mb-3">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-end">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                  <span className="w-full h-[1px] bg-yellow-400 ml-4"></span>
                  <div className="ml-4 text-gray-700">9</div>
                </div>
              </div>
              <div className="flex items-center w-full mb-3">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-end">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                  <span className="w-full h-[1px] bg-yellow-400 ml-4"></span>
                  <div className="ml-4 text-gray-700">1</div>
                </div>
              </div>
              <div className="flex items-center w-full mb-3">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-end">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                  <span className="w-full h-[1px] bg-yellow-400 ml-4"></span>
                  <div className="ml-4 text-gray-700">1</div>
                </div>
              </div>
              <div className="flex items-center w-full mb-3">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-end">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                  <span className="w-full h-[1px] bg-gray-400 ml-4 opacity-40"></span>
                  <div className="ml-4 text-gray-700">0</div>
                </div>
              </div>
              <div className="flex items-center w-full">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-end">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                  <span className="w-full h-[1px] bg-gray-400 opacity-40 ml-4"></span>
                  <div className="ml-4 text-gray-700">0</div>
                </div>
              </div>
            </div>

            {/* <!--  --> */}
            <div className="flex items-center min-w-[320px] justify-start flex-1 px-4 mt-6 sm:px-4 md:px-6 sm:mt-5 md:mt-5 lg:mt-0 py-4 bg-gray-100">
              <div className="flex flex-col items-start justify-between">
                <div className="mb-3 text-gray-500">
                  What do you think about this product?
                </div>
                <button className="px-4 py-2 text-white bg-primary">
                  Write a review
                </button>
              </div>
            </div>
          </div>

          <div className="reviews-listing">
            <div className="py-5 border-b review">
              <div className="max-w-[800px] px-2">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/images/default-avatar-icon-of-social-media-user-vector.jpg"
                    crossOrigin="anonymous"
                    alt=""
                  />
                  <span className="text-base font-semibold">SophieT</span>
                </div>
                <div className="mt-3 rating">
                  <div className="flex items-end">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                </div>
                <p className="text-base font-semibold text-black">
                  Absolutely thrilled with this purchase!
                </p>
                <p>
                  The sofa&apos;s plush cushions and elegant dark gray fabric
                  have transformed our living room into a stylish and
                  comfortable haven.
                </p>
              </div>
            </div>

            <div className="py-5 border-b review">
              <div className="max-w-[800px] px-2">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/images/default-avatar-icon-of-social-media-user-vector.jpg"
                    crossOrigin="anonymous"
                    alt=""
                  />
                  <span className="text-base font-semibold">James L</span>
                </div>
                <div className="mt-3 rating">
                  <div className="flex items-end">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                </div>
                <p className="text-base font-semibold text-black">
                  A Touch of Comfort and Elegance
                </p>
                <p>
                  This sofa is the epitome of comfort and style. The fabric is
                  soft yet durable, and the craftsmanship is top-notch.
                  It&apos;s the perfect addition to our family room, and
                  everyone loves lounging on it!
                </p>
              </div>
            </div>

            <div className="py-5 border-b review">
              <div className="max-w-[800px] px-2">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/images/default-avatar-icon-of-social-media-user-vector.jpg"
                    crossOrigin="anonymous"
                    alt=""
                  />
                  <span className="text-base font-semibold">John</span>
                </div>
                <div className="mt-3 rating">
                  <div className="flex items-end">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 20.082 4.665 24 6 15.268 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  </div>
                </div>
                <p className="text-base font-semibold text-black">
                  Beyond Expectations: A Five-Star Experience
                </p>
                <p>
                  This sofa exceeded my expectations in both comfort and style.
                  The cushions are plush yet supportive, and the fabric feels
                  durable. It fits perfectly in my living room and has become
                  the family&apos;s favorite spot to relax.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- complete collection --> */}

      <section className="px-3 mx-auto mt-5 container-fluid sm:px-6">
        <div className="py-8">
          <div className="text-left mb-7">
            <h2 className="text-2xl lg:text-3xl">All Collections</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5 sm:gap-3 md:gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
                    <svg
                      className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 15 14"
                      //
                      //
                    >
                      <polygon
                        className="fill-current"
                        points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                      />
                    </svg>
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-1.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Coffee table
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-2.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Sofas
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-3.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Lamps
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-4.png"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Wooden Pots
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-5.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Mirrors
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-6.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Wall Decors
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-7.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Lights
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-8.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Mini Tables
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-9.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Stools
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-10.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Classic Wooden Stools
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-11.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Sofas
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 z-10 transition-all duration-300 bg-black opacity-0 group-hover:opacity-50"></div>
                  <button className="absolute inset-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                    Shop now
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
                  </button>
                  <img
                    className="object-cover w-full h-full"
                    src="/images/img-12.png"
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                  <p className="text-sm font-medium tracking-widest capitalize sm:text-base md:text-lg">
                    Tables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- related products section --> */}
      <section className="px-3 mx-auto mt-5 container-fluid sm:px-6">
        <div className="py-8">
          <div className="text-left mb-7">
            <h2 className="text-2xl lg:text-3xl">You may also like</h2>
            {/* <!-- <span className="text-sm lg:text-xl opacity-60">Explore our curated selection of exclusive furniture and decor</span> --> */}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5 sm:gap-3 md:gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/u1.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  modular sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1, 600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/u2.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  c-shaped sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/u3.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  L-shaped sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/u4.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  Sofa bed
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/u5.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  Algo 3-Seater Fabric Sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- customers also viewed --> */}
      <section className="px-3 mx-auto mt-5 container-fluid sm:px-6">
        <div className="py-8">
          <div className="text-left mb-7">
            <h2 className="text-2xl lg:text-3xl">Customers also viewed</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5 sm:gap-3 md:gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/c1.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  Box sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/c2.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  squre arm Sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/c3.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  arched bar Sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/c4.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  humpback sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white hover:shadow-lg group">
              <div className="relative aspect-square">
                <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
                <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
                  <a className="w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110">
                    <svg
                      className="w-[20px] h-fit"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //
                      x="0px"
                      y="0px"
                      viewBox="0 0 136.6 113.6"
                      // style="enable-background:new 0 0 136.6 113.6;"
                      //
                    >
                      <path
                        d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                      />
                    </svg>
                  </a>
                </div>
                <button className="absolute left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group">
                  Add to Cart
                  <svg
                    className="-rotate-45 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    //
                    x="0px"
                    y="0px"
                    viewBox="0 0 15 14"
                    //
                    //
                  >
                    <polygon
                      className="fill-current"
                      points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                    />
                  </svg>
                </button>
                <img
                  className="object-cover w-full h-full"
                  src="/images/c5.png"
                  alt=""
                />
              </div>

              <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                <a
                  href="products-details.html"
                  className="relative z-20 text-sm font-medium capitalize md:text-base"
                >
                  deep seat Sofa
                </a>
                <div className="flex flex-wrap items-baseline mt-1">
                  <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                    AED 1,600
                  </h2>
                  <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                    AED 2,000
                  </h3>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a title="">
                    Upto 80% Off
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
