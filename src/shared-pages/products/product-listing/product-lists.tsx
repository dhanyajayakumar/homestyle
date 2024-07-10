"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import axios from "axios";
import { ProductItemProps } from "@/types/products";
import { ProductListingProps } from "@/types/productCollection";
import FilterSection from "./filter/filterSection";
import { useUser } from "@/contexts/MyContext";
import Breadcrumb from "@/components/Breadcrumb";
import ListingComponent from "./listingComponent";

const ProductListing: React.FC<ProductListingProps> = ({
  productlist,
  idName,
}) => {
  const { push } = useRouter();
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    getCartData,
    wishlistDataIs,
    setwishlistDataIs,
    getWishlistData,
    cartProductList,
    uniqueIdIS,
    storedToken,
  } = useUser();

  // const tokenLocal = localStorage.getItem("token");
  // const uniqueIdIS = localStorage.getItem("uniqueId");

  const [isExpanded, setIsExpanded] = useState(false);
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [collectionTitle, setcollectionTitle] = useState();
  const [collectionSubTitle, setcollectionSubTitle] = useState();
  const [collectionBanners, setcollectionBanners] = useState();
  const [allSelItem, setallSelItem] = useState<any>();

  const [layout, setLayout] = useState<"layout1" | "layout2">("layout2");

  // Handle layout change
  const handleLayoutChange = (layoutType: "layout1" | "layout2") => {
    setLayout(layoutType);
  };

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const [filters, setFilters] = useState<any>({});
  const [selSet, setselSet] = useState<any>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    console.log("the data before", JSON.stringify(cartProductList, null, 2));
  }, []);

  // const handleFilterChange = (filterName: any, selectedValues: any) => {
  //   setFilters((prevFilters: any) => ({
  //     ...prevFilters,
  //     [filterName]: selectedValues,
  //   }));

  //   // Perform actions based on selectedValues, e.g., API calls with updated filters
  //   console.log(`Selected ${filterName}:`, selectedValues);

  //   console.log("the filters:-", JSON.stringify(filters, null, 2));
  //   handleNewSet(selectedValues);
  // };

  // const handleNewSet = (selectedValues: any) => {
  //   // Concatenate the selectedValues with the current filters array
  //   const updatedFilters = [...selSet, ...selectedValues];

  //   // Remove duplicates by converting to Set and then back to array
  //   const uniqueFilters = [...new Set(updatedFilters)];

  //   // Update state with the uniqueFilters array
  //   setselSet(uniqueFilters);
  //   setselectedFilter(uniqueFilters);
  //   getFileterData(uniqueFilters);

  //   // Perform actions based on selectedValues, e.g., API calls with updated filters
  //   // console.log(`Selected ${filterName}:`, selectedValues);
  //   console.log("the selSetFinal:-", JSON.stringify(selSet, null, 2));
  // };

  const handleAddToCart = async (slug: any, variantSku: any) => {
    // Implement your add to cart functionality here
    console.log("Adding to cart:", JSON.stringify(slug, null, 2));
    // console.log("uniqueIdIS to cart:", JSON.stringify(uniqueIdIS, null, 2));
    // console.log("token to cart:", JSON.stringify(tokenLocal, null, 2));
    // console.log("uniqueId to cart:", JSON.stringify(uniqueId, null, 2));
    // Navigate to add to cart screen
    try {
      const postData = {
        quantity: 1,
        slug: slug,
      };
      const headers: any = {
        // Custom headers if needed
        "User-token": uniqueId,
      };

      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }

      const response = await api.post(endpoints.addToCart, postData, {
        headers: headers,
      });
      console.log("headers to cart:", JSON.stringify(headers, null, 2));
      console.log("response to cart:", JSON.stringify(response, null, 2));

      // const response = await api.post(endpoints.addToCart, postData, {
      //   headers: {
      //     // Custom headers if needed
      //     "User-token": uniqueId,
      //     // Authorization: `Bearer ${token}`,
      //     Authorization: `Bearer ${tokenLocal}`,
      //   },
      // });

      if (response.data.status) {
        console.log(
          "the adding to cart - out is:-",
          JSON.stringify(response.data, null, 2)
        );
        getCartData(storedToken, uniqueIdIS);
      } else {
        console.log(
          "the addingtoCart - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (productSlug: any, productSku: any) => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      console.log("Added to wishlists:");
      letsAddTo(productSlug, productSku);
    } else {
      console.log("Removed from wishlists:");
      letsAddTo(productSlug, productSku);
    }
  };

  const letsAddTo = async (productSlug: any, productSku: any) => {
    console.log("inside letsAddTo:-", productSlug, "and", productSku);
    try {
      const postData = {
        slug: productSlug,
        sku: productSku,
      };

      const response = await api.post(endpoints.addToWishList, postData, {
        headers: {
          // Custom headers if needed

          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the wishadding - out is:-",
          JSON.stringify(response.data, null, 2)
        );
        getWishlistData(storedToken, uniqueIdIS);
      } else {
        console.log(
          "the wishadding - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const letsRemoveTo = (productSlug: any, productSku: any) => {
    console.log("inside letsRemoveTo:-", productSlug, "and", productSku);
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center justify-between gap-4 py-3 mb-3 bg-white border-b md:flex-nowrap">
        <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
          <div className="flex flex-col items-baseline gap-1">
            <h2 className="text-xl font-medium">{idName}</h2>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-red-900"
                  >
                    Home
                  </a>
                </li>
                <li className="inline-flex items-center justify-start">
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
                    />
                  </svg>

                  <a
                    href="#"
                    className="text-sm font-normal text-gray-700 ms-1 hover:text-red-900 md:ms-2"
                  >
                    Furniture & Decor
                  </a>
                </li>
                <li className="inline-flex items-center" aria-current="page">
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
                      />
                    </svg>
                    <span className="text-sm font-normal text-gray-500 ms-1 md:ms-2">
                      Sofa
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="hidden gap-2 md:flex">
          <a href="#" onClick={() => handleLayoutChange("layout1")}>
            <img
              src={
                layout === "layout1"
                  ? "/images/layout-1.svg"
                  : "/images/layout-1-f.svg"
              }
              alt="Layout 1"
            />
          </a>
          <a href="#" onClick={() => handleLayoutChange("layout2")}>
            <img
              src={
                layout === "layout2"
                  ? "/images/layout-2.svg"
                  : "/images/layout-2-f.svg"
              }
              alt="Layout 2"
            />
          </a>
        </div>

        <div className="items-center justify-between hidden md:flex sm:hidden">
          <form className="relative inline-flex max-w-sm p-2 mx-auto border">
            <button
              type="button"
              className="items-center hidden w-full text-sm font-medium transition-all md:flex text-default-700"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_14618202"
              >
                <g id="Sort_Apps" data-name="Sort Apps">
                  <path d="m7.6134 3.5146h-2.4981a1.5017 1.5017 0 0 0 -1.5 1.5v2.4981a1.5017 1.5017 0 0 0 1.5 1.5h2.4981a1.5017 1.5017 0 0 0 1.5-1.5v-2.4981a1.5017 1.5017 0 0 0 -1.5-1.5zm.5 3.9981a.5006.5006 0 0 1 -.5.5h-2.4981a.5006.5006 0 0 1 -.5-.5v-2.4981a.5007.5007 0 0 1 .5-.5h2.4981a.5007.5007 0 0 1 .5.5zm-.5 3.4746h-2.4981a1.5017 1.5017 0 0 0 -1.5 1.5v2.4981a1.5017 1.5017 0 0 0 1.5 1.5h2.4981a1.5017 1.5017 0 0 0 1.5-1.5v-2.4981a1.5017 1.5017 0 0 0 -1.5-1.5zm.5 3.9981a.5007.5007 0 0 1 -.5.5h-2.4981a.5007.5007 0 0 1 -.5-.5v-2.4981a.5006.5006 0 0 1 .5-.5h2.4981a.5006.5006 0 0 1 .5.5zm8.0918-1.2745a.5007.5007 0 0 1 .0634.7046l-1.28 1.5318a1.5009 1.5009 0 0 1 -2.3028 0l-1.28-1.5318a.5.5 0 0 1 .7675-.6416l1.1641 1.3927v-10.3332l-1.1645 1.3927a.5.5 0 0 1 -.7675-.6416l1.28-1.5318a1.4566 1.4566 0 0 1 .9471-.4923.4786.4786 0 0 1 .4086 0 1.4566 1.4566 0 0 1 .9471.4923l1.28 1.5318a.5.5 0 0 1 -.7675.6416l-1.1637-1.3927v10.3332l1.1641-1.3927a.5007.5007 0 0 1 .7041-.063z"></path>
                </g>
              </svg>
              <span className="pl-1">Sort By:</span>
            </button>
            <select
              id=""
              className="appearance-none w-[170px] leading-tight pr-0 !important bg-transparent border-0 text-gray-900 text-sm rounded-0 border-0 focus:outline-none cursor-pointer focus:ring-0 text-blue-500 block"
            >
              <option value="">Newest Arrivals</option>
              <option value="">Relevance</option>
              <option value="">Price: High to Low</option>
              <option value="">Price: Low to High</option>
              <option value="">Name: A to Z</option>
              <option value="">Name: Z to A</option>
              <option value="">Most Popular</option>
            </select>
          </form>
        </div>
      </div>

      {/* <!-- mobile products filter sticky --> */}
      <div id="mainContent">
        {/* <!-- filter button area --> */}
        <div className="flex md:hidden justify-between sm:flex sticky top-[100px] sm:top-[100px] md:top-[90px] py-2 bg-white z-[30]">
          <div className="items-baseline gap-2">
            {/* <!-- Button to toggle sidebar --> */}
            <button
              id="toggleBtn"
              className="inline-flex items-center gap-4 border hover:bg-[#a61e22] hover:text-white border-default-200 px-4 py-2 text-sm text-default-950 transition-all xl:px-5"
              data-drawer-target="filter-option"
              data-drawer-show="filter-option"
              aria-controls="filter-option"
              type="button"
            >
              Filter
              <svg
                className=""
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
            </button>
            {/* <!-- <span className="ml-2 text-base text-gray-400">19500 Results Found</span> --> */}
          </div>

          {/* <!-- mobile sort --> */}
          <div className="items-center">
            <form className="relative inline-flex h-full max-w-sm p-2 mx-auto border">
              <button
                type="button"
                className="items-center hidden w-full text-sm font-medium transition-all md:flex text-default-700"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  id="fi_14618202"
                >
                  <g id="Sort_Apps" data-name="Sort Apps">
                    <path d="m7.6134 3.5146h-2.4981a1.5017 1.5017 0 0 0 -1.5 1.5v2.4981a1.5017 1.5017 0 0 0 1.5 1.5h2.4981a1.5017 1.5017 0 0 0 1.5-1.5v-2.4981a1.5017 1.5017 0 0 0 -1.5-1.5zm.5 3.9981a.5006.5006 0 0 1 -.5.5h-2.4981a.5006.5006 0 0 1 -.5-.5v-2.4981a.5007.5007 0 0 1 .5-.5h2.4981a.5007.5007 0 0 1 .5.5zm-.5 3.4746h-2.4981a1.5017 1.5017 0 0 0 -1.5 1.5v2.4981a1.5017 1.5017 0 0 0 1.5 1.5h2.4981a1.5017 1.5017 0 0 0 1.5-1.5v-2.4981a1.5017 1.5017 0 0 0 -1.5-1.5zm.5 3.9981a.5007.5007 0 0 1 -.5.5h-2.4981a.5007.5007 0 0 1 -.5-.5v-2.4981a.5006.5006 0 0 1 .5-.5h2.4981a.5006.5006 0 0 1 .5.5zm8.0918-1.2745a.5007.5007 0 0 1 .0634.7046l-1.28 1.5318a1.5009 1.5009 0 0 1 -2.3028 0l-1.28-1.5318a.5.5 0 0 1 .7675-.6416l1.1641 1.3927v-10.3332l-1.1645 1.3927a.5.5 0 0 1 -.7675-.6416l1.28-1.5318a1.4566 1.4566 0 0 1 .9471-.4923.4786.4786 0 0 1 .4086 0 1.4566 1.4566 0 0 1 .9471.4923l1.28 1.5318a.5.5 0 0 1 -.7675.6416l-1.1637-1.3927v10.3332l1.1641-1.3927a.5007.5007 0 0 1 .7041-.063z"></path>
                  </g>
                </svg>
                <span className="pl-1">Sort By:</span>
              </button>
              <select
                id=""
                className="appearance-none w-[180px] leading-tight pr-0 pl-2 md:pl-0 !important bg-transparent border-0 text-gray-900 text-sm rounded-0 border-0 focus:outline-none cursor-pointer focus:ring-0 text-blue-500 block"
              >
                <option value="">Newest Arrivals</option>
                <option value="">Relevance</option>
                <option value="">Price: High to Low</option>
                <option value="">Price: Low to High</option>
                <option value="">Name: A to Z</option>
                <option value="">Name: Z to A</option>
                <option value="">Most Popular</option>
              </select>
            </form>
          </div>
        </div>

        {/* <!-- product listing --> */}
        <div
          className={`grid grid-cols-2 gap-2 sm:gap-3 md:gap-5 sm:grid-cols-2 ${
            layout === "layout1" ? "xl:grid-cols-3" : "xl:grid-cols-4"
          }`}
        >
          {productlist?.map((value: any, index: number) => (
            <ListingComponent
              value={value}
              key={index}
              push={push}
              isWishlisted={isWishlisted}
              wishlistDataIs={wishlistDataIs || []}
              setIsWishlisted={setIsWishlisted}
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
              cartData={cartData}
              cartProductList={cartProductList || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductListing;
