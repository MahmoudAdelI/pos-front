import React from "react";
import { useInvoiceContext, useSelectedProductContext } from "./Invoice";

const Bill = () => {
  //   const { invoiceData } = useInvoiceContext();
  const { selectedProducts } = useSelectedProductContext();
  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-semibold">Current Bill</h1>
      <h2 className="text-md font-semibold">Items</h2>
      <ul className="">
        {selectedProducts.map((item) => (
          <li key={item.id} className="text-md border-b border-navBorder py-4">
            <h3>{item.name}</h3>
            <h4 className="text-xs text-SecondaryTextColor">
              ${item.sellingPrice}/{item.unitName}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bill;
