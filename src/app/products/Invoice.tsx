"use client";
import { createContext, useContext, useState } from "react";

import Bill from "./Bill";
import ProductSelector from "./ProductSelector";
import {
  InvoiceData,
  Product,
  SelectedProduct,
  SelectedProductContextType,
} from "./types";

const Invoice = ({ token }: { token: string }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  return (
    <SelectedProductContext.Provider
      value={{ selectedProducts, setSelectedProducts }}
    >
      <div className="flex">
        <div className="max-w-[80%]">
          <ProductSelector token={token} />
        </div>
        {selectedProducts.length > 0 && (
          <div className="motion-preset-slide-left-sm sticky top-0 h-screen w-[20%] rounded-tl-md rounded-tr-md bg-form p-4">
            <Bill />
          </div>
        )}
      </div>
    </SelectedProductContext.Provider>
  );
};

const SelectedProductContext = createContext<
  SelectedProductContextType | undefined
>(undefined);
//
export const useSelectedProductContext = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error(
      "useSelectedProductContext must be used within an SelectedProductProvider",
    );
  }
  return context;
};
export default Invoice;
