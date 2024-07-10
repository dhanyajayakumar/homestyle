import React from "react";
import FilterSection from "./filterSection";
import FilterCategory from "./filterCategory";
import FilterBrand from "./filterBrand";
export interface ProductListingProps {
  filters: any;
  uRS: any;
  categoryFilter: any;
  brandFilter: any;
}

const Index: React.FC<ProductListingProps> = ({
  filters,
  uRS,
  categoryFilter,
  brandFilter,
}) => {
  console.log("thersade:-", categoryFilter);

  return (
    <div
      className="hidden transition-transform md:block sm:hidden lg:w-72 md:w-64"
      id="filter_Offcanvas"
      // tabindex="-1"
    >
      {/* <!-- filter header --> */}

      <div className="flex items-center justify-between px-4 mt-3 py-4 min-h-[67px] mb-2 bg-white border-b">
        <h3 className="font-normal uppercase text-grey-900">Filter By</h3>

        <a href="" className="text-gray-400 underline">
          Clear
        </a>
      </div>

      <FilterCategory
        // key={filter.specificationTitle}
        // heading={filter.specificationTitle}
        categoryFilter={categoryFilter}
        // selectedItems={filters[filter.specificationTitle as any] || []}
        // onFilterChange={(updatedSelectedItems: any) =>
        //   console.log("the item isL;-", updatedSelectedItems)
        // }
        uRS={uRS}
      />

      <FilterBrand
        // key={filter.specificationTitle}
        // heading={filter.specificationTitle}
        brandFilter={brandFilter}
        // selectedItems={filters[filter.specificationTitle as any] || []}
        // onFilterChange={(updatedSelectedItems: any) =>
        //   console.log("the item isL;-", updatedSelectedItems)
        // }
        uRS={uRS}
      />

      {/* {filters.map((filter: any) => ( */}
      <FilterSection
        // key={filter.specificationTitle}
        // heading={filter.specificationTitle}
        items={filters}
        // selectedItems={filters[filter.specificationTitle as any] || []}
        // onFilterChange={(updatedSelectedItems: any) =>
        //   console.log("the item isL;-", updatedSelectedItems)
        // }
        uRS={uRS}
      />

      {/* ))} */}

      {/* <!-- reset btn --> */}

      <div className="block p-3 border-t border-default-200 lg:hidden">
        <button
          type="reset"
          className="inline-flex w-full items-center justify-center rounded border border-primary bg-primary px-6 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary focus:ring focus:ring-primary/50"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Index;
