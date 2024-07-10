"use client";

import { routs } from "@/config/routs";
import React, { Fragment, useEffect, useState, useRef } from "react";
import Link from "next/link";
import cn from "@/utils/class-names";
import Endpoints from "@/lib/endpoints";
import BaseUrl from "@/lib/url";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/MyContext";

export default function Navbar({}) {
  const { push } = useRouter();
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    wishlistDataIs,
    uniqueIdIS,
    storedToken,
  } = useUser();
  // const tokenLocal = localStorage.getItem("token");
  const [megaMenuEnabled, setMegaMenuEnabled] = useState<boolean>(false);
  const [myAccountEnabled, setMyAccountEnabled] = useState<boolean>(false);
  const [cartEnabled, setCartEnabled] = useState<boolean>(false);
  // const [hoveredMenu, setHoveredMenu] = useState<boolean | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<boolean | any>(null);
  const [TotalQuantity, setTotalQuantity] = useState<any>();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //search listing fucntion
  const [searchData, setsearchData] = useState<any>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetchData();
    getSeachLists();
  }, []);

  useEffect(() => {
    console.log("Cart Data:", JSON.stringify(cartData, null, 2)); // Debugging log
    const products = cartData?.products;
    let sum = 0;

    // Calculate total quantity
    products?.forEach((product: any) => {
      sum += product?.quantity;
    });

    // Update state with total quantity
    setTotalQuantity(sum);
  }, [cartData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (value: any) => {
    setHoveredMenu(value);
    setMegaMenuEnabled(true);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setMegaMenuEnabled(false);
  };

  const fetchData = async () => {
    try {
      const response = await BaseUrl.get(
        `${Endpoints.getMenu}?block=menu&blockReference=desktop-menu`
      );
      if (response.data.status) {
        setData(response.data.requestedData);
        console.log(
          "the menu data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the menu data - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getSeachLists = async () => {
    try {
      const response = await BaseUrl.get(
        `${Endpoints.productListing}?page_size=&minprice&maxprice`
      );
      if (response.data.status) {
        setsearchData(response.data.requestedData);
        console.log(
          "the search data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the search data - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (event: any) => {
    setQuery(event.target.value);
    const filteredResults = searchData?.filter((item: any) =>
      item.productTitle.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setResults(filteredResults);
  };

  const gotoScreen = (child: any) => {
    console.log("THe child is:-", JSON.stringify(child, null, 2));
    if (child.menuType == "product") {
      console.log("product details");
    } else {
      console.log("product list");
      if (child.menuType == "category") {
        push(`/products/products-listing?category=${child.linkedMenuItemId}`);
      } else {
        push(`/products/products-listing?brand=${child.linkedMenuItemId}`);
      }
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-3 mx-auto sm:px-5">
        <div className="flex flex-wrap items-center justify-between h-full gap-1 py-2 mx-auto top-bar md:gap-0 lg:h-auto">
          {/* <!-- company logo --> */}
          <a
            className="flex flex-auto order-1 mr-1 sm:justify-start md:justify-start lg:justify-center md:flex-1"
            href="/"
          >
            <img
              alt="logo"
              fetchPriority="high"
              width="0"
              height="0"
              decoding="async"
              data-nimg="1"
              className="w-[160px] lg:w-[230px] md:w-[200px] sm:w-[160px]"
              src="/images/home-logo.png"
            />
          </a>

          {/* <!-- search field area --> */}
          <div className="order-3 md:order-3 lg:order-2 w-full transition-all duration-200 ease-in-out md:max-w-full lg:flex lg:max-w-[550px] xl:max-w-[600px] 2xl:max-w-[600px] md:mx-0 lg:mx-12 xl:mx-0">
            <div className="relative z-30 flex flex-col justify-center flex-shrink-0 w-full">
              <div className="flex flex-col w-full mx-auto">
                {/* <!-- search field --> */}
                <form className="relative bg-white border pl-2 border-[#D8D8D8] mukta-regular overflow-hidden w-full flex items-center rounded-[4px]">
                  <img
                    className="aspect-square w-[30px] h-fit"
                    src="/images/search-icon.png"
                    alt=""
                  />
                  <label className="flex items-center py-0.5 flex-1">
                    <input
                      className="w-full h-10 pl-5 font-sans text-sm placeholder-gray-500 placeholder-opacity-75 transition duration-200 ease-in-out bg-transparent border border-none rounded-md outline-none appearance-none form-input text-input min-h-10 focus:ring-0 focus:outline-none"
                      placeholder="What are you looking for?"
                      value={query}
                      onChange={handleSearch}
                    />
                  </label>
                </form>
                {results?.length > 0 && query && (
                  <div className="search-results mt-4 max-h-48 overflow-y-scroll absolute top-[30px] left-0 right-0 z-50 bg-white shadow-lg border rounded-lg">
                    <ul className="grid grid-cols-1 gap-3 py-3 px-2">
                      {results?.map((result: any) => (
                        <li
                          key={result._id}
                          className="p-2 border rounded-lg flex items-center"
                        >
                          <img
                            className="w-12 h-12 object-cover mr-2"
                            src={`${BaseUrl.defaults.baseURL}${result?.productImageUrl}`}
                            alt={result.productTitle}
                            crossOrigin="anonymous"
                          />
                          <div>
                            <h2 className="text-sm font-semibold">
                              {result?.productTitle}
                            </h2>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <!-- account and cart area --> */}
          <div className="flex justify-end flex-auto order-2 pr-1 md:order-2 lg:order-3 md:flex-1 md:items-center xl:block sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center justify-end gap-3">
              {/* <!-- my account --> */}
              <div className="relative flex-col items-center justify-center min-w-[60px] hidden p-1 text-gray-700 rounded-tl-lg lg:flex">
                <button
                  id="myAccount"
                  data-dropdown-toggle="myAccountHover"
                  data-dropdown-trigger="hover"
                  className=""
                  type="button"
                >
                  <a
                    href={storedToken ? routs.account : routs.login}
                    // href={token ? routs.account : routs.login}
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="mb-1 text-2xl text-secondary">
                      <svg
                        width="18pt"
                        height="18pt"
                        id="fi_15501313"
                        enable-background="new 0 0 1024 1024"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="XMLID_3_">
                          <g id="XMLID_1_">
                            <g id="XMLID_16_">
                              <path
                                id="XMLID_24_"
                                d="m695.2 275.5c0 9.8-.7 19.5-2 29.2.4-2.7.7-5.3 1.1-8-2.6 18.3-7.4 36.2-14.5 53.2 1-2.4 2-4.8 3-7.2-5.3 12.6-11.8 24.7-19.4 36-1.9 2.9-4 5.8-6.1 8.6-4.4 5.9 3.8-4.7.7-.9-1.1 1.4-2.2 2.7-3.3 4.1-4.2 5-8.6 9.9-13.2 14.5s-9.5 9.1-14.5 13.2c-1.3 1.1-2.7 2.2-4.1 3.3-3.9 3.1 6.8-5.1.9-.7-2.8 2.1-5.7 4.1-8.6 6.1-11.4 7.6-23.4 14-36 19.4l7.2-3c-17.1 7.1-34.9 12-53.2 14.5 2.7-.4 5.3-.7 8-1.1-19.4 2.6-38.9 2.6-58.3 0 2.7.4 5.3.7 8 1.1-18.3-2.6-36.2-7.4-53.2-14.5l7.2 3c-12.6-5.3-24.7-11.8-36-19.4-2.9-1.9-5.8-4-8.6-6.1-5.9-4.4 4.7 3.8.9.7-1.4-1.1-2.7-2.2-4.1-3.3-5-4.2-9.9-8.6-14.5-13.2s-9.1-9.5-13.2-14.5c-1.1-1.3-2.2-2.7-3.3-4.1-3.1-3.9 5.1 6.8.7.9-2.1-2.8-4.1-5.7-6.1-8.6-7.6-11.4-14-23.4-19.4-36 1 2.4 2 4.8 3 7.2-7.1-17.1-12-34.9-14.5-53.2.4 2.7.7 5.3 1.1 8-2.6-19.4-2.6-38.9 0-58.3-.4 2.7-.7 5.3-1.1 8 2.6-18.3 7.4-36.2 14.5-53.2-1 2.4-2 4.8-3 7.2 5.3-12.6 11.8-24.7 19.4-36 1.9-2.9 4-5.8 6.1-8.6 4.4-5.9-3.8 4.7-.7.9 1.1-1.4 2.2-2.7 3.3-4.1 4.2-5 8.6-9.9 13.2-14.5s9.5-9.1 14.5-13.2c1.3-1.1 2.7-2.2 4.1-3.3 3.9-3.1-6.8 5.1-.9.7 2.8-2.1 5.7-4.1 8.6-6.1 11.4-7.6 23.4-14 36-19.4-2.4 1-4.8 2-7.2 3 17.1-7.1 34.9-12 53.2-14.5-2.7.4-5.3.7-8 1.1 19.4-2.6 38.9-2.6 58.3 0-2.7-.4-5.3-.7-8-1.1 18.3 2.6 36.2 7.4 53.2 14.5-2.4-1-4.8-2-7.2-3 12.6 5.3 24.7 11.8 36 19.4 2.9 1.9 5.8 4 8.6 6.1 5.9 4.4-4.7-3.8-.9-.7 1.4 1.1 2.7 2.2 4.1 3.3 5 4.2 9.9 8.6 14.5 13.2s9.1 9.5 13.2 14.5c1.1 1.3 2.2 2.7 3.3 4.1 3.1 3.9-5.1-6.8-.7-.9 2.1 2.8 4.1 5.7 6.1 8.6 7.6 11.4 14 23.4 19.4 36-1-2.4-2-4.8-3-7.2 7.1 17.1 12 34.9 14.5 53.2-.4-2.7-.7-5.3-1.1-8 1.3 9.7 2 19.4 2 29.1.1 15.7 13.8 30.7 30 30s30.1-13.2 30-30c-.2-49.1-15-98.8-43.7-138.9-29.6-41.5-70-72.5-117.8-90.1-93.3-34.4-204.6-4.2-267.7 72.6-32.9 40.1-52.5 87.9-56.5 139.7-3.8 49.3 8.7 100.3 34.4 142.6 24.8 40.8 62.1 75.1 105.8 94.7 25 11.2 50.1 18.1 77.3 21.3 25.2 3 50.8 1.2 75.7-3.9 95.7-19.4 174.6-101.2 189.2-198 2-13.2 3.4-26.5 3.4-39.9.1-15.7-13.8-30.7-30-30-16.4.7-30 13.1-30.1 29.9z"
                              ></path>
                            </g>
                          </g>
                          <g id="XMLID_2_">
                            <g id="XMLID_17_">
                              <path
                                id="XMLID_25_"
                                d="m828.7 931.7c-21.3 0-42.6 0-63.9 0-50.8 0-101.7 0-152.5 0-61.3 0-122.6 0-183.9 0-52.8 0-105.5 0-158.3 0-24.8 0-49.5.1-74.3 0-2.5 0-5-.2-7.5-.5 2.7.4 5.3.7 8 1.1-4-.6-7.8-1.7-11.5-3.2l7.2 3c-2.8-1.2-5.5-2.6-8.1-4.3s-3.5-4 1.9 1.6c-1-1.1-2.3-2-3.3-3-.3-.3-3.2-3.2-3-3.3 0 0 5.2 7.3 1.6 1.9-1.7-2.5-3.1-5.2-4.3-8.1 1 2.4 2 4.8 3 7.2-1.5-3.7-2.5-7.6-3.2-11.5.4 2.7.7 5.3 1.1 8-.7-5.6-.5-11.4-.5-17 0-9.7 0-19.5 0-29.2 0-19.4 0-38.8 0-58.2 0-11.5.5-23 2-34.4-.4 2.7-.7 5.3-1.1 8 2.8-20.5 8.2-40.6 16.3-59.7-1 2.4-2 4.8-3 7.2 4.5-10.5 9.7-20.7 15.7-30.5 3-4.9 6.1-9.6 9.5-14.2.8-1.1 1.5-2.1 2.3-3.2.4-.5.8-1 1.2-1.6 1.7-2.3-2.8 4-2.7 3.5.4-2.1 4.4-5.5 5.8-7.1 7.2-8.5 15-16.4 23.4-23.8 2.1-1.9 4.3-3.7 6.5-5.5 1-.8 2-1.6 3.1-2.5 3.4-2.8-6.2 4.6-1.4 1.1 4.6-3.4 9.2-6.7 14-9.7 10.9-7 22.5-13.1 34.4-18.2-2.4 1-4.8 2-7.2 3 19.1-8 39.1-13.5 59.7-16.3-2.7.4-5.3.7-8 1.1 16.4-2.1 32.8-2 49.3-2h67.1 156.6c18.6 0 37.1-.4 55.6 2-2.7-.4-5.3-.7-8-1.1 20.5 2.8 40.6 8.2 59.7 16.3-2.4-1-4.8-2-7.2-3 10.5 4.5 20.7 9.7 30.5 15.7 4.9 3 9.6 6.1 14.2 9.5 1.1.8 2.1 1.5 3.2 2.3.5.4 1 .8 1.6 1.2 2.3 1.7-4-2.8-3.5-2.7 2.1.4 5.5 4.4 7.1 5.8 8.5 7.2 16.4 15 23.8 23.4 1.9 2.1 3.7 4.3 5.5 6.5.8 1 1.6 2 2.5 3.1 2.8 3.4-4.6-6.2-1.1-1.4 3.4 4.6 6.7 9.2 9.7 14 7 10.9 13.1 22.5 18.2 34.4-1-2.4-2-4.8-3-7.2 8 19.1 13.5 39.1 16.3 59.7-.4-2.7-.7-5.3-1.1-8 2.3 18 2 36.1 2 54.2v64.2c0 6.7.4 13.6-.5 20.3.4-2.7.7-5.3 1.1-8-.6 4-1.7 7.8-3.2 11.5 1-2.4 2-4.8 3-7.2-1.2 2.8-2.6 5.5-4.3 8.1s-4 3.5 1.6-1.9c-1.1 1-2 2.3-3 3.3-.3.3-3.2 3.2-3.3 3 0 0 7.3-5.2 1.9-1.6-2.5 1.7-5.2 3.1-8.1 4.3l7.2-3c-3.7 1.5-7.6 2.5-11.5 3.2 2.7-.4 5.3-.7 8-1.1-2.3.3-4.5.4-6.9.5-15.7.2-30.7 13.6-30 30 .7 16.1 13.2 30.2 30 30 36.1-.5 70.5-26.6 76.4-63.2 2.2-13.6 1.6-27.4 1.6-41.1 0-18.1 0-36.3 0-54.4 0-12.7.3-25.5-.7-38.2-4.3-57.8-26.9-111.9-65.1-155.6-35.8-41-86-70.6-139.3-81.8-27.4-5.8-54.6-6.1-82.3-6.1-32.8 0-65.6 0-98.5 0-34.9 0-69.7 0-104.6 0-21.2 0-42.8-.9-63.9 1.4-30.3 3.4-58.6 11.1-86.3 23.9-24.5 11.3-47.2 27.2-66.9 45.6-39.8 37.2-68.2 88.3-77.6 142-6.1 35.1-4.5 70.7-4.5 106.2v41.5c0 28.9 15.4 58.1 42.1 71 12.4 6 25.3 8.8 39.1 8.8h15.1 61.1 92 109 113.2 104.7 82.1 47 6.2c15.7 0 30.7-13.8 30-30-.6-16.3-13-30-29.9-30z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="text-sm">Account</span>
                  </a>
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="myAccountHover"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44"
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        My Orders
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        My Account
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Register
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Login
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img
                        src="assets/images/signout.svg"
                        alt="logout"
                        className="w-4 h-4 mr-2"
                      />
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- wishlist --> */}
              <div className="relative flex flex-col items-center min-w-[60px] justify-center p-1 text-gray-700 rounded-tl-lg lg:flex">
                <a
                  href={storedToken ? routs.wishlist : routs.login}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="mb-1 text-2xl text-secondary">
                    <span className="absolute z-10 inline-flex items-center justify-center w-4 h-4 p-1 text-xs font-normal leading-none text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full top-2 -right-1 bg-primary">
                      {wishlistDataIs ? wishlistDataIs?.length : "0"}
                    </span>
                    <svg
                      width="18pt"
                      height="18pt"
                      id="fi_13369080"
                      enable-background="new 0 0 100 100"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Add_to_Favorite"
                        d="m50 91c-2.733 0-5.306-1.065-7.242-2.999v-.001l-33.129-33.129c-4.919-4.919-7.629-11.459-7.629-18.417v-.407c0-6.958 2.71-13.499 7.629-18.417s11.461-7.63 18.416-7.63h.41c6.955 0 13.497 2.71 18.416 7.629l3.129 3.129 3.129-3.129c4.919-4.919 11.461-7.629 18.416-7.629h.41c6.955 0 13.497 2.71 18.416 7.629s7.629 11.459 7.629 18.417v.407c0 6.958-2.71 13.499-7.629 18.417l-33.129 33.13c-1.936 1.935-4.509 3-7.242 3zm-3-7.242c1.608 1.605 4.395 1.601 6-.001l33.129-33.127c3.785-3.788 5.871-8.821 5.871-14.176v-.407c0-5.355-2.086-10.389-5.871-14.175s-8.821-5.872-14.174-5.872h-.41c-5.353 0-10.389 2.084-14.174 5.871l-5.25 5.25c-1.172 1.172-3.07 1.172-4.242 0l-5.25-5.25c-3.785-3.787-8.821-5.871-14.174-5.871h-.41c-5.353 0-10.389 2.084-14.174 5.871s-5.871 8.82-5.871 14.175v.407c0 5.355 2.086 10.389 5.871 14.175z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm">Wishlist</span>
                </a>
              </div>

              {/* <!-- cart --> */}
              <div className="relative flex-col items-center justify-center min-w-[60px] hidden p-1 text-gray-700 rounded-tl-lg lg:flex">
                <a
                  href={routs.cart}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="mb-1 text-2xl text-secondary">
                    <span className="absolute z-10 inline-flex items-center justify-center w-4 h-4 p-1 text-xs font-normal leading-none text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full top-2 -right-1 bg-primary">
                      {TotalQuantity}
                    </span>

                    <svg
                      width="18pt"
                      height="18pt"
                      viewBox="-35 0 512 512.00102"
                      xmlns="http://www.w3.org/2000/svg"
                      id="fi_1656850"
                    >
                      <path d="m443.054688 495.171875-38.914063-370.574219c-.816406-7.757812-7.355469-13.648437-15.15625-13.648437h-73.140625v-16.675781c0-51.980469-42.292969-94.273438-94.273438-94.273438-51.984374 0-94.277343 42.292969-94.277343 94.273438v16.675781h-73.140625c-7.800782 0-14.339844 5.890625-15.15625 13.648437l-38.9140628 370.574219c-.4492192 4.292969.9453128 8.578125 3.8320308 11.789063 2.890626 3.207031 7.007813 5.039062 11.324219 5.039062h412.65625c4.320313 0 8.4375-1.832031 11.324219-5.039062 2.894531-3.210938 4.285156-7.496094 3.835938-11.789063zm-285.285157-400.898437c0-35.175782 28.621094-63.796876 63.800781-63.796876 35.175782 0 63.796876 28.621094 63.796876 63.796876v16.675781h-127.597657zm-125.609375 387.25 35.714844-340.097657h59.417969v33.582031c0 8.414063 6.824219 15.238282 15.238281 15.238282s15.238281-6.824219 15.238281-15.238282v-33.582031h127.597657v33.582031c0 8.414063 6.824218 15.238282 15.238281 15.238282 8.414062 0 15.238281-6.824219 15.238281-15.238282v-33.582031h59.417969l35.714843 340.097657zm0 0"></path>
                    </svg>
                  </span>
                  <span className="text-sm">Cart</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden bg-white border-gray-300 border-y lg:block xl:block"
        onMouseLeave={handleMouseLeave}
      >
        <div className="container flex items-center justify-center h-12 px-1 mx-auto sm:px-5">
          <div className="inline-flex">
            <div className="relative">
              <div className="mx-auto">
                <div className="flex items-center ">
                  <nav className="flex items-center space-x-2 lg:space-x-5 md:flex">
                    {data?.blockValues?.map((value: any) => (
                      <div
                        className="relative"
                        key={value.id}
                        onMouseEnter={() => handleMouseEnter(value)}
                      >
                        <button
                          id="dropdownHoverButton"
                          type="button"
                          className="inline-flex items-center py-2 text-black group hover:text-secondary focus:outline-none"
                        >
                          <span className=" text-black text-sm lg:text-md hover:text-secondary text-nowrap uppercase">
                            {value.menuTitle}
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3 ml-1 group-hover:text-secondary"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- mega menu start --> */}
        {megaMenuEnabled && hoveredMenu && (
          <div
            // className="w-full absolute mt-[0px] z-[1000] bg-white border-gray-200 shadow-sm border-y"
            className={cn(
              "w-full absolute mt-[0px] z-[1000] bg-white border-gray-200 shadow-sm border-y hidden",
              {
                block: megaMenuEnabled,
              }
            )}
          >
            <div className="flex w-full px-4 py-5 mx-auto !text-gray-900">
              <div className="w-[70%]">
                <ul
                  className="mb-4"
                  aria-labelledby="mega-menu-full-dropdown-button"
                >
                  {/* <li> */}
                  <div className="mb-5">
                    {/* <h2 className="mb-2 text-sm font-semibold text-gray-900 capitalize dark:text-black">
                        {hoveredMenu.menuTitle}
                      </h2> */}

                    <div className="grid grid-cols-4  font-thin !text-gray-500 !hover:text-gray-800 ">
                      {hoveredMenu?.children?.map((child: any) => (
                        <div className="mb-1" key={child.id}>
                          <a
                            // href={`/${child.linkedMenuItemId}`}
                            onClick={() => {
                              gotoScreen(child);
                            }}
                            // href={`/${child.linkedMenuItemId}`}
                            className="hover:underline cursor-pointer hover:text-[#f87f1b] mb-2 text-md font-semibold text-gray-900 capitalize dark:text-black"
                          >
                            {child.menuTitle}
                          </a>
                          {child.children.length > 0 && (
                            <ul className="ml-2 leading-7">
                              {child.children.map((subChild: any) => (
                                <li className="mb-1" key={subChild.id}>
                                  <a
                                    // href={`/${subChild.linkedMenuItemId}`}
                                    onClick={() => {
                                      gotoScreen(subChild);
                                    }}
                                    className="hover:underline hover:text-[#f87f1b] font-medium cursor-pointer"
                                  >
                                    {subChild.menuTitle}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* </li> */}
                </ul>
              </div>
              <div className="w-[30%] hidden md:block">
                {/* <div className="w-full h-full bg-gray-300 bg-[url('/images/mega-menu-furniture.jpg')] bg-no-repeat bg-center bg-cover"></div> */}
                <img
                  className=""
                  src="/images/mega-menu-furniture.jpg"
                  crossOrigin="anonymous"
                  alt="Feature Image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
// function push(arg0: string) {
//   throw new Error("Function not implemented.");
// }
