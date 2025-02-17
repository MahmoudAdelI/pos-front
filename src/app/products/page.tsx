import { notFound } from "next/navigation";
import getToken from "../auth/getToken";
import Invoice from "./Invoice";

const products = async () => {
  const token = await getToken();

  if (!token) {
    return notFound();
  }
  return <Invoice token={token} />;
};

export default products;
