import { z } from "zod";
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sellingPrice: z.number(),
  buyingPrice: z.number(),
  quantity: z.number(),
  // notes: z.null(),
  categoryName: z.string(),
  companyName: z.string(),
  unitName: z.string(),
});
export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
