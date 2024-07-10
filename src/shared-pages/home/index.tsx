import React from "react";

import Banner from "./banner";
import Bedroombanner from "./bedroom-banner";
import Bedrromcollections from "./bedrrom-collections";
import Brands from "./brands";
import Customizedcollection from "./customized-collection";
import Exculusiveproduct from "./exculusive-product";
import Featuressection from "./features-section";
import Fullbanner from "./full-banner";
import FullScreenbanner from "./fullScreen-banner";
import Kitchenbanner from "./kitchen-banner";
import Kitchencollection from "./kitchen-collection";
import Productcategories from "./product-categories";

export default function index({}) {
  return (
    <div>
      <Banner />
      <Featuressection />
      <Fullbanner />
      <Exculusiveproduct />
      <FullScreenbanner />
      <Productcategories />
      <Bedroombanner />
      <Bedrromcollections />
      <Kitchenbanner />
      <Kitchencollection />
      {/* <Customizedcollection /> */}
      <Brands />
    </div>
  );
}
