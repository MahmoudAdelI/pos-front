import { notFound } from "next/navigation";
import getToken from "../auth/getToken";
import InvoiceHOC from "./InvoiceHOC";

const products = async () => {
  const token = await getToken();

  if (!token) {
    return notFound();
  }
  return <InvoiceHOC token={token} />;
};

export default products;
