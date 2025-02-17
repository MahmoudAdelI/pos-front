"use client";
import { useInvoiceContext } from "./Invoice";

const ClientSelector = () => {
  const { invoiceData, setInvoiceData } = useInvoiceContext();
  return <div>Client</div>;
};

export default ClientSelector;
