"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import endpoints from "@/lib/endpoints";
import BaseUrl from "@/lib/url";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { routs } from "@/config/routs";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/MyContext";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phonenumber: Yup.string().required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repassword: Yup.string()
    .min(6, "Repassword must be at least 6 characters")
    .required("Repassword is required"),
});

export default function Register({}) {
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
  const [statusMessage, setstatusMessage] = useState();
  const [trueFalse, settrueFalse] = useState("yes");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [selectedCountry, setselectedCountry] = useState("");
  const [termsndCondition, setTermsAndCondition] = useState<boolean>(false);
  const [bannerImage, setbannerImage] = useState<any>();

  useEffect(() => {
    getRegisterBanner();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
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
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      phonenumber: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // You can perform login logic here
      console.log("the values are", values);
      console.log("the t&c status is:-", termsndCondition);
      setloadingStatus(true);

      userRegister(
        values.firstname,
        values.lastname,
        values.email,
        values.password,
        values.repassword,
        values.phonenumber
      );
      // window.location.href = routs.otpScreen;
    },
  });

  const userRegister = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repassword: string,
    phonenumber: string
  ) => {
    let mobileIs = phonenumber.startsWith("0")
      ? phonenumber.slice(1)
      : phonenumber;
    console.log("the mobile is:-", mobileIs);

    console.log(
      "the values are:-",
      firstname,
      lastname,
      email,
      password,
      repassword,
      phonenumber
    );

    try {
      const postData = {
        email: email,
        firstName: firstname,
        phone: mobileIs,
        password: password,
        confirmPassword: repassword,
        aggreeWithTermsAndCondions: termsndCondition,
        otpType: "email",
      };

      const response = await BaseUrl.post(endpoints.letRegister, postData, {
        headers: {},
      });
      // setData(response.data);
      console.log("the out", JSON.stringify(response.data, null, 2));
      if (response.data.status) {
        settrueFalse("true");
        setOpen(true);
        setstatusMessage(response.data.message);
        setloadingStatus(false);
        push("/auth/otp");
        // localStorage.setItem("userid", response.data.requestedData.userId);
        // localStorage.setItem("otp", response.data.requestedData.otp);
        // localStorage.setItem("emailid", response.data.requestedData.email);
        // localStorage.setItem("phone", response.data.requestedData.phone);

        if (typeof window !== "undefined") {
          try {
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
      } else {
        setstatusMessage(response.data.message);
        settrueFalse("false");
        setOpen(true);
        setloadingStatus(false);
      }
    } catch (err) {
      console.log("the error", err);
      setloadingStatus(false);

      // setError(err);
    } finally {
      // setLoading(false);
      setloadingStatus(false);
    }
  };

  const getRegisterBanner = async () => {
    try {
      const response = await BaseUrl.get(
        `${endpoints.getBanners}?page=register&pageReference=top-right`,
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
              {/* <!-- section heading --> */}
              <div className="flex flex-col justify-between w-full mb-8 title-area">
                <h1 className="mb-2 text-xl font-medium text-black">
                  Create an Account
                </h1>
                <p className="">
                  Already have an Account?{" "}
                  <span>
                    <a
                      className="font-medium text-primary hover:text-primary hover:underline"
                      // href="/auth/login"
                    >
                      Log In
                    </a>
                  </span>
                </p>
              </div>

              <div className="input-are mb-[30px]">
                <div className="flex flex-col mb-5 space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
                  {/* <!-- first name --> */}
                  <div className="w-full h-full input-com">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="firstname"
                    >
                      Frist Name*
                    </label>
                    <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border">
                      <input
                        placeholder="First Name"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="text"
                        id="firstname"
                        {...formik.getFieldProps("firstname")}
                      />
                    </div>
                    {formik.touched.firstname && formik.errors.firstname && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.firstname}
                      </p>
                    )}
                  </div>

                  {/* <!-- last name --> */}
                  <div className="w-full h-full input-com">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="lastname"
                    >
                      Last Name*
                    </label>
                    <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border ">
                      <input
                        placeholder="Last Name"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="text"
                        id="lastname"
                        {...formik.getFieldProps("lastname")}
                      />
                    </div>
                    {formik.touched.lastname && formik.errors.lastname && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-5 space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
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
                        placeholder="Demo@gmail.com"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="email"
                        id="email"
                        // value=""
                        {...formik.getFieldProps("email")}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* <!-- phone number --> */}
                  <div className="w-full h-full input-com">
                    <label
                      htmlFor="phone-input"
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                    >
                      Phone number:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 70.95 71.08"
                        >
                          <path d="M11.75,0c2,0,3.99,0,5.99,0,3.19,0,5.01,1.42,5.56,4.54.83,4.8,1.56,9.62,2.3,14.43.27,1.78-.26,3.38-1.6,4.57-1.76,1.57-3.63,3.02-5.45,4.53-.52.43-1.03.89-1.54,1.35-.37.34-.42.68-.15,1.16,5.16,9.27,12.27,16.6,21.44,21.92,1.51.88,1.49.84,2.81-.31,1.21-1.05,2.5-2.02,3.74-3.04.84-.7,1.67-1.42,2.48-2.16,1.44-1.33,3.07-1.84,5.03-1.51,4.77.82,9.55,1.53,14.31,2.37,2.63.46,4.14,2.1,4.2,4.76.1,4.53.12,9.07-.03,13.6-.11,3.14-2.08,4.87-5.24,4.88-3.63.01-7.24-.35-10.82-.96-8.81-1.51-17.02-4.62-24.5-9.52C16.15,51.34,6.83,38.54,2.34,22.23.86,16.87.1,11.4,0,5.84c-.01-.72.04-1.47.23-2.17C.82,1.41,2.69.08,5.25,0c.05,0,.1,0,.15,0,2.12,0,4.23,0,6.35,0Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="phonenumber"
                        aria-describedby="helper-text-explanation"
                        className="bg-white border text-gray-900 text-sm block w-full h-[50px] ps-10 p-2.5  "
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="000 000 0000"
                        required
                        {...formik.getFieldProps("phonenumber")}
                      />
                    </div>
                    {formik.touched.phonenumber &&
                      formik.errors.phonenumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.phonenumber}
                        </p>
                      )}
                  </div>
                </div>

                {/* <!-- country --> */}
                {/* <form className="w-full mb-5 input-item">
                  <label
                    htmlFor="default"
                    className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  >
                    Select Country
                  </label>
                  <select
                    id="default"
                    className="!bg-white border text-gray-900 h-[50px] w-full mb-6 text-sm block p-2.5"
                    onChange={(event) => {
                      setselectedCountry(event.target.value);
                      console.log("the selected", event.target.value);
                    }}
                  >
                    <option selected>Choose a country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                  </select>
                </form> */}

                {/* <!-- address --> */}
                {/* <div className="mb-5 input-item">
                  <div className="w-full h-full input-com">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="address"
                    >
                      Address*
                    </label>
                    <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border ">
                      <input
                        placeholder="Your address Here"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="text"
                        id="address"
                        {...formik.getFieldProps("address")}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div> */}

                {/* <div className="input-item flex space-x-2.5 mb-5">
                  <div className="w-1/2 h-full">
                    <div className="w-full h-full input-com">
                      <label
                        className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                        htmlFor="town"
                      >
                        Town / City*
                      </label>
                      <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                        <input
                          placeholder=""
                          className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                          type="text"
                          id="town"
                          {...formik.getFieldProps("town")}
                        />
                      </div>
                      {formik.touched.town && formik.errors.town && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.town}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-1/2 h-full">
                    <div className="w-full h-full input-com">
                      <label
                        className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                        htmlFor="zipcode"
                      >
                        Postcode / ZIP*
                      </label>
                      <div className="relative w-full h-full overflow-hidden border input-wrapper border-gray-border ">
                        <input
                          placeholder="00000"
                          className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                          type="text"
                          id="zipcode"
                          {...formik.getFieldProps("zipcode")}
                        />
                      </div>
                      {formik.touched.zipcode && formik.errors.zipcode && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.zipcode}
                        </p>
                      )}
                    </div>
                  </div>
                </div> */}

                <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-[30px]">
                  {/* <!-- password --> */}
                  <div className="w-full h-full input-com">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="password"
                    >
                      Password*
                    </label>
                    <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border ">
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

                  {/* <!-- re-enter password --> */}
                  <div className="w-full h-full input-com">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="repassword"
                    >
                      Re-enter Password*
                    </label>
                    <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border ">
                      <input
                        placeholder="● ● ● ● ● ●"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="password"
                        id="repassword"
                        {...formik.getFieldProps("repassword")}
                      />
                    </div>
                    {formik.touched.repassword && formik.errors.repassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.repassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex items-center mb-6">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      console.log("the status is", target.checked);
                      setTermsAndCondition(target.checked);
                    }}
                  />
                  <label
                    htmlFor="link-checkbox"
                    className=" ms-2 dark:text-gray-800"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>
                <div>
                  {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
                  {trueFalse == "true" ? (
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={statusMessage}
                      action={actionSuccess}
                      sx={{
                        "& .MuiPaper-root": {
                          backgroundColor: "rgba(255,255,255,0.5)",
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
                          backgroundColor: "rgba(255,255,255,0.5)",
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
                      type="submit"
                      // href="login.html"
                      className="font-normal capitalize flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2"
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={`${BaseUrl.defaults.baseURL}${bannerImage?.bannerImageUrl}`}
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
