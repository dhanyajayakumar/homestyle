"use client";
import React, { useEffect, useState } from "react";
import DeliveryAddress from "./deliveryAddress";
import BillingAddress from "./billingAddress";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/MyContext";

function Index() {
  const { push } = useRouter();

  const {
    uniqueId,
    token,
    setToken,
    cartData,
    setcartData,
    getCartData,
    uniqueIdIS,
    storedToken,
  } = useUser();
  const searchParams = useSearchParams();

  const router = useRouter();
  // const tokenLocal = localStorage.getItem("token");
  const [cartSummary, setcartSummary] = useState<any>();
  const [shippingAddress, setshippingAddress] = useState<any>();
  const [billingAddress, setbillingAddress] = useState<any>();
  const [paymentmethodeLists, setpaymentmethodeLists] = useState<any>();
  const [Error, setError] = useState<any>();
  const [Loading, setLoading] = useState<any>(false);

  const [theSelectedAddress, settheSelectedAddress] = useState<any>();
  const [theSelectedBillingAddress, settheSelectedBillingAddress] =
    useState<any>();
  const [selectedBillingAddType, setselectedBillingAddType] = useState<any>();
  const [openAddaddress, setopenAddaddress] = useState<any>(false);
  const [open, setOpen] = useState(false);
  const [loadingStatus, setloadingStatus] = useState<any>(false);
  const [deliveryMessage, setdeliveryMessage] = useState<any>("");
  const [openBillingAddress, setopenBillingAddress] = useState<any>(false);
  const [openBillingAddressEdit, setopenBillingAddressEdit] =
    useState<any>(false);
  const [couponCodeIs, setcouponCodeIs] = useState<any>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>("");
  const [selectedPayment, setselectedPayment] = useState();
  const handlePaymentMethodChange = (event: any) => {
    setSelectedPaymentMethod(event.target.id);
  };

  useEffect(() => {
    const couponId = searchParams.get("couponCode");

    setcouponCodeIs(couponId);
    getShippingAddress();
    getBillingAddress();
    getPaymentMethode();
  }, []);

  const getShippingAddress = async () => {
    console.log("the token isshere:-", storedToken);

    try {
      const response = await api.get(
        `${endpoints.getAddressLists}?addressMode=shipping-address`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.data.status) {
        setshippingAddress(response.data.requestedData);
        console.log(
          "the shipping address is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the shipping address - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getBillingAddress = async () => {
    console.log("the token isshere:-", storedToken);

    try {
      const response = await api.get(
        `${endpoints.getAddressLists}?addressMode=billing-address`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.data.status) {
        setbillingAddress(response.data.requestedData);
        console.log(
          "the shipping address is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the shipping address - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const letsDeleteAddress = async (addressID: any) => {
    console.log("the address id to delete is:-", addressID);
    console.log("the token is:-", storedToken);

    try {
      const response = await api.post(
        `${endpoints.letRemoveAddress}${addressID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log("the del is here", JSON.stringify(response.data, null, 2));

      if (response.data.status) {
        console.log("the del", JSON.stringify(response.data, null, 2));
        // setcartData(response.data.requestedData);
        getShippingAddress();
        getBillingAddress();
      } else {
        console.log(
          "the del - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const letsAddShipppingAddress = async (values: any, locationDetails: any) => {
    console.log(
      "The locationDetails are:-...",
      JSON.stringify(locationDetails, null, 2)
    );
    console.log("The values are:-", JSON.stringify(values, null, 2));
    console.log("The token are:-", JSON.stringify(storedToken, null, 2));

    try {
      const postData = {
        addressType: values.addressType,
        defaultAddress: values.defaultAddress,
        addressMode: "shipping-address",
        name: values.name,
        address1: values.addressLine1,
        address2: values.addressLine2,
        phoneNumber: values.phone,
        landlineNumber: values.landline,
        country: locationDetails.country,
        state: locationDetails.state,
        city: locationDetails.city,
        street: locationDetails.street,
        zipCode: values.zipCode,
        longitude: locationDetails.longitude,
        latitude: locationDetails.latitude,
      };

      const response = await api.post(endpoints.letAddAddress, postData, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the edit address is:-",
          JSON.stringify(response.data, null, 2)
        );
        // setcartData(response.data.requestedData);
        getShippingAddress();
        setloadingStatus(false);
        setopenAddaddress(false);
      } else {
        console.log(
          "the edit address - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const letsEditShippingAddress = async (
    values: any,
    locationDetails: any,
    addressId: any
  ) => {
    console.log("the value:-", values);
    console.log("the locationDetails:-", locationDetails);
    console.log("the addressId:-", addressId);
    try {
      const postData = {
        addressId: addressId,
        addressType: values.addressType,
        defaultAddress: values.defaultAddress,
        addressMode: "shipping-address",
        name: values.name,
        address1: values.addressLine1,
        address2: values.addressLine2,
        phoneNumber: values.phone,
        landlineNumber: values.landline,
        country: locationDetails.country,
        state: locationDetails.state,
        city: locationDetails.city,
        street: locationDetails.street,
        zipCode: values.zipCode,
        longitude: locationDetails.longitude,
        latitude: locationDetails.latitude,
      };

      const response = await api.post(endpoints.letAddAddress, postData, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the delivery address adding:-",
          JSON.stringify(response.data, null, 2)
        );
        // setcartData(response.data.requestedData);
        getShippingAddress();
        setloadingStatus(false);
        setOpen(false);
      } else {
        console.log(
          "the delivery addresa adding - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const letsEditBillingAddress = async (
    values: any,
    locationDetails: any,
    addressId: any
  ) => {
    console.log("the value:-", values);
    console.log("the locationDetails:-", locationDetails);
    console.log("the addressId:-", addressId);
    try {
      const postData = {
        addressId: addressId,
        addressType: values.addressType,
        defaultAddress: values.defaultAddress,
        addressMode: "billing-address",
        name: values.name,
        address1: values.addressLine1,
        address2: values.addressLine2,
        phoneNumber: values.phone,
        landlineNumber: values.landline,
        country: locationDetails.country,
        state: locationDetails.state,
        city: locationDetails.city,
        street: locationDetails.street,
        zipCode: values.zipCode,
        longitude: locationDetails.longitude,
        latitude: locationDetails.latitude,
      };

      const response = await api.post(endpoints.letAddAddress, postData, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the delivery address adding:-",
          JSON.stringify(response.data, null, 2)
        );
        // setcartData(response.data.requestedData);
        getShippingAddress();
        getBillingAddress();
        setloadingStatus(false);
        setopenBillingAddressEdit(false);
      } else {
        console.log(
          "the delivery addresa adding - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const letsAddBillingAddress = async (values: any, locationDetails: any) => {
    console.log("the billing data is:-", values);
    console.log("the billing Location is:-", locationDetails);
    try {
      const postData = {
        addressType: values.addressType,
        defaultAddress: values.defaultAddress,
        addressMode: "billing-address",
        name: values.name,
        address1: values.addressLine1,
        address2: values.addressLine2,
        phoneNumber: values.phone,
        landlineNumber: values.landline,
        country: locationDetails.country,
        state: locationDetails.state,
        city: locationDetails.city,
        street: locationDetails.street,
        zipCode: values.zipCode,
        longitude: locationDetails.longitude,
        latitude: locationDetails.latitude,
      };

      const response = await api.post(endpoints.letAddAddress, postData, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the edit address is:-",
          JSON.stringify(response.data, null, 2)
        );
        // setcartData(response.data.requestedData);
        getShippingAddress();
        getBillingAddress();
        setloadingStatus(false);
        setopenBillingAddress(false);
      } else {
        console.log(
          "the edit address - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethode = async () => {
    try {
      const response = await api.get(endpoints.getPaymentMethodeList, {
        headers: {},
      });

      if (response.data.status) {
        setpaymentmethodeLists(response.data.requestedData);
        console.log(
          "the PaymentMethode:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the PaymentMethode - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getConfirmOrder = async () => {
    console.log("selectedPaymentMethod", selectedPaymentMethod);

    if (
      selectedPaymentMethod &&
      theSelectedAddress &&
      theSelectedBillingAddress &&
      cartData
    ) {
      console.log("All in");
      try {
        const postData = {
          shippingId: theSelectedAddress._id,
          billingId: theSelectedBillingAddress._id,
          orderComments: deliveryMessage,
          paymentMethodId: selectedPaymentMethod,
          couponCode: couponCodeIs,
          deviceType: "desktop",
        };
        const response = await api.post(endpoints.letsConfirmOrder, postData, {
          headers: {
            // Custom headers if needed
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response.data.status) {
          console.log(
            "the order Success",
            JSON.stringify(response.data, null, 2)
          );
          if (selectedPayment == "tabby") {
            // push(`/orderstatus?id=${response.data.requestedData.orderId}`);
            push(
              `/checkout/tabby/${response.data.requestedData.paymentData.transactionId}`
            );
          } else {
            push(
              `/order-respones/${response.data.requestedData.orderId}?status=success`
            );
          }
        } else {
          console.log(
            "the order Failed",
            JSON.stringify(response.data, null, 2)
          );
        }
      } catch (err: any) {
        setError(err);
      }
    } else {
      if (!selectedPaymentMethod) {
        console.log("Need 1");
      } else if (!theSelectedAddress) {
        console.log("need 2");
      } else if (!theSelectedBillingAddress) {
        console.log("need 3");
      } else if (!cartData) {
        console.log("need 5");
      }
    }
    console.log("The order details are:-");

    console.log("the selected shipping addres Id is:-", theSelectedAddress._id);
    console.log(
      "the selected billing address Id is:-",
      JSON.stringify(theSelectedBillingAddress._id, null, 2)
    );
    console.log("the dev-instrtn", JSON.stringify(deliveryMessage, null, 2));
    console.log("The slected payment methode is:-", selectedPaymentMethod);

    console.log("coupon", JSON.stringify(couponCodeIs, null, 2));
  };

  return (
    <div>
      {/* <!-- bredcrumb --> */}
      <div className=" xl:px-28 lg:px-28 md:px-28 hidden lg:block  mx-auto bg-[#f8f8f8]">
        <nav className="flex py-4 sm:px-5" aria-label="Breadcrumb">
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
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"></path>
                </svg>
                Home
              </a>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
                  ></path>
                </svg>
                <span className="ms-1 text-sm font-normal text-gray-500 md:ms-2 ">
                  My Cart
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <section className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto  mx-auto mt-5 mb-10">
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* <!-- Cart Items Section --> */}
            <div className="w-full lg:w-2/3 ">
              <div className="bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3 mb-5">
                <div className="flex gap-3">
                  <svg
                    width="18pt"
                    height="18pt"
                    id="fi_15501313"
                    enable-background="new 0 0 1024 1024"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="XMLID_3_">
                      <g id="XMLID_1_">
                        <g id="XMLID_16_">
                          <path
                            id="XMLID_24_"
                            d="m695.2 275.5c0 9.8-.7 19.5-2 29.2.4-2.7.7-5.3 1.1-8-2.6 18.3-7.4 36.2-14.5 53.2 1-2.4 2-4.8 3-7.2-5.3 12.6-11.8 24.7-19.4 36-1.9 2.9-4 5.8-6.1 8.6-4.4 5.9 3.8-4.7.7-.9-1.1 1.4-2.2 2.7-3.3 4.1-4.2 5-8.6 9.9-13.2 14.5s-9.5 9.1-14.5 13.2c-1.3 1.1-2.7 2.2-4.1 3.3-3.9 3.1 6.8-5.1.9-.7-2.8 2.1-5.7 4.1-8.6 6.1-11.4 7.6-23.4 14-36 19.4l7.2-3c-17.1 7.1-34.9 12-53.2 14.5 2.7-.4 5.3-.7 8-1.1-19.4 2.6-38.9 2.6-58.3 0 2.7.4 5.3.7 8 1.1-18.3-2.6-36.2-7.4-53.2-14.5l7.2 3c-12.6-5.3-24.7-11.8-36-19.4-2.9-1.9-5.8-4-8.6-6.1-5.9-4.4 4.7 3.8.9.7-1.4-1.1-2.7-2.2-4.1-3.3-5-4.2-9.9-8.6-14.5-13.2s-9.1-9.5-13.2-14.5c-1.1-1.3-2.2-2.7-3.3-4.1-3.1-3.9 5.1 6.8.7.9-2.1-2.8-4.1-5.7-6.1-8.6-7.6-11.4-14-23.4-19.4-36 1 2.4 2 4.8 3 7.2-7.1-17.1-12-34.9-14.5-53.2.4 2.7.7 5.3 1.1 8-2.6-19.4-2.6-38.9 0-58.3-.4 2.7-.7 5.3-1.1 8 2.6-18.3 7.4-36.2 14.5-53.2-1 2.4-2 4.8-3 7.2 5.3-12.6 11.8-24.7 19.4-36 1.9-2.9 4-5.8 6.1-8.6 4.4-5.9-3.8 4.7-.7.9 1.1-1.4 2.2-2.7 3.3-4.1 4.2-5 8.6-9.9 13.2-14.5s9.5-9.1 14.5-13.2c1.3-1.1 2.7-2.2 4.1-3.3 3.9-3.1-6.8 5.1-.9.7 2.8-2.1 5.7-4.1 8.6-6.1 11.4-7.6 23.4-14 36-19.4-2.4 1-4.8 2-7.2 3 17.1-7.1 34.9-12 53.2-14.5-2.7.4-5.3.7-8 1.1 19.4-2.6 38.9-2.6 58.3 0-2.7-.4-5.3-.7-8-1.1 18.3 2.6 36.2 7.4 53.2 14.5-2.4-1-4.8-2-7.2-3 12.6 5.3 24.7 11.8 36 19.4 2.9 1.9 5.8 4 8.6 6.1 5.9 4.4-4.7-3.8-.9-.7 1.4 1.1 2.7 2.2 4.1 3.3 5 4.2 9.9 8.6 14.5 13.2s9.1 9.5 13.2 14.5c1.1 1.3 2.2 2.7 3.3 4.1 3.1 3.9-5.1-6.8-.7-.9 2.1 2.8 4.1 5.7 6.1 8.6 7.6 11.4 14 23.4 19.4 36-1-2.4-2-4.8-3-7.2 7.1 17.1 12 34.9 14.5 53.2-.4-2.7-.7-5.3-1.1-8 1.3 9.7 2 19.4 2 29.1.1 15.7 13.8 30.7 30 30s30.1-13.2 30-30c-.2-49.1-15-98.8-43.7-138.9-29.6-41.5-70-72.5-117.8-90.1-93.3-34.4-204.6-4.2-267.7 72.6-32.9 40.1-52.5 87.9-56.5 139.7-3.8 49.3 8.7 100.3 34.4 142.6 24.8 40.8 62.1 75.1 105.8 94.7 25 11.2 50.1 18.1 77.3 21.3 25.2 3 50.8 1.2 75.7-3.9 95.7-19.4 174.6-101.2 189.2-198 2-13.2 3.4-26.5 3.4-39.9.1-15.7-13.8-30.7-30-30-16.4.7-30 13.1-30.1 29.9z"
                          ></path>
                        </g>
                      </g>
                      <g id="XMLID_2_">
                        <g id="XMLID_17_">
                          <path
                            id="XMLID_25_"
                            d="m828.7 931.7c-21.3 0-42.6 0-63.9 0-50.8 0-101.7 0-152.5 0-61.3 0-122.6 0-183.9 0-52.8 0-105.5 0-158.3 0-24.8 0-49.5.1-74.3 0-2.5 0-5-.2-7.5-.5 2.7.4 5.3.7 8 1.1-4-.6-7.8-1.7-11.5-3.2l7.2 3c-2.8-1.2-5.5-2.6-8.1-4.3s-3.5-4 1.9 1.6c-1-1.1-2.3-2-3.3-3-.3-.3-3.2-3.2-3-3.3 0 0 5.2 7.3 1.6 1.9-1.7-2.5-3.1-5.2-4.3-8.1 1 2.4 2 4.8 3 7.2-1.5-3.7-2.5-7.6-3.2-11.5.4 2.7.7 5.3 1.1 8-.7-5.6-.5-11.4-.5-17 0-9.7 0-19.5 0-29.2 0-19.4 0-38.8 0-58.2 0-11.5.5-23 2-34.4-.4 2.7-.7 5.3-1.1 8 2.8-20.5 8.2-40.6 16.3-59.7-1 2.4-2 4.8-3 7.2 4.5-10.5 9.7-20.7 15.7-30.5 3-4.9 6.1-9.6 9.5-14.2.8-1.1 1.5-2.1 2.3-3.2.4-.5.8-1 1.2-1.6 1.7-2.3-2.8 4-2.7 3.5.4-2.1 4.4-5.5 5.8-7.1 7.2-8.5 15-16.4 23.4-23.8 2.1-1.9 4.3-3.7 6.5-5.5 1-.8 2-1.6 3.1-2.5 3.4-2.8-6.2 4.6-1.4 1.1 4.6-3.4 9.2-6.7 14-9.7 10.9-7 22.5-13.1 34.4-18.2-2.4 1-4.8 2-7.2 3 19.1-8 39.1-13.5 59.7-16.3-2.7.4-5.3.7-8 1.1 16.4-2.1 32.8-2 49.3-2h67.1 156.6c18.6 0 37.1-.4 55.6 2-2.7-.4-5.3-.7-8-1.1 20.5 2.8 40.6 8.2 59.7 16.3-2.4-1-4.8-2-7.2-3 10.5 4.5 20.7 9.7 30.5 15.7 4.9 3 9.6 6.1 14.2 9.5 1.1.8 2.1 1.5 3.2 2.3.5.4 1 .8 1.6 1.2 2.3 1.7-4-2.8-3.5-2.7 2.1.4 5.5 4.4 7.1 5.8 8.5 7.2 16.4 15 23.8 23.4 1.9 2.1 3.7 4.3 5.5 6.5.8 1 1.6 2 2.5 3.1 2.8 3.4-4.6-6.2-1.1-1.4 3.4 4.6 6.7 9.2 9.7 14 7 10.9 13.1 22.5 18.2 34.4-1-2.4-2-4.8-3-7.2 8 19.1 13.5 39.1 16.3 59.7-.4-2.7-.7-5.3-1.1-8 2.3 18 2 36.1 2 54.2v64.2c0 6.7.4 13.6-.5 20.3.4-2.7.7-5.3 1.1-8-.6 4-1.7 7.8-3.2 11.5 1-2.4 2-4.8 3-7.2-1.2 2.8-2.6 5.5-4.3 8.1s-4 3.5 1.6-1.9c-1.1 1-2 2.3-3 3.3-.3.3-3.2 3.2-3.3 3 0 0 7.3-5.2 1.9-1.6-2.5 1.7-5.2 3.1-8.1 4.3l7.2-3c-3.7 1.5-7.6 2.5-11.5 3.2 2.7-.4 5.3-.7 8-1.1-2.3.3-4.5.4-6.9.5-15.7.2-30.7 13.6-30 30 .7 16.1 13.2 30.2 30 30 36.1-.5 70.5-26.6 76.4-63.2 2.2-13.6 1.6-27.4 1.6-41.1 0-18.1 0-36.3 0-54.4 0-12.7.3-25.5-.7-38.2-4.3-57.8-26.9-111.9-65.1-155.6-35.8-41-86-70.6-139.3-81.8-27.4-5.8-54.6-6.1-82.3-6.1-32.8 0-65.6 0-98.5 0-34.9 0-69.7 0-104.6 0-21.2 0-42.8-.9-63.9 1.4-30.3 3.4-58.6 11.1-86.3 23.9-24.5 11.3-47.2 27.2-66.9 45.6-39.8 37.2-68.2 88.3-77.6 142-6.1 35.1-4.5 70.7-4.5 106.2v41.5c0 28.9 15.4 58.1 42.1 71 12.4 6 25.3 8.8 39.1 8.8h15.1 61.1 92 109 113.2 104.7 82.1 47 6.2c15.7 0 30.7-13.8 30-30-.6-16.3-13-30-29.9-30z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>

                  <p className="mukta-medium text-gray-600">
                    Logged in as{" "}
                    <span className="text-green-600"> muhsil@tomsher.co</span>
                  </p>
                </div>
              </div>

              <div className="max-w-7xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Delivery Address</h1>
                <DeliveryAddress
                  dAddress={shippingAddress}
                  settheSelectedAddress={settheSelectedAddress}
                  letsDeleteAddress={letsDeleteAddress}
                  letsAddShipppingAddress={letsAddShipppingAddress}
                  openAddaddress={openAddaddress}
                  setopenAddaddress={setopenAddaddress}
                  loadingStatus={loadingStatus}
                  setloadingStatus={setloadingStatus}
                  open={open}
                  setOpen={setOpen}
                  letsEditShippingAddress={letsEditShippingAddress}
                  deliveryMessage={deliveryMessage}
                  setdeliveryMessage={setdeliveryMessage}
                />

                <h1 className="text-xl font-bold mb-4 mt-8">Billing Address</h1>
                <BillingAddress
                  dAddress={billingAddress}
                  theSelectedAddress={theSelectedAddress}
                  settheSelectedBillingAddress={settheSelectedBillingAddress}
                  setselectedBillingAddType={setselectedBillingAddType}
                  letsDeleteAddress={letsDeleteAddress}
                  letsAddBillingAddress={letsAddBillingAddress}
                  openBillingAddress={openBillingAddress}
                  setopenBillingAddress={setopenBillingAddress}
                  loadingStatus={loadingStatus}
                  setloadingStatus={setloadingStatus}
                  openBillingAddressEdit={openBillingAddressEdit}
                  setopenBillingAddressEdit={setopenBillingAddressEdit}
                  letsEditBillingAddress={letsEditBillingAddress}
                />

                <h1 className="text-xl font-bold mb-4 mt-8">Payment Method</h1>

                <div
                  id="payment-section"
                  className="bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3"
                >
                  <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Payment Method
                    </label>

                    <div className="flex flex-col lg:flex-row  gap-3 h-full">
                      {paymentmethodeLists?.map((value: any) => (
                        <div
                          key={value.id}
                          className="lg:max-w-[200px]  w-full h-full"
                        >
                          <input
                            id={value?._id}
                            type="radio"
                            name="payment-method"
                            className="hidden peer"
                            onChange={handlePaymentMethodChange}
                            checked={selectedPaymentMethod === value?._id}
                            onClick={() => {
                              console.log("tje is id:", value.slug);
                              setselectedPayment(value.slug);
                            }}
                          />
                          <label
                            htmlFor={value?._id}
                            className="flex flex-row lg:flex-col gap-1 leading-normal items-center p-2 border rounded-lg cursor-pointer peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:shadow-lg transition"
                          >
                            <img
                              src={`${api.defaults.baseURL}${value?.paymentMethodImageUrl}`}
                              alt="paymentImg"
                              className="w-[80px] mr-2 lg:pb-1"
                              crossOrigin="anonymous"
                            />
                            <div className="flex flex-col">
                              <span className="leading-4 lg:text-center text-left text-sm text-gray-900 font-semibold">
                                {" "}
                                {value?.paymentMethodTitle}
                              </span>
                              <span className="leading-4 lg:text-center text-left text-xs text-gray-500 font-semibold">
                                {value?.description}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Cart Summary Section --> */}
            <div className="w-full lg:w-1/3 ">
              <div className="sticky top-[120px] bg-white shadow-md border rounded-lg p-4 mt-3 ">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                <div className="flex flex-col w-full h-full justify-between items-center bg-white rounded overflow-x-auto">
                  {cartData?.products.map((value: any) => (
                    <div
                      key={value.id}
                      className=" w-full h-auto flex justify-start items-center bg-white py-3 px-0 border-b transition-all border-gray-100 relative last:border-b-0"
                    >
                      <div className="relative flex border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 mr-3">
                        <img
                          // src={"/images/prodcuts/pd-temp-1.jpg"}
                          src={`${api.defaults.baseURL}${value?.productDetails?.productImageUrl}`}
                          width="40"
                          height="50"
                          alt="productImg"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="flex flex-col w-full overflow-hidden">
                        <a
                          className="mukta-regular text-sm font-medium text-gray-700 text-heading "
                          href=""
                        >
                          {value?.productDetails?.productTitle}
                        </a>
                        {/* <span className="text-xs text-gray-400 py-1">
                        Color: Blue
                      </span> */}

                        <div className="flex items-center justify-between">
                          <div className="h-5 flex flex-wrap items-start py-1  bg-white text-gray-600 rounded-md">
                            <p className="text-sm font-semibold text-dark">
                              Qty: {value?.quantity}
                            </p>
                          </div>
                          <div className="font-bold text-sm text-heading leading-5">
                            <span className="text-[#a61e22] text-primary">
                              AED {value?.productAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
                    <span>Subtotal</span>
                    <span>AED 1,774</span>
                  </div>
                  <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
                    <span>Discount</span>
                    <span className="text-green-500 ">AED 851</span>
                  </div>
                  <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
                    <span>Delivery Charges</span>
                    <span className="text-green-500 ">FREE</span>
                  </div>
                  <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
                    <span>COD Charges</span>
                    <span>AED 10</span>
                  </div>

                  <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
                    <span>Gift Wrap Charges</span>
                    <span>AED 2</span>
                  </div>

                  <div className="my-4 border-b border-default-200"></div>

                  <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
                    <span>
                      Total{" "}
                      <span className="text-[9px] text-gray-500">
                        (Inclusive of vat)
                      </span>
                    </span>
                    <span className="text-base font-bold text-default-700">
                      AED 1,786
                    </span>
                  </div>

                  <p className="text-sm text-green-600 mt-2">
                    You will earn 705 Loyalty Points with this order.
                  </p>

                  <p className="text-xs my-2">
                    Note: If product ordered on Saturday or Sunday, will be
                    delivered on Tuesday.
                  </p>

                  <a
                    className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#f89d1b] duration-200 bg-[#f89d1b]  hover:text-[#f89d1b]  hover:bg-white"
                    onClick={() => {
                      getConfirmOrder();
                    }}
                  >
                    Confirm Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
