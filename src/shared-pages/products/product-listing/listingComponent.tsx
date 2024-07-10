import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import api from "@/lib/url";

export interface ProductItemProps {
  value: any;
  push: any;
  wishlistDataIs: any; // Receive wishlist data
  handleAddToCart: any;
  handleWishlistToggle: any;
  isWishlisted: any;
  setIsWishlisted: any;
  cartData: any;
  cartProductList: any;
}

const ListingComponent = ({
  push,
  value,
  wishlistDataIs,
  handleAddToCart,
  handleWishlistToggle,
  isWishlisted,
  setIsWishlisted,
  cartData,
  cartProductList,
}: ProductItemProps) => {
  const [offeredDiscount, setofferedDiscount] = useState<any>();
  const [percentageDiscIs, setpercentageDiscIs] = useState<any>();
  const [amountDiscPercentageIs, setamountDiscPercentageIs] = useState<any>();

  const defaultProductVariant = useMemo(() => {
    const defaultValue = value.productVariants.find(
      (variant: any) =>
        Number(variant.isDefault) === 1 ||
        variant.slug === value.slug ||
        variant.variantSku === value.sku
    );
    if (defaultValue) {
      return defaultValue;
    } else {
      value.productVariants[0];
    }
  }, [value]);

  // Function to check if product is in cart
  const isProductInCart = useMemo(() => {
    return cartProductList.some(
      (item: any) => item.slug === defaultProductVariant.slug
    );
  }, [cartProductList, defaultProductVariant]);

  const calculateDiscountedPrice = (price: any, discount: any) => {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  useEffect(() => {
    calculateOfferAndPrice();
  }, [defaultProductVariant]);

  useEffect(() => {
    const productsObject = cartData?.products?.reduce(
      (acc: any, product: any) => {
        acc[product._id] = product;
        return acc;
      },
      {} as { [key: string]: any }
    );
    // console.log("the objects:-", JSON.stringify(productsObject, null, 2));
  }, []);

  const calculateOfferAndPrice = () => {
    if (defaultProductVariant) {
      if (defaultProductVariant?.discountPrice) {
        // finding  % under disc->offer
        const discount = value?.offer?.offerIN;
        const price = defaultProductVariant.discountPrice;
        const calculatedPrice = calculateDiscountedPrice(price, discount);
        setofferedDiscount(calculatedPrice);
        // console.log("The price", price);
        // console.log("The price", discount);

        //when offer is % the % is
        const orginalPrice = defaultProductVariant?.price;

        const thePercentageIs =
          ((orginalPrice - calculatedPrice) / orginalPrice) * 100;
        setpercentageDiscIs(thePercentageIs);

        //when offer is amount the % is
        if (value?.offer?.offerType == "amount-off") {
          const orginalPriceAmont = defaultProductVariant?.price;
          const amountOfferDiscount =
            defaultProductVariant.discountPrice - value?.offer?.offerIN;
          const theAmountPercentageIs =
            ((orginalPriceAmont - amountOfferDiscount) / orginalPriceAmont) *
            100;

          // console.log(
          //   "this is:-",
          //   orginalPriceAmont,
          //   amountOfferDiscount,
          //   theAmountPercentageIs
          // );

          setamountDiscPercentageIs(theAmountPercentageIs);
        }
      } else {
        const discount = value?.offer?.offerIN;
        const price = defaultProductVariant.price;
        const calculatedPrice = calculateDiscountedPrice(price, discount);
        setofferedDiscount(calculatedPrice);

        //  the % is
        const orginalPrice = defaultProductVariant?.price;
        const thePercentageIs =
          ((orginalPrice - calculatedPrice) / orginalPrice) * 100;
        setpercentageDiscIs(thePercentageIs);

        //when offer is amount the % is
        if (value?.offer?.offerType == "amount-off") {
          const orginalPriceAmont = defaultProductVariant?.price;
          const amountOfferDiscount = orginalPriceAmont - value?.offer?.offerIN;
          const theAmountPercentageIs =
            ((orginalPriceAmont - amountOfferDiscount) / orginalPriceAmont) *
            100;
          setamountDiscPercentageIs(theAmountPercentageIs);
        }
      }
    }
  };

  const isProductWishlisted = useMemo(() => {
    return wishlistDataIs.some(
      (item: any) => item.slug === defaultProductVariant.slug
    );
  }, [wishlistDataIs, defaultProductVariant]);

  return (
    <div className="relative overflow-hidden bg-white hover:shadow-lg group">
      <Link
        href={{
          pathname: "./product-details",
          query: {
            ProductVarient: defaultProductVariant.slug,
            ProductSku: defaultProductVariant.variantSku,
            ProductPrice: defaultProductVariant.price,
            ProductDiscountPrice: defaultProductVariant.discountPrice,
          },
        }}
        className="cursor-default"
      >
        <div className="relative aspect-square">
          <div className="absolute inset-0 z-10 transition-all duration-300 delay-100 bg-black opacity-0 group-hover:opacity-50"></div>
          <div className="absolute z-20 flex flex-col gap-2 transition-all duration-300 delay-300 -right-16 top-3 group-hover:right-3">
            <a
              className={`w-[50px] h-[50px] bg-white rounded-full grid place-content-center transition-all scale-90 hover:scale-110 ${
                isProductWishlisted ? "fill-red-500" : "fill-current"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle(
                  defaultProductVariant.slug,
                  defaultProductVariant.variantSku
                );
              }}
            >
              <svg
                className="w-[20px] h-fit"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 136.6 113.6"
              >
                <path
                  d="M136.6,40.6c-0.6,2.7-0.9,5.5-1.7,8.2c-2.2,7.7-6.7,13.9-12.3,19.5c-9.8,9.7-20.1,18.7-30.6,27.6
                    c-6.2,5.3-12.5,10.4-18.7,15.6c-3.5,2.9-6.2,2.9-9.7,0C49.2,99.6,34.9,87.7,21.3,75c-4.9-4.5-9.9-8.9-13.7-14.5
                    c-9.1-13.6-10.5-27.9-2-42.2C18.3-2.8,47.2-6.2,64.8,11c1.2,1.1,2.3,2.3,3.6,3.6c1.1-1.1,2.2-2.2,3.2-3.2c4.1-4.1,8.8-7.1,14.2-9.1
                    C108.2-6,133.2,9,136.3,32.6c0.1,0.6,0.2,1.2,0.3,1.8C136.6,36.5,136.6,38.5,136.6,40.6z M68.3,99.9c0.5-0.4,0.8-0.6,1.1-0.8
                    c9.4-8,19-15.9,28.2-24.1c6.5-5.8,12.9-11.7,18.9-18c6.6-6.8,9.4-15.2,7.4-24.6c-4-18.9-26.8-26.7-41.6-14.3c-2.5,2-4.7,4.3-6.9,6.7
                    c-5.1,5.7-8.7,6-14.1-0.1c-1.5-1.7-3.2-3.2-4.8-4.8c-6-5.8-13.1-8.4-21.5-7.5C20,13.9,9.6,28.3,12.9,43.1c1.4,6.5,4.8,11.8,9.6,16.2
                    c8.9,8.2,17.8,16.3,26.8,24.4C55.4,89.2,61.9,94.4,68.3,99.9z"
                />
              </svg>
            </a>
          </div>

          {/* <button
            className="absolute p-2 border-2 left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black hover:border-white group"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(defaultProductVariant.slug);
              console.log(
                "the wishlist :-",
                JSON.stringify(wishlistDataIs, null, 2)
              );
            }}
            disabled={isProductInCart}
          >
            {isProductInCart ? (
              <div className="flex flex-row p-2">
                <span>Already in Cart</span>
                <svg
                  className="-rotate-45 ml-2 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 15 14"
                >
                  <polygon
                    className="fill-current"
                    points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                  />
                </svg>
              </div>
            ) : (
              <div className="flex flex-row p-2">
                <span>Add to Cart</span>
                <svg
                  className="-rotate-45 ml-2 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 15 14"
                >
                  <polygon
                    className="fill-current"
                    points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                  />
                </svg>
              </div>
            )}
          </button> */}

          <button
            className={`absolute p-2 border-2 left-0 right-0 z-10 m-auto text-white transition-all duration-300 translate-y-10 opacity-0 bottom-5 hs-product-item hs-btn h-fit w-fit group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:text-black ${
              isProductInCart ? "hover:text-primary" : "hover:border-white"
            } group`}
            onClick={(e) => {
              e.preventDefault();
              if (isProductInCart) {
                push("/cart");
              } else {
                handleAddToCart(defaultProductVariant.slug);
                // console.log("the slug is:-", defaultProductVariant.slug);
              }
              // console.log(
              //   "the wishlist :-",
              //   JSON.stringify(wishlistDataIs, null, 2)
              // );
            }}
          >
            {isProductInCart ? (
              <div className="flex flex-row p-2">
                <span className="font-bold">Already added</span>
                <svg
                  className="-rotate-45 ml-2 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 15 14"
                >
                  <polygon
                    className="fill-current"
                    points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                  />
                </svg>
              </div>
            ) : (
              <div className="flex flex-row p-2">
                <span>Add to Cart</span>
                <svg
                  className="-rotate-45 ml-2 w-[17px] mt-[4px] fill-white group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 15 14"
                >
                  <polygon
                    className="fill-current"
                    points="7.8,0.3 7.1,1 12.6,6.5 0.6,6.5 0.6,7.5 12.6,7.5 7.1,13 7.8,13.7 14.5,7 "
                  />
                </svg>
              </div>
            )}
          </button>

          <img
            className="object-cover w-full h-full"
            src={`${api.defaults.baseURL}${value?.productImageUrl}`}
            crossOrigin="anonymous"
            alt="prdctImg"
          />
        </div>

        <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
          <a
            href="/product-details"
            className="relative z-20 text-sm font-medium capitalize md:text-base"
          >
            {value?.productTitle}
          </a>
          {value?.offer.length > 0 ? (
            <>
              {defaultProductVariant?.discountPrice ? (
                <>
                  {value?.offer.offerType == "percent" ? (
                    <>
                      <div className="flex flex-wrap items-baseline mt-1">
                        <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                          AED {offeredDiscount}
                        </h2>
                        <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                          AED {defaultProductVariant?.price}
                        </h3>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <a title="">
                          Upto {percentageDiscIs?.toFixed(2)}% Off
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-baseline mt-1">
                        <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                          AED{" "}
                          {defaultProductVariant?.discountPrice -
                            value?.offer?.offerIN}
                        </h2>
                        <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                          AED {defaultProductVariant?.price}
                        </h3>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <a title="">
                          Upto {amountDiscPercentageIs?.toFixed(2)} % Off
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </h3>
                    </>
                  )}
                </>
              ) : (
                <>
                  {value?.offer.offerType == "percent" ? (
                    <>
                      <div className="flex flex-wrap items-baseline mt-1">
                        <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                          AED {offeredDiscount}
                        </h2>
                        <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                          AED {defaultProductVariant?.price}
                        </h3>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <a title="">
                          Upto {percentageDiscIs?.toFixed(2)}% Off
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-baseline mt-1">
                        <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                          AED{" "}
                          {defaultProductVariant?.price - value?.offer?.offerIN}
                        </h2>
                        <h3 className="font-medium text-gray-500 line-through text-md md:text-heading-4">
                          AED {defaultProductVariant?.price}
                        </h3>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <a title="">
                          Upto {amountDiscPercentageIs?.toFixed(2)}% Off
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </h3>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-wrap items-baseline mt-1">
              <h2 className="mr-4 text-base font-medium md:text-base xl:text-lg md:text-heading-3 text-primary">
                AED {defaultProductVariant?.price}
              </h2>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ListingComponent;
