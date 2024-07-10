import cn from "@/utils/class-names";
import { useSearchParams } from "next/navigation";
import React, { useState, ChangeEvent, useEffect } from "react";

interface Item {
  _id: string;
  itemName: string;
}

interface FilterSectionProps {
  items: Item[];

  uRS: any;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  items,

  uRS,
}) => {
  const searchParams = useSearchParams();

  const [checkedItems, setCheckedItems] = useState<{ _id: number }[]>([]);
  const [specificationFilterChecking, setSpecificationFilterChecking] =
    useState<boolean>(false);

  useEffect(() => {
    if (searchParams && specificationFilterChecking) {
      setQueryString();
    }
  }, [checkedItems, specificationFilterChecking, searchParams]);

  useEffect(() => {
    if (searchParams) {
      const specificationsId = uRS.filterValues.specifications;
      if (items?.length > 0) {
        const hasSpecificationValues = items.some(
          (specification: any) => specification?.specificationValues?.length > 0
        );
        if (hasSpecificationValues && specificationsId) {
          checkSpecificationFilters(specificationsId);
        }
      }
    }
  }, [items]);

  const checkSpecificationFilters = async (specificationId: string | any[]) => {
    const specificationIdArray = Array.isArray(specificationId)
      ? specificationId
      : specificationId.split(",");
    const selectedSpecifications = items.flatMap((specification: any) =>
      specification.specificationValues.filter((specificationValue: any) =>
        specificationIdArray.includes(specificationValue._id)
      )
    );
    const newCheckedItems = selectedSpecifications.map(
      (specificationValue: any) => ({
        _id: specificationValue._id,
      })
    );
    setCheckedItems(newCheckedItems);
    setSpecificationFilterChecking(true);
  };

  const setQueryString = () => {
    const queryString = checkedItems.length
      ? checkedItems.map((item) => encodeURIComponent(item._id))?.join(",")
      : "";
    uRS.filterChanged({
      ...uRS.filterValues,
      page_size: "",
      specification: queryString,
    });
    setSpecificationFilterChecking(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("items are", JSON.stringify(items, null, 2));

  return (
    <div
      className="overflow-hidden bg-white border-b"
      data-accordion="collapse"
    >
      <div className="pl-2 border-0">
        <ul className="border-0 shadow-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          {Array.isArray(items) &&
            items?.length > 0 &&
            items.map((specification: any, index: number) => (
              <FilterSpecificationRow
                specification={specification}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                specificationFilterChecking={specificationFilterChecking}
                setSpecificationFilterChecking={setSpecificationFilterChecking}
                key={index}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;

const FilterSpecificationRow = ({
  specification,
  checkedItems,
  setCheckedItems,
  setSpecificationFilterChecking,
}: any) => {
  const [enableFiltersSpecification, setEnableFiltersSpecification] =
    useState<boolean>(false);
  const [searchSpecification, setSearchSpecification] = useState<string>("");

  const filteredSpecificationsDetails = searchSpecification
    ? specification?.specificationValues?.filter(
        (specification: any) =>
          specification.itemName
            .toLowerCase()
            .includes(searchSpecification.toLowerCase()) ||
          specification.itemValue
            .toLowerCase()
            .includes(searchSpecification.toLowerCase())
      )
    : specification?.specificationValues;

  useEffect(() => {
    const matchingCheckedItems = specification?.specificationValues?.some(
      (specificationValue: any) =>
        checkedItems.some((item: any) => item._id === specificationValue._id)
    );
    if (matchingCheckedItems) {
      setEnableFiltersSpecification(true);
    }
  }, [specification.specificationValues, checkedItems]);

  const handleCheck = async (
    event: ChangeEvent<HTMLInputElement>,
    _id: number
  ) => {
    const updatedCheckedItems = event.target.checked
      ? [...checkedItems, { _id }]
      : checkedItems.filter((item: any) => item._id !== _id);

    setCheckedItems(updatedCheckedItems);
    setSpecificationFilterChecking(true);
  };
  console.log("");

  return (
    <div className="appearance-none bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden">
      <h2>
        <button
          type="button"
          className={cn(
            "appearance-none flex items-center justify-between w-full bg-[#f8f8f8] p-3 font-medium text-gray-500 border-0 focus:ring-0 focus:ring-transparent  gap-3",
            {
              "bg-muted text-mutedText": enableFiltersSpecification,
            }
          )}
          onClick={() =>
            setEnableFiltersSpecification(!enableFiltersSpecification)
          }
        >
          <span>{specification?.specificationTitle}</span>
          {/* icon */}
          {/* <AccordionIcon rotate={enableFiltersSpecification} /> */}
        </button>
        <div className="flex flex-col mx-auto w-full mt-4 mb-3 px-5">
          <form className="h-[42px] relative pr-12 md:pr-14 bg-[#f1f1f1] rounded-3xl overflow-hidden  w-full">
            <label className="flex items-center  ">
              <input
                className="form-input w-full pl-4  appearance-none  bg-[#f1f1f1] transition ease-in-out border text-input text-sm  rounded-0 min-h-10 h-10 duration-200  focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                placeholder="SEARCH"
                defaultValue={searchSpecification}
                onChange={(event: any) =>
                  setSearchSpecification(event.target.value)
                }
              />
            </label>
            <button
              aria-label="Search"
              type="submit"
              className="outline-none text-xl text-gray-800 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
            >
              {/* Search */}
              {/* icon */}
            </button>
          </form>
        </div>
      </h2>

      {Array.isArray(specification?.specificationValues) &&
        specification?.specificationValues?.length > 0 && (
          <div
            className={cn(" max-h-[400px] h- overflow-y-auto ", {
              hidden: !enableFiltersSpecification,
            })}
          >
            <div className="pl-2 border-0">
              <ul
                id="category-list2"
                className="border-0  shadow-0 focus:outline-none"
              >
                {filteredSpecificationsDetails?.map(
                  (
                    specificationValue: any,
                    specificationValueIndex: number
                  ) => (
                    <li
                      className="flex items-center py-2 px-3 hover:bg-[#f8f8f8] cursor-pointer"
                      key={specificationValueIndex}
                    >
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" inline-flex items-center justify-center w-4 h-4 border border-gray-300 rounded cursor-pointer  outline-none text-red-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:text-bg-primary  transition-colors duration-150 ease-in-out"
                          onChange={(e) =>
                            handleCheck(e, specificationValue._id)
                          }
                          checked={checkedItems.some(
                            (item: any) => item._id === specificationValue._id
                          )}
                        />
                        <span className="ml-2 ">
                          {specificationValue?.itemName}
                        </span>
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
};
