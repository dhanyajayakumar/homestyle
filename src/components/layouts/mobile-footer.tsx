"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Drawer } from "@mui/material";
import Endpoints from "@/lib/endpoints";
import BaseUrl from "@/lib/url";

export default function MobileFooter() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const fetchData = async () => {
    try {
      const response = await BaseUrl.get(
        `${Endpoints.getMenu}?block=menu&blockReference=desktop-menu`
      );
      if (response.data.status) {
        setData(response.data.requestedData);
        console.log(
          "the mobile data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the mobile data - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleToggle = (id: string) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderSubMenu = (subMenu: any, parentId: string) => {
    return (
      <ul className={`pl-4 ${expandedItems[parentId] ? "block" : "hidden"}`}>
        {subMenu?.map((subValue: any) => (
          <li key={subValue.id}>
            <div
              className="flex items-center justify-between w-full p-2 text-base text-gray-900 transition duration-75 rounded-0 group hover:bg-gray-100"
              onClick={() => handleToggle(subValue.id)}
            >
              <span className="flex-1 ms-3 text-left font-bold mukta-medium whitespace-nowrap">
                {subValue.menuTitle}
              </span>

              {subValue.children && subValue.id !== "specific-child-id" && (
                <svg
                  className="w-3 h-3"
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
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              )}
            </div>
            {subValue.children && renderSubMenu(subValue.children, subValue.id)}
          </li>
        ))}
      </ul>
    );
  };

  const DrawerList = (
    <div className=" w-full flex flex-col h-full">
      <div className="sticky top-0 z-20 w-full flex justify-between items-center relative px-5 py-4 bg-[#FFF1DE]">
        <a className="mr-1" href="index.html">
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

        <Button
          className="w-2 justify-end"
          onClick={toggleDrawer(false)}
          style={{ color: "white" }}
        >
          <svg
            className="w-4 h-4 text-[#000]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            ></path>
          </svg>
        </Button>
      </div>
      <nav className="flex flex-col  w-full h-full items-start space-y-2 lg:space-y-5">
        <h3 className="bg-gray-200 w-full text-lg m-0 text-heading font-semibold flex align-center border-b px-4 py-2">
          Categories
        </h3>

        {data?.blockValues?.map((value: any) => (
          <div className="w-full" key={value.id}>
            <div
              className="flex items-center justify-between w-full p-2 text-base text-gray-900 transition duration-75 rounded-0 group hover:bg-gray-100"
              onClick={() => handleToggle(value.id)}
            >
              <span className="flex-1 text-left font-bold mukta-medium whitespace-nowrap">
                {value.menuTitle}
              </span>
              {value.children && value.id !== "specific-child-id" && (
                <svg
                  className="w-3 h-3"
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
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              )}
            </div>
            {value.children && renderSubMenu(value.children, value.id)}
          </div>
        ))}

        <h3 className=" bg-gray-200 w-full text-lg m-0 text-heading font-semibold flex align-center border-b px-4 py-2">
          Pages
        </h3>
      </nav>

      <div className="overflow-y-scroll flex-grow w-full max-h-full">
        <a href="/checkout">
          <button className="w-full py-3 px-3 w-full bg-primary flex items-center justify-between bg-heading text-sm text-white focus:outline-none transition duration-300">
            <span className="align-middle font-medium ">
              HomeStyle © 2024 All Rights Reserved
            </span>
          </button>
        </a>
      </div>
    </div>
  );

  return (
    <Fragment>
      <footer className="fixed bottom-0 z-30 flex items-center justify-between w-full h-16 px-[10px] bg-white shadow-[0_35px_60px_-5px_rgba(0,0,0,0.5)] lg:hidden sm:px-20">
        <button
          onClick={toggleDrawer(true)}
          className="relative flex items-center justify-center flex-1 flex-shrink-0 h-full focus:outline-none"
        >
          <a className="text-xl text-gray-800">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 drop-shadow-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </a>
        </button>

        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            style: {
              width: "100%",
            },
          }}
        >
          {DrawerList}
        </Drawer>

        {/* <button className="inline-flex items-center justify-center flex-1 h-full">
          <a
            className="text-xl text-gray-700"
            rel="noreferrer"
            aria-label="Home"
            href="/"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 drop-shadow-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </a>
        </button> */}

        <button className="inline-flex items-center justify-center flex-1 h-full">
          <a
            className="text-xl text-gray-700"
            rel="noreferrer"
            aria-label="Home"
            href="/"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 drop-shadow-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </a>
        </button>

        <button className="relative inline-flex items-center justify-center flex-1 h-full text-lg w-9 whitespace-nowrap">
          <a href="cart.html" className="relative text-gray-800 w-fit">
            <span className="absolute right-0 z-10 inline-flex items-center justify-center w-5 h-5 p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 rounded-full bg-primary -top-2">
              0
            </span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 drop-shadow-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </a>
        </button>

        <button
          aria-label="User"
          type="button"
          className="inline-flex items-center justify-center flex-1 h-full text-xl indicator"
        >
          <a className="text-gray" href="my-account.html">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 drop-shadow-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
        </button>
      </footer>
    </Fragment>
  );
}
