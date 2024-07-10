"use client";
import React, { Fragment, useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import { useRouter } from "next/navigation";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import moment from "moment";
import { useUser } from "@/contexts/MyContext";

const TabbyPayment = ({ tabby }: { tabby: string }) => {
  // const tokenLocal = localStorage.getItem("token");

  // const TabbyPayment = () => {
  // const selectedCountry = useSelector((state: RootState) => state.country.selectedCountry);
  // const currency = useSelector((state: RootState) => state.currencies);

  const { push } = useRouter();
  // const { retrieveCheckoutTabby, retrieveCheckoutTabbyLoading } = useOrder({ fetchRetrieveCheckoutTabby: true, tabbyId: tabby });
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
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState<any>();
  const [Loading, setLoading] = useState<any>(false);
  const [cartDetails, setcartDetails] = useState<any>();
  const [paymentData, setpaymentData] = useState<any>();
  // const cartDetails = (retrieveCheckoutTabby as any)?.requestedData?.cartDetails;
  // const paymentData = (retrieveCheckoutTabby as any)?.requestedData?.paymentData;

  // const translations = useTranslation([
  //     "cart.your-cart-is-empty",
  //     "cart.no-products-in-your-cart",
  //     "shop-now",
  // ]);
  useEffect(() => {
    tabbyPayment();
    console.log("teh id", tabby);
    // letgetTabbyData
  }, []);

  const tabbyPayment = async () => {
    try {
      const response = await api.get(`${endpoints.letgetTabbyData}/${tabby}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        setcartDetails(response.data.requestedData.cartDetails);
        setpaymentData(response.data.requestedData.paymentData);
        console.log(
          "the tabby data is:-",
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.log(
          "the tabby data - error is:-",
          JSON.stringify(response.data.message, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center py-5 lg:py-10">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        .circle {\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n        }\n        .circle:before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n        }\n        .circle-1:before {\n            background: conic-gradient(#51545d 0 25%, transparent 25%);\n        }\n        .circle-2:before {\n            background: conic-gradient(#51545d 0 50%, transparent 50%);\n        }\n        .circle-3:before {\n            background: conic-gradient(#51545d 0 75%, transparent 75%);\n        }\n        .circle-4:before {\n            background: conic-gradient(#51545d 0 100%, transparent 100%);\n        }\n    ",
          }}
        />
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold">Order total</span>
              <span className="text-gray-800 font-bold">
                {/* {formatConvertedPrice(
                  cartDetails?.totalAmount,
                  currency.toCurrency || selectedCountry?.currencyCode,
                  currency.value
                )} */}
                {cartDetails?.totalAmount}
              </span>
            </div>

            <hr className="mb-4" />
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2" />
                <div className="font-bold text-gray-800">
                  4 interest-free payments
                </div>
              </div>
              <div className="bg-green-200 text-green-800 py-1 px-3 rounded-full font-semibold">
                tabby
              </div>
            </div>
            {paymentData &&
              size(paymentData.installments) > 0 &&
              paymentData?.installments?.map((payment: any, index: number) => (
                <Fragment key={index}>
                  <div className="flex items-center space-x-8">
                    <div className="text-center flex flex-col items-center">
                      <div className="circle circle-1 bg-white border border-gray-300" />
                      <div className="mt-2 font-bold  text-gray-800">
                        {payment.downpayment_total}
                      </div>
                      <div className="text-sm text-gray-500">Today</div>
                    </div>
                    {size(payment?.installments) > 0 &&
                      payment.installments.map(
                        (installment: any, installmentIndex: number) => (
                          <div
                            className="text-center flex flex-col items-center"
                            key={installmentIndex}
                          >
                            <div className="circle circle-2 bg-white border border-gray-300" />
                            <div className="mt-2 font-bold  text-gray-800">
                              {installment?.amount}
                            </div>
                            <div className="text-sm text-gray-500">
                              {moment(installment?.due_date).format(
                                "DD-MM-YYYY"
                              )}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                  <div className="flex justify-end mt-8">
                    <b
                      // replaceClassName
                      className="!max-w-xs !flex !items-center !justify-center !px-4 !py-2.5 !text-sm !rounded-md !font-bold !text-white !transition-all !border !border-primary !duration-200 !bg-gray-800 hover:!bg-gray-700"
                      // isLoading={isLoading}
                      onClick={() => {
                        setIsLoading(true);
                        push(payment.web_url);
                      }}
                    >
                      Place Order
                    </b>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbyPayment;
