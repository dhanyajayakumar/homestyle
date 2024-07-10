"use client";
import { routs } from "@/config/routs";
import React, { useState } from "react";

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

export default function Forgotpass({}) {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [trueFalse, setTrueFalse] = useState("yes");

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // password: Yup.string()
    //   .min(6, "Password must be at least 6 characters")
    //   .required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log("heresss", values);

      setLoadingStatus(true);
      sendVerification(values.username);
    },
  });

  const sendVerification = async (username: any) => {
    try {
      const postData = {
        otpType: "email",
        email: username,
      };

      const response = await axios.post(
        "https://hsadmin.staging-ecom.com/api/auth/forgot-password",
        postData,
        {
          headers: {
            // Custom headers if needed
          },
        }
      );
      console.log("the here ", response.data);

      if (response.data.status) {
        setTrueFalse("true");
        setStatusMessage(response.data.message);
        setOpen(true);
        setLoadingStatus(false);
        router.push(routs.otpScreen);
        // if (response.data.requestedData.isVerified) {
        //   console.log("Verified");

        // push("/");
        // } else {
        // console.log("Not-Verified");
        // window.location.href = routs.otpScreen;
        // push(routs.otpScreen);
        // sendOtp();
        // }
        // router.push("/");
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

  return (
    <div>
      <section className="container relative px-6 mx-auto my-8 sm:px-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full reset-password-wrapper">
            <h1 className="mb-2 text-xl font-medium text-left text-black sm:text-center">
              Forgot Password
            </h1>

            <div className="mx-auto w-6/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
              {/* <!-- email --> */}
              <div className="w-full h-full input-com">
                <label
                  className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  htmlFor="email"
                >
                  Email Address*
                </label>
                <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border ">
                  <input
                    placeholder="Enter here"
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
              <div className="flex items-center justify-start mt-6 space-x-4 sm:justify-center action-area">
                <a
                  type="button"
                  href={routs.login}
                  className="text-base flex items-center justify-center h-[50px] px-4 hover:bg-gray-200 duration-200 border border-gray-300 font-normal text-black"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  // href="reset-password.html"
                  className="font-normal flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* <!-- graphics area --> */}
      <section className="mt-20 relative before:content-[''] before:absolute before:bg-gradient-to-r before:from-white before:to-transparent before:h-full before:w-[100px] after:content-[''] after:absolute after:bg-gradient-to-l after:from-white after:to-transparent after:h-full after:w-[100px] after:right-0 after:top-0">
        <img
          src="/images/page-footer-bg.png"
          className="min-h-[200px] object-cover"
          alt=""
        />
      </section>
    </div>
  );
}
