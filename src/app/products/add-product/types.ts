import { z } from "zod";

export const AddProductFormSchema = z
  .object({
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
      .string({
        required_error: "You should define the unit of this product",
      })
      .nonempty(),
  })
  .refine((data) => data.sellingPrice > data.buyingPrice, {
    message: "selling price must be greater than buying price",
    path: ["sellingPrice"],
  });
export type AddProductFormType = z.infer<typeof AddProductFormSchema>;
export const brandsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
export type brandsType = z.infer<typeof brandsSchema>;

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const categoriesSchema = z.array(categorySchema);
export type CategoriesType = z.infer<typeof categoriesSchema>;

export const unitsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
export type unitsType = z.infer<typeof unitsSchema>;
