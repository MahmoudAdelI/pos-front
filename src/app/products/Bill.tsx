import { useEffect, useState } from "react";
import { useSelectedProductContext } from "./Invoice";
import { InvoiceData } from "./types";
const initialInvoiceData: InvoiceData = {
  date: new Date(),
  invoiceItems: [],
  employeeId: "",
};
const Bill = () => {
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const { selectedProducts } = useSelectedProductContext();
  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      invoiceItems: selectedProducts.map((p) => ({
        itemId: p.id,
        quantity: p.selectedCount,
      })),
    }));
  }, [selectedProducts]);
  return (
    <>
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
    </>
  );
};

export default Bill;
