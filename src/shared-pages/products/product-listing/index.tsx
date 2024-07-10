"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import useReport from "@/hooks/useRout";
import ProductLists from "@/shared-pages/products/product-listing/product-lists";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";
import { useRouter } from "next/navigation";
import Filter from "./filter/index";
export default function Index({}) {
  const { push } = useRouter();

  const uRS = useReport();

  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [idName, setidName] = useState<any>();

  useEffect(() => {
    // const newId = searchParams.get("id");
    // const idType = searchParams.get("linkType");
    // const idName = searchParams.get("menuName");

    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    // setidName(idName);
    // console.log("id is:-", newId);
    // console.log("id value isss:-", idType);

    // setId(newId);
    // console.log("id-2", newId);

    getProductList(category, brand);
    getSpecification(category, brand);
    // console.log("id-3", newId);
  }, [searchParams]);

  const [productList, setproductLists] = useState<any>([]);
  const [filters, setFilters] = useState<any[]>([]); // State to hold filters
  const [brandFilter, setbrandFilter] = useState();
  const [categoryFilter, setcategoryFilter] = useState();
  const [Error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const [collectionTitle, setcollectionTitle] = useState();
  const [collectionSubTitle, setcollectionSubTitle] = useState();
  const [collectionBanners, setcollectionBanners] = useState<any>();
  const [selectedFilter, setselectedFilter] = useState<any>([]);

  const [selSpecification, setselSpecification] = useState<any>();
  useEffect(() => {
    // console.log("the id value is:-", JSON.stringify(id, null, 2));
    getProductCat();
  }, []);

  const getProductList = async (
    category: string | null,
    brand: string | null
  ) => {
    // console.log("id-4", newIds);

    if (category) {
      console.log("Category url");
      getCatgoryFilterData(category);
      getBrandFilterData(category, "category");
      const params = {
        category: category,
        ...uRS.getCombinedParams(),
      };
      try {
        const response = await api.get(
          `${endpoints.productListing}?${new URLSearchParams(
            params
          ).toString()}`,
          {
            headers: {},
          }
        );

        if (response.data.status) {
          setproductLists(response.data.requestedData);
        } else {
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("brand url");
      getBrandFilterData(brand, "brand");
      try {
        const response = await api.get(
          `${endpoints.productListing}?brand=${brand}&limit=10`,
          {
            headers: {
              // Custom headers if needed
            },
          }
        );
        // console.log(
        //   `Product Lisitng of:-${newIds}`,
        //   JSON.stringify(response.data, null, 2)
        // );

        if (response.data.status) {
          setproductLists(response.data.requestedData);
          // console.log(
          //   "the menu data is:-",
          //   JSON.stringify(response.data, null, 2)
          // );
        } else {
          // console.log(
          //   "the menu data - error is:-",
          //   JSON.stringify(response.data.message, null, 2)
          // );
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getProductCat = async () => {
    try {
      const response = await api.get(
        `${endpoints.getCollection}?page=product-list&pageReference=top`,
        {
          headers: {},
        }
      );
      // console.log(
      //   "the pcTopBottom is:-",
      //   JSON.stringify(response.data, null, 2)
      // );
      setcollectionTitle(response?.data?.requestedData[0]?.collectionTitle);
      setcollectionSubTitle(
        response?.data?.requestedData[0]?.collectionSubTitle
      );
      setcollectionBanners(
        response?.data?.requestedData[0]?.collectionsCategories
      );
    } catch (err) {
      console.log("the error", err);
    }
  };

  const getCatgoryFilterData = async (catId: any) => {
    try {
      const response = await api.get(
        `${endpoints.filterProductData}?category=${catId}`,
        {
          headers: {
            // Custom headers if needed
          },
        }
      );
      console.log(
        "setcategoryFilter  of:-",
        JSON.stringify(response.data, null, 2)
      );

      if (response.data.status) {
        console.log(
          "inside",
          JSON.stringify(response.data.requestedData, null, 2)
        );

        setcategoryFilter(response.data.requestedData);
        // console.log(
        //   "the menu data is:-",
        //   JSON.stringify(response.data, null, 2)
        // );
      } else {
        // console.log(
        //   "the menu data - error is:-",
        //   JSON.stringify(response.data.message, null, 2)
        // );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getBrandFilterData = async (catBrandId: any, type: any) => {
    try {
      const response = await api.get(
        `${endpoints.filterBrandData}?${type}=${catBrandId}`,
        {
          headers: {
            // Custom headers if needed
          },
        }
      );
      console.log("brandFilter  of:-", JSON.stringify(response.data, null, 2));

      if (response.data.status) {
        setbrandFilter(response.data.requestedData);
        // console.log(
        //   "the menu data is:-",
        //   JSON.stringify(response.data, null, 2)
        // );
      } else {
        // console.log(
        //   "the menu data - error is:-",
        //   JSON.stringify(response.data.message, null, 2)
        // );
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getSpecification = async (category: string | null, brand: any) => {
    if (category) {
      try {
        const response = await api.get(
          `${endpoints.getSpecification}?category=${category}`,
          {
            headers: {},
          }
        );
        // console.log("the spec is:-", JSON.stringify(response.data, null, 2));
        setFilters(response.data.requestedData);
      } catch (err) {
        console.log("the error", err);
      }
    } else {
      try {
        const response = await api.get(
          `${endpoints.getSpecification}?brand=${brand}`,
          {
            headers: {},
          }
        );
        // console.log("the spec is:-", JSON.stringify(response.data, null, 2));
        setFilters(response.data.requestedData);
      } catch (err) {
        console.log("the error", err);
      }
    }
  };

  const getFileterData = (item: any, theId: any) => {
    const uniqueSet = new Set(item);
    const setString = `{ ${Array.from(uniqueSet).join(", ")} }`;
    console.log("in Main :-", JSON.stringify(item, null, 2));
    console.log("the id is:-,", theId);

    console.log("in Main - formated :-", JSON.stringify(setString, null, 2));
    setselSpecification(setString);
    filteringData();
  };

  const filteringData = async () => {
    console.log("the specification:", selSpecification);
    console.log("the sorting:-");

    // console.log("the data for filter", setString);
    // console.log("the id for filter", id);
    // try {
    //   const response = await api.get(
    //     `${endpoints.productListing}?category=${id}&limit=10`,
    //     {
    //       headers: {
    //         // Custom headers if needed
    //
    //       },
    //     }
    //   );
    //   console.log(
    //     `Product Lisitng of:-${id}`,
    //     JSON.stringify(response.data, null, 2)
    //   );
    //   if (response.data.status) {
    //     setproductLists(response.data.requestedData);
    //     console.log(
    //       "the menu data is:-",
    //       JSON.stringify(response.data, null, 2)
    //     );
    //   } else {
    //     console.log(
    //       "the menu data - error is:-",
    //       JSON.stringify(response.data.message, null, 2)
    //     );
    //   }
    // } catch (err: any) {
    //   setError(err);
    // } finally {
    //   setLoading(false);
    // }
  };
  const scrollRef = useRef<any>(null); // Create a ref for scrolling

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" }); // Adjust scroll amount as needed
    }
  };

  const scrollToPrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" }); // Adjust scroll amount as needed
    }
  };
  const handleClickOnshopNow = (linkId: any) => {
    console.log("THe id is:-", linkId);
    push(`/products/products-listing?id=${linkId}&linkType=category`);
  };

  console.log("tbefore:-", JSON.stringify(categoryFilter, null, 2));

  return (
    <div>
      {/* <!-- product collection --> */}
      <section className="relative px-3 mx-auto container-fluid sm:px-6">
        <div className="py-8">
          <div className="mb-8">
            <h2 className="text-2xl capitalize lg:text-3xl">
              {collectionTitle}
            </h2>
            <span className="text-sm lg:text-xl opacity-60">
              {collectionSubTitle}
            </span>
          </div>
          <div className="relative">
            <button
              type="button"
              className="absolute left-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={scrollToPrevious}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </span>
            </button>
            <div
              className="flex overflow-x-auto space-x-4 no-scrollbar"
              ref={scrollRef}
            >
              {collectionBanners?.map((value: any) => (
                <div
                  key={value.id}
                  onClick={() => handleClickOnshopNow(value._id)}
                  className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 relative transition-all group hover:shadow-lg"
                >
                  <a className="absolute inset-0 z-[11]"></a>
                  <div className="relative overflow-hidden bg-white">
                    <div className="relative h-0 pb-[56.25%]">
                      {" "}
                      {/* Maintain aspect ratio 16:9 */}
                      <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src={`${api.defaults.baseURL}${value?.categoryImageUrl}`}
                        crossOrigin="anonymous"
                        alt={value.categoryTitle}
                      />
                    </div>
                    <div className="px-2 py-2 md:py-4 md:px-3 xl:px-4 lg:px-3">
                      <p className="text-sm font-medium capitalize md:text-base group-hover:text-[#F89D1B]">
                        {value.categoryTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute right-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={scrollToNext}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </section>

      <div className="px-3 mb-6 sm:px-6">
        <div className="">
          <div className="flex gap-6 bg-white">
            <div>
              <Filter
                filters={filters}
                uRS={uRS}
                categoryFilter={categoryFilter}
                brandFilter={brandFilter}
              />
            </div>

            <ProductLists
              productlist={productList}
              // brandFilter={brandFilter}
              // categoryFilter={categoryFilter}
              // setselectedFilter={setselectedFilter}
              idName={"Menu Title"}
              // idName={idName}
              // getFileterData={(item: any, theId: any) => {
              //   getFileterData(item, theId);
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
