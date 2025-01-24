import { z } from "zod";
import { categoriesType, brandsType, unitsType } from "./page";

export type AddProductFormProps = {
  categories: categoriesType;
  brands: brandsType;
  units: unitsType;
  token: string;
};
export const AddProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  buyingPrice: z.coerce
    .number()
    .min(1, { message: "Buying price is required" }),
  sellingPrice: z.coerce
    .number()
    .min(1, { message: "Selling price is required" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity should be at least 1 item" }),
  categoryId: z.string({ required_error: "Category is required" }).nonempty(),
  companyId: z.string({ required_error: "Brand is required" }).nonempty(),
  unitId: z
    .string({ required_error: "You should define the unit of this product" })
    .nonempty(),
});
export type AddProductFormType = z.infer<typeof AddProductFormSchema>;
