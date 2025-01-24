import getToken from "@/app/auth/getToken";
import axios from "axios";
import { z } from "zod";
import AddProductForm from "./AddProductForm";
const brandsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);
export type brandsType = z.infer<typeof brandsSchema>;

const categoriesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);
export type categoriesType = z.infer<typeof categoriesSchema>;

const unitsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);
export type unitsType = z.infer<typeof unitsSchema>;

const addProductPage = async () => {
  const token = await getToken();

  const { data: brandsResponse } = await axios.get(
    "http://localhost:5091/api/Company/GetAll",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const { data: brands } = brandsSchema.safeParse(brandsResponse);

  const { data: categoriesResponse } = await axios.get(
    "http://localhost:5091/api/Type/GetAll",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const { data: categories } = categoriesSchema.safeParse(categoriesResponse);

  const { data: unitsResponse } = await axios.get(
    "http://localhost:5091/api/Unit/GetAll",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const { data: units } = unitsSchema.safeParse(unitsResponse);
  return (
    <>
      <AddProductForm
        categories={categories!}
        brands={brands!}
        units={units!}
        token={token!}
      />
    </>
  );
};

export default addProductPage;
