import React from "react";

function AccountProfile() {
  return (
    <div
      className=" xl:pl-8 !bg-white dark:bg-gray-800"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black">
        Profile Details
      </h1>

      <div className="relative flex flex-col gap-10 xl:flex-row lg:flex-col">
        <img
          className="absolute my-auto top-0 bottom-0 right-[8%] h-[350px] hidden sm:hidden md:block"
          src="/images/password-page.png"
          alt=""
        />
        <div className="w-2/2 sm:w-2/2 md:w-1/2">
          <div className="input-item flex space-x-2.5 mb-5">
            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-gray text-[13px] font-normal">
                  First Name*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper !border-gray-300 !dark:border-gray-400">
                  <input
                    placeholder="First Name"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>

            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Last Name*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder="Last Name"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="input-item flex space-x-2.5 mb-5">
            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Email*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder="demoemial@gmail.com"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="email"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Phone Number*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder="000 000 0000"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 input-item">
            <div className="w-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Country*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder="United Arab Emirates"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 input-item">
            <div className="w-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Address*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder="Type your address here"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="input-item flex space-x-2.5 mb-5">
            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Town / City*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder=""
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full">
              <div className="w-full h-full input-com">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Postcode / ZIP*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                  <input
                    placeholder=""
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- action buttons --> */}

          <div className="flex items-center space-x-4 action-area">
            <button
              type="button"
              className="text-base h-[50px] px-4 hover:bg-gray-200 duration-200 border border-gray-300 font-normal text-black"
            >
              Cancel
            </button>
            <button
              type="button"
              className="font-normal flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
            >
              Update profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
