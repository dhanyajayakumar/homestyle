"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/MyContext";
// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Login component
export default function Login() {
  const { push } = useRouter();
  const {
    uniqueId,
    token,
    setToken,
    email,
    setuserEmail,
    phone,
    setuserPhone,
    otp,
    setauthOtp,
    userId,
    setuserId,
  } = useUser();
  const [open, setOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [trueFalse, setTrueFalse] = useState("yes");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [bannerImage, setbannerImage] = useState<any>();

  useEffect(() => {
    getLoginBanner();
  }, []);

  // Handle snackbar close
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Success and Fail snackbar actions
  const actionSuccess = (
    <React.Fragment>
      <Button sx={{ color: "green" }} size="small" onClick={handleClose}>
        Ok
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  );
  const actionFail = (
    <React.Fragment>
      <Button sx={{ color: "red" }} size="small" onClick={handleClose}>
        Ok
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoadingStatus(true);
      userLogin(values.username, values.password);
    },
  });

  // Function to handle user login
  const userLogin = async (username: string, password: string) => {
    try {
      const postData = {
        email: username,
        password: password,
      };

      const response = await api.post(endpoints.letsLogin, postData, {
        headers: {
          // Custom headers if needed
        },
      });
      console.log("the data is look", JSON.stringify(response.data, null, 2));

      if (response.data.status) {
        setTrueFalse("true");
        setStatusMessage(response.data.message);
        setOpen(true);
        setLoadingStatus(false);

        if (typeof window !== "undefined") {
          try {
            await localStorage.setItem(
              "token",
              response.data.requestedData.token
            );
            await localStorage.setItem(
              "userid",
              response.data.requestedData.userId
            );
            await localStorage.setItem("otp", response.data.requestedData.otp);
            await localStorage.setItem(
              "emailid",
              response.data.requestedData.email
            );
            await localStorage.setItem(
              "phone",
              response.data.requestedData.phone
            );
          } catch (error) {
            console.log("Error storing the user data", error);
            return null;
          }
        } else {
          // Handle scenarios where localStorage is not available (server-side rendering)
          console.log("localStorage is not available on the server-side");
          return null;
        }

        setuserEmail(response.data.requestedData.email);
        setuserPhone(response.data.requestedData.phone);
        setauthOtp(response.data.requestedData.otp);
        setuserId(response.data.requestedData.userId);

        setToken(response.data.requestedData.token);
        if (response.data.requestedData.isVerified) {
          console.log("Verified");

          push("/");
        } else {
          push("/auth/otp");
        }
      } else {
        setStatusMessage(response.data.message);
        setTrueFalse("false");
        setOpen(true);
        setLoadingStatus(false);
      }
    } catch (err) {
      console.log("Error:", err);
      setLoadingStatus(false);
      setTrueFalse("false");
      setStatusMessage("Login failed. Please try again.");
      setOpen(true);
    }
  };

  const getLoginBanner = async () => {
    try {
      const response = await api.get(
        `${endpoints.getBanners}?page=login&pageReference=top-right`,
        {
          headers: {},
        }
      );
      console.log(
        "the pcTopBottom is:-",
        JSON.stringify(response.data, null, 2)
      );
      setbannerImage(response.data.requestedData[0]?.bannerImages[0]);
    } catch (err) {
      console.log("the error", err);
    }
  };
  return (
    <div>
      <section className="container px-3 mx-auto my-8 sm:px-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 login-wrapper">
            <div className="w-full my-auto">
              <div className="flex flex-col justify-between w-full mb-8 title-area">
                <h1 className="mb-2 text-xl font-medium text-black">Login</h1>
                <p className="">
                  Don&apos;t have an account?
                  <span>
                    <a
                      className="font-medium text-primary hover:text-primary hover:underline"
                      href="/auth/register"
                    >
                      Create here
                    </a>
                  </span>
                </p>
              </div>

              <div className="input-area mb-[30px]">
                <div className="w-full h-full mb-5 input-com">
                  <label
                    className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal"
                    htmlFor="username"
                  >
                    User Name*
                  </label>
                  <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border">
                    <input
                      placeholder="Enter your email address"
                      className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                      type="text"
                      id="username"
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                  {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.username}
                    </p>
                  )}
                </div>

                <div className="w-full h-full input-com">
                  <label
                    className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal"
                    htmlFor="password"
                  >
                    Password*
                  </label>
                  <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border">
                    <input
                      placeholder="● ● ● ● ● ●"
                      className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                      type="password"
                      id="password"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="">
                <div className="flex justify-between">
                  <div className="flex items-center mb-6">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ms-2 dark:text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/auth/forgotpassword"
                    className="font-medium text-black hover:text-primary hover:underline"
                  >
                    Forgot Your Password?
                  </a>
                </div>
                <div>
                  {trueFalse == "true" ? (
                    <Snackbar
                      open={open}
                      // anchorOrigin={}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={statusMessage}
                      action={actionSuccess}
                      sx={{
                        "& .MuiPaper-root": {
                          backgroundColor: "white",
                          color: "green",
                        },
                      }}
                    />
                  ) : (
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={statusMessage}
                      action={actionFail}
                      sx={{
                        "& .MuiPaper-root": {
                          backgroundColor: "white",
                          color: "red",
                        },
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center w-full gap-5">
                  {loadingStatus ? (
                    <div className="font-normal capitalize flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2">
                      <CircularProgress size={18} sx={{ color: "white" }} />
                    </div>
                  ) : (
                    <button
                      // onClick={() => {
                      //   console.log("The token:-", token);
                      //   console.log("THe UUID:-", uniqueId);
                      // }}
                      type="submit"
                      className="font-normal capitalize flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={`${api.defaults.baseURL}${bannerImage?.bannerImageUrl}`}
                className="object-cover h-full ml-6"
                alt="banner"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
