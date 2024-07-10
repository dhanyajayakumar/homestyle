import React, { useState } from "react";
import BasicModal from "@/components/modal";
import BillingForm from "./billingform";
import EditBillingForm from "./editBillingForm";
export interface BillingAddressProps {
  dAddress: any;
  theSelectedAddress: any;
  letsDeleteAddress: any;
  letsAddBillingAddress: any;
  openBillingAddress: any;
  setopenBillingAddress: any;
  loadingStatus: any;
  setloadingStatus: any;
  openBillingAddressEdit: any;
  setopenBillingAddressEdit: any;
  letsEditBillingAddress: any;
  settheSelectedBillingAddress: any;
  setselectedBillingAddType: any;
}

const BillingAddress: React.FC<BillingAddressProps> = ({
  dAddress,
  letsDeleteAddress,
  theSelectedAddress,
  letsAddBillingAddress,
  openBillingAddress,
  setopenBillingAddress,
  loadingStatus,
  setloadingStatus,
  openBillingAddressEdit,
  setopenBillingAddressEdit,
  letsEditBillingAddress,
  settheSelectedBillingAddress,
  setselectedBillingAddType,
}) => {
  const [billingAddressType, setBillingAddressType] = useState("new");
  const [addresses, setAddresses] = useState(dAddress);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [editBillingAddressData, seteditBillingAddressData] = useState<any>();
  const [editBillingAddressId, seteditBillingAddressId] = useState();
  const [addedShippingAddress, setaddedShippingAddress] = useState<any>();

  // till here done
  const handleAddressClick = (index: number, address: any) => {
    setSelectedAddress(index);
    settheSelectedBillingAddress(address);
  };

  const handleDelete = (index: number, addressIDis: any) => {
    letsDeleteAddress(addressIDis);
    // const newAddresses = addresses.filter((_, i) => i !== index);
    // setAddresses(newAddresses);
    // if (selectedAddress === index) {
    //   setSelectedAddress(null);
    // }
  };
  return (
    <div
      id="billing-section"
      className="bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3"
    >
      <div className="mb-5">
        <div className="flex items-center mb-4">
          <input
            id="new-billing-address"
            type="radio"
            name="billing-address-type"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            checked={billingAddressType === "new"}
            onChange={() => {
              setBillingAddressType("new");
              setselectedBillingAddType("new");
            }}
          />
          <label
            htmlFor="new-billing-address"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Add New Billing Address
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="same-billing-address"
            type="radio"
            name="billing-address-type"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            checked={billingAddressType === "same"}
            onChange={() => {
              setBillingAddressType("same");
              setselectedBillingAddType("same");

              settheSelectedBillingAddress(theSelectedAddress);
            }}
          />
          <label
            htmlFor="same-billing-address"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Continue with Same Address
          </label>
        </div>
      </div>

      {billingAddressType === "new" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {dAddress?.map((address: any, index: any) => (
            <div
              key={index}
              className={`border p-4 rounded-lg flex-1 ${
                selectedAddress === index
                  ? "border-blue-500"
                  : "border-gray-300"
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
                    //  setModalIs("edit");
                    //  setOpen(true);
                    //  setEditAddressData(address);
                    setopenBillingAddressEdit(true);
                    seteditBillingAddressData(address);

                    seteditBillingAddressId(address._id);
                  }}
                  className="text-blue-500 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    //  e.stopPropagation();
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
                //  setopenAddaddress(true);
                setopenBillingAddress(true);
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
      ) : (
        <>
          {theSelectedAddress ? (
            <div className="border border-green-300 p-4 rounded-lg mb-5">
              <p className="font-bold">{theSelectedAddress?.name}</p>
              <p>
                {theSelectedAddress?.address1}, {theSelectedAddress?.address2},
                <br /> {theSelectedAddress?.state},
                <br /> {theSelectedAddress?.city}
                <br /> {theSelectedAddress?.country}
              </p>
              <p className="mt-2">{theSelectedAddress?.phoneNumber}</p>
            </div>
          ) : (
            <div className="border border-green-300 p-4 rounded-lg mb-5">
              <p className="font-bold">Please Select Delivery Address</p>
            </div>
          )}
        </>
      )}

      {openBillingAddressEdit && (
        <BasicModal
          open={openBillingAddressEdit}
          setOpen={setopenBillingAddressEdit}
        >
          <EditBillingForm
            editBillingAddressData={editBillingAddressData}
            // open={open}
            // setOpen={setOpen}
            openBillingAddressEdit={openBillingAddressEdit}
            setopenBillingAddressEdit={setopenBillingAddressEdit}
            editBillingAddressId={editBillingAddressId}
            loadingStatus={loadingStatus}
            setloadingStatus={setloadingStatus}
            letsEditBillingAddress={letsEditBillingAddress}
          />
        </BasicModal>
      )}

      {openBillingAddress && (
        <BasicModal open={openBillingAddress} setOpen={setopenBillingAddress}>
          <BillingForm
            addedShippingAddress={addedShippingAddress}
            setaddedShippingAddress={setaddedShippingAddress}
            openBillingAddress={openBillingAddress}
            setopenBillingAddress={setopenBillingAddress}
            letsAddBillingAddress={letsAddBillingAddress}
            loadingStatus={loadingStatus}
            setloadingStatus={setloadingStatus}
          />
        </BasicModal>
      )}
    </div>
  );
};

export default BillingAddress;
