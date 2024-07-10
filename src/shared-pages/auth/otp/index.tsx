"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import endpoints from "@/lib/endpoints";
import BaseUrl from "@/lib/url";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/contexts/MyContext";

// function maskEmail(email: any) {
//   const [localPart, domain] = email?.split("@");
//   const maskedLocalPart = localPart?.substring(0, 3) + "****";
//   return `${maskedLocalPart}@${domain}`;
// }
// function maskPhone(phone: any) {
//   const visibleDigits = phone.slice(-2);
//   const maskedDigits = "*".repeat(phone.length - 2);
//   return `${maskedDigits}${visibleDigits}`;
// }

const Index: React.FC = () => {
  const { push } = useRouter();

  const {
    uniqueId,
    token,
    setToken,
    cartData,
    getCartData,
    wishlistDataIs,
    setwishlistDataIs,
    getWishlistData,
    cartProductList,
    uniqueIdIS,
    storedToken,
    email,
    setuserEmail,
    phone,
    setuserPhone,
    otp,
    setauthOtp,
    userId,
    setuserId,
  } = useUser();

  // const email = localStorage.getItem("emailid");
  // const phone = localStorage.getItem("phone");
  // const otp = localStorage.getItem("otp");
  // const userId = localStorage.getItem("userid");

  // const maskedEmail = maskEmail(email);
  // const maskedPhone = maskPhone(phone);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [OtpValue, setOtpValue] = useState<string>("");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [trueFalse, setTrueFalse] = useState("yes");
  const [openBar, setopenBar] = useState(false);

  useEffect(() => {
    console.log("hereths:-", email, phone, otp, userId);
  }, []);

  const notify = (message: string, isSuccess: boolean) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isSuccess ? "dark" : "colored",
      type: isSuccess ? "success" : "error",
    });
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.currentTarget;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]!.value = ""; // Clear the previous input
      }
    }
  };

  const handleVerify = () => {
    setloadingStatus(true);
    const otpIS = inputRefs.current.map((ref) => ref?.value ?? "").join("");
    setOtpValue(otpIS);
    verifyOtp(otpIS);
    // Here you can perform further actions with the OTP value, such as validation or sending it to an API
    console.log("Entered OTP:", otpIS);
  };

  const resendOTP = async () => {
    try {
      const postData = {
        otpType: "email",
        email: email,
        userId: userId,
      };

      const response = await BaseUrl.post(endpoints.letResendOTP, postData, {
        headers: {},
      });
      // setData(response.data);
      console.log("the out", JSON.stringify(response.data, null, 2));

      if (typeof window !== "undefined") {
        try {
          await localStorage.setItem("otp", response.data.requestedData.otp);
        } catch (error) {
          console.log("Error storing the user data", error);
          return null;
        }
        setauthOtp(response.data.requestedData.otp);
      } else {
        // Handle scenarios where localStorage is not available (server-side rendering)
        console.log("localStorage is not available on the server-side");
        return null;
      }

      if (response.data.status) {
        setloadingStatus(false);
        notify(response.data.message, true);
      } else {
        setloadingStatus(false);
        notify(response.data.message, false);
      }
    } catch (err) {
      console.log("the error", err);
      setloadingStatus(false);
      notify("Otp not send. Please try again.", false);

      // setError(err);
    }
  };

  const verifyOtp = async (otpIS: any) => {
    console.log("the otp", otpIS);
    try {
      const postData = {
        otp: otpIS,
        otpType: "email",
        email: email,
      };

      const response = await BaseUrl.post(endpoints.letVerifyOtp, postData, {
        headers: {},
      });
      // setData(response.data);
      console.log("the out", JSON.stringify(response.data, null, 2));
      if (response.data.status) {
        setloadingStatus(false);

        if (typeof window !== "undefined") {
          try {
            await localStorage.setItem(
              "token",
              response.data.requestedData.token
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
        push("/");
      } else {
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

  return (
    <section className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto mx-auto mt-5">
      <div className="max-w-lg w-full mx-auto pt-[100px] pb-[100px]">
        <div className="w-full mb-8 title-area">
          <h1 className="mb-2 text-2xl font-medium text-black text-center">
            OTP
          </h1>
          <p className="text-center">Enter Your OTP</p>
        </div>
        <form className="max-w-sm mx-auto">
          <div className="flex mb-2 items-center justify-center space-x-2 rtl:space-x-reverse">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <label htmlFor={`code-${idx + 1}`} className="sr-only">
                  Code {idx + 1}
                </label>
                <input
                  type="text"
                  maxLength={1}
                  id={`code-${idx + 1}`}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  className="block w-12 h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-[#F89D1B] focus:border-[#F89D1B] dark:bg-gray-700 dark:border-[#F89D1B] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F89D1B] dark:focus:border-[#F89D1B]"
                  onKeyUp={(e) => handleKeyUp(e, idx)}
                  required
                />
              </div>
            ))}
          </div>

          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-center text-gray-500"
          >
            Please introduce the 6 digit code we sent via email
            {email} and +971{phone}
          </p>

          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-center text-gray-500"
          >
            OTP {otp}
          </p>

          <ToastContainer />
          <div className="pt-5 pb-5 mx-auto flex justify-center">
            {loadingStatus ? (
              <CircularProgress size={18} sx={{ color: "#F89D1B" }} />
            ) : (
              <a
                className="px-9 py-2.5 max-w-md mx-auto text-sm font-bold transition-all border text-white bg-[#F89D1B] hover:bg-[#dc8100]"
                onClick={handleVerify}
              >
                Verify
              </a>
            )}
          </div>
          <p
            id="helper-text-explanation"
            className="text-sm text-center text-gray-500"
          >
            Didn&apos;t received otp ?{" "}
            <button onClick={resendOTP} className="text-primary">
              Re-send OTP
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Index;
