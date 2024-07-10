import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import api from "@/lib/url";
import { routs } from "@/config/routs";
import { useUser } from "@/contexts/MyContext";

export interface CartProductListProps {
  value: any;
  key: any;
  push: any;

  changeTheQuantity: any;
  deleteItemCart: any;
  isWishlisted: any;
  wishlistDataIs: any;
  setIsWishlisted: any;
  handleWishlistToggle: any;
  decrementQuantity: any;
  incrementQuantity: any;
  delItem: any;
  updateQuantity: any;
}

const CartProductList = ({
  push,
  value,
  wishlistDataIs,
  handleWishlistToggle,
  isWishlisted,
  setIsWishlisted,
  changeTheQuantity,
  deleteItemCart,
  decrementQuantity,
  incrementQuantity,
  delItem,
  updateQuantity,
}: CartProductListProps) => {
  // const tokenLocal = localStorage.getItem("token");
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    getCartData,
    setwishlistDataIs,
    getWishlistData,
    cartProductList,
    uniqueIdIS,
    storedToken,
  } = useUser();
  const defaultProductVariant = useMemo(() => {
    const { variantDetails, slug, sku } = value.productDetails;

    // Check if variantDetails exists and handle the default logic accordingly
    if (variantDetails) {
      // Assuming variantDetails is an object and not an array
      const defaultValue =
        Number(variantDetails.isDefault) === 1 ||
        variantDetails.slug === slug ||
        variantDetails.variantSku === sku
          ? variantDetails
          : null;

      if (defaultValue) {
        return defaultValue;
      } else {
        // Handle the case when no default variant is found, return the first variantDetails
        // This assumes you have a fallback strategy or default behavior.
        // You might want to adjust this based on your specific application logic.
        return variantDetails;
      }
    }

    // Handle the case when variantDetails is not defined or falsy
    return null; // or handle accordingly based on your application logic
  }, [value]);

  const isProductWishlisted = useMemo(() => {
    return wishlistDataIs.some(
      (item: any) => item.slug === defaultProductVariant.slug
    );
  }, [wishlistDataIs, defaultProductVariant]);
  return (
    <div
      key={value.id}
      className="duration-150 bg-white border hover:bg-gray-50 hover:shadow-md"
    >
      <div className="grid grid-cols-8 gap-6 p-4">
        <div className="flex flex-col col-span-8 gap-6 sm:flex-row lg:col-span-8 xl:col-span-6">
          <div className="aspect-square max-w-[100px] sm:min-w-[200px]">
            <img
              src={`${api.defaults.baseURL}${value?.productDetails?.productImageUrl}`}
              className="h-full aspect-square"
              alt="cartImg"
              crossOrigin="anonymous"
            />
          </div>

          <div className="w-full my-auto">
            <h3 className="mb-3 text-xl font-medium">
              {value?.productDetails?.productTitle}
            </h3>

            <div className="flex flex-wrap w-full gap-3 py-3 price-details border-y">
              <h2 className="text-base font-bold md:text-heading-3 text-primary">
                AED {value?.productAmount.toFixed(2)}
              </h2>
              <h3 className="text-base font-normal text-gray-300 line-through md:text-heading-4">
                AED {value?.productDetails?.variantDetails?.price}
              </h3>

              <span className="grid px-2 text-sm text-green-500 border border-green-500 place-content-center">
                Save AED {value?.productDiscountAmount?.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-5 my-1">
              <div className="flex flex-col">
                <p className="mt-1 text-gray-600 border-gray-300 w-fit">
                  Quantity :
                </p>
                <form className="">
                  <div className="relative flex items-center max-w-[9rem]">
                    <button
                      type="button"
                      id="decrement-button"
                      onClick={() =>
                        decrementQuantity(
                          value?._id,
                          value?.quantity,
                          value?.slug
                        )
                      }
                      className="p-3 px-4 bg-white border border-r-0 border-gray-300 hover:bg-gray-200 h-12 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 tex-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    <input
                      type="text"
                      id="quantity-input"
                      value={value?.quantity}
                      readOnly
                      className=" bg-white border border-x-0 !border-gray-300 h-12 text-center text-gray-900 text-sm outlk focus:ring-0 outline-none focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      onClick={() =>
                        incrementQuantity(
                          value._id,
                          value.quantity,
                          value?.slug
                        )
                      }
                      className="p-3 px-4 bg-white border border-l-0 border-gray-300 hover:bg-gray-200 h-12 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 tex-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex justify-between space-x-2 itemms-center lg:justify-end">
              <div className="flex-1 pt-2">
                <p className="text-xs text-gray-600">
                  When you order in 23 hrs 19 mins
                </p>
                <p className="text-xs text-green-500">
                  Expected Delivery : Friday, May 24
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row col-span-8 gap-2 pl-0 text-base border-l-0 sm:flex-row md:flex-row lg:flex-row lg:border-l-0 md:pl-0 xl:pl-6 xl:border-l lg:col-span-8 xl:col-span-2 xl:flex-col">
          <a
            type="button"
            // href={routs.wishlist}
            className="text-sm cursor-pointer text-nowrap sm:text-base flex-1 xl:flex-none h-[40px] sm:h-[50px] flex gap-2 justify-center items-center border border-[#F89D1B] px-4 hover:bg-[#F89D1B] hover:text-white duration-200 capitalize font-normal text-[#e57a00]"
            onClick={(e) => {
              e.preventDefault();
              if (storedToken) {
                handleWishlistToggle(
                  defaultProductVariant.slug,
                  defaultProductVariant.variantSku
                );
              } else {
                {
                  push(routs.login);
                }
              }
            }}
          >
            <span>
              <svg
                width="16pt"
                className="fill-current"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Add_to_Favorite"
                  d="m50 91c-2.733 0-5.306-1.065-7.242-2.999v-.001l-33.129-33.129c-4.919-4.919-7.629-11.459-7.629-18.417v-.407c0-6.958 2.71-13.499 7.629-18.417s11.461-7.63 18.416-7.63h.41c6.955 0 13.497 2.71 18.416 7.629l3.129 3.129 3.129-3.129c4.919-4.919 11.461-7.629 18.416-7.629h.41c6.955 0 13.497 2.71 18.416 7.629s7.629 11.459 7.629 18.417v.407c0 6.958-2.71 13.499-7.629 18.417l-33.129 33.13c-1.936 1.935-4.509 3-7.242 3zm-3-7.242c1.608 1.605 4.395 1.601 6-.001l33.129-33.127c3.785-3.788 5.871-8.821 5.871-14.176v-.407c0-5.355-2.086-10.389-5.871-14.175s-8.821-5.872-14.174-5.872h-.41c-5.353 0-10.389 2.084-14.174 5.871l-5.25 5.25c-1.172 1.172-3.07 1.172-4.242 0l-5.25-5.25c-3.785-3.787-8.821-5.871-14.174-5.871h-.41c-5.353 0-10.389 2.084-14.174 5.871s-5.871 8.82-5.871 14.175v.407c0 5.355 2.086 10.389 5.871 14.175z"
                ></path>
              </svg>
            </span>
            {isProductWishlisted ? "Added " : "add to Wishlist"}
          </a>

          <button
            type="button"
            onClick={() => {
              delItem(value?.slug);
            }}
            className="flex-1 cursor-pointer xl:flex-none flex justify-center gap-2 items-center text-base h-[40px] sm:h-[50px] hover:bg-gray-200 duration-200 border capitalize border-gray-300 font-normal text-black transition-all px-4 py-2"
          >
            <span>
              <svg
                className="fill-current"
                width="18px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 311.99 327.74"
              >
                <path d="M96.19,47.88c0-6.97-.63-13.4.12-19.66C98.27,11.89,111.44.35,128.09.17c18.62-.21,37.24-.24,55.86,0,18.43.25,31.89,14.16,32.03,32.59.04,4.85,0,9.7,0,15.11,1.62,0,3.06,0,4.5,0,25.87.05,51.73,0,77.6.26,3.17.03,6.69,1.14,9.38,2.82,4.16,2.59,5.41,8,3.92,12.65-1.53,4.75-5.52,8.09-10.47,8.25-6.24.2-12.5.16-18.74.07-2.24-.04-3.02.69-3.16,2.96-1.72,28.88-3.52,57.75-5.34,86.62-2.13,33.72-4.27,67.44-6.47,101.16-.57,8.7-.56,17.55-2.23,26.05-4.49,22.73-23.88,38.64-47.28,38.8-40.99.27-81.98.32-122.96-.01-26.43-.21-46.84-20.86-48.34-47.1-1.85-32.49-4.26-64.94-6.4-97.41-1.87-28.37-3.69-56.73-5.54-85.1-.5-7.71-1.11-15.42-1.46-23.14-.11-2.44-1.22-2.83-3.29-2.8-5.62.09-11.25.08-16.87.01C5.39,71.87.09,66.99,0,60.23c-.09-6.96,5.21-12.14,12.85-12.18,26.12-.11,52.23-.12,78.35-.17,1.47,0,2.94,0,5,0ZM57.73,72.69c0,1.38-.07,2.72,0,4.06,1.56,27.02,3.11,54.03,4.71,81.05,2.38,40.09,4.86,80.17,7.18,120.25.92,15.83,10.88,25.54,26.74,25.58,13.25.04,26.5,0,39.74,0,26.62,0,53.24.05,79.86-.02,15.34-.04,25.56-9.98,26.34-25.26.26-5.11.64-10.21.96-15.31,1.91-30.37,3.81-60.74,5.72-91.11,1.65-26.26,3.31-52.52,4.95-78.78.42-6.66.77-13.33,1.18-20.47H57.73ZM191.99,47.69c0-4.83.02-9.3,0-13.78-.03-6.48-2.54-9-9.14-9.02-10.75-.04-21.5-.01-32.25-.01-7.5,0-15-.06-22.5.03-4.55.06-7.75,2.43-7.96,6.29-.3,5.43-.08,10.89-.08,16.48h71.92Z" />
                <path d="M95.99,187.63c0-21.08-.03-42.17.02-63.25.02-6.52,4.4-11.57,10.34-12.23,6.32-.7,11.74,2.94,13.27,9.01.27,1.07.36,2.22.36,3.33.02,42.17.03,84.33,0,126.5,0,6.65-4.51,11.87-10.54,12.5-6.12.65-11.73-3.26-13.11-9.27-.33-1.44-.31-2.97-.31-4.46-.02-20.71-.01-41.42-.01-62.13Z" />
                <path d="M167.99,187.44c0,21.21.03,42.42-.02,63.62-.01,6.46-4.39,11.63-10.25,12.39-6.15.8-11.76-2.92-13.31-8.97-.37-1.42-.41-2.96-.41-4.44-.02-41.54-.02-83.09-.01-124.63,0-8.05,4.75-13.34,11.93-13.36,7.16-.03,12.05,5.31,12.06,13.26.02,20.71,0,41.42,0,62.13Z" />
                <path d="M191.99,187.8c0-21.21-.03-42.42.02-63.62.02-5.98,4-10.87,9.41-11.93,5.71-1.12,11.35,1.68,13.51,6.98.69,1.68,1.01,3.63,1.01,5.45.05,42.04.06,84.08.03,126.13,0,7.33-5.09,12.7-11.86,12.76-6.94.06-12.1-5.36-12.11-12.88-.03-20.96-.01-41.92-.01-62.88Z" />
              </svg>
            </span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductList;
