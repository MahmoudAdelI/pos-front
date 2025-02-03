import getToken from "@/app/auth/getToken";
import AddProductForm from "./AddProductForm";

const addProductPage = async () => {
  const token = await getToken();
  return <AddProductForm token={token!} />;
};

export default addProductPage;
