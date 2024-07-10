"use client";

import { routs } from "@/config/routs";
import cn from "@/utils/class-names";
import React, { useState } from "react";
import AccountDashbord from "./dashboard";
import AccountProfile from "./profile";
import AccountOrders from "./orders";
import { MAP_STEP_TO_COMPONENT, pagesTabs } from "@/utils/accounts";
import { useRouter } from "next/navigation";

export default function Index({}) {
  const { push } = useRouter();

  const [activeTab, setActiveTab] = useState(pagesTabs[0].value);
  const Component = MAP_STEP_TO_COMPONENT[activeTab];

  const handleSignOut = (event: any) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
    localStorage.removeItem("token");
    push(routs.login); // Redirect to the login route
  };
  return (
    <div>
      <section className="container px-3 mx-auto my-4 sm:my-8 sm:px-6">
        <div>
          <h1 className="text-xl font-medium text-black">
            My Account
            <span className="font-medium text-primary">(8 items)</span>
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
                      My Account
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="flex flex-1 min-w-[320px] gap-5 xl:flex-row lg:flex-col flex-col mb-4 !border-gray-200 dark:border-gray-700 ">
          {/* <!-- tab buttons --> */}
          <div>
            <ul
              className="flex gap-1 xl:flex-col lg:flex-row flex-wrap min-w-[200px] text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              {pagesTabs.map((pagesTab: any, index: number) => (
                <li
                  className={cn(
                    `bg-[#FEF1DE] duration-150 hover:bg-[#ffd89e] `,
                    {
                      "bg-[#ffd89e]": activeTab === pagesTab.value,
                    }
                  )}
                  key={index}
                >
                  <button
                    className="flex w-full items-center py-2 px-3 gap-3 font-normal !text-black !hover:text-red-600 "
                    type="button"
                    onClick={() => setActiveTab(pagesTab.value)}
                  >
                    {pagesTab.value == "dashboard" && (
                      <svg
                        width="15px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M309,0C366.33,0,423.67,0,481,0c8.64,2.71,17.21,6,22.35,13.82,3.65,5.55,5.82,12.09,8.65,18.18v235c-.18.28-.44.53-.53.84-6.18,21.49-18.71,30.91-41.17,30.91-50.66,0-101.31.03-151.97-.06-4.29,0-8.72-.29-12.86-1.34-17.48-4.43-28.18-19.01-28.2-38.2-.05-46.82-.02-93.65-.02-140.47,0-26.49-.06-52.99.02-79.48.05-17.38,9.01-30.88,24.2-36.73C303.93,1.52,306.49.82,309,0Z" />
                        <path d="M0,481c0-78.67,0-157.33,0-236,.16-.29.39-.56.48-.87,6.45-21.64,18.76-30.88,41.23-30.88,50.99,0,101.98-.03,152.97.01,24.27.02,39.99,15.79,40.05,40.09.05,19.83.01,39.66.01,59.49,0,53.16,0,106.31,0,159.47,0,16.27-6.77,28.59-21.49,36.02-3.22,1.62-6.83,2.47-10.26,3.68H32c-11.8-2.81-21.57-8.56-27.4-19.6-1.9-3.61-3.09-7.59-4.6-11.4Z" />
                        <path d="M203,0c6.21,3.02,13.07,5.17,18.49,9.25,9.33,7.02,13.2,17.36,13.23,28.94.09,31.49.23,62.98-.04,94.47-.19,21.95-16.05,37.91-38,38.01-52.82.24-105.63.18-158.45.02-18.8-.06-32.66-11.3-37.31-29.39-.2-.79-.6-1.53-.91-2.3,0-36,0-72,0-108,.61-1.68,1.27-3.35,1.83-5.04C5.23,15.81,11.67,8.3,21.36,3.74c3.11-1.46,6.42-2.51,9.64-3.74,57.33,0,114.67,0,172,0Z" />
                        <path d="M309,512c-3.57-1.3-7.32-2.25-10.68-3.95-13.56-6.87-20.78-18.2-20.94-33.25-.33-32.16-.44-64.32.02-96.48.31-21.57,16.57-36.93,38.44-37.03,38.32-.17,76.65-.05,114.97-.05,13.66,0,27.33-.03,40.99,0,20.82.05,34.13,10.34,39.49,30.44.12.46.47.87.71,1.3v107c-2.61,5.82-4.56,12.07-7.99,17.35-5.52,8.48-14.46,12.28-24.01,14.65h-171Z" />
                      </svg>
                    )}
                    {pagesTab.value == "profile" && (
                      <svg
                        width="15px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M63.03,409.6c-4.64-.97-9.36-1.67-13.91-2.96-29.14-8.22-47.56-30.73-48.85-61.37-1.33-31.66,2.14-62.85,14.15-92.49,7.75-19.14,19.01-35.69,37.88-45.8,11.64-6.23,24.13-9.21,37.19-8.94,4.12.09,8.46,2.17,12.22,4.22,6.06,3.3,11.68,7.4,17.56,11.04,34.2,21.15,68.41,21.13,102.58-.08,4.75-2.95,9.59-5.79,14.05-9.13,8.18-6.14,17.18-6.91,26.89-5.48,26.52,3.9,45.25,18.46,57.88,41.67,11.27,20.73,16.35,43.23,18.61,66.43,1.16,11.91,1.71,23.94,1.56,35.9-.43,35.73-24.91,62.32-60.39,66.24-.88.1-1.73.49-2.6.75H63.03Z" />
                        <path d="M177.23,0c5.31,1.07,10.66,1.98,15.94,3.22,36.22,8.5,67.16,43.12,72.04,80.16,3.21,24.38-.33,47.42-14.07,68.04-18.26,27.39-43.52,43.33-76.93,45.59-43.87,2.97-79.96-22.88-96.34-57.97-15.39-32.96-9.16-76.86,14.96-104.18,14.8-16.77,32.64-28.32,54.72-32.82C151.29,1.27,155.09.68,158.86,0c6.12,0,12.25,0,18.37,0Z" />
                      </svg>
                    )}
                    {pagesTab.value == "orders" && (
                      <svg
                        width="15px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M366.8,64.68c-2.38-.6-4.96-.54-7.44-.54-83.87-.02-167.74-.02-251.62-.02-8.58,0-11.53-2.13-14.26-10.3-4.43-13.23-8.86-26.45-13.27-39.69C76.7,3.6,71.95.13,60.93.12c-13.5,0-27.01.31-40.5-.1C10.52-.28,3.48,3.07,0,12.66v6.74c3.25,9.48,9.98,13.3,19.86,12.8,7.48-.38,15-.08,22.5-.07,7.68,0,10.84,2.26,13.26,9.52,15.55,46.54,31.04,93.1,46.64,139.62,9.26,27.61,9.78,25.51,2.25,54.37-1.63,6.24-2,12.55-.62,18.89,4.37,19.96,20.71,33.01,41.52,33.02,62.87.03,125.75.01,188.62,0,1,0,2,0,3-.06,7.42-.44,13.67-6.05,14.71-13.17,1.14-7.81-2.94-15.14-10.22-17.54-2.65-.87-5.64-1-8.48-1.01-61.75-.05-123.5-.04-185.24-.04-1.5,0-3.01.07-4.5-.09-6.04-.66-9.33-5.16-8.03-11.05.72-3.28,1.64-6.52,2.48-9.78,2.36-9.26,4.72-11.08,14.39-11.08,55.12,0,110.25,0,165.37,0,10.34,0,15.22-3.56,18.52-13.43,8.41-25.15,16.83-50.3,25.23-75.46,5.44-16.3,10.9-32.59,16.26-48.92,3.17-9.66-1.48-18.93-10.71-21.26Z" />
                        <path d="M128.09,303.68c-17.69-.04-32,14.09-32.08,31.67-.08,17.7,14.34,32.14,32.08,32.11,17.62-.03,31.82-14.28,31.82-31.93,0-17.71-14.09-31.81-31.82-31.85Z" />
                        <path d="M320.08,303.68c-17.68-.03-31.99,14.1-32.07,31.67-.08,17.7,14.35,32.14,32.08,32.11,17.62-.03,31.82-14.29,31.81-31.93,0-17.7-14.1-31.81-31.83-31.85Z" />
                      </svg>
                    )}
                    {pagesTab.value == "wishlist" && (
                      <svg
                        width="17px"
                        viewBox="0 0 16 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.00893 1.94301C8.25673 1.6737 8.45526 1.43535 8.67664 1.22148C10.387 -0.426805 13.0628 -0.402322 14.7246 1.27189C16.3985 2.95834 16.4356 5.68748 14.7674 7.3977C12.6907 9.52701 10.5848 11.6268 8.48882 13.7374C8.13819 14.0902 7.85825 14.0881 7.50619 13.7331C5.4188 11.6311 3.32426 9.53637 1.25187 7.42002C-0.424185 5.70837 -0.410617 2.98786 1.25258 1.29349C2.92721 -0.413123 5.62304 -0.434006 7.35265 1.24885C7.56475 1.45479 7.76042 1.67874 8.00893 1.94301Z"></path>
                      </svg>
                    )}
                    {pagesTab.value == "wallet" && (
                      <svg
                        width="17px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 408.92 327.92"
                      >
                        <path d="M408.92,73.63c-6.33,17.45-20.84,26.19-36.29,33.63-24.58,11.84-50.86,17.94-77.61,22.42-35.52,5.96-71.31,8.01-107.25,6.94-42.57-1.27-84.71-6.03-125.49-19.11-18.64-5.98-36.71-13.32-51.34-27.07-14.53-13.66-14.46-30.4.09-44.1,10.96-10.32,24.11-16.89,37.91-22.21,26.49-10.23,54.1-15.78,82.18-19.42C160.6.9,190.19-.64,219.86.24c42.98,1.27,85.52,5.93,126.7,19.1,18.26,5.84,35.93,13.06,50.53,26.15,5.69,5.11,9.64,11.24,11.83,18.54v9.6Z" />
                        <path d="M408.92,264.03c-5.95,18.14-20.95,26.82-36.61,34.39-24.63,11.91-51.04,18.01-77.87,22.4-43.93,7.19-88.13,8.7-132.46,5.51-38.43-2.76-76.35-8.54-112.6-22.38-13.84-5.28-27.04-11.81-38.02-22.13-7.33-6.9-11.65-14.96-11.31-25.37.31-9.18.06-18.38.06-27.83.7.16,1.25.15,1.64.39,23.31,14.54,49.03,22.91,75.49,29.22,24.61,5.87,49.6,9.36,74.81,11.46,31.88,2.66,63.79,2.96,95.69.71,42.84-3.01,85.14-9.26,125.44-24.88,12.32-4.78,23.84-11.6,35.73-17.49v36Z" />
                        <path d="M408.92,166.43c-3.69,14.17-14.16,22.5-25.91,29.4-22.18,13.02-46.62,19.82-71.56,24.94-49.21,10.09-98.95,11.97-148.91,8.68-34.3-2.26-68.18-7.38-101-18.1-15.71-5.14-30.99-11.3-44.3-21.41-8.2-6.23-15.55-13.4-16.79-24.26-.79-6.98-.27-14.11-.32-21.17-.02-3.28,0-6.57,0-10.38,1.19.56,1.9.81,2.53,1.2,26.35,16.14,55.44,24.77,85.35,31.04,45.15,9.47,90.88,12.46,136.88,10.97,45.99-1.49,91.43-7.08,135.46-21.29,15.85-5.11,31.13-11.55,45.39-20.29.97-.6,2.13-.89,3.2-1.33v32Z" />
                      </svg>
                    )}
                    {pagesTab.value == "address" && (
                      <svg
                        width="18px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 345.16 344.43"
                      >
                        <path d="M345.12,68.45C345.08,29.96,315.17.08,276.65.05c-69.39-.06-138.77-.07-208.16,0C29.98.09.07,29.98.04,68.46-.03,137.7,0,206.94.07,276.18c0,4.22.31,8.51,1.11,12.64,6.43,33.03,33.8,55.54,67.52,55.59,34.63.05,69.26.01,103.89.01s69.26.05,103.89-.01c38.74-.06,68.61-29.9,68.64-68.62.05-69.11.06-138.23,0-207.34ZM240.79,188.66c-13.13,26.1-30.38,49.49-48.64,72.16-5.01,6.22-10.22,12.28-15.45,18.32-2.76,3.18-5.32,3.36-7.9.37-25.55-29.64-49.75-60.25-66.8-95.78-6.2-12.92-10.41-26.3-9.75-41,1.77-38.97,30.6-72.11,68.9-78.7,31.02-5.34,63.71,11.03,80.3,40.21,7.37,12.96,11.33,27.6,11.51,42.49.08,15.17-5.52,28.75-12.16,41.94Z" />
                        <path d="M172.71,106.54c-18.83-.13-34.35,15.39-34.25,34.25.1,18.83,15.29,33.88,34.16,33.85,18.89-.03,34.03-15.12,34.06-33.95.03-18.76-15.15-34.02-33.97-34.15Z" />
                      </svg>
                    )}
                    {pagesTab.value == "password" && (
                      <svg
                        width="16px"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 383.21"
                      >
                        <path d="M384,116.77v18.71c-.82,5.15-1.44,10.34-2.49,15.44-15.76,77-96.68,120.96-169.97,92.31-2.39-.93-3.74-.63-5.42,1.28-7.41,8.44-15.07,16.66-22.46,25.12-2.98,3.41-6.47,5.3-10.95,5.68-5.6.47-11.18,1.14-16.77,1.67-9.62.9-15.98,7.88-15.82,17.5.03,1.99.29,3.98.54,5.95,1.61,12.56-6.19,24.57-18.53,27.46-4.38,1.03-9.17.88-13.71.51-11.26-.92-18.49,4.4-20.29,15.56-.48,2.95-1.08,5.93-1.07,8.9.03,9.84-3.94,17.24-11.96,23.11-6.21,4.55-12.65,7.55-20.34,7.21-12.6-.56-25.2-1.24-37.79-2.11-7.93-.55-14.17-6.93-14.81-14.85-.39-4.84-.43-9.72-.76-14.57C1.01,345.97.47,340.28,0,334.6c0-3.74,0-7.49,0-11.23,1.56-5.55,3.52-10.84,7.57-15.2,11.46-12.35,22.67-24.95,34.24-37.19,30.72-32.5,62.94-63.46,96.64-92.88,2.33-2.03,2.76-3.67,1.6-6.63-7.9-20.13-10.28-40.93-7.44-62.4,6.57-49.67,43.31-91.73,91.81-104.5C232.22,2.51,240.3,1.49,248.25,0c6.25,0,12.5,0,18.75,0,.96.22,1.91.54,2.88.64,53.2,4.99,97.86,43.45,110.35,95.25,1.65,6.87,2.53,13.92,3.77,20.89ZM289.45,129.06c19.32.06,35.14-15.68,35.06-34.88-.08-19.09-15.76-34.75-34.83-34.8-19.33-.05-35.02,15.63-34.98,34.94.04,19.21,15.51,34.67,34.75,34.73Z" />
                      </svg>
                    )}
                    {pagesTab.label}
                  </button>
                </li>
              ))}
              <li className="">
                <div className="">
                  <a
                    // href={routs.login}
                    href="#"
                    onClick={handleSignOut}
                    className="flex items-center justify-start flex-1 gap-3 px-4 py-3 border hover:bg-red-100 basis-full"
                  >
                    <span className="text-red-600">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.50224 15.7537C7.50224 16.0247 7.50895 16.2465 7.5 16.4683C7.4597 17.5682 6.52164 18.2515 5.4806 17.9155C4.00075 17.4383 2.52761 16.9387 1.05448 16.4392C0.380597 16.2107 0 15.6641 0 14.9405C0 10.4892 0 6.03569 0.00223881 1.58218C0.00223881 0.627852 0.629104 0.00955666 1.59403 0.00731646C4.28731 0.00283606 6.98284 -0.00164434 9.67612 0.000595862C11.0104 0.00283606 11.9798 0.961641 12 2.29904C12.0112 2.99126 12.0067 3.68124 12 4.37347C11.9955 4.90439 11.6933 5.25162 11.2478 5.25162C10.8022 5.25386 10.4955 4.90663 10.491 4.37571C10.4843 3.69693 10.4933 3.0159 10.4888 2.33712C10.4843 1.79276 10.209 1.50153 9.67388 1.49705C8.72463 1.48585 7.77761 1.49481 6.82836 1.49481C6.72313 1.49481 6.61791 1.49481 6.46791 1.49481C6.51492 1.55081 6.53284 1.59114 6.56418 1.60682C7.24254 1.91597 7.51119 2.46481 7.51119 3.1884C7.50672 6.72791 7.50895 10.2674 7.50895 13.8069C7.50895 13.9436 7.50895 14.0802 7.50895 14.2415C8.32164 14.2415 9.09179 14.2662 9.8597 14.2303C10.2649 14.2124 10.4888 13.8898 10.491 13.4396C10.4978 12.5031 10.4955 11.5645 10.4933 10.6259C10.4933 10.2854 10.594 10.0008 10.9119 9.83507C11.3888 9.58865 11.9754 9.89332 11.9888 10.4511C12.0179 11.5511 12.0493 12.6577 11.9664 13.7532C11.8746 14.9494 10.9052 15.7447 9.69403 15.7514C8.97537 15.7559 8.26343 15.7537 7.50224 15.7537Z"></path>
                        <path d="M13.4942 6.75005C13.4942 6.02423 13.5009 5.33425 13.492 4.64651C13.4875 4.27463 13.5927 3.96997 13.9532 3.81539C14.3136 3.66082 14.6046 3.79523 14.8688 4.06181C15.8002 5.0027 16.7405 5.93462 17.674 6.87326C18.1061 7.30786 18.1129 7.69094 17.6897 8.11882C16.7494 9.06642 15.8024 10.0073 14.8599 10.9549C14.6091 11.2058 14.327 11.3402 13.9755 11.1946C13.6129 11.0445 13.492 10.7533 13.4964 10.3769C13.5032 9.68695 13.4987 8.99473 13.4987 8.24875C13.3576 8.24875 13.2345 8.24875 13.1114 8.24875C12.2808 8.24875 11.4479 8.25099 10.6173 8.24651C10.0711 8.24427 9.75315 7.962 9.75987 7.4938C9.76435 7.03456 10.0912 6.75453 10.6352 6.75229C11.5666 6.75005 12.5024 6.75005 13.4942 6.75005Z"></path>
                      </svg>
                    </span>
                    Sign Out
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* <!-- tabs --> */}
          <div id="default-tab-content" className="flex-1 xl:border-l">
            <Component />
          </div>
        </div>
      </section>

      {/* <!-- add address modal start --> */}

      <div
        id="add-address"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full p-4">
          {/* <!-- Modal content --> */}
          <div className="relative !bg-white shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 !dark:border-gray-600">
              <h3 className="text-lg font-semibold !text-gray-900 dark:text-white">
                Add New Address
              </h3>
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="add-address"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type your name"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type address"
                  />
                </div>

                <div className="col-span-3 sm:col-span-1 md:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    id="category"
                    className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select Country</option>
                    <option value="uae">UAE</option>
                    <option value="france">France</option>
                    <option value="canada">Canada</option>
                    <option value="china">China</option>
                    <option value="brazil">Brazil</option>
                  </select>
                </div>

                <div className="col-span-3 sm:col-span-1 md:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <select
                    id="category"
                    className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select city</option>
                    <option value="dubai">Dubai</option>
                    <option value="abu-dhabi">Abu Dhabi</option>
                    <option value="sharjah">Sharjah</option>
                    <option value="ajman">Ajman</option>
                  </select>
                </div>

                <div className="col-span-3 sm:col-span-1 md:col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type street name"
                  />
                </div>

                <div className="grid grid-cols-2 col-span-3 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                    >
                      Emirate
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Emirate"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                    >
                      Zip
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type zip code"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- modal footer --> */}
              <div className="flex items-end justify-between pt-4 space-x-4 border-t action-area">
                <button
                  type="button"
                  className="text-base h-[50px] px-4 hover:bg-gray-200 duration-200 border border-gray-300 font-normal text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-normal flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
                >
                  <svg
                    className="w-5 h-5 me-1 -ms-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add new address
                </button>
              </div>
              {/* <!-- <button
                    className="font-normal flex gap-2 items-center text-base h-[50px] mt-4 text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2">
                    <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Add new product
                </button> --> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- add address modal end --> */}
    </div>
  );
}
