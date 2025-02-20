"use client";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import ClientSelector from "./ClientSelector";
import Payment from "./Payment";
import ProductSelector from "./ProductSelector";
import {
  InvoiceContextType,
  InvoiceData,
  Product,
  SelectedProductContextType,
} from "./types";
import Bill from "./Bill";

const initialInvoiceData: InvoiceData = {
  date: new Date(),
  invoiceItems: [],
  employeeId: "",
};
// export type StepFormRef = {
//   triggerValidation: () => Promise<boolean>;
//   isValid: boolean;
// };
const Invoice = ({ token }: { token: string }) => {
  // const stepRef = useRef<StepFormRef | null>(null);
  // const steps = useMemo(
  //   () => [
  //     <ProductSelector token={token} ref={stepRef} />,
  //     <ClientSelector ref={stepRef} />,
  //     <Payment />,
  //   ],
  //   [token],
  // );
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  // const [currentStep, setCurrentStep] = useState(1);
  // const handleNext = async () => {
  //   if (stepRef.current) {
  //     const isValid = await stepRef.current.triggerValidation();
  //     if (isValid) {
  //       setCurrentStep((prev) => prev + 1);
  //     }
  //   }
  // };
  // const handlePrev = () => {
  //   if (currentStep > 1) {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };
  return (
    // <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
    <SelectedProductContext.Provider
      value={{ selectedProducts, setSelectedProducts }}
    >
      {/* <div>{currentStep}</div> */}
      {/* <div className="flex gap-4">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>
          {currentStep < steps.length ? "Next" : "Complete"}
        </button>
      </div> */}
      {/* {steps[currentStep - 1]} */}

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
    // </InvoiceContext.Provider>
  );
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);
const SelectedProductContext = createContext<
  SelectedProductContextType | undefined
>(undefined);
export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
};
export const useSelectedProductContext = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
};
export default Invoice;
