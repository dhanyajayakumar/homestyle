"use client";
import React, { useEffect, useState } from "react";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/MyContext";
import { routs } from "@/config/routs";
import moment from "moment";

const OrderSuccess: React.FC<{ orderId: string }> = ({ orderId }) => {
  const { push } = useRouter();
  // const tokenLocal = localStorage.getItem("token");
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    getCartData,
    setwishlistDataIs,
    getWishlistData,
    cartProductList,
    uniqueIdIS,
    storedToken,
  } = useUser();
  const searchParams = useSearchParams();
  // const [orderId, setorderId] = useState<any>();
  const [orderDetails, setorderDetails] = useState<any>();
  const [orderDetailsProduct, setorderDetailsProduct] = useState();
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [shippingAddresIs, setshippingAddresIs] = useState<any>();

  useEffect(() => {
    // const orderId = searchParams.get("id");
    // setorderId(orderId);
    // console.log("id-3", orderId);
    getOrderDetails(orderId);
  }, [searchParams]);

  const getOrderDetails = async (orderId: any) => {
    // console.log("id-323", orderId);

    try {
      const response = await api.get(
        `${endpoints.letGetOrderDetails}/${orderId}`,
        {
          headers: {
            // Custom headers if needed
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      // console.log("tje res", response);

      if (response.data.status) {
        setorderDetails(response.data.requestedData);
        setorderDetailsProduct(response.data.requestedData.products);
        setshippingAddresIs(response.data.requestedData.shippingAddress);
        console.log(
          "the orderdetail data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        // console.log(
        //   "the orderdetail - error is:-",
        //   JSON.stringify(response.data.message, null, 2)
        // );
      }
    } catch (err: any) {
      setError(err);
      console.log("the error is----", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto  mx-auto mt-5">
      <div className="bg-white rounded-lg shadow-lg p-3 lg:p-6 max-w-md mx-auto">
        <div className="text-center">
          <svg
            className="w-[100px] mx-auto mb-5"
            version="1.1"
            id="fi_190411"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 507.2 507.2"
            // style={{ enableBackground: "new 0 0 507.2 507.2" }}
            xmlSpace="preserve"
          >
            <circle
              style={{ fill: "#32BA7C" }}
              cx="253.6"
              cy="253.6"
              r="253.6"
            ></circle>
            <path
              style={{ fill: "#0AA06E" }}
              d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
            ></path>
            <g>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                      c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
              ></path>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                      c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
              ></path>
            </g>
          </svg>

          <h2 className="text-2xl font-bold mb-2">
            Order Successfully Completed!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order details are below.
          </p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="mb-2">
            <span className="font-semibold">Order ID:</span>
            <span> {orderDetails?.orderId}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Order Date:</span>
            <span>
              {" "}
              {moment(orderDetails?.orderStatusAt).format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total Amount:</span>{" "}
            <span> AED {orderDetails?.totalAmount}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Shipping Address:</span>
            <span> {shippingAddresIs?.address1}</span>
          </div>

          <hr />

          <h3 className="text-lg font-semibold mb-3 mt-3">Order Details</h3>

          <div className="grid grid-cols-1 gap-6">
            {/* Order 1 */}
            {orderDetails?.products?.map((value: any) => (
              <div key={value.id} className="flex items-center mb-4">
                <img
                  className="h-16 w-16"
                  src={`${api.defaults.baseURL}${value?.productDetails?.productImageUrl}`}
                  crossOrigin="anonymous"
                  alt="prdImg"
                />
                <div className="ml-4">
                  <div className="flex flex-col w-full overflow-hidden">
                    <a
                      className="mukta-regular text-sm font-medium text-gray-700 text-heading"
                      href="#"
                    >
                      {value?.productDetails?.productTitle}
                    </a>

                    <span className="text-xs text-gray-400 mb-1">
                      Quantity: {value?.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <div className="flex gap-2">
            <a
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-center text-[#f89d1b] border border-[#f89d1b] transition-all duration-200 hover:text-[#f89d1b]  hover:bg-[#e4dfc9]"
              //   href="details.html"
              href={`${routs.orderdetails}?id=${orderId}`}
            >
              Track Order
            </a>
            <a
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#f89d1b] duration-200 bg-[#f89d1b]  hover:text-[#f89d1b]  hover:bg-[#e4dfc9]"
              href="/"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
