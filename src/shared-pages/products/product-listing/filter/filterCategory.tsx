import cn from "@/utils/class-names";
import { useSearchParams } from "next/navigation";
import React, { useState, ChangeEvent, useEffect } from "react";

interface Category {
  _id: string;
  categoryTitle: string;
  slug: string;
  parentCategory: string;
  description: string;
  categoryImageUrl: string;
  level: string;
  corporateGiftsPriority: string;
  type: string;
  status: string;
}

interface FilterCategoryProps {
  categoryFilter: any;
  uRS: any;
}

const FilterSection: React.FC<FilterCategoryProps> = ({
  categoryFilter,
  uRS,
}) => {
  const searchParams = useSearchParams();
  const [checkedItems, setCheckedItems] = useState<{ _id: string }[]>([]);
  const [specificationFilterChecking, setSpecificationFilterChecking] =
    useState<boolean>(false);

  useEffect(() => {
    if (searchParams && specificationFilterChecking) {
      setQueryString();
    }
  }, [checkedItems, specificationFilterChecking, searchParams]);

  useEffect(() => {
    if (searchParams) {
      const categoryId = uRS.filterValues.categories;
      if (categoryFilter?.length > 0) {
        const hasSpecificationValues = categoryFilter.some(
          (categoryFilter: any) => categoryFilter?.description?.length > 0
        );
        if (hasSpecificationValues && categoryId) {
          checkcategoriesFilters(categoryId);
        }
      }
    }
  }, [categoryFilter]);

  const checkcategoriesFilters = async (categoryId: string | any[]) => {
    const specificationIdArray = Array.isArray(categoryId)
      ? categoryId
      : categoryId.split(",");
    const selectedSpecifications = categoryFilter.filter((category: any) =>
      specificationIdArray.includes(category._id)
    );
    const newCheckedItems = selectedSpecifications.map((category: any) => ({
      _id: category._id,
    }));
    setCheckedItems(newCheckedItems);
    setSpecificationFilterChecking(true);
  };

  const setQueryString = () => {
    const queryString = checkedItems.length
      ? checkedItems.map((item) => encodeURIComponent(item._id)).join(",")
      : "";
    uRS.filterChanged({
      ...uRS.filterValues,
      page_size: "",
      categories: queryString,
    });
    setSpecificationFilterChecking(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("categories are", JSON.stringify(categoryFilter, null, 2));

  return (
    <div
      className="overflow-hidden bg-white border-b"
      data-accordion="collapse"
    >
      <div className="pl-2 border-0">
        <ul className="border-0 shadow-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          {/* {
            Array.isArray(categoryFilter) && categoryFilter?.length > 0 && (
              categoryFilter.map((category, index) => ( */}
          <FilterCategoryRow
            category={categoryFilter}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            specificationFilterChecking={specificationFilterChecking}
            setSpecificationFilterChecking={setSpecificationFilterChecking}
            // key={index}
          />
          {/* //   )
          //   )
          //   )
          // } */}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;

const FilterCategoryRow = ({
  category,
  checkedItems,
  setCheckedItems,
  setSpecificationFilterChecking,
}: any) => {
  const [enableFiltersCategory, setEnableFiltersCategory] =
    useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<string>("");

  const filteredCategoryDetails = searchCategory
    ? [category].filter(
        (cat) =>
          cat.categoryTitle
            .toLowerCase()
            .includes(searchCategory.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchCategory.toLowerCase())
      )
    : [category];

  useEffect(() => {
    const matchingCheckedItems = filteredCategoryDetails.some((cat) =>
      checkedItems.some((item: any) => item._id === cat._id)
    );
    if (matchingCheckedItems) {
      setEnableFiltersCategory(true);
    }
  }, [filteredCategoryDetails, checkedItems]);

  const handleCheck = async (
    event: ChangeEvent<HTMLInputElement>,
    _id: string
  ) => {
    const updatedCheckedItems = event.target.checked
      ? [...checkedItems, { _id }]
      : checkedItems.filter((item: any) => item._id !== _id);

    setCheckedItems(updatedCheckedItems);
    setSpecificationFilterChecking(true);
  };

  console.log("theresss is", JSON.stringify(filteredCategoryDetails, null, 2));

  return (
    <div className="appearance-none bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden">
      <h2>
        <button
          type="button"
          className={cn(
            "appearance-none flex items-center justify-between w-full bg-[#f8f8f8] p-3 font-medium text-gray-500 border-0 focus:ring-0 focus:ring-transparent  gap-3",
            {
              "bg-muted text-mutedText": enableFiltersCategory,
            }
          )}
          onClick={() => setEnableFiltersCategory(!enableFiltersCategory)}
        >
          <span>Category</span>
          {/* icon */}
        </button>
        <div className="flex flex-col mx-auto w-full mt-4 mb-3 px-5">
          <form className="h-[42px] relative pr-12 md:pr-14 bg-[#f1f1f1] rounded-3xl overflow-hidden  w-full">
            <label className="flex items-center">
              <input
                className="form-input w-full pl-4 appearance-none bg-[#f1f1f1] transition ease-in-out border text-input text-sm rounded-0 min-h-10 h-10 duration-200 focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                placeholder="SEARCH"
                defaultValue={searchCategory}
                onChange={(event) => setSearchCategory(event.target.value)}
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

      {filteredCategoryDetails.length > 0 && (
        <div
          className={cn("max-h-[400px] overflow-y-auto", {
            hidden: !enableFiltersCategory,
          })}
        >
          <div className="pl-2 border-0">
            <ul
              id="category-list2"
              className="border-0 shadow-0 focus:outline-none"
            >
              {filteredCategoryDetails[0]?.map((cat: any, index: any) => (
                <li
                  className="flex items-center py-2 px-3 hover:bg-[#f8f8f8] cursor-pointer"
                  key={index}
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="inline-flex items-center justify-center w-4 h-4 border border-gray-300 rounded cursor-pointer outline-none text-red-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:text-bg-primary transition-colors duration-150 ease-in-out"
                      onChange={(e) => handleCheck(e, cat._id)}
                      checked={checkedItems.some(
                        (item: any) => item._id === cat._id
                      )}
                    />
                    <span className="ml-2">{cat?.categoryTitle}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
