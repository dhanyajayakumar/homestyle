import React from "react";

export default function TopBar({}) {
  return (
    // <div className="hidden lg:block bg-[#F4F4F4] !z-80 top-bar relative">
    //   <div className="px-1 mx-auto sm:px-5">
    //     <div className="flex items-center justify-between py-2 text-sm text-gray-700 mukta-medium">
    //       <div className="flex gap-4">
    //         <a className="flex font-semibold" href="">
    //           <img
    //             className="mr-2"
    //             src="/images/top-bar-call-icon.svg"
    //             alt=""
    //           />
    //           971 56 991 0280
    //         </a>
    //         <a className="flex font-semibold" href="">
    //           <img
    //             className="mr-2"
    //             src="/images/top-bar-mail-icon.svg"
    //             alt=""
    //           />
    //           wecare@homestyleuae.com
    //         </a>
    //       </div>

    //       <div className="flex items-center gap-5 lg:text-right navBar">
    //         <ul className="flex gap-2 text-sm">
    //           <li className="flex items-center mr-3 transition duration-500 ease-in-out">
    //             <a
    //               aria-label="Social Link"
    //               rel="noreferrer"
    //               target="_blank"
    //               className="block mx-auto text-center text-gray-500 hover:text-white"
    //               href="https://web.whatsapp.com/"
    //             >
    //               <img src="/images/top-bar-social-1.svg" alt="" />
    //             </a>
    //           </li>

    //           <li className="flex items-center mr-3 transition duration-500 ease-in-out">
    //             <a
    //               aria-label="Social Link"
    //               rel="noreferrer"
    //               target="_blank"
    //               className="block mx-auto text-center text-gray-500 hover:text-white"
    //               href="https://www.facebook.com/"
    //             >
    //               <img src="/images/top-bar-social-2.svg" alt="" />
    //             </a>
    //           </li>

    //           <li className="flex items-center mr-3 transition duration-500 ease-in-out">
    //             <a
    //               aria-label="Social Link"
    //               rel="noreferrer"
    //               target="_blank"
    //               className="block mx-auto text-center text-gray-500 hover:text-white"
    //               href="https://twitter.com/"
    //             >
    //               <img src="/images/top-bar-social-3.svg" alt="" />
    //             </a>
    //           </li>

    //           <li className="flex items-center mr-3 transition duration-500 ease-in-out">
    //             <a
    //               aria-label="Social Link"
    //               rel="noreferrer"
    //               target="_blank"
    //               className="block mx-auto text-center text-gray-500 hover:text-white"
    //               href="https://www.twitter.com/"
    //             >
    //               <img src="/images/top-bar-social-4.svg" alt="" />
    //             </a>
    //           </li>
    //         </ul>

    //         <div className="relative inline-flex hs-dropdown">
    //           <button
    //             id="hs-dropdown-default"
    //             type="button"
    //             className="inline-flex items-center text-sm text-gray-800 bg-transparent rounded-lg hs-dropdown-toggle gap-x-2 mukta-medium hover:bg-transparent disabled:opacity-50 disabled:pointer-events-none"
    //           >
    //             <img src="/images/top-bar-location-icon.svg" alt="" />
    //             Delivery to Your location
    //             <svg
    //               className="hs-dropdown-open:rotate-180 size-4"
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               stroke-width="2"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //             >
    //               <path d="m6 9 6 6 6-6" />
    //             </svg>
    //           </button>

    //           <div
    //             className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
    //             aria-labelledby="hs-dropdown-default"
    //           >
    //             <a
    //               className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
    //               href="#"
    //             ></a>
    //             <a
    //               className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
    //               href="#"
    //             ></a>
    //             <a
    //               className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
    //               href="#"
    //             ></a>
    //             <a
    //               className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
    //               href="#"
    //             ></a>
    //           </div>
    //         </div>

    //         <a className="capitalize" href="">
    //           Download Our Apps
    //         </a>
    //         <a className="capitalize" href="">
    //           store location
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="hidden lg:block bg-[#F4F4F4]">
      <div className="px-1 mx-auto sm:px-5">
        <div className="flex items-center justify-between py-2 text-sm text-gray-700 mukta-medium">
          <div className="flex gap-5">
            <a className="flex font-semibold hover:underline" href="">
              <img
                className="mr-2"
                src="/images/top-bar-call-icon.svg"
                alt=""
              />
              971 56 991 0280
            </a>
            <a className="flex font-semibold hover:underline" href="">
              <img className="mr-2" src="/images/top-bar-social-1.svg" alt="" />
              971 56 991 0280
            </a>
            <a className="flex font-semibold hover:underline" href="">
              <img
                className="mr-2"
                src="/images/top-bar-mail-icon.svg"
                alt=""
              />
              wecare@homestyleuae.com
            </a>
          </div>

          <div className="flex items-center gap-5 lg:text-right navBar">
            <div className="free-delivery">
              <a
                className="capitalize"
                href=""
                data-tooltip-target="tooltip-bottom"
                data-tooltip-placement="bottom"
              >
                Free Delivery
              </a>
              <div
                id="tooltip-bottom"
                role="tooltip"
                className="absolute invisible inline-block px-2 py-1 text-sm font-medium text-white bg-gray-950 rounded-lg shadow-sm opacity-0 z-[999] tooltip dark:bg-gray-700"
              >
                Order above AED 200
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>

            <a className="capitalize" href="">
              Download Our Apps
            </a>
            <a className="capitalize" href="">
              store locator
            </a>
            <a className="capitalize" href="contact.html">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
