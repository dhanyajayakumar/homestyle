"use client";
// context/UserContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUniqueId } from "../utils/uniqueId";
import api from "@/lib/url";
import endpoints from "@/lib/endpoints";
import authHelpers from "@/server_api/storage";

type UserContextType = {
  uniqueId: string | null;
  token: string | null;
  storedToken: string | null;
  setstoredToken: (token: string | null) => void;
  setToken: (token: string | null) => void;
  uniqueIdIS: any;
  setuniqueIdIS: any;
  cartData: any;
  setcartData: any;
  getCartData: any;
  wishlistDataIs: any;
  setwishlistDataIs: any;
  getWishlistData: any;
  setcartProductList: any;
  cartProductList: any;
  email: null;
  setuserEmail: any;
  phone: any;
  setuserPhone: any;
  otp: any;
  setauthOtp: any;
  userId: null;
  setuserId: any;
};

const initialUserContext: UserContextType = {
  uniqueId: null,
  token: null,
  storedToken: null,
  setstoredToken: () => {},
  uniqueIdIS: null,
  setuniqueIdIS: () => {},
  setToken: () => {},
  cartData: {},
  setcartData: {},
  getCartData: () => {},
  wishlistDataIs: {},
  setwishlistDataIs: {},
  getWishlistData: () => {},
  setcartProductList: [],
  cartProductList: [],
  email: null,
  setuserEmail: () => {},
  phone: null,
  setuserPhone: () => {},
  otp: null,
  setauthOtp: () => {},
  userId: null,
  setuserId: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  // const uniqueIdIS = localStorage.getItem("uniqueId");

  const [token, setToken] = useState<string | null>(null);
  const [cartData, setcartData] = useState<any>();
  const [cartProductList, setcartProductList] = useState<any>();
  const [wishlistDataIs, setwishlistDataIs] = useState<any>();
  const [storedToken, setstoredToken] = useState<any>();
  const [uniqueIdIS, setuniqueIdIS] = useState<any>();

  const [email, setuserEmail] = useState<any>();
  const [phone, setuserPhone] = useState<any>();
  const [otp, setauthOtp] = useState<any>();
  const [userId, setuserId] = useState<any>();
  // useEffect(() => {
  //   setUniqueId(getUniqueId());
  // }, []);

  useEffect(() => {
    const fetchAuthData = async () => {
      const tokenLocal = await authHelpers.getToken();
      const uniqueIdISa = await authHelpers.UUID();
      const email = await localStorage.getItem("emailid");
      const phone = await localStorage.getItem("phone");
      const otp = await localStorage.getItem("otp");
      const userId = await localStorage.getItem("userid");
      setstoredToken(tokenLocal);
      setuniqueIdIS(uniqueIdISa);
      setuserEmail(email);
      setuserPhone(phone);
      setauthOtp(otp);
      setuserId(userId);
      // console.log("GetToken", uniqueIdISa);
      getCartData(tokenLocal, uniqueIdISa);
      getWishlistData(tokenLocal, uniqueIdISa);
    };
    // console.log("GetToken", getToken);
    // const user = await authStorage.getUser();
    fetchAuthData();
    // const tokenLocal = localStorage.getItem("token");
    // getCartData();
    // getWishlistData();
    const id = getUniqueId();
    console.log("Generated uniqueId:", id); // Debugging log
    setUniqueId(id);
  }, []);

  const getCartData = async (tokenLocal: any, uniqueIdIS: any) => {
    console.log("incide cartapicall", uniqueIdIS);
    console.log("incide tokenLocal", tokenLocal);

    try {
      const headers: any = {
        // Custom headers if needed
        "User-token": uniqueIdIS,
      };

      if (storedToken) {
        headers.Authorization = `Bearer ${tokenLocal}`;
      }
      console.log("Headers of cart call is:-", headers);

      const response = await api.get(endpoints.getCartData, {
        headers: headers,
      });

      console.log(
        "the Cart Data is:-called",
        JSON.stringify(response.data, null, 2)
      );
      setcartData(response.data.requestedData);
      setcartProductList(response.data.requestedData.products);
    } catch (err) {
      console.log("the error of cart call", err);
    }
  };

  const getWishlistData = async (tokenLocal: any, uniqueIdIS: any) => {
    try {
      const response = await api.get(endpoints.getWishList, {
        headers: {
          "User-token": uniqueIdIS,
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${tokenLocal}`,
        },
      });
      console.log(
        "the wishlist Data is:-",
        JSON.stringify(response.data, null, 2)
      );
      setwishlistDataIs(response.data.requestedData);
    } catch (err) {
      console.log("the error", err);
    }
  };
  return (
    <UserContext.Provider
      value={{
        uniqueId,
        token,
        setToken,
        cartData,
        setcartData,
        getCartData,
        wishlistDataIs,
        setwishlistDataIs,
        getWishlistData,
        setcartProductList,
        cartProductList,
        storedToken,
        setstoredToken,
        uniqueIdIS,
        setuniqueIdIS,
        email,
        setuserEmail,
        phone,
        setuserPhone,
        otp,
        setauthOtp,
        userId,
        setuserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
