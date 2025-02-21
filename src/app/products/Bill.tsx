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
  const { selectedProducts, increaseCount, decreaseCount } =
    useSelectedProductContext();
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
          <li
            key={item.id}
            className="text-md flex items-center gap-4 border-b border-navBorder py-4"
          >
            <div className="flex flex-col">
              <h3>{item.name}</h3>
              <h4 className="text-xs text-SecondaryTextColor">
                ${item.sellingPrice}/{item.unitName}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decreaseCount(item.id)}>-</button>
              <h4>{item.selectedCount}</h4>
              <button onClick={() => increaseCount(item.id)}>+</button>
            </div>
            <h3>${item.sellingPrice * item.selectedCount}</h3>
          </li>
        ))}
      </ul>
      <div>
        <h2>Total</h2>$
        {selectedProducts.reduce(
          (acc, curr) => acc + curr.sellingPrice * curr.selectedCount,
          0
        )}
      </div>
    </>
  );
};

export default Bill;
