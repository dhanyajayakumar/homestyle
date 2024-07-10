"use client";
import { routs } from "@/config/routs";
import React, { useEffect, useState } from "react";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useUser } from "@/contexts/MyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Mini Sofa",
    price: "AED 1,600",
    originalPrice: "AED 2,000",
    discount: "Upto 80% Off",
    imageUrl: "/images/sf-2.png",
    detailsUrl: "products-details.html",
  },
  {
    id: 2,
    name: "Mini Sofa",
    price: "AED 1,600",
    originalPrice: "AED 2,000",
    discount: "Upto 80% Off",
    imageUrl: "/images/sf-4.png",
    detailsUrl: "products-details.html",
  },
  // Add more products as needed
];

interface WishListProps {
  wishListIs: any;
  removeFromWishList: any;
}

const wishlist: React.FC<WishListProps> = ({
  wishListIs,
  removeFromWishList,
}) => {
  // if (!wishListIs || wishListIs.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <h2 className="text-2xl font-bold text-gray-600">404 No Data Found</h2>
  //     </div>
  //   );
  // }
  return (
    <div>
      {" "}
      <section className="container px-3 mx-auto my-4 sm:my-8 sm:px-6">
        <div className="">
          <div>
            <h1 className="text-xl font-medium text-black">
              My Wishlist{" "}
              <span className="font-medium text-primary">
                ({wishListIs?.length} items)
              </span>
            </h1>
            {/* <!-- bredcrumb --> */}
            <div className="mx-auto mb-4 bg-white">
              <nav className="flex py-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-red-900 "
                    >
                      <svg
                        className="w-3 h-3 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"></path>
                      </svg>
                      Home
                    </a>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        ></path>
                      </svg>
                      <span className="text-sm font-normal text-gray-500 capitalize ms-1 md:ms-2 ">
                        My Wishlist
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* <!-- content start --> */}
          {!wishListIs || wishListIs.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
              <h2 className="text-2xl font-bold text-gray-600">404: No Data</h2>
            </div>
          ) : (
            <div className="">
              <div className="grid grid-cols-1 gap-3 mt-5 sm:gap-3 md:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {wishListIs?.map((product: any) => (
                  <div
                    key={product.id}
                    className="relative overflow-hidden duration-200 bg-white shadow-md hover:shadow-lg group"
                  >
                    <a href={product.detailsUrl}>
                      <div className="relative">
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            className="object-cover w-full h-full"
                            src={`${Api.defaults.baseURL}${product?.productDetails?.productImageUrl}`}
                            alt={product?.productDetails?.productTitle}
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                          <h2 className="relative z-20 text-sm font-medium capitalize md:text-base">
                            {product?.productDetails?.productTitle}
                          </h2>
                          <div className="flex flex-wrap items-baseline mt-1">
                            <h3 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                              AED{" "}
                              {
                                product?.productDetails?.variantDetails
                                  ?.discountPrice
                              }
                            </h3>
                            <h4 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                              AED{" "}
                              {product?.productDetails?.variantDetails?.price}
                            </h4>
                          </div>
                          <h5 className="text-sm font-medium text-gray-900">
                            {/* <span>{product.discount}</span> */}
                          </h5>
                        </div>
                      </div>
                    </a>
                    <div className="flex gap-[1px]">
                      <button
                        onClick={() => {
                          removeFromWishList(
                            product?.productDetails?.variantDetails?.slug,
                            product?.productDetails?.variantDetails?.variantSku
                          );
                        }}
                        // type="button"
                        className="aspect-square h-[50px] flex justify-center items-center duration-200 bg-white hover:bg-red-500 text-red-500 hover:text-white"
                      >
                        <svg
                          className="fill-current"
                          width="14px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 180.38 227.2"
                        >
                          <path d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"></path>
                          <path d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"></path>
                        </svg>
                      </button>
                      <a
                        href="/cart"
                        className="flex justify-center items-center w-full text-[#e57a00] hover:text-white duration-200 capitalize bg-[#FEF1DE] border-0 hover:bg-[#F89D1B] hs-btn"
                      >
                        <span>
                          <svg
                            width="16px"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 drop-shadow-xl"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                        </span>
                        Move to cart
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default wishlist;
