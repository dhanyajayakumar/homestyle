import React from "react";

function AccountWallet() {
  return (
    <div
      className=" xl:pl-8 !bg-white dark:bg-gray-800"
      id="wallet"
      role="tabpanel"
      aria-labelledby="wallet-tab"
    >
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black capitalize">
        My Wallet
      </h1>

      {/* <!-- table area --> */}
      <div className="flex flex-wrap gap-2 wallet-wrapper">
        <div className="flex-1 p-5 bg-gray-100 sm:flex-1 md:flex-none">
          <p>
            Your lifetime Wallet is{" "}
            <span className="text-xl font-bold">
              <img src="" alt="" />
              AED 0
            </span>
          </p>
        </div>
        <div className="flex-1 p-5 bg-gray-100 sm:flex-1 md:flex-none">
          <p>
            Your lifetime Wallet is{" "}
            <span className="text-xl font-bold">
              <img src="" alt="" />
              AED 0
            </span>
          </p>
        </div>
      </div>

      {/* <!-- transaction details --> */}

      <div className="mt-8">
        <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black capitalize">
          Transaction Details
        </h1>
        <div className="relative !overflow-x-auto !block">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 whitespace-nowrap">
            <thead className="text-xs text-gray-700 uppercase !bg-[#F4F4F4] dark:bg-gray-700 !dark:text-[#603813]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  Executive Chair
                  <br />
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  12-05-2024
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED 1200
                </td>
                <td className="px-6 py-3 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-green-500 bg-green-100 rounded">
                    Credited
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  Executive Chair
                  <br />
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  12-05-2024
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED 1200
                </td>
                <td className="px-6 py-3 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-red-500 bg-red-100 rounded">
                    Debited
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  Executive Chair
                  <br />
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  12-05-2024
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED 1200
                </td>
                <td className="px-6 py-3 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-green-500 bg-green-100 rounded">
                    Credited
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  Executive Chair
                  <br />
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  12-05-2024
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED 1200
                </td>
                <td className="px-6 py-3 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-red-500 bg-red-100 rounded">
                    Debited
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  Executive Chair
                  <br />
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  12-05-2024
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED 1200
                </td>
                <td className="px-6 py-3 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-red-500 bg-red-100 rounded">
                    Debited
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountWallet;
