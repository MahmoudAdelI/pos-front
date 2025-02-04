import axios from "axios";
import {
  AddProductFormType,
  brandsSchema,
  categoriesSchema,
  unitsSchema,
} from "../products/add-product/types";

export const fetchCategories = async (companyId: string, token: string) => {
  const { data } = await axios.get(
    `http://localhost:5091/api/Type/GetByCompanyId?companyId=${companyId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const parsedData = categoriesSchema.safeParse(data);
  if (!parsedData.success) throw new Error("An unexpected error occured");
  return parsedData.data;
};

export const fetchBrands = async (token: string) => {
  const { data } = await axios.get("http://localhost:5091/api/Company/GetAll", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedData = brandsSchema.safeParse(data);
  if (!parsedData.success) throw new Error("An unexpected error occured");
  return parsedData.data;
};

export const fetchUnits = async (token: string) => {
  const { data } = await axios.get("http://localhost:5091/api/Unit/GetAll", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedData = unitsSchema.safeParse(data);
  if (!parsedData.success) throw new Error("An unexpected error occured");
  return parsedData.data;
};
export const addProduct = (data: AddProductFormType, token: string) =>
  axios.post("http://localhost:5091/api/Product", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
