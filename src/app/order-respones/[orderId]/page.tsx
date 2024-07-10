import React from "react";

import TabbyPayment from "@/shared-pages/checkout/tabby";
import OrderSuccess from "@/shared-pages/orderstatus";
export default function OrderResponsePage({
  params,
}: {
  params: {
    orderId: string;
  };
}) {
  return <OrderSuccess orderId={params.orderId} />;
}
