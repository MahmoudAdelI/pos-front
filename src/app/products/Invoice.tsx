"use client";
import { createContext, useContext, useMemo, useState } from "react";
import ClientSelector from "./ClientSelector";
import Payment from "./Payment";
import ProductSelector from "./ProductSelector";
import { InvoiceContextType, InvoiceData } from "./types";

const initialInvoiceData: InvoiceData = {
  date: new Date(),
  invoiceItems: [],
  clientId: "",
  employeeId: "",
};

const Invoice = ({ token }: { token: string }) => {
  const steps = useMemo(
    () => [<ProductSelector token={token} />, <ClientSelector />, <Payment />],
    [token],
  );
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      <div>{currentStep}</div>
      <div className="flex gap-4">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>
          {currentStep < steps.length ? "Next" : "Complete"}
        </button>
      </div>
      {steps[currentStep - 1]}
    </InvoiceContext.Provider>
  );
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);
export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
};
export default Invoice;
