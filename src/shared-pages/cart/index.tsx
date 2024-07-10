"use client";
import React, { useState, useEffect } from "react";
import Cartscreen from "@/shared-pages/cart/cartscreen";
import { useUser } from "@/contexts/MyContext";
import api from "@/lib/url";
import endpoints from "@/lib/endpoints";

export default function Index({}) {
  const {
    uniqueId,
    token,
    setToken,
    cartData,
    setcartData,
    getCartData,
    wishlistDataIs,
    setwishlistDataIs,
    getWishlistData,
    cartProductList,
    uniqueIdIS,
    storedToken,
  } = useUser();
  // const [cartData, setcartData] = useState<any>();
  // const tokenLocal = localStorage.getItem("token");
  // const uniqueIdIS = localStorage.getItem("uniqueId");

  const [quantity, setQuantity] = useState(0);
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [theCouponList, settheCouponList] = useState();
  // const [TotalQuantity, setTotalQuantity] = useState<any>()
  useEffect(() => {
    console.log("Cart Data:", JSON.stringify(cartData, null, 2)); // Debugging log
    // const products = cartData.requestedData.products;
    // let sum = 0;

    // // Calculate total quantity
    // products.forEach((product:any) => {
    //     sum += product.quantity;
    // });

    // // Update state with total quantity
    // setTotalQuantity(sum);
  }, [cartData]);
  useEffect(() => {
    getCouponList();
  }, []);

  const changeTheQuantity = async (
    itemId: any,
    itemQuantity: any,
    itemSlug: any
  ) => {
    console.log("The out is:-", itemId, "&", itemQuantity, "&", itemSlug);

    try {
      const postData = {
        quantity: itemQuantity,
        slug: itemSlug,
        quantityChange: true,
      };
      const headers: any = {
        // Custom headers if needed
        "User-token": uniqueIdIS,
      };

      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }
      const response = await api.post(endpoints.addToCart, postData, {
        headers: headers,
      });

      if (response.data.status) {
        console.log(
          "the change q in cart is:-",
          JSON.stringify(response.data, null, 2)
        );
        setcartData(response.data.requestedData);
      } else {
        console.log(
          "the change q in cart - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemCart = async (itemSlug: any) => {
    console.log("t", itemSlug);

    try {
      const postData = {
        quantity: 0,
        slug: itemSlug,
      };
      const headers: any = {
        // Custom headers if needed
        "User-token": uniqueIdIS,
      };

      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }
      console.log("Headers of cart call is:-", headers);

      const response = await api.post(endpoints.deletItemCart, postData, {
        headers: headers,
      });

      if (response.data.status) {
        console.log(
          "the delete cart is:-",
          JSON.stringify(response.data, null, 2)
        );
        getCartData(storedToken, uniqueIdIS);
        // setcartData(response.data.requestedData);
      } else {
        console.log(
          "the delete cart  - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (productSlug: any, productSku: any) => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      console.log("Added to wishlists:");
      letsAddTo(productSlug, productSku);
    } else {
      console.log("Removed from wishlists:");
      letsRemoveTo(productSlug, productSku);
    }
  };
  const letsAddTo = async (productSlug: any, productSku: any) => {
    console.log("inside letsAddTo:-", productSlug, "and", productSku);
    try {
      const postData = {
        slug: productSlug,
        sku: productSku,
      };

      const response = await api.post(endpoints.addToWishList, postData, {
        headers: {
          // Custom headers if needed

          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the wishadding - out is:-",
          JSON.stringify(response.data, null, 2)
        );
        getWishlistData(storedToken, uniqueIdIS);
      } else {
        console.log(
          "the wishadding - error is:-",
          JSON.stringify(response.data, null, 2)
        );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const letsRemoveTo = (productSlug: any, productSku: any) => {
    console.log("inside letsRemoveTo:-", productSlug, "and", productSku);
  };

  const getCouponList = async () => {
    try {
      const response = await api.get(endpoints.getCouponList, {
        headers: {
          // Custom headers if needed
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        console.log(
          "the coupon - out is:-",
          JSON.stringify(response.data, null, 2)
        );
        settheCouponList(response.data.requestedData);
      } else {
        console.log(
          "the coupon - error is:-",
          JSON.stringify(response.data, null, 2)
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
      <Cartscreen
        // decrementQuantity={decrementQuantity}
        // incrementQuantity={incrementQuantity}
        // quantity={quantity}
        changeTheQuantity={changeTheQuantity}
        deleteItemCart={deleteItemCart}
        theCouponList={theCouponList}
      />
    </div>
  );
}
