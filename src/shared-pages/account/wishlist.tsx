import React from "react";

function AccountWishlist() {
  return (
    <div
      className=" xl:pl-8 !bg-white dark:bg-gray-800"
      id="wishlist"
      role="tabpanel"
      aria-labelledby="wishlist-tab"
    >
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black">
        Wishlist
      </h1>

      {/* <!-- table area --> */}

      <div className="wishlist-wrapper relative !overflow-x-auto !block">
        <table className="w-full text-sm text-left text-gray-500 table-auto dark:text-gray-400 text-nowrap">
          <thead className="text-xs text-gray-700 uppercase !bg-[#F4F4F4] dark:bg-gray-700 !dark:text-[#603813]">
            <tr>
              <th scope="col" className="px-6 py-3">
                product
              </th>
              <th scope="col" className="px-6 py-3 text-center text-nowrap">
                stock status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                total
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 ">
                <div className="flex items-center space-x-6">
                  <div className="w-[70px] h-[70px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                    <img
                      src="/images/w2.png"
                      alt="product"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-base font-medium text-black">
                      Phantom Perch
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-[15px] font-normal text-green-500 text-nowrap">
                  In Stock(23)
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 800
                  </span>
                </div>
              </td>
              <td className="py-4 ">
                <div className="flex items-center justify-center">
                  <form className="">
                    <div className="relative flex items-center max-w-[9rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="qty-1"
                        className="h-10 p-3 px-4 bg-white border border-r-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="qty-1"
                        data-input-counter=""
                        aria-describedby="helper-text-explanation"
                        className="bg-white border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="qty-1"
                        className="h-10 p-3 px-4 bg-white border border-l-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 800
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span>
                    <svg
                      width="14px"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 180.38 227.2"
                    >
                      <path
                        d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                        // style="fill:black"
                      />
                      <path
                        className="fill-current"
                        d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                        // style="fill: black;"
                      />
                    </svg>
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6  py-4  w-[380px]">
                <div className="flex items-center space-x-6">
                  <div className="w-[70px] h-[70px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                    <img
                      src="/images/w3.png"
                      alt="product"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-base font-medium text-black">
                      Cuddle Couch
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-[15px] font-normal text-green-500 text-nowrap">
                  In Stock(23)
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 1400
                  </span>
                </div>
              </td>
              <td className="py-4 ">
                <div className="flex items-center justify-center">
                  <form className="">
                    <div className="relative flex items-center max-w-[9rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="qty-2"
                        className="h-10 p-3 px-4 bg-white border border-r-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="qty-2"
                        data-input-counter=""
                        aria-describedby="helper-text-explanation"
                        className="bg-white border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="qty-2"
                        className="h-10 p-3 px-4 bg-white border border-l-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 1400
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span>
                    <svg
                      width="14px"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 180.38 227.2"
                    >
                      <path
                        d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                        // style="fill:black"
                      />
                      <path
                        className="fill-current"
                        d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                        // style="fill: black;"
                      />
                    </svg>
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4  w-[380px]">
                <div className="flex items-center space-x-6">
                  <div className="w-[70px] h-[70px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                    <img
                      src="/images/w4.png"
                      alt="product"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-base font-medium text-black">
                      Decoy Chair
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-[15px] text-green-500 font-normal text-nowrap">
                  In Stock(23)
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 600
                  </span>
                </div>
              </td>
              <td className="py-4 ">
                <div className="flex items-center justify-center">
                  <form className="">
                    <div className="relative flex items-center max-w-[9rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="qty-3"
                        className="h-10 p-3 px-4 bg-white border border-r-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="qty-3"
                        data-input-counter=""
                        aria-describedby="helper-text-explanation"
                        className="bg-white border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="qty-3"
                        className="h-10 p-3 px-4 bg-white border border-l-0 border-gray-300 hover:bg-gray-200 focus:outline-none"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-normal text-black text-nowrap">
                    AED 600
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center space-x-1">
                  <span>
                    <svg
                      width="14px"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 180.38 227.2"
                    >
                      <path
                        d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                        // style="fill:black"
                      />
                      <path
                        className="fill-current"
                        d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                        // style="fill: black;"
                      />
                    </svg>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      
    </div>
  );
}

export default AccountWishlist;
