import React from "react";

function AccountPassword() {
  return (
    <div
      className=" xl:pl-8 !bg-white dark:bg-gray-800"
      id="password"
      role="tabpanel"
      aria-labelledby="password-tab"
    >
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black">
        Change Password
      </h1>
      <div className="relative">
        <img
          className="absolute top-0 bottom-0 right-[8%] h-[350px] hidden sm:hidden md:block"
          src="/images/password-page.png"
          alt=""
        />
        <div className="h-full mb-5 w-2/2 sm:w-2/2 md:w-1/2">
          <div className="w-full h-full input-com">
            <label className="input-label capitalize block  mb-2 text-gray text-[13px] font-normal">
              Email Address
            </label>
            <div className="relative w-full h-full overflow-hidden border input-wrapper !border-gray-300 !dark:border-gray-400">
              <input
                value="janedoe@gmail.com"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="h-full mb-5 w-2/2 sm:w-2/2 md:w-1/2">
          <div className="w-full h-full input-com">
            <label className="input-label capitalize block  mb-2 text-gray text-[13px] font-normal">
              Password
            </label>
            <div className="relative w-full h-full overflow-hidden border input-wrapper !border-gray-300 !dark:border-gray-400">
              <input
                placeholder="Current Password"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                type="text"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="h-full mb-5 w-2/2 sm:w-2/2 md:w-1/2">
          <div className="w-full h-full input-com">
            <label className="input-label capitalize block  mb-2 text-gray text-[13px] font-normal">
              New Password
            </label>
            <div className="relative w-full h-full overflow-hidden border input-wrapper !border-gray-300 !dark:border-gray-400">
              <input
                placeholder="New Password"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                type="text"
                value=""
              />
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
  );
}

export default AccountPassword;
