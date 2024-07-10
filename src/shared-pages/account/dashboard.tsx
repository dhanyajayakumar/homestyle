import React, { FC } from "react";

const AccountDashbord: FC = () => {
  return (
    <div
      className="xl:pl-8 !bg-white dark:bg-gray-800"
      id="dashboard"
      role="tabpanel"
      aria-labelledby="dashboard-tab"
    >
      <div className="w-full item-body">
        <div className="w-full">
          <div className="mb-6">
            <p className="text-base text-qblack">Hello, Jane</p>
            <h1 className="text-xl font-bold text-qblack">
              Welcome to your Profile
            </h1>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="flex flex-wrap items-center w-full gap-4 mt-3 quick-view-grid ">
            {/* <!-- total orders --> */}
            <div className="flex-1 min-w-[200px] h-[208px] bg-[#FEF1DE] group hover:bg-[#fbdeb5] transition-all duration-300 ease-in-out p-6">
              <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center shadow-md">
                <span>
                  <svg
                    height="30px"
                    width="30px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_6948578"
                  >
                    <g id="shopping_bag_check">
                      <path d="m17 7v-1c0-2.7568359-2.2431641-5-5-5s-5 2.2431641-5 5v1h-6v20c0 2.2099609 1.7900391 4 4 4h10.6801758c-.8100586-.5703125-1.5400391-1.2402344-2.1704102-2h-8.5097656c-1.1000977 0-2-.9003906-2-2v-18h4v2h2v-2h6v2h2v-2h4v2.0498047c.3300781-.0302734.6601563-.0498047 1-.0498047s.6699219.0195313 1 .0498047v-4.0498047zm-8 0v-1c0-1.6542969 1.3457031-3 3-3s3 1.3457031 3 3v1zm13 24c-4.9628906 0-9-4.0371094-9-9s4.0371094-9 9-9 9 4.0371094 9 9-4.0371094 9-9 9zm0-16c-3.859375 0-7 3.140625-7 7s3.140625 7 7 7 7-3.140625 7-7-3.140625-7-7-7zm-1 10.4140625-3.4140625-3.4140625 1.4140625-1.4140625 2 2 4-4 1.4140625 1.4140625z"></path>
                    </g>
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-base text-black duration-300">
                Total Orders
              </p>
              <span className="text-[48px] text-[#F89D1B] group-hover:text-[#d77e00] duration-300 font-medium leading-none mt-1 block">
                12
              </span>
            </div>

            {/* <!-- pending orders --> */}
            <div className="flex-1  min-w-[200px] h-[208px] bg-[#FEF1DE] group hover:bg-[#fbdeb5] transition-all duration-300 ease-in-out p-6">
              <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center shadow-md">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-base text-black duration-300">
                Pending Orders
              </p>
              <span className="text-[48px] text-[#F89D1B] group-hover:text-[#d77e00] duration-300 font-medium leading-none mt-1 block">
                0
              </span>
            </div>

            {/* <!-- processing order --> */}
            <div className="flex-1  min-w-[200px] h-[208px] bg-[#FEF1DE] group hover:bg-[#fbdeb5] transition-all duration-300 ease-in-out p-6">
              <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center shadow-md">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-base text-black duration-300">
                Processing Orders
              </p>
              <span className="text-[48px] text-[#F89D1B] group-hover:text-[#d77e00] duration-300 font-medium leading-none mt-1 block">
                1
              </span>
            </div>

            {/* <!-- complete order --> */}
            <div className="flex-1  min-w-[200px] h-[208px] bg-[#FEF1DE] group hover:bg-[#fbdeb5] transition-all duration-300 ease-in-out p-6">
              <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center shadow-md">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-base text-black duration-300">
                Completed Orders
              </p>
              <span className="text-[48px] text-[#F89D1B] group-hover:text-[#d77e00] duration-300 font-medium leading-none mt-1 block">
                11
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-10 mt-3 bg-gray-100 p-7 dashboard-info py-7">
            <div className="min-w-[120px] md:min-w-[400px]">
              <p className="text-base font-medium title">
                Personal Information
              </p>
              <div className="mt-5">
                <table>
                  <tbody>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Name :</div>
                      </td>
                      <td className="text-base text-black">Alice Johnson</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Email :</div>
                      </td>
                      <td className="text-base text-black">
                        alice.johnson@example.com
                      </td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Phone :</div>
                      </td>
                      <td className="text-base text-black">055 321 7654</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>City :</div>
                      </td>
                      <td className="text-base text-black">Dubai</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Zip :</div>
                      </td>
                      <td className="text-base text-black">66002</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="min-w-[120px] md:min-w-[400px]">
              <p className="text-base font-medium title">Shipping Address</p>
              <div className="mt-5">
                <table>
                  <tbody>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Name :</div>
                      </td>
                      <td className="text-base text-black">Alice Johnson</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Email :</div>
                      </td>
                      <td className="text-base text-black">
                        alice.johnson@example.com
                      </td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Phone :</div>
                      </td>
                      <td className="text-base text-black">055 321 7654</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap mb-4 sm:mb-2 sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>City :</div>
                      </td>
                      <td className="text-base text-black">Dubai</td>
                    </tr>
                    <tr className="flex flex-col flex-wrap sm:flex-row">
                      <td className="text-sm w-[100px]">
                        <div>Zip :</div>
                      </td>
                      <td className="text-base text-black">66002</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashbord;
