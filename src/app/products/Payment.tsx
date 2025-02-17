import { useInvoiceContext } from "./Invoice";

const Payment = () => {
  const { invoiceData, setInvoiceData } = useInvoiceContext();

  return <div>Payment</div>;
};

export default Payment;
