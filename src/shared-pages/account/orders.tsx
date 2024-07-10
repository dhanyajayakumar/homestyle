"use client";
import React, { useEffect, useState } from "react";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/MyContext";
import { routs } from "@/config/routs";
import moment from "moment";

function AccountOrders() {
  const { push } = useRouter();
  // const tokenLocal = localStorage.getItem("token");
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    wishlistDataIs,
    uniqueIdIS,
    storedToken,
  } = useUser();

  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [orderListData, setorderListData] = useState<any>();
  useEffect(() => {
    console.log("the email", localStorage.getItem("emailid"));
    getOrderList();
  }, []);

  const getOrderList = async () => {
    try {
      const response = await api.get(`${endpoints.letGetOrderList}`, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      console.log("tje res", response);

      if (response.data.status) {
        setorderListData(response.data.requestedData);
        console.log(
          "the orderlist data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the orderlist - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
      console.log("the error is----", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" xl:pl-8 !bg-white dark:bg-gray-800">
      <h1 className="flex items-center mb-5 text-xl font-normal tracking-wide text-black">
        Order List
      </h1>

      <div className="p-5 py-6 bg-gray-100 rounded-lg shadow-md mb-6">
        {orderListData?.map((value: any, index: number) => (
          <div
            key={value.id}
            className="mb-4 bg-white border rounded-lg shadow-sm p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Order</span>
                <span className="text-lg font-semibold text-gray-900">
                  #{index + 1}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Order ID
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {value.id}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Date</span>
                <span className="text-lg font-semibold text-gray-900">
                  {moment(value.orderStatusAt).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Status
                </span>
                <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded">
                  Delivered
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Price</span>
                <span className="text-lg font-semibold text-gray-900">
                  AED {value.totalAmount}
                </span>
              </div>
              <button
                onClick={() => {
                  push(`${routs.orderdetails}?id=${value._id}`);
                }}
                className="text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- table area --> */}

      {/* <div className="relative !overflow-x-auto !block">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase !bg-[#F4F4F4] dark:bg-gray-700 !dark:text-[#603813]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orderListData?.map((value: any) => (
              <tr key={value.id} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-2 font-normal whitespace-nowrap"
                >
                  #1
                </th>
                <td className="px-6 py-2 font-medium !text-gray-900 whitespace-nowrap leading-4">
                  order id
       
                </td>

                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  {moment(orderListData?.orderStatusAt).format("DD-MM-YYYY")}
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  <span className="p-2 text-sm text-green-500 bg-green-100 rounded">
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-2 font-normal !text-gray-900 whitespace-nowra">
                  AED {orderListData?.totalAmount}
                </td>
                <td className="px-6 py-2 text-center">
                  <a
                   
                    onClick={() => {
                      push(`${routs.orderdetails}?id=${value._id}`);
                    }}
                    className="font-normal text-white bg-[#F89D1B] hover:bg-[#dc8100] px-3 py-2 hover:underline"
                    type="button"
                    data-modal-toggle="order-detail-moal"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default AccountOrders;
