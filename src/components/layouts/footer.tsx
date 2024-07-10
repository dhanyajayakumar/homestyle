"use client";
import React, { useState } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {/* <!-- subscription area --> */}
      <div className="bg-[#FFF1DE]">
        <div className="">
          <div className="flex flex-wrap justify-between gap-8  px-3 py-4 mx-auto sm:px-6 container-fluid md:grid-cols-2">
            <div>
              <h2 className="mb-1 text-2xl font-normal text-gray-900 capitalize">
                Subscribe to our awesome emails.
              </h2>
              <p className="mb-1 text-2l font-normal text-gray-900 capitalize">
                Get our latest offers and news straight in your inbox.
              </p>
              <div className="flex mt-6 mb-5">
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                />
                <button
                  type="submit"
                  className="text-white uppercase bg-primary hover:bg-primary font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <h2 className="mb-1 text-2xl font-normal text-gray-900 capitalize">
                Download Apps!
              </h2>
              <p>
                We&apos;re bringing a whole new way to shop our products &amp;
                offers on-the-go.
              </p>
              <div className="flex gap-5 mt-6">
                <img
                  className="w-[130px] sm:w-[165px] md:w-[165px] object-contain"
                  src="/images/ios-d.png"
                  alt="iOS Download"
                />
                <img
                  className="w-[130px] sm:w-[165px] md:w-[165px] object-contain"
                  src="/images/play-d.png"
                  alt="Play Store Download"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 px-3 py-4 mx-auto sm:px-6 container-fluid border-t border-[#603813] border-opacity-30 md:flex-col lg:flex-row">
          <div>
            <h2 className="mb-1 text-2xl font-normal text-gray-900 capitalize">
              We’re Always here to Help
            </h2>
            <p>Reach us out through any of these channels</p>
          </div>
          <div className="flex flex-wrap gap-6 lg:gap-10 lg:justify-start md:justify-start text-nowrap">
            <div className="flex items-center gap-3">
              <span className="grid place-content-center rounded-full bg-primary w-[40px] aspect-square">
                <img src="/images/mail-icon.svg" alt="Email Icon" />
              </span>
              <a className="text-black" href="mailto:wecare@homestyleuae.com">
                wecare@homestyleuae.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid place-content-center rounded-full bg-primary w-[40px] aspect-square">
                <img src="/images/phone-icon.svg" alt="Phone Icon" />
              </span>
              <a className="text-black" href="tel:+971569910280">
                +971 56 991 0280
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid place-content-center rounded-full bg-primary w-[40px] aspect-square">
                <img src="/images/whatsapp-icon.svg" alt="WhatsApp Icon" />
              </span>
              <a className="text-black" href="https://wa.me/971569910280">
                +971 56 991 0280
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-t border-gray-100">
        {/* <!-- footer menu section --> */}
        <div className="py-6 pb-16 border-t lg:pb-0 xl:pb-0">
          <div className="px-3 mx-auto sm:px-6 container-fluid">
            <div className="grid grid-cols-2 gap-8 py-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 lg:py-6">
              <div>
                <h4 className="mb-3 font-medium uppercase">Home Styles</h4>
                <ul>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Furniture
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Living Room
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Home Decor
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Bedroom
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="invisible mb-3 font-medium uppercase">Empty</h4>
                <ul>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Dining
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Kids
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Bath & Laundry
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Kitchen
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-medium uppercase">Account</h4>
                <ul>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Login / Sign up
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="invisible mb-3 font-medium uppercase">Empty</h4>
                <ul>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Returns & Exchanges
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Shipping & Delivery Policy
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-medium uppercase">Quick Links</h4>
                <ul>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      Our Stores
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      My Account
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      className="opacity-75 hover:opacity-100 hover:underline"
                      href="#"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-medium uppercase">Connect with us</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="grid place-content-center border border-black rounded-full min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
                  >
                    <svg
                      className="w-[15px]"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 12 20"
                      enableBackground="new 0 0 12 20"
                    >
                      <path d="M3.2,19.5h4v-8h3.6l0.4-4h-4v-2c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3h3v-4h-3C6.9,0.5,5.6,1,4.7,2C3.7,2.9,3.2,4.2,3.2,5.5v2h-2l-0.4,4h2.4V19.5z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="grid place-content-center border border-black rounded-full min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
                  >
                    <svg
                      className="w-[20px] h-[20px]"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 12.69"
                    >
                      <path
                        d="M11.02,0h2.15l-4.69,5.37,5.52,7.31h-4.32l-3.39-4.44-3.87,4.44H.28l5.02-5.75L0,0h4.43l3.06,4.05L11.02,0ZM10.27,11.4h1.19L3.78,1.22h-1.28l7.77,10.18Z"
                        style={{ fill: "#000", strokeWidth: "0px" }}
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="grid place-content-center border border-black rounded-full min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
                  >
                    <svg
                      className="w-[22px]"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10,7C9.2,7,8.4,7.3,7.9,7.9S7,9.2,7,10c0,0.8,0.3,1.6,0.9,2.1S9.2,13,10,13c0.8,0,1.6-0.3,2.1-0.9S13,10.8,13,10c0-0.8-0.3-1.6-0.9-2.1S10.8,7,10,7z M10,5c1.3,0,2.6,0.5,3.5,1.5C14.5,7.4,15,8.7,15,10c0,1.3-0.5,2.6-1.5,3.5C12.6,14.5,11.3,15,10,15c-1.3,0-2.6-0.5-3.5-1.5C5.5,12.6,5,11.3,5,10c0-1.3,0.5-2.6,1.5-3.5C7.4,5.5,8.7,5,10,5z M16.5,4.7c0,0.3-0.1,0.6-0.4,0.9C15.9,5.9,15.6,6,15.3,6s-0.6-0.1-0.9-0.4C14.1,5.4,14,5.1,14,4.7s0.1-0.6,0.4-0.9c0.2-0.2,0.6-0.4,0.9-0.4s0.6,0.1,0.9,0.4C16.4,4.1,16.5,4.4,16.5,4.7z M10,2C7.5,2,7.1,2,6,2.1c-0.8,0-1.3,0.1-1.8,0.3C3.8,2.5,3.4,2.8,3.1,3.1C2.8,3.4,2.5,3.8,2.4,4.2C2.2,4.7,2.1,5.2,2.1,6C2,7.1,2,7.5,2,10c0,2.5,0,2.9,0.1,4c0,0.8,0.1,1.3,0.3,1.8c0.2,0.4,0.4,0.7,0.7,1.1c0.3,0.3,0.6,0.5,1.1,0.7c0.5,0.2,1,0.3,1.8,0.3C7.1,18,7.5,18,10,18c2.5,0,2.9,0,4-0.1c0.8,0,1.3-0.1,1.8-0.3c0.4-0.2,0.8-0.4,1.1-0.7c0.3-0.3,0.5-0.6,0.7-1.1c0.2-0.5,0.3-1,0.3-1.8c0.1-1.1,0.1-1.5,0.1-4c0-2.5,0-2.9-0.1-4c0-0.8-0.1-1.3-0.3-1.8c-0.2-0.4-0.4-0.8-0.7-1.1c-0.3-0.3-0.7-0.6-1.1-0.7c-0.5-0.2-1-0.3-1.8-0.3C12.9,2,12.5,2,10,2 M10,0c2.7,0,3.1,0,4.1,0.1c1.1,0.1,1.8,0.2,2.4,0.5c0.7,0.3,1.2,0.6,1.8,1.2c0.5,0.5,0.9,1.1,1.2,1.8c0.2,0.6,0.4,1.4,0.5,2.4C20,6.9,20,7.3,20,10s0,3.1-0.1,4.1c-0.1,1.1-0.2,1.8-0.5,2.4c-0.3,0.7-0.6,1.3-1.2,1.8c-0.5,0.5-1.1,0.9-1.8,1.2c-0.6,0.2-1.4,0.4-2.4,0.5C13.1,20,12.7,20,10,20s-3.1,0-4.1-0.1c-1.1-0.1-1.8-0.2-2.4-0.5c-0.7-0.3-1.3-0.6-1.8-1.2c-0.5-0.5-0.9-1.1-1.2-1.8c-0.2-0.6-0.4-1.4-0.5-2.4C0,13.1,0,12.7,0,10s0-3.1,0.1-4.1c0.1-1.1,0.2-1.8,0.5-2.4c0.3-0.7,0.6-1.3,1.2-1.8c0.5-0.5,1.1-0.9,1.8-1.2c0.6-0.2,1.4-0.4,2.4-0.5C6.9,0,7.3,0,10,0" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- footer copyright section --> */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-3 py-3 mx-auto mt-3 mb-2 sm:px-6 border-y container-fluid">
          <div className="">
            <p className="text-sm leading-6 text-gray-500">
              HomeStyle © 2024 All Rights Reserved
            </p>
          </div>
          <div className="">
            <ul className="flex items-center text-sm">
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img width="50" src="/images/noon-pay.png" alt="Noon Pay" />
              </li>
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img width="50" src="/images/visa.svg" alt="Visa" />
              </li>
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img width="50" src="/images/master.svg" alt="Master" />
              </li>
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img width="50" src="/images/mastero.svg" alt="Mastero" />
              </li>
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img
                  width="50"
                  src="/images/americanexpress.svg"
                  alt="American Express"
                />
              </li>
              <li className="flex items-center mr-3 transition duration-500 ease-in-out">
                <img width="50" src="/images/tabby.svg" alt="Tabby" />
              </li>
            </ul>
          </div>
          <div>
            <p>
              Designed by{" "}
              <span className="">
                <a
                  className="text-black hover:text-gray-500"
                  href="https://tomsher.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tomsher Technologies LLC
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* <!-- footer smo section --> */}

      <div className="px-3">
        <div id="accordion-open" className="accordion">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-0 focus:ring-transparent dark:focus:ring-transparent dark:border-transparent dark:text-transparent hover:bg-transparent dark:hover:bg-gray-100 gap-3 ${
                isOpen ? "aria-expanded=true" : "aria-expanded=false"
              }`}
              aria-expanded={isOpen}
              aria-controls="accordion-open-body-1"
              onClick={toggleAccordion}
            >
              <span className="flex items-center">Quick Delivery</span>
              <svg
                className={`accordion-icon w-3 h-3 shrink-0 transition-transform ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {isOpen && (
            <div
              id="accordion-open-body-1"
              className="accordion-body p-5 border border-b-0 border-gray-200"
              aria-labelledby="accordion-open-heading-1"
            >
              <h2 className="text-xs font-bold text-gray-600 mb-1">
                Quick Delivery to Your Home
              </h2>
              <p className="text-xs text-gray-500 leading-1">
                Watches have defined a significant evolution for mankind and has
                captivated him ever since. Each watch has a unique, rich patina
                and self-indulgent lustre and the new innovative design provides
                more transparency and depth; illustrating the technical
                ingenuity. Time House Dubai owns the sophisticated aura of
                remarkable watch collections. Buy watches online, Dubai at Time
                House where a wide range of high-quality genuine watches from
                leading watch brands is listed.
                <br />
                Complete your look with a classy sophisticated designer watch
                for men and try our robust collection for your carefully picked
                out attire. Buy men watches online, UAE, something that fits
                your personal style. Refining your search to accommodate the
                desired budget or available discounts at Time House Dubai as we
                keep an array of brands. Our team of experts will offer you an
                honest and hassle-free selling experience making it simple to
                find the right watch to suit your budget, taste, and lifestyle.
                <br />
                illustrating the technical ingenuity. Time House Dubai owns the
                sophisticated aura of remarkable watch collections. Buy watches
                online, Dubai at Time House where a wide range of high-quality
                genuine watches from leading watch brands is listed.
                <br />
                Complete your look with a classy sophisticated designer watch
                for men and try our robust collection for your carefully picked
                out attire. Buy men watches online, UAE, something that fits
                your personal style. Refining your search to accommodate the
                desired budget or available discounts at Time House Dubai as we
                keep an array of brands. Our team of experts will offer you an
                honest and hassle-free selling experience making it simple to
                find the right watch to suit your budget, taste, and lifestyle.
              </p>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">
                  What can you buy from Time House?
                </h2>
                <p className="text-xs text-gray-500 leading-1">
                  Time House Dubai is complemented with a wide range of watch
                  styles online so that you can get your watch home,
                  stress-free. We present classic watches with refined modernity
                  and offer a variety of stylish watches that suit the different
                  lifestyles of all. The watches here display elegance at their
                  best for people of different tastes and contribute to your
                  watch in terms of the style you want, performance and trend.
                </p>
              </div>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">Men</h2>
                <p className="text-xs text-gray-500 leading-1">
                  Watches for men look fashionable and stylish with our branded,
                  designer, cool, multifunction and classic wristwatches in an
                  affordable price range. Find your choice of the latest design,
                  cool wristwatches from our huge collection of high quality
                  watches in different varieties, all types of colours and
                  designs.
                </p>
              </div>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">Bags</h2>
                <p className="text-xs text-gray-500 leading-1">
                  Buy bags online from the latest branded watch shop in Dubai.
                  We are considered as one of the top sellers of luggage bags in
                  Dubai. Get a sophisticated and fashionable collection of bags
                  that derives its inspiration from the essence of travel and
                  journeys beyond travel.
                </p>
              </div>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">
                  Men&apos;s Eyewear
                </h2>
                <p className="text-xs text-gray-500 leading-1">
                  Look on the bright side with our range of sunglasses
                  thoughtfully handpicked for you to render a stylish look on
                  your face.
                </p>
              </div>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">
                  Couple Watches
                </h2>
                <p className="text-xs text-gray-500 leading-1">
                  Couple watches are the best way to express love and we offer
                  amazing sets of couple watches of top brands. The designs are
                  exclusively made to depict the love and specific gender
                  features so that the loved ones can share their adorableness
                  in a much more creative and easy way.
                </p>
              </div>
              <div className="mt-1">
                <h2 className="text-xs font-medium text-gray-600 mb-1">
                  Men&apos;s Jewellery
                </h2>
                <p className="text-xs text-gray-500 leading-1">
                  Unbox the freshest finishing touches with our range of
                  men&apos;s jewellery collections. The men&apos;s jewellery
                  collection here has stepped out of the shadow as a way of
                  personalising your style and to own styles to wear that are
                  paving the way this season.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
