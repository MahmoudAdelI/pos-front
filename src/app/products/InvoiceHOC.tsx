import React from "react";
import ProductSelector from "./ProductSelector";

const InvoiceHOC = ({ token }: { token: string }) => {
  return <ProductSelector token={token} />;
};

export default InvoiceHOC;
