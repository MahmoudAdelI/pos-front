import getToken from "@/app/auth/getToken";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import { brandsSchema, unitsSchema } from "./types";

const addProductPage = async () => {
  const token = await getToken();

  const brandsPromise = axios.get("http://localhost:5091/api/Company/GetAll", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const unitsPromise = axios.get("http://localhost:5091/api/Unit/GetAll", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const [brandsResponse, unitsResponse] = await Promise.all([
    brandsPromise,
    unitsPromise,
  ]);

  const { data: brands } = brandsSchema.safeParse(brandsResponse.data);

  const { data: units } = unitsSchema.safeParse(unitsResponse.data);
  return <AddProductForm brands={brands!} units={units!} token={token!} />;
};

export default addProductPage;
