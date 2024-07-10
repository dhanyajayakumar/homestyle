"use client";
import React, { useState, useEffect } from "react";
import { ProductDetailProps } from "@/types/productDetails";
import ProductSlider from "./imageSlides";

export interface ProductListingProps {
  title: any;
  data: any;
  activeSection: any;
  toggleAccordion: any;
}

const transformSpecifications = (data: any) => {
  return data?.reduce((acc: any, curr: any) => {
    const { specificationTitle, specificationDetail } = curr;
    if (!acc[specificationTitle]) {
      acc[specificationTitle] = [];
    }
    acc[specificationTitle].push(specificationDetail);
    return acc;
  }, {});
};

const DropdownSection: React.FC<ProductListingProps> = ({
  title,
  data,
  activeSection,
  toggleAccordion,
}) => (
  <div className="dropdown-section">
    <button
      type="button"
      className="flex items-center w-full gap-3 p-3 px-5 font-normal transition-all bg-[#F4F4F4] border border-gray-200 border-x-0 rtl:text-right dark:hover:bg-gray-200 dark:hover:text-black dark:bg-[#F4F4F4] text-gray-500 dark:text-gray-400"
      onClick={() => toggleAccordion(title)}
      aria-expanded={activeSection === title}
    >
      <svg
        data-accordion-icon=""
        className={`w-3 h-3 shrink-0 transition-transform ${
          activeSection === title ? "rotate-180" : ""
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        ></path>
      </svg>
      <span className="text-black capitalize">{title}</span>
    </button>
    {activeSection === title && (
      <div className="dropdown-content">
        <div className="border border-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <tbody>
                {data?.map((row: any, index: any) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-80 dark:border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-400 text-wrap md:text-nowrap dark:text-gray-500"
                    >
                      {row.itemName}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 text-wrap md:text-nowrap dark:text-gray-900">
                      {row.itemValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </div>
);

const Productdetails: React.FC<ProductDetailProps> = ({
  productDetailsIs,
  productImages,
  productPriceIs,
  productDiscountIs,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [groupedSpecifications, setGroupedSpecifications] = useState<any>({});

  useEffect(() => {
    if (productDetailsIs) {
      setGroupedSpecifications(
        transformSpecifications(productDetailsIs?.product?.productSpecification)
      );
    }
  }, [productDetailsIs]);

  const toggleAccordion = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* <!-- breadcrumb --> */}
      <div className="px-6 mx-auto bg-white sm:px-8 lg:px-8">
        <nav
          className="flex px-6 py-4 sm:px-5 sm:px-8 lg:px-0"
          aria-label="Breadcrumb"
        >
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
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>

                <a
                  href="#"
                  className="text-sm font-normal text-gray-700 ms-1 hover:text-red-900 md:ms-2 "
                >
                  Furniture & Decor
                </a>
              </div>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="text-sm font-normal text-gray-500 ms-1 md:ms-2 ">
                  Sofas
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* <!-- slider --> */}
      <section className="px-3 mt-4 sm:px-6">
        <div className="flex flex-col w-full gap-10 md:gap-8 lg:gap-0 md:flex-row lg:flex-row">
          {/* <!-- Image Start --> */}

          <ProductSlider productImages={productImages} />
          {/* <!-- Image Ends --> */}

          <div className="flex gap-5 w-4/4 md:w-2/4 lg:w-2/4">
            <div className="w-12/12 lg:w-8/12 2xl:w-10:12 md:flex-1 lg:flex-auto">
              {/* <!-- basic info --> */}

              <div className="">
                <h3 className="mt-4 text-2xl text-black font-semibold md:text-heading-4">
                  {productDetailsIs?.product?.productTitle}
                </h3>
                <div className="flex items-center gap-4">
                  <p className="font-normal text-sm leading-[30px] md:text-heading-3 text-">
                    <span className="text-[#868e96]">SKU:</span>{" "}
                    {productDetailsIs?.product?.sku}
                  </p>
                  <p className="text-gray-400 border-l-2 ps-4">
                    Availability :{" "}
                    <span className="font-semibold text-green-500">
                      In Stock
                    </span>
                  </p>
                </div>
              </div>

              {/* <!-- price details --> */}

              <div className="flex flex-wrap items-center mt-4">
                <h2 className="mr-4 text-2xl font-bold md:text-heading-3 text-primary">
                  AED {productDiscountIs}
                </h2>
                <h3 className="text-xl font-normal text-gray-400 line-through md:text-heading-4">
                  AED {productPriceIs}
                </h3>
              </div>

              <div className="flex items-center gap-3 mb-3 mt-2 w-100">
                <span className="text-sm text-left font-medium text-nowrap text-green-500 ">
                  Save AED {productPriceIs - productDiscountIs}
                </span>

                <span className="w-[1px] h-[14px] bg-gray-400"></span>

                <p className="w-full text-gray-500 text-nowrap">
                  Earn{" "}
                  <span className="font-bold text-primary">57 Shukrans</span>
                </p>
              </div>

              <p className="w-full mt-1 text-gray-500 text-text">
                Expected delivery within{" "}
                <span className="font-medium text-black">7 Days</span>
              </p>

              <div className="flex flex-col md:flex-row items-baseline md:items-center lg:items-center gap-2 p-2 pr-4 mt-2 border-2 border-[#B5DFCB] rounded">
                <img src="/images/tabby.svg" className="rounded" alt="" />
                <p>
                  4 interest-free payments of AED 212.25. No fees.
                  Shariah-compliant.{" "}
                  <span className="text-blue-600">
                    <a href="" className="hover:underline">
                      Learn More
                    </a>
                  </span>
                </p>
              </div>

              {/* <!-- count-addtocart-buy --> */}

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="relative flex items-center max-w-[9rem]">
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={decrementQuantity}
                    className="h-12 p-3 px-4 bg-white border border-r-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                    value={quantity}
                    readOnly
                    className=" bg-white border border-x-0 !border-gray-300 h-12 text-center text-gray-900 text-sm outlk focus:ring-0 outline-none focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />

                  <button
                    type="button"
                    id="increment-button"
                    onClick={incrementQuantity}
                    className="h-12 p-3 px-4 bg-white border border-l-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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

                <button className="grid items-center border border-[#603813] h-12 capitalize bg-white hs-btn hover:bg-[#FEF1DE] text-[#603813]  flex-1 max-w-full md:max-w-full lg:max-w-[200px]  visible md:visible  text-nowrap">
                  Add to Cart
                </button>
                <button className="grid items-center flex-1 max-w-full h-12 md:max-w-full lg:max-w-[200px]  visible text-white hover:bg-[#e0880a] capitalize hs-btn bg-primary md:visible  text-nowrap">
                  Buy Now
                </button>
              </div>

              {/* <!-- overview --> */}

              <div className="mt-4">
                <span className="text-lg font-bold capitalize">Overview</span>
                <p>
                  {productDetailsIs?.product?.description.replace(
                    /<[^>]*>/g,
                    ""
                  )}
                </p>
              </div>

              {/* <!-- share product --> */}

              <div className="flex flex-wrap items-center justify-start gap-2 mb-4">
                <span className="mr-3 opacity-70">
                  <svg
                    className="fill-current w-[18px] h-[18px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 302 332.01"
                  >
                    <path
                      d="M101.14,211.94c-6.93,3.64-13.55,8.15-20.84,10.79C40.08,237.23-2.26,205.89.09,163.22c1.33-24.15,13.37-42.15,35.47-52.06,22.2-9.96,43.47-6.79,62.77,8.13,2.02,1.56,3.18,1.43,5.14.12,25.35-16.98,50.73-33.91,76.19-50.74,2.1-1.39,2.2-2.84,2.05-4.98-2.17-31.43,21.66-59.75,52.31-63.28,31.49-3.62,62.33,17.52,67.06,51.42,3.8,27.23-10.94,52.92-35.82,63.57-25,10.7-53.38,3.55-70.79-17.84-.37-.45-.74-.91-1.27-1.56-1.02.62-2.01,1.18-2.96,1.81-23.34,15.54-46.65,31.11-70.02,46.6-1.93,1.28-2.62,2.26-1.82,4.76,3.59,11.19,3.5,22.49.04,33.73-.51,1.66-1.03,2.87.92,4.16,24.47,16.18,48.88,32.45,73.3,48.7.09.06.23.04.59.08,1.34-1.57,2.68-3.34,4.22-4.91,17.22-17.67,37.93-24.04,61.6-16.91,23.62,7.12,38.1,23.61,42.1,47.97,5.98,36.45-20.9,68.57-57.74,69.98-34.83,1.33-64.11-28.76-61.71-63.56.18-2.57-.43-3.98-2.6-5.41-25.06-16.57-50.04-33.26-75.04-49.91-1.07-.71-2.16-1.4-3.23-2.1.1.32.19.63.29.95ZM60.64,135.78c-16.57.07-30.15,13.65-30.18,30.17-.04,16.48,13.62,30.23,30.08,30.27,16.69.04,30.36-13.62,30.36-30.34,0-16.43-13.81-30.17-30.25-30.1ZM241.76,90.48c16.7-.04,30.13-13.37,30.22-30,.09-16.51-13.52-30.23-30.02-30.26-16.78-.03-30.33,13.45-30.4,30.24-.07,16.48,13.59,30.06,30.2,30.02ZM241.69,241.52c-16.65.07-30.14,13.55-30.13,30.1,0,16.54,13.62,30.17,30.13,30.18,16.74,0,30.35-13.62,30.31-30.35-.04-16.52-13.68-30-30.3-29.94Z"
                      style={{ fill: "#000", strokeWidth: 0 }}
                    />
                  </svg>
                </span>
                <a
                  href="#"
                  className="flex items-center gap-2 px-2 py-4 text-black"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 384"
                  >
                    <path d="M182.25,0c8,0,16,0,24,0,4.57.55,9.15.97,13.7,1.67,43.07,6.61,80.24,24.65,110.49,56.48,26.82,28.22,44.07,61.2,50.69,99.62,1.18,6.87,1.93,13.82,2.87,20.73v24c-.23,1.21-.59,2.42-.68,3.65-1.67,21.34-6.77,41.82-15.56,61.35-45.09,100.22-166.18,142.29-263.52,91.67-1.66-.86-4.09-1.12-5.9-.66-22.6,5.72-45.17,11.58-67.72,17.5-9.73,2.55-19.41,5.33-29.11,8-.5-.5-1-1-1.5-1.5.43-1,.97-1.97,1.26-3.02,8.35-30.3,16.71-60.59,24.89-90.94.51-1.88.11-4.46-.83-6.2C3.57,242.33-3.25,199.83,4.78,155.14,19.65,72.41,86.08,16.04,160.83,3.01c7.1-1.24,14.28-2.01,21.42-3.01ZM46.18,337.88c1.72-.36,2.7-.52,3.65-.76,17.51-4.54,35.03-9.03,52.51-13.71,2.77-.74,4.86-.33,7.29,1.12,36.55,21.86,75.71,28.97,117.4,19.68,80.14-17.87,138.83-94.12,122.15-184.04-15.06-81.2-92.26-137.59-174.17-127.73-47.26,5.69-84.93,28.05-112.18,67.05-22.83,32.69-32.17,69.16-27.71,108.96,2.78,24.79,11.53,47.42,25.13,68.22,1.43,2.19,1.78,4.08,1.04,6.57-2.25,7.53-4.28,15.12-6.37,22.7-2.87,10.44-5.71,20.88-8.74,31.94Z" />
                    <path d="M243.33,280.81c-12.94.52-23.94-4.49-35.25-8.39-32.26-11.12-57.18-32.07-78.45-58.01-10.22-12.46-20.46-24.88-27.2-39.74-7.08-15.61-9.95-31.62-2.58-47.75,3.16-6.92,8.06-13.12,12.6-19.32,2.76-3.76,7.1-5.5,11.8-5.67,4.23-.16,8.49-.09,12.72.12,3.76.19,5.66,2.99,7,6.02,3.03,6.84,5.87,13.77,8.78,20.66,2.33,5.52,4.5,11.1,7,16.54,1.74,3.78,1.67,7.28-.76,10.59-3.55,4.81-7.14,9.6-10.89,14.25-3.93,4.86-4.13,6.29-.89,11.66,15.25,25.3,36.26,43.93,63.76,55.05,5.9,2.39,7.9,2.02,12.01-2.96,4.53-5.49,9-11.03,13.41-16.61,2.95-3.73,4.82-4.71,9.38-2.97,6.28,2.39,12.38,5.26,18.49,8.07,4.19,1.92,8.21,4.22,12.43,6.08,3,1.32,6.24,2.1,9.31,3.3,2.59,1.01,3.87,3.09,3.83,5.87-.18,12.84-2.89,24.48-14.3,32.47-9.89,6.93-20.46,11.43-32.19,10.75Z" />
                  </svg>
                  {/* Facebook */}
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-2 py-4 text-black"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 165.56 306.88"
                  >
                    <path d="M46.2,173.22c-2.68,0-4.9,0-7.13,0-10.25,0-20.5.07-30.75-.04-6.12-.07-8.16-1.85-8.21-7.7-.15-15.75-.15-31.5,0-47.24.06-5.83,2.21-7.63,8.25-7.66,11.12-.06,22.25-.02,33.37-.02,1.34,0,2.69,0,4.45,0,0-1.84-.02-3.3,0-4.76.26-14.24-.26-28.54.95-42.69C50.19,27.47,77.57,1.68,113.37.33c14.98-.57,29.99-.23,44.99-.19,4.98.01,7.11,2.15,7.14,7.13.08,14.87.08,29.75,0,44.62-.03,5.07-2.1,7.08-7.52,7.21-10.12.25-20.24.25-30.37.4-11.75.18-16.39,4.61-16.6,16.37-.2,11.1-.04,22.21-.04,33.72,1.56.07,2.88.19,4.19.19,12.87.01,25.75,0,38.62.01,8.39.01,10.23,1.82,10.23,10.04.01,14.75.02,29.5,0,44.25-.01,6.91-1.72,8.65-8.64,8.68-13.25.05-26.5.02-39.75.02-1.36,0-2.72,0-4.63,0,0,1.84,0,3.42,0,5,0,39.12,0,78.24,0,117.36,0,10.53-1.23,11.74-11.9,11.74-14.37,0-28.75.01-43.12,0-7.94,0-9.77-1.81-9.77-9.65-.01-39.62,0-79.24,0-118.86,0-1.49,0-2.97,0-5.14Z" />
                  </svg>
                  {/* Twitter */}
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-2 py-4 text-black"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 899.01 920.16"
                  >
                    <path d="M.47,920.16c21.28-25.08,42.43-50.27,63.87-75.21,93.5-108.75,187.08-217.43,280.62-326.14,1.94-2.26,3.76-4.62,5.97-7.34C234.15,341.52,117.44,171.68,0,.79,3.36.54,5.57.23,7.77.23c84.15-.02,168.31.06,252.46-.18,5.98-.02,8.99,2.22,12.15,6.83,73.78,107.62,147.72,215.13,221.64,322.66,1.83,2.66,3.75,5.24,6.21,8.67,15.33-17.77,30.14-34.9,44.91-52.06,79.48-92.38,159.02-184.7,238.26-277.27,5.64-6.59,11.28-9.08,19.79-8.85,21.73.58,43.48.19,67.35.19-112.5,130.76-223.66,259.98-335,389.4,1.92,2.93,3.5,5.43,5.17,7.87,117.78,171.43,235.58,342.85,353.34,514.29,1.83,2.67,3.3,5.59,4.94,8.4h-267.76c-1.05-1.79-1.99-3.66-3.16-5.36-79.11-115.17-158.23-230.33-237.38-345.47-1.3-1.89-2.91-3.56-4.7-5.74-2.79,3.16-5.19,5.81-7.52,8.52-63.84,74.19-127.72,148.36-191.51,222.6-35.88,41.76-71.63,83.63-107.44,125.45H.47ZM107.92,59.83c2.69,4.13,4.23,6.65,5.92,9.07,183.44,262.37,366.91,524.73,550.23,787.18,3.7,5.3,7.61,7.12,13.97,7.06,34.13-.31,68.26-.14,102.39-.17,2.85,0,5.7-.28,10.09-.52-3.05-4.47-5.3-7.85-7.63-11.19C602.89,593.79,422.75,336.41,243.21,78.62c-9.77-14.03-19.3-20.14-36.7-19.26-32.18,1.63-64.51.47-98.58.47Z" />
                  </svg>
                  {/* Instagram */}
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-2 py-4 text-black"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 332.13 409.19"
                  >
                    <path d="M75.87,409.19c-1.02-3.93-2.43-7.8-2.98-11.79-3.1-22.31-5.37-44.77-2.52-67.21,1.67-13.12,5.13-26.04,8.26-38.93,7.67-31.63,15.66-63.18,23.37-94.8.49-1.99.23-4.45-.48-6.41-8.13-22.38-9.52-44.72,1.05-66.66,6.65-13.8,17.05-23.64,32.67-26.79,21.04-4.24,38.43,9.26,39.59,30.67.61,11.36-2.1,22.19-5.29,32.91-4.93,16.55-10.06,33.03-15.12,49.54-9.19,29.96,14.89,50.05,40.62,48.26,28.11-1.95,47.27-17.39,60.92-40.73,11.31-19.33,16.05-40.61,17.26-62.82.87-15.97-.49-31.58-6.19-46.67-9.27-24.53-25.95-42.48-49.74-52.87-37.33-16.29-75.1-15.49-111.39,2.76-32.63,16.41-51.9,43.75-57.05,80.16-3.61,25.46,2.24,48.86,17.87,69.53,2.12,2.8,2.68,5.67,1.81,8.97-2.24,8.48-4.4,16.97-6.69,25.43-1.6,5.9-4.03,6.98-9.66,4.34-13.29-6.24-23.38-16.14-31.26-28.27C2.86,190.1-3.77,159.77,2.06,127.17,13.01,65.94,50.1,27.66,108.41,9.39c36.12-11.32,73.11-12.48,109.88-3.07,39.93,10.22,72.41,31.74,94.28,67.32,14.27,23.22,20.57,48.78,19.44,76.13-1.13,27.37-7.26,53.43-20.6,77.48-19.11,34.46-47.04,58.04-85.87,67.2-20.97,4.94-41.93,5.08-62.13-4.08-9.72-4.41-18.36-10.17-24.4-19.22-.29-.44-.47-.95-1.14-2.34-3.88,14.2-7.93,26.98-10.84,40.01-8.11,36.28-26.08,67.73-46.88,97.88-.59.86-1.26,1.68-1.89,2.51h-2.4Z" />
                  </svg>
                  {/* Pinterest */}
                </a>
              </div>
              {/* <!-- product description --> */}

              <div className="mt-6 mb-5">
                <div className="dropdown-container">
                  {Object.keys(groupedSpecifications).map((title, index) => (
                    <DropdownSection
                      key={index}
                      title={title}
                      data={groupedSpecifications[title]}
                      activeSection={activeSection}
                      toggleAccordion={toggleAccordion}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- scroll to top feature --> */}
      {/* 
      <button
        onClick={scrollToTop}
        className="fixed z-50 px-4 py-2 font-bold text-white rounded-full aspect-square bg-primary bottom-5 right-5 hover:bg-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M18 15l-6-6-6 6"></path>
        </svg>
      </button> */}
    </div>
  );
};

export default Productdetails;
