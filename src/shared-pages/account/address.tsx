import React from "react";

function AccountAddress() {
  return (
    <div
      className=" xl:pl-8 !bg-white dark:bg-gray-800"
      id="contacts"
      role="tabpanel"
      aria-labelledby="contacts-tab"
    >
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black">
        Address List
      </h1>

      <div className="w-full item-body dashboard-wrapper">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* <!-- address --> */}
          <div className="flex-1 duration-150 border hover:shadow-lg">
            <div className="flex items-center justify-between border-b">
              <p className="flex items-center gap-2 pl-3 text-base font-medium text-nowrap">
                <svg
                  width="18px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 359.31 409.6"
                >
                  <path
                    d="M187.74,0c9.63,1.8,19.46,2.9,28.86,5.54,26.51,7.45,48.3,22.4,65.64,43.76,12.87,15.85,21.65,33.83,25.95,53.8,7.51,34.89,2.51,68-16.57,98.23-32.96,52.23-66.53,104.07-99.84,156.08-.5.78-.99,1.58-1.52,2.35-5.73,8.33-15.44,8.38-21.02-.07-6.23-9.44-12.23-19.04-18.33-28.57-27.47-42.94-55.08-85.8-82.37-128.86-17.91-28.27-24.2-59.16-18.54-92.19C59.34,55.69,99.25,14.33,153.29,2.72,159.36,1.41,165.6.89,171.77,0,177.09,0,182.41,0,187.74,0ZM239.62,131.85c-.09-33.02-27.18-59.99-60.12-59.84-32.81.15-59.59,27.08-59.62,59.94-.03,33.01,26.98,60.07,59.92,60.04,32.95-.03,59.91-27.13,59.82-60.14Z"
                    // style="fill: #000; stroke-width: 0px;"
                  />
                </svg>
                Address #1
              </p>
              <button
                type="button"
                className="w-[50px] h-[50px] flex justify-center items-center duration-200 bg-red-50 hover:bg-red-200"
              >
                <svg
                  width="14px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180.38 227.2"
                >
                  <path
                    d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                    // style="fill:red"
                  />
                  <path
                    className="fill-current"
                    d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                    // style="fill: red;"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-[#F4F4F4]">
              <table>
                <tbody>
                  <tr className="">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Name :</div>
                    </td>
                    <td className="text-base text-black">Ahmed Al-Farsi</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Address Line 1 :</div>
                    </td>
                    <td className="text-base text-black">
                      Building 12, Apartment 4B
                    </td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Street :</div>
                    </td>
                    <td className="text-base text-black">Al Wasl Road</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>City :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Emirate :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Zip :</div>
                    </td>
                    <td className="text-base text-black">00000</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Country :</div>
                    </td>
                    <td className="text-base text-black">UAE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <!-- address 2 --> */}
          <div className="flex-1 duration-150 border hover:shadow-lg">
            <div className="flex items-center justify-between border-b">
              <p className="flex items-center gap-2 pl-3 text-base font-medium text-nowrap">
                <svg
                  width="18px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 359.31 409.6"
                >
                  <path
                    d="M187.74,0c9.63,1.8,19.46,2.9,28.86,5.54,26.51,7.45,48.3,22.4,65.64,43.76,12.87,15.85,21.65,33.83,25.95,53.8,7.51,34.89,2.51,68-16.57,98.23-32.96,52.23-66.53,104.07-99.84,156.08-.5.78-.99,1.58-1.52,2.35-5.73,8.33-15.44,8.38-21.02-.07-6.23-9.44-12.23-19.04-18.33-28.57-27.47-42.94-55.08-85.8-82.37-128.86-17.91-28.27-24.2-59.16-18.54-92.19C59.34,55.69,99.25,14.33,153.29,2.72,159.36,1.41,165.6.89,171.77,0,177.09,0,182.41,0,187.74,0ZM239.62,131.85c-.09-33.02-27.18-59.99-60.12-59.84-32.81.15-59.59,27.08-59.62,59.94-.03,33.01,26.98,60.07,59.92,60.04,32.95-.03,59.91-27.13,59.82-60.14Z"
                    // style="fill: #000; stroke-width: 0px;"
                  />
                </svg>
                Address #2
              </p>
              <button
                type="button"
                className="w-[50px] h-[50px] flex justify-center items-center duration-200 bg-red-50 hover:bg-red-200"
              >
                <svg
                  width="14px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180.38 227.2"
                >
                  <path
                    d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                    // style="fill:red"
                  />
                  <path
                    className="fill-current"
                    d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                    // style="fill: red;"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-[#F4F4F4]">
              <table>
                <tbody>
                  <tr className="">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Name :</div>
                    </td>
                    <td className="text-base text-black">Ahmed Al-Farsi</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Address Line 1 :</div>
                    </td>
                    <td className="text-base text-black">
                      Building 12, Apartment 4B
                    </td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Street :</div>
                    </td>
                    <td className="text-base text-black">Al Wasl Road</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>City :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Emirate :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Zip :</div>
                    </td>
                    <td className="text-base text-black">00000</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Country :</div>
                    </td>
                    <td className="text-base text-black">UAE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <!-- address 3 --> */}
          <div className="flex-1 duration-150 border hover:shadow-lg">
            <div className="flex items-center justify-between border-b">
              <p className="flex items-center gap-2 pl-3 text-base font-medium text-nowrap">
                <svg
                  width="18px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 359.31 409.6"
                >
                  <path
                    d="M187.74,0c9.63,1.8,19.46,2.9,28.86,5.54,26.51,7.45,48.3,22.4,65.64,43.76,12.87,15.85,21.65,33.83,25.95,53.8,7.51,34.89,2.51,68-16.57,98.23-32.96,52.23-66.53,104.07-99.84,156.08-.5.78-.99,1.58-1.52,2.35-5.73,8.33-15.44,8.38-21.02-.07-6.23-9.44-12.23-19.04-18.33-28.57-27.47-42.94-55.08-85.8-82.37-128.86-17.91-28.27-24.2-59.16-18.54-92.19C59.34,55.69,99.25,14.33,153.29,2.72,159.36,1.41,165.6.89,171.77,0,177.09,0,182.41,0,187.74,0ZM239.62,131.85c-.09-33.02-27.18-59.99-60.12-59.84-32.81.15-59.59,27.08-59.62,59.94-.03,33.01,26.98,60.07,59.92,60.04,32.95-.03,59.91-27.13,59.82-60.14Z"
                    // style="fill: #000; stroke-width: 0px;"
                  />
                </svg>
                Address #2
              </p>
              <button
                type="button"
                className="w-[50px] h-[50px] flex justify-center items-center duration-200 bg-red-50 hover:bg-red-200"
              >
                <svg
                  width="14px"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180.38 227.2"
                >
                  <path
                    d="M11.92,90.41h156.58c-1.9,45.64-3.8,91.11-5.7,136.79H17.62c-1.9-45.52-3.8-91.07-5.7-136.79ZM50.32,195.7c5.99-.26,11.59-.51,17.47-.77-1.14-27.29-2.26-54.35-3.37-81.08h-17.51c1.15,27.54,2.27,54.53,3.41,81.85ZM130.12,195.21c1.12-26.93,2.24-53.93,3.38-81.42h-17.51c-1.12,26.87-2.24,53.92-3.38,81.42h17.5ZM81.61,113.74v81.32h17.2v-81.32h-17.2Z"
                    // style="fill:red"
                  />
                  <path
                    className="fill-current"
                    d="M180.38,72.62H0v-37.68h46.39V0h87.44v34.76h46.56v37.86ZM64.08,34.67h52.17v-17.18h-52.17v17.18Z"
                    // style="fill: red;"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-[#F4F4F4]">
              <table>
                <tbody>
                  <tr className="">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Name :</div>
                    </td>
                    <td className="text-base text-black">Ahmed Al-Farsi</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Address Line 1 :</div>
                    </td>
                    <td className="text-base text-black">
                      Building 12, Apartment 4B
                    </td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Street :</div>
                    </td>
                    <td className="text-base text-black">Al Wasl Road</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>City :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Emirate :</div>
                    </td>
                    <td className="text-base text-black">Dubai</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Zip :</div>
                    </td>
                    <td className="text-base text-black">00000</td>
                  </tr>
                  <tr className="mb-5">
                    <td className="text-sm w-[150px] mb-5">
                      <div>Country :</div>
                    </td>
                    <td className="text-base text-black">UAE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!-- add address button --> */}
        <button
          // href="#"
          className="font-normal flex gap-2 items-center text-base h-[50px] mt-4 text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
          type="button"
          data-modal-target="add-address"
          data-modal-toggle="add-address"
        >
          <svg
            width="14px"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 252 252.04"
          >
            <path
              d="M148.73,0c-.03.82-.09,1.64-.09,2.46,0,31.52,0,63.04,0,94.56,0,5.27,1.24,6.51,6.52,6.51,31.27,0,62.54,0,93.81,0,.97,0,1.93,0,3.04,0v45.13h-3.04c-31.27,0-62.54,0-93.81.01-1.22,0-2.54-.08-3.64.34-2.56.97-2.9,3.21-2.89,5.67.04,21.67.02,43.34.02,65.01,0,9.85,0,19.7,0,29.55v2.79h-45.12v-3.04c0-31.03,0-62.06,0-93.09,0-.82.02-1.64-.02-2.46-.15-3.05-1.73-4.7-4.77-4.77-3.86-.08-7.71-.03-11.57-.03-28.07,0-56.14,0-84.21,0-.98,0-1.97.06-2.95.09v-45.32c.82.03,1.64.09,2.46.09,31.51,0,63.03,0,94.54,0,5.28,0,6.51-1.24,6.52-6.52,0-31.52,0-63.04,0-94.56,0-.82-.06-1.64-.09-2.46C118.52,0,133.62,0,148.73,0Z"
              // style="fill: white; stroke-width: 0px;"
            />
          </svg>
          Add New Address
        </button>
      </div>
    </div>
  );
}

export default AccountAddress;
