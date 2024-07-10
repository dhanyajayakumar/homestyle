"use client";
import React, { useEffect, useState } from "react";

import WishlistScreen from "@/shared-pages/wishlist/wishlist";
import Endpoints from "@/lib/endpoints";
import Api from "@/lib/url";
import { useUser } from "@/contexts/MyContext";
import { useRouter } from "next/navigation";

interface WishListProps {
  wishListIs: any;
}

export default function Index({}) {
  const { push } = useRouter();
  const {
    uniqueId,
    token,
    setToken,
    uniqueIdIS,
    storedToken,
    wishlistDataIs,
    getWishlistData,
  } = useUser();
  // const tokenLocal = localStorage.getItem("token");
  const [wishListIs, setwishListIs] = useState<any>();
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    getWishlists();
  }, []);

  const getWishlists = async () => {
    console.log("the token is:-", JSON.stringify(storedToken));

    try {
      const response = await Api.get(Endpoints.getWishList, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log("the list is:-", JSON.stringify(response.data, null, 2));
      // console.log("the token is:-", JSON.stringify(`Bearer${token}`));
      setwishListIs(response.data.requestedData);
      // setgetSliders(response.data.requestedData);
    } catch (err) {
      console.log("the error", err);
    }
  };

  const removeFromWishList = async (slugIs: any, skuIs: any) => {
    // console.log("The sku and slug is here:-", skuIs, "and", slugIs);
    try {
      const postData = {
        slug: slugIs,
        sku: skuIs,
      };

      const response = await Api.post(Endpoints.addToWishList, postData, {
        headers: {
          // Custom headers if needed

          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.status) {
        // console.log(
        //   "the wishRemoving - out is:-",
        //   JSON.stringify(response.data, null, 2)
        // );
        // getWishlists();
        getWishlistData(storedToken, uniqueIdIS);
      } else {
        // console.log(
        //   "the wishadding - error is:-",
        //   JSON.stringify(response.data, null, 2)
        // );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <WishlistScreen
        wishListIs={wishlistDataIs}
        removeFromWishList={removeFromWishList}
      />
    </div>
  );
}
