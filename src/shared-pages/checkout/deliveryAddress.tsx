// "use client";
// import React, { useState, Fragment } from "react";

// import { useFormik } from "formik";
// import AddAddressForm from "./addressForm";
// import EditAddAddressForm from "./editAddressForm";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import BasicModal from "@/components/modal";

// export interface DeliveryAddressProps {
//   dAddress: any[];
// }
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   username: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ dAddress }) => {
//   const [addresses, setAddresses] = useState(dAddress);
//   const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
//   const [loadingStatus, setLoadingStatus] = useState(false);
//   const [modalIs, setmodalIs] = useState<any>("add");
//   const [editAddressData, seteditAddressData] = useState<any>();
//   const [open, setopen] = useState(false);

//   const handleAddressClick = (index: number) => {
//     setSelectedAddress(index);
//   };

//   const handleDelete = (index: number) => {
//     const newAddresses = addresses.filter((_, i) => i !== index);
//     setAddresses(newAddresses);
//     if (selectedAddress === index) {
//       setSelectedAddress(null);
//     }
//   };

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       setLoadingStatus(true);
//       //   userLogin(values.username, values.password);
//     },
//   });

//   const gotToEditAddress = () => {};
//   return (
//     <div
//       id="delivery-section"
//       className="bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//         {dAddress?.map((address, index) => (
//           <div
//             key={index}
//             className={`border p-4 rounded-lg flex-1 ${
//               selectedAddress === index ? "border-blue-500" : "border-gray-300"
//             }`}
//             onClick={() => handleAddressClick(index)}
//           >
//             {/* {index === 0 && ( */}
//             {address?.defaultAddress && (
//               <span className="flex items-center gap-2 bg-green-100 py-2 px-2 mb-3">
//                 <svg
//                   className="w-[20px] h-[20px]"
//                   id="fi_4436481"
//                   enableBackground="new 0 0 512 512"
//                   height="512"
//                   viewBox="0 0 512 512"
//                   width="512"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipRule="evenodd" fillRule="evenodd">
//                     <path
//                       d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
//                       fill="#4bae4f"
//                     ></path>
//                     <path
//                       d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
//                       fill="#fff"
//                     ></path>
//                   </g>
//                 </svg>
//                 <p className="">Default Address</p>
//               </span>
//             )}
//             <p className="font-bold">{address.name}</p>
//             <p>
//               {address.address1}, {address.address2},
//               <br /> {address.state},
//               <br /> {address.city}
//               <br /> {address.country}
//             </p>
//             <p className="mt-2">{address.phoneNumber}</p>
//             <div className="flex justify-between mt-3">
//               <button
//                 onClick={() => {
//                   setmodalIs("edit");
//                   setopen(true);
//                   seteditAddressData(address);
//                 }}
//                 //   href="edit-address.html"
//                 className="text-blue-500 mr-3"
//               >
//                 Edit
//               </button>
//               {/* <a
//                 onClick={() => {
//                   onOpen();
//                   setmodalIs("edit");
//                 }}
//                 //   href="edit-address.html"
//                 className="text-blue-500 mr-3"
//               >
//                 Edit
//               </a> */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(index);
//                 }}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}

//         <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg flex items-center justify-center flex-1">
//           <button
//             onClick={() => {
//               //   onOpen();
//               setmodalIs("add");
//             }}
//             className="text-dark flex flex-col items-center justify-center gap-3 text-center"
//           >
//             <svg
//               className="w-[30px]"
//               viewBox="0 0 512 512"
//               xmlns="http://www.w3.org/2000/svg"
//               id="fi_2997933"
//             >
//               <g id="_03_Login" data-name="03 Login">
//                 <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"></path>
//                 <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"></path>
//               </g>
//             </svg>
//             <span>Add New Address</span>
//           </button>
//         </div>
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="delivery-instructions"
//           className="block mb-2 text-sm font-medium text-gray-700"
//         >
//           Delivery instructions
//         </label>
//         <textarea
//           id="delivery-instructions"
//           className="block w-full p-2 border border-gray-300 rounded-lg"
//           //   rows="3"
//           placeholder="Enter your message"
//         ></textarea>
//       </div>

//       <div className="mb-5">
//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           Please choose address type
//         </label>
//         <div className="flex items-center mb-4">
//           <input
//             id="work"
//             type="radio"
//             name="address-type"
//             className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//           />
//           <label
//             htmlFor="work"
//             className="ml-2 text-sm font-medium text-gray-700"
//           >
//             Work
//           </label>
//         </div>
//         <div className="flex items-center">
//           <input
//             id="home"
//             type="radio"
//             name="address-type"
//             className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//           />
//           <label
//             htmlFor="home"
//             className="ml-2 text-sm font-medium text-gray-700"
//           >
//             Home
//           </label>
//         </div>
//       </div>
//       {/* {open && (
//         <EditAddAddressForm
//           editAddressData={editAddressData}
//           open={open}
//           setOpen={setopen}
//           children={children}
//         />
//       )} */}

//       {open && (
//         <BasicModal  open={open} setOpen={setopen}>
//           <EditAddAddressForm
//             editAddressData={editAddressData}
//             open={open}
//             setOpen={setopen}
//           />
//         </BasicModal>
//       )}
//     </div>
//   );
// };

// export default DeliveryAddress;

"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import AddAddressForm from "./addressForm";
import EditAddAddressForm from "./editAddressForm";
import BasicModal from "@/components/modal";
import * as Yup from "yup";

export interface DeliveryAddressProps {
  dAddress: {
    [x: string]: any;
    name: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    country: string;
    phoneNumber: string;
    defaultAddress: boolean;
  }[];
  settheSelectedAddress: any;
  letsDeleteAddress: any;
  letsAddShipppingAddress: any;

  loadingStatus: any;
  setloadingStatus: any;
  openAddaddress: any;
  setopenAddaddress: any;
  open: any;
  setOpen: any;
  letsEditShippingAddress: any;
  deliveryMessage: any;
  setdeliveryMessage: any;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
  dAddress,
  settheSelectedAddress,
  letsDeleteAddress,
  letsAddShipppingAddress,
  open,
  setOpen,
  loadingStatus,
  setloadingStatus,
  openAddaddress,
  setopenAddaddress,
  letsEditShippingAddress,
  deliveryMessage,
  setdeliveryMessage,
}) => {
  const [addresses, setAddresses] = useState(dAddress);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  // const [loadingStatus, setLoadingStatus] = useState(false);
  const [modalIs, setModalIs] = useState<string>("add");
  const [editAddressData, setEditAddressData] = useState<any>();
  const [editAddressId, seteditAddressId] = useState();
  // const [open, setOpen] = useState(false);
  const [addedAddress, setaddedAddress] = useState();

  const handleAddressClick = (index: number, address: any) => {
    setSelectedAddress(index);
    settheSelectedAddress(address);
  };

  const handleDelete = (index: number, addressIDis: any) => {
    letsDeleteAddress(addressIDis);
    // const newAddresses = addresses.filter((_, i) => i !== index);
    // setAddresses(newAddresses);
    // if (selectedAddress === index) {
    //   setSelectedAddress(null);
    // }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // setLoadingStatus(true);
      //   userLogin(values.username, values.password);
    },
  });
  const handleChange = (event: any) => {
    setdeliveryMessage(event.target.value);
  };
  return (
    <div
      id="delivery-section"
      className="bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {dAddress?.map((address, index) => (
          <div
            key={index}
            className={`border p-4 rounded-lg flex-1 ${
              selectedAddress === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleAddressClick(index, address)}
          >
            {address.defaultAddress && (
              <span className="flex items-center gap-2 bg-green-100 py-2 px-2 mb-3">
                <svg
                  className="w-[20px] h-[20px]"
                  id="fi_4436481"
                  enableBackground="new 0 0 512 512"
                  height="512"
                  viewBox="0 0 512 512"
                  width="512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipRule="evenodd" fillRule="evenodd">
                    <path
                      d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
                      fill="#4bae4f"
                    ></path>
                    <path
                      d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
                <p className="">Default Address</p>
              </span>
            )}
            <p className="font-bold">{address.name}</p>
            <p>
              {address.address1}, {address.address2},
              <br /> {address.state},
              <br /> {address.city}
              <br /> {address.country}
            </p>
            <p className="mt-2">{address.phoneNumber}</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => {
                  setModalIs("edit");
                  setOpen(true);
                  setEditAddressData(address);
                  seteditAddressId(address._id);
                }}
                className="text-blue-500 mr-3"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index, address?._id);
                }}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg flex items-center justify-center flex-1">
          <button
            onClick={() => {
              // setModalIs("add");
              // setOpen(true);
              setopenAddaddress(true);
            }}
            className="text-dark flex flex-col items-center justify-center gap-3 text-center"
          >
            <svg
              className="w-[30px]"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              id="fi_2997933"
            >
              <g id="_03_Login" data-name="03 Login">
                <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"></path>
                <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"></path>
              </g>
            </svg>
            <span>Add New Address</span>
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="delivery-instructions"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Delivery instructions
        </label>

        {/* onChange={(value) => {
            setdeliveryMessage(value);
          }}
          value={deliveryMessage} */}
        <textarea
          id="delivery-instructions"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your message"
          value={deliveryMessage}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* 
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Please choose address type
        </label>
        <div className="flex items-center mb-4">
          <input
            id="work"
            type="radio"
            name="address-type"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="work"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Work
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="home"
            type="radio"
            name="address-type"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="home"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Home
          </label>
        </div>
      </div> */}

      {open && (
        <BasicModal open={open} setOpen={setOpen}>
          <EditAddAddressForm
            editAddressData={editAddressData}
            open={open}
            setOpen={setOpen}
            editAddressId={editAddressId}
            loadingStatus={loadingStatus}
            setloadingStatus={setloadingStatus}
            letsEditShippingAddress={letsEditShippingAddress}
          />
        </BasicModal>
      )}

      {openAddaddress && (
        <BasicModal open={openAddaddress} setOpen={setopenAddaddress}>
          <AddAddressForm
            addedAddress={addedAddress}
            setaddedAddress={setaddedAddress}
            open={openAddaddress}
            setOpen={setopenAddaddress}
            letsAddShipppingAddress={letsAddShipppingAddress}
            loadingStatus={loadingStatus}
            setloadingStatus={setloadingStatus}
          />
        </BasicModal>
      )}
    </div>
  );
};

export default DeliveryAddress;
