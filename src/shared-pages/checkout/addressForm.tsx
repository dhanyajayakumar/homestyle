// components/AddAddressForm.tsx
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 25.197197,
  lng: 55.2743764,
};

interface AddressFormValues {
  name: string;
  phone: string;
  landline: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  addressType: string;
  defaultAddress: boolean;
}

export interface AddAddressFormProps {
  addedAddress: any;
  setaddedAddress: any;
  open: any;
  setOpen: any;
  letsAddShipppingAddress: any;
  loadingStatus: any;
  setloadingStatus: any;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  addedAddress,
  setaddedAddress,
  open,
  setOpen,
  letsAddShipppingAddress,
  loadingStatus,
  setloadingStatus,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [address, setAddress] = useState("");
  const [locationDetails, setLocationDetails] = useState({
    latitude: "",
    longitude: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const formik = useFormik<AddressFormValues>({
    initialValues: {
      name: "",
      phone: "",
      landline: "",
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      addressType: "home",
      defaultAddress: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      addressLine1: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setloadingStatus(true);

      console.log(JSON.stringify(values, null, 2));
      letsAddShipppingAddress(values, locationDetails);
    },
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyADpvIByflUwjkskiSluNQMiUsJhGBGYgQ", // Replace with your API key
    libraries: ["places"],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const addressComponents = results[0].address_components;
            let street = "";
            let city = "";
            let state = "";
            let country = "";
            let zipcode = "";

            for (const component of addressComponents) {
              const types = component.types;
              if (types.includes("street_number") || types.includes("route")) {
                street = street
                  ? `${street} ${component.long_name}`
                  : component.long_name;
              } else if (types.includes("locality")) {
                city = component.long_name;
              } else if (types.includes("administrative_area_level_1")) {
                state = component.long_name;
              } else if (types.includes("country")) {
                country = component.long_name;
              } else if (types.includes("postal_code")) {
                zipcode = component.long_name;
              }
            }

            setLocationDetails({
              latitude: lat.toString(),
              longitude: lng.toString(),
              street,
              city,
              state,
              country,
              zipcode,
            });

            setAddress(results[0].formatted_address);
            console.log("the address is:-", JSON.stringify(results, null, 2));
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        }
      );
    }
  }, []);

  return (
    <section className="px-2 mx-auto mt-5 mb-10">
      <h6 className="mb-2 text-lg font-semibold text-center text-default-600 ">
        ADD ADDRESS
      </h6>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-4 w-full max-w-4xl">
          <div className="input-item flex space-x-2.5 mb-5 mt-3">
            <div className="w-full h-full">
              <div style={{ marginBottom: "16px", marginTop: 10 }}>
                <label htmlFor="name">Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "4px 0",
                    boxSizing: "border-box",
                    borderWidth: 1.5,
                  }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: "0 0 48%" }}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="Enter your phone number"
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "4px 0",
                  boxSizing: "border-box",
                  borderWidth: 1.5,
                }}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div style={{ color: "red" }}>{formik.errors.phone}</div>
              ) : null}
            </div>
            <div style={{ flex: "0 0 48%" }}>
              <label htmlFor="landline">Landline Number</label>
              <input
                id="landline"
                name="landline"
                type="text"
                onChange={formik.handleChange}
                placeholder="Enter your landline number"
                value={formik.values.landline}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "4px 0",
                  boxSizing: "border-box",
                  borderWidth: 1.5,
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.addressLine1}
              placeholder="Enter your address1"
              style={{
                width: "100%",
                padding: "8px",
                margin: "4px 0",
                boxSizing: "border-box",
                borderWidth: 1.5,
              }}
            />
            {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
              <div style={{ color: "red" }}>{formik.errors.addressLine1}</div>
            ) : null}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.addressLine2}
              placeholder="Enter your address 2"
              style={{
                width: "100%",
                padding: "8px",
                margin: "4px 0",
                boxSizing: "border-box",
                borderWidth: 1.5,
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
              placeholder="Enter your zipcode"
              style={{
                width: "100%",
                padding: "8px",
                margin: "4px 0",
                boxSizing: "border-box",
                borderWidth: 1.5,
              }}
            />
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <div style={{ color: "red" }}>{formik.errors.zipCode}</div>
            ) : null}
          </div>

          <div>
            <label>Address Type</label>
            <div style={{ marginTop: 5 }}>
              <label style={{ marginRight: 10 }}>
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={formik.values.addressType === "home"}
                  onChange={formik.handleChange}
                  style={{ marginRight: 5 }}
                />
                Home
              </label>
              <label style={{ marginRight: 10 }}>
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  checked={formik.values.addressType === "office"}
                  onChange={formik.handleChange}
                  style={{ marginRight: 5 }}
                />
                Office
              </label>
              <label>
                <input
                  type="radio"
                  name="addressType"
                  value="others"
                  checked={formik.values.addressType === "others"}
                  onChange={formik.handleChange}
                  style={{ marginRight: 5 }}
                />
                Others
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "16px", marginTop: 10 }}>
            <label>
              <input
                type="checkbox"
                name="defaultAddress"
                checked={formik.values.defaultAddress}
                onChange={formik.handleChange}
                style={{ marginRight: 5 }}
              />
              Default Address
            </label>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Location</label>
            {address && <div style={{ marginTop: 10 }}>Address: {address}</div>}

            {isLoaded ? (
              <>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={markerPosition}
                  zoom={14}
                  onLoad={onLoad}
                  onClick={onMapClick}
                >
                  <Marker position={markerPosition} />
                </GoogleMap>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              type="submit"
              className="w-full p-2.5 bg-red-700 text-white border-none cursor-pointer hover:bg-red-500"
            >
              Cancel
            </button>
            {loadingStatus ? (
              <div className="font-normal capitalize flex gap-2 items-center text-base h-[50px] text-white bg-[#F89D1B] hover:bg-[#dc8100] px-4 py-2">
                <CircularProgress size={18} sx={{ color: "white" }} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full p-2.5 bg-[#F89D1B] text-white border-none cursor-pointer hover:bg-[#dc8100] transition-colors duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddAddressForm;
