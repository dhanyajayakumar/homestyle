import cn from "@/utils/class-names";
import { useSearchParams } from "next/navigation";
import React, { useState, ChangeEvent, useEffect } from "react";

interface Brand {
  _id: string;
  brandTitle: string;
  slug: string;
  parentBrand: string;
  description: string;
  brandImageUrl: string;
  level: string;
  corporateGiftsPriority: string;
  type: string;
  status: string;
}

interface FilterBrandProps {
  brandFilter: any;
  uRS: any;
}

const FilterBrand: React.FC<FilterBrandProps> = ({ brandFilter, uRS }) => {
  const searchParams = useSearchParams();
  const [enableFiltersBrand, setEnableFiltersBrand] = useState<boolean>(false);
  // const [searchSpecification, setSearchSpecification] = useState<string>("");

  const [searchBrand, setSearchBrand] = useState<string>("");
  const [checkedItems, setCheckedItems] = useState<
    { _id: number; slug: string }[]
  >([]);
  // const [specificationFilterChecking, setSpecificationFilterChecking] =
  //   useState<boolean>(false);
  const [brandFilterChecking, setBrandFilterChecking] =
    useState<boolean>(false);

  useEffect(() => {
    if (searchParams && brandFilterChecking) {
      setQueryString();
    }
  }, [checkedItems, brandFilterChecking, searchParams]);

  useEffect(() => {
    if (searchParams) {
      const brandId = uRS.filterValues.brands;
      if (brandFilter?.length > 0) {
        const hasbrandValues = brandFilter.some(
          (brandFilter: any) => brandFilter?.description?.length > 0
        );
        if (hasbrandValues && brandId) {
          checkBrandFilters(brandId);
        }
      }
    }
  }, [brandFilter]);

  const checkBrandFilters = async (brandId: string | any[]) => {
    const brandIdArray = Array.isArray(brandId) ? brandId : brandId.split(",");
    const selectedBrands = brandFilter.filter((category: any) =>
      brandIdArray.includes(category._id)
    );
    const newCheckedItems = selectedBrands.map((category: any) => ({
      _id: category._id,
    }));
    setCheckedItems(newCheckedItems);
    setBrandFilterChecking(true);
  };

  const setQueryString = () => {
    const queryString = checkedItems.length
      ? checkedItems.map((item) => encodeURIComponent(item._id)).join(",")
      : "";
    uRS.filterChanged({
      ...uRS.filterValues,
      page_size: "",
      brands: queryString,
    });
    setBrandFilterChecking(false);
  };

  const handleCheck = async (
    event: ChangeEvent<HTMLInputElement>,
    _id: number,
    slug: string
  ) => {
    const updatedCheckedItems = event.target.checked
      ? [...checkedItems, { _id, slug }]
      : checkedItems.filter((item: any) => item.slug !== slug);

    setCheckedItems(updatedCheckedItems);
    setBrandFilterChecking(true);
  };

  return (
    <div className="appearance-none bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden">
      <h2>
        <button
          type="button"
          className={cn(
            "appearance-none flex items-center justify-between w-full bg-[#f8f8f8] p-3 font-medium text-gray-500 border-0 focus:ring-0 focus:ring-transparent  gap-3",
            {
              "bg-muted text-mutedText": enableFiltersBrand,
            }
          )}
          onClick={() => setEnableFiltersBrand(!enableFiltersBrand)}
        >
          <span>Brands</span>
          {/* <AccordionIcon rotate={enableFiltersBrand} /> */}
        </button>
        <div className="flex flex-col mx-auto w-full mt-4 mb-3 px-5">
          <form className="h-[42px] relative pr-12 md:pr-14 bg-[#f1f1f1] rounded-3xl overflow-hidden  w-full">
            <label className="flex items-center  ">
              <input
                className="form-input w-full pl-4  appearance-none  bg-[#f1f1f1] transition ease-in-out border text-input text-sm  rounded-0 min-h-10 h-10 duration-200  focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                placeholder="SEARCH"
                defaultValue={searchBrand}
                onChange={(event: any) => setSearchBrand(event.target.value)}
              />
            </label>
            <button
              aria-label="Search"
              type="submit"
              className="outline-none text-xl text-gray-800 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
            >
              {/* <Search /> */}
            </button>
          </form>
        </div>
      </h2>
      {/* <APIFetch lengthCheckObject={brands} isLoading={brandsLoading} animatedLoading={animations.filterBlock}> */}
      {Array.isArray(brandFilter) && brandFilter.length > 0 && (
        <div
          className={cn(" max-h-[400px] h- overflow-y-auto ", {
            hidden: !enableFiltersBrand,
          })}
        >
          <div className="pl-2 border-0">
            {/* Category Filter Options */}
            <ul
              id="category-list2"
              className="border-0  shadow-0 focus:outline-none"
            >
              {brandFilter?.map((brand: any, index: number) => (
                <li
                  className="flex items-center py-2 px-3 hover:bg-[#f8f8f8] cursor-pointer"
                  key={index}
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" inline-flex items-center justify-center w-4 h-4 border border-gray-300 rounded cursor-pointer  outline-none text-red-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:text-bg-primary  transition-colors duration-150 ease-in-out"
                      onChange={(e) => handleCheck(e, brand._id, brand.slug)}
                      checked={checkedItems.some(
                        (item) => item._id === brand._id
                      )}
                    />
                    <span className="ml-2 ">{brand?.brandTitle}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* </APIFetch> */}
    </div>
  );
};

export default FilterBrand;
