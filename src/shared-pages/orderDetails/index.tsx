"use client";
import React, { useEffect, useState } from "react";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/MyContext";
import { routs } from "@/config/routs";

function Index() {
  const { push } = useRouter();
  // const tokenLocal = localStorage.getItem("token");

  const { storedToken } = useUser();

  const searchParams = useSearchParams();
  const [orderId, setorderId] = useState<any>();

  const [orderDetails, setorderDetails] = useState<any>();
  const [billingAddress, setbillingAddress] = useState<any>();
  const [shippingAddress, setshippingAddress] = useState<any>();
  const [orderDetailsProduct, setorderDetailsProduct] = useState();

  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get("id");
    setorderId(orderId);

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

      // console.log("tje res", response.data);

      if (response.data.status) {
        setorderDetails(response.data.requestedData);
        setorderDetailsProduct(response.data.requestedData.products);

        setbillingAddress(response.data.requestedData.billingAddress[0]);
        setshippingAddress(response.data.requestedData.shippingAddress);
        console.log(
          "the orderdetail data is in:-",
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
    <section className="container px-3 mx-auto my-4 sm:my-8 sm:px-6">
      <div className="content-wrapper">
        <div>
          <h1 className="text-xl font-medium text-black">Order Details</h1>
          {/* <!-- bredcrumb --> */}
          <div className="mx-auto mb-4 bg-white">
            <nav className="flex py-2" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-red-900 "
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>

                    <a
                      href="#"
                      className="text-sm font-normal text-gray-700 capitalize ms-1 hover:text-red-900 md:ms-2 "
                    >
                      My Orders
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="text-sm font-normal text-gray-500 capitalize ms-1 md:ms-2 ">
                      Order details
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="p-5 py-6 border rounded-lg bg-white shadow-md mb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-2/3">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Order ID: {orderDetails?.orderId}
                </h2>
                {/* <p className="text-gray-500">
                  Preparing to ship on March 24, 2024
                </p> */}
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-gray-700">
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    {shippingAddress?.name} <br />
                    {shippingAddress?.address1} <br />
                    {shippingAddress?.state} {shippingAddress?.country}
                    <br />
                    {shippingAddress?.phoneNumber}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-gray-700">
                    Billing Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    {billingAddress?.name} <br />
                    {billingAddress?.address1} <br />
                    {billingAddress?.state} {billingAddress?.country}
                    <br />
                    {billingAddress?.phoneNumberw}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <svg
                    className="fill-current"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M288.502,32.502c-108.328,0-198.827,77.485-219.166,179.899l-42.482-53.107L0,180.784l68.769,85.961
                c3.352,4.178,8.338,6.447,13.427,6.447c2.596,0,5.226-0.585,7.685-1.805l103.153-51.577l-15.387-30.757l-75.8,37.892
                c14.063-90.5,92.27-160.059,186.655-160.059c104.271,0,189.114,84.843,189.114,189.114s-84.843,189.114-189.114,189.114v34.384
                C411.735,479.498,512,379.233,512,256S411.735,32.502,288.502,32.502z"
                    ></path>
                  </svg>
                  Return item
                </button>
                <button className="font-normal flex gap-2 items-center text-base text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2 rounded-lg">
                  <span>
                    <svg
                      width="19px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19.47 20.92"
                    >
                      <path d="M14.77,9.56c.33.36.65.7.97,1.05-2.07,2.11-4.12,4.21-6.17,6.3-2.11-2.12-4.21-4.22-6.3-6.31.31-.31.66-.65,1.01-.99,1.53,1.51,3.1,3.07,4.7,4.64V0h1.49v13.76c1.42-1.39,2.85-2.78,4.29-4.19Z" />
                      <path d="M0,20.92v-5.94h1.48v4.47h16.51v-4.46h1.48v5.94H0Z" />
                    </svg>
                  </span>
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 py-6 border rounded-lg bg-white shadow-md mb-6">
          {orderDetails?.products?.map((value: any) => (
            <div
              key={value.id}
              className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-4 p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="w-[70px] lg:w-[150px]">
                <img
                  src={`${api.defaults.baseURL}${value?.productDetails?.productImageUrl}`}
                  className="aspect-square max-w-[70px] lg:max-w-[150px] w-full rounded-lg"
                  alt={value?.productDetails?.productTitle}
                  crossOrigin="anonymous"
                />
              </div>

              <div className="flex-1">
                <h3 className="pb-1 pt-2 lg:mb-2 text-sm lg:text-xl font-bold lg:font-medium leading-4">
                  {value?.productDetails?.productTitle}
                </h3>

                <div className="text-left">
                  <span className="text-md lg:text-xl font-semibold text-primary">
                    AED {value?.productAmount}
                  </span>
                </div>

                <p className="px-3 py-1 mt-1 text-xs lg:text-xl text-gray-600 border border-gray-300 w-fit rounded-lg">
                  Quantity:{" "}
                  <span className="font-semibold text-black">
                    {value?.quantity}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 py-6 border rounded-lg bg-white shadow-md mb-6">
          <p className="mb-4 text-lg font-bold text-gray-700">Order Tracking</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="relative pl-10 mb-8">
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#de7600] rounded-full border-4 border-white"></div>
              <div className="content bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Product Shipped</p>
                <p className="text-gray-600">13/09/2024 5:23 pm</p>
                <p className="text-gray-600">
                  Courier Service: UPS, R. Gosling
                </p>
                <p className="text-gray-600">
                  Estimated Delivery Date:{" "}
                  <span className="text-green-600">15/09/2024</span>
                </p>
              </div>
            </div>
            <div className="relative pl-10 mb-8">
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#de7600] rounded-full border-4 border-white"></div>
              <div className="content bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Product Packaging</p>
                <p className="text-gray-600">13/09/2024 4:13 pm</p>
                <p className="text-gray-600">Warehouse: Apple Spot 13b</p>
              </div>
            </div>
            <div className="relative pl-10 mb-8">
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#de7600] rounded-full border-4 border-white"></div>
              <div className="content bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Order Confirmed</p>
                <p className="text-gray-600">13/09/2024 3:53 pm</p>
              </div>
            </div>
            <div className="relative pl-10 mb-8">
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#de7600] rounded-full border-4 border-white"></div>
              <div className="content bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Order Placed</p>
                <p className="text-gray-600">13/09/2024 3:43 pm</p>
              </div>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#de7600] rounded-full border-4 border-white"></div>
              <div className="content bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">Product Packaging</p>
                <p className="text-gray-600">13/09/2024 4:13 pm</p>
                <p className="text-gray-600">Warehouse: Apple Spot 13b</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 mt-6 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            <div className="col-span-1">
              <ul className="divide-y divide-gray-300">
                <li className="flex justify-between py-3">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="text-gray-900">
                    AED {orderDetails?.totalProductAmount}
                  </span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="font-medium text-gray-700">Discount</span>
                  <span className="text-green-500">
                    AED{" "}
                    {orderDetails?.totalDiscountAmount
                      ? orderDetails?.totalDiscountAmount
                      : 0}
                  </span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="font-medium text-gray-700">Shipping</span>
                  <span className="text-gray-900">
                    AED{" "}
                    {orderDetails?.totalShippingAmount
                      ? orderDetails?.totalShippingAmount
                      : 0}
                  </span>
                </li>
                <li className="flex justify-between py-2 border-b border-gray-300">
                  <>
                    <span className="font-medium text-gray-700">Gift Wrap</span>
                    <div>AED {orderDetails?.totalGiftWrapAmount}</div>
                  </>
                </li>

                <li className="flex justify-between py-3 font-semibold text-xl">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    AED {orderDetails?.totalAmount}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
